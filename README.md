# Json Data Generator with AI

## Overview

This Python script, `main.py`, provides a simple graphical user interface for generating lists of JSON data using the Google Generative AI. The script utilizes the Tkinter library for the graphical interface and relies on the `google.generativeai` library for communication with the Generative AI model.

## Features
- **Generate JSON with Your Keyword:** Input your own JSON data as a reference to generate more data.
- **Utilize Your Own JSON:** Allows users to use their JSON as a seed for generating additional data.

## Preview
- UX/UI

![with keyword](https://github.com/Mini-Mark/json-data-generator-with-ai/blob/main/preview_images/page.png?raw=true)

- Generate JSON with Your Keyword

![with keyword](https://github.com/Mini-Mark/json-data-generator-with-ai/blob/main/preview_images/keyword.png?raw=true)

- Utilize Your Own JSON

![own json](https://github.com/Mini-Mark/json-data-generator-with-ai/blob/main/preview_images/json.png?raw=true)

## Getting Started
1. Clone the GitHub repository using the following command:

    ```bash
    git clone https://github.com/Mini-Mark/json-data-generator-with-ai.git
    ```
    
2. Change your working directory to the project folder:

    ```bash
    cd ./json-data-generator-with-ai
    ```
    
3. Install the project dependencies by running the following command:
    ```bash
    pip install -r requirements.txt
    ```
    
4. Set up your Google Generative AI API key by following the instructions on the [Google AI website](https://ai.google.dev/tutorials/setup). Insert after the `=` sign with your actual API key in the google_api_key variable in `config.ini`

5. Run the script using the following command:

    ```bash
    python main.py
    ```

## Usage
1. Enter the input JSON data in the prompt text field.
2. Click the "Generate" button to generate more JSON data based on the provided input.
3. The generated JSON data will be displayed in the bottom area.
4. Click the "Copy" button to copy the generated JSON data to the clipboard or "Refresh" for generate again

## License
This project is licensed under the MIT License.

## Acknowledgments
- The script uses the Google Generative AI library for content generation.

Feel free to customize and enhance the script according to your needs. If you encounter any issues or have suggestions for improvement, please open an issue or submit a pull request.
