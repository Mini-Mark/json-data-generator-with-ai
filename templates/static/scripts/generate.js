//Generate prompt
const promptList = [];
const resultList = [];

async function fetchJson(prompt) {
	var apiKey = document.getElementById("api_key").value;

	try {
		const response = await fetch("/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ prompt: prompt, apiKey: apiKey }),
		});

		const data = await response.json();
		return data.result[0];
	} catch (err) {
		console.log(err);
		return false;
	}
}

function fixJsonFormat(json) {
	let result = JSON.stringify(json, null, 2)
		.replace(/\\"/g, '"')
		.replace(/("\\n|\\n")/g, '"')
		.replace(/}(?=((:?\s*)?[^,]*(:?\s*)?\\n:?\s*)?[^,]*(:?\s*)?{)/g, "\n},")
		.replace(/(?<=\s\d*)\\n(?=\d*)/g, "")
		.replace(/\\n/g, "\n")
		.replace(/\\t/g, "\t");

	result = result.slice(1, result.length - 1);

	return result;
}

const getLastestID = () => promptList.length;

function appendResult({ result, id = null }) {
	if (id != null) {
		resultList[id - 1] = result;
	} else {
		id = promptList.length;
		resultList.push(result);
	}

	let resultElement = document.getElementById(`result-text-${id}`);
	resultElement.innerHTML = result;
	document.getElementById(`hidden-result-text-${id}`).value = result;

	Prism.highlightElement(resultElement);
}

async function submitForm(event) {
	event.preventDefault();

	var jsonData = document.getElementById("editing").value;
	promptList.push(jsonData);

	clearInput();
	appendResultToHTML();

	const resultJson = await fetchJson(jsonData);
	if (resultJson != false) {
		let result = fixJsonFormat(resultJson);
		appendResult({ result: result });
	} else {
		appendResult({
			result: "Can't generate json, please check your api key",
		});
	}
}

//Refresh result
async function refreshResult(id) {
	let hiddenResult = document.getElementById(`hidden-result-text-${id}`);

	if (hiddenResult.value) {
		var jsonData = document.getElementById(`hidden-prompt-${id}`).value;
		promptList[id - 1] = jsonData;

		document.getElementById(`result-text-${id}`).innerHTML =
			"Loading . . . .";
		hiddenResult.value = "";

		const resultJson = await fetchJson(jsonData);

		if (resultJson != false) {
			let result = fixJsonFormat(resultJson);
			appendResult({ result: result, id: id });
		} else {
			appendResult({
				id: id,
				result: "Can't generate json, please check your api key",
			});
		}
	}
}

function appendResultToHTML(id = getLastestID()) {
	var newResultPrompt = document.createElement("div");
	newResultPrompt.classList.add(`result-item`);
	newResultPrompt.classList.add(`result-item-${id}`);

	// Set innerHTML
	newResultPrompt.innerHTML = `
			<div class="result-prompt">
				<h2 class="title">#${id} Your Prompt</h2>
				<div class="result">
					<pre
						id="highlighting"
						aria-hidden="true"
						class="language-json"
						tabindex="0"
					>
						<code class="language-json" id="prompt-${id}">${promptList[id - 1]}</code>
					</pre>
					<input type="hidden" id="hidden-prompt-${id}"/>
				</div>
			</div>
            <div class="arrow">
                <img src="./static/assets/arrow-icon.svg" />
            </div>
            <div class="result-output">
                <h2 class="title highlight">Output</h2>
                <div class="result">
                    <pre id="highlighting" aria-hidden="true" class="language-json" tabindex="0">
                        <code class="language-json" id="result-text-${id}">Loading . . . .</code>
                    </pre>
                </div>
				<input type="hidden" id="hidden-result-text-${id}" />
            </div>
            <div class="action">
                <div class="btn copy" onclick="copyToClipboard(${id})">
                    <div class="icon">
                        <img src="./static/assets/copy-icon.svg" />
                    </div>
                    <div class="label">copy</div>
                </div>
                <div class="btn refresh" onclick="refreshResult(${id})">
                    <div class="icon">
                        <img src="./static/assets/refresh-icon.svg" />
                    </div>
                    <div class="label">refresh</div>
                </div>
            </div>
        `;

	let resultList = document.getElementById("result-list");
	let firstChild = resultList.firstChild;
	if (firstChild) {
		resultList.insertBefore(newResultPrompt, firstChild);
	} else {
		resultList.appendChild(newResultPrompt);
	}

	document.getElementById(`hidden-prompt-${id}`).value = promptList[id - 1];

	Prism.highlightElement(document.getElementById(`prompt-${id}`));
}

//Copy to clipboard
function copyToClipboard(id) {
	var textToCopy = document.getElementById("hidden-result-text-" + id).value;

	if (textToCopy) {
		var textarea = document.createElement("textarea");
		textarea.value = textToCopy;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);
		alert(`Result #${id} copied to clipboard!`);
	}
}
