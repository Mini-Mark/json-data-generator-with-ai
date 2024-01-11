from flask import Flask, render_template, request, jsonify

import threading
import config
import google.generativeai as genai

app = Flask(__name__, template_folder='templates')
app._static_folder = 'templates/static'

model = genai.GenerativeModel('gemini-pro')


@app.route('/')
def index():
    return render_template('./index.html', api_key=config.GOOGLE_API_KEY)


def get_answer(json_data, result_text, event):
    result_data = f"Generate more list of json data with this json:\n{json_data}\n\nPlease generate with the same key and random data from your idea. if data have many than one make it to list. Give me only one long JSON , Don't tell anything without JSON, please add \\n for newline and \\t for tab"

    response = model.generate_content(result_data, stream=True)

    ai_result = ""

    for chunk in response:
        ai_result += chunk.text
        ai_result += "\n"

    format_result = ("\n".join(ai_result.replace(
        "```json", "").split("```"))).replace("\n\n", "\n").strip()

    result_text.append(format_result)

    event.set()


def saveApiKey(key):
    config.GOOGLE_API_KEY = key
    genai.configure(api_key=config.GOOGLE_API_KEY)


@app.route('/generate', methods=['POST'])
def generate():
    try:
        data = request.get_json()

        # Set Google api key
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
