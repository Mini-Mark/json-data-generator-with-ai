# Json Data Generator

## Overview

This Python script, `json_data_generator.py`, provides a simple graphical user interface for generating lists of JSON data using the Google Generative AI. The script utilizes the Tkinter library for the graphical interface and relies on the `google.generativeai` library for communication with the Generative AI model.

## Features
- **Generate JSON with Your Keyword:** Input your own JSON data as a reference to generate more data.
- **Utilize Your Own JSON:** Allows users to use their JSON as a seed for generating additional data.

## Example
- Generate JSON with Your Keyword

![with keyword](https://github.com/Mini-Mark/json-data-generator-with-ai/blob/main/example_images/keyword.png?raw=true)

- Utilize Your Own JSON

![own json](https://github.com/Mini-Mark/json-data-generator-with-ai/blob/main/example_images/json.png?raw=true)

## Getting Started

1. Install the required libraries by running the following command:

    ```bash
    pip install -r requirements.txt
    ```

2. Set up your Google Generative AI API key by following the instructions on the [Google AI website](https://ai.google.dev/tutorials/setup). Replace the empty string (`""`) with your actual API key in the `genai.configure(api_key="")` line within the script.

3. Run the script using the following command:

    ```bash
    python json_data_generator.py
    ```

## Usage

1. Enter the input JSON data in the first text field.
2. Click the "Submit" button to generate more JSON data based on the provided input.
3. The generated JSON data will be displayed in the second text field.
4. Click the "Copy" button to copy the generated JSON data to the clipboard.

## Dependencies

Ensure that the required libraries are installed by running the following command:

```bash
pip install -r requirements.txt
```

## License
This project is licensed under the MIT License.

## Acknowledgments
- The script uses the Google Generative AI library for content generation.

Feel free to customize and enhance the script according to your needs. If you encounter any issues or have suggestions for improvement, please open an issue or submit a pull request.
