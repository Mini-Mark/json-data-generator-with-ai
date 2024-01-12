from flask import Flask, render_template, request, jsonify

import threading
import configparser
import google.generativeai as genai

app = Flask(__name__, template_folder='templates')
app._static_folder = 'templates/static'

config_parser = configparser.ConfigParser()
config_parser.read('config.ini')

model = genai.GenerativeModel('gemini-pro')


@app.route('/')
def index():
    return render_template('./index.html', api_key=config_parser['KEY']['GOOGLE_API_KEY'])


def get_answer(json_data, result_text, event):
    try:
        result_data = f"Generate more list of json data with this json:\n{json_data}\n\nPlease generate with the same key and random data from your idea. if data have many than one make it to list. Give me only one long JSON , Don't tell anything without JSON, please add \\n for newline and \\t for tab"

        response = model.generate_content(result_data, stream=True)

        ai_result = ""

        for chunk in response:
            ai_result += chunk.text
            ai_result += "\n"

        format_result = ("\n".join(ai_result.replace(
            "```json", "").split("```"))).replace("\n\n", "\n").strip()

        result_text.append(format_result)
    except:
        raise Exception("Can't generate json, please check your api key")

    event.set()


def saveApiKey(key):
    global genai, config_parser

    config_parser['KEY']['GOOGLE_API_KEY'] = key
    with open('config.ini', 'w') as configfile:
        config_parser.write(configfile)

    genai.configure(api_key=config_parser['KEY']['GOOGLE_API_KEY'])


@app.route('/generate', methods=['POST'])
def generate():
    try:
        data = request.get_json()

        # Save Google api key
        saveApiKey(data["apiKey"])

        # Generate Json
        result_text = []
        event = threading.Event()
        threading.Thread(target=get_answer, args=(
            data["prompt"], result_text, event)).start()
        event.wait()

        return jsonify({'result': result_text})
    except:
        return jsonify({'error': f"Can't generate json, please check your api key"}), 400


if __name__ == '__main__':
    app.run(debug=True)
