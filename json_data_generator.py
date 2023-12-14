import google.generativeai as genai
import tkinter as tk
from tkinter import ttk
import threading

genai.configure(api_key="") #Set your API key here
model = genai.GenerativeModel('gemini-pro')

def convert_data():
    submit_button.config(state="disabled")
    copy_button.config(state="disabled")
    result_text.config(state="normal")
    result_text.delete("1.0", "end")
    result_text.insert("1.0", "Loading. . . . .")
    result_text.config(state="disabled")
    threading.Thread(target=getAnswer).start()

def getAnswer():
    json_data = json_text.get("1.0", "end-1c")
    result_data = f"Generate more list of json data with this json:\n{json_data}\n\nPlease generate with the same key and random data from your idea. Give me only JSON. Don't tell anything without JSON"

    response = model.generate_content(result_data, stream=True)

    ai_result = ""

    for chunk in response:
        ai_result += chunk.text
        ai_result += "\n"

    format_result = ai_result.replace("```json","").replace("\n```","").replace("```","")
    
    result_text.config(state="normal")
    result_text.delete("1.0", "end")
    result_text.insert("1.0", format_result)
    result_text.config(state="disabled")
    submit_button.config(state="normal")
    copy_button.config(state="normal")

def copy_to_clipboard():
    result_text_content = result_text.get("1.0", "end-1c")
    root.clipboard_clear()
    root.clipboard_append(result_text_content)
    root.update()

# Create the main window
root = tk.Tk()
root.title("Json Data Generator")

# Create and place widgets
json_label = tk.Label(root, text="JSON Data (Ex. Pokemon, {json text}, Person) :")
json_label.grid(row=0, column=0, padx=10, pady=5, sticky="w")
json_text = tk.Text(root, height=30, width=60)
json_text.grid(row=1, column=0, padx=10, pady=5)
submit_button = tk.Button(root, text="Submit", command=convert_data)
submit_button.grid(row=2, column=0, pady=10)

html_label = tk.Label(root, text="=>")
html_label.grid(row=0, column=1, padx=10, pady=5, sticky="w", rowspan=3)

html_label = tk.Label(root, text="Output :")
html_label.grid(row=0, column=2, padx=10, pady=5, sticky="w")
result_text = tk.Text(root, height=30, width=60, state="disabled")
result_text.grid(row=1, column=2, padx=10, pady=5)
copy_button = tk.Button(root, text="Copy", command=copy_to_clipboard)
copy_button.grid(row=2, column=2, pady=10)

# Run the Tkinter event loop
root.mainloop()
