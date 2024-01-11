//#region On page interaction

//Toggle Help button
function toggleHelp(index) {
	var helpBtns = document.querySelectorAll(".help-btn");

	helpBtns.forEach(function (btn) {
		btn.classList.remove("active");
	});

	helpBtns[index - 1].classList.add("active");
	var descriptions = document.querySelectorAll(".description");

	descriptions.forEach(function (desc) {
		desc.classList.remove("active");
	});

	document.querySelector(".help-" + index).classList.add("active");
}

//Refresh result
function refreshResult(id) {
	var jsonData = document.getElementById(`hidden-prompt-${id}`).value;
	var apiKey = document.getElementById("api_key").value;

	promptList.push(jsonData);

	document.getElementById(`result-text-${id}`).innerHTML = "Loading . . . .";
	document.getElementById(`hidden-result-text-${id}`).value = "";

	//appendResultToHTML(id);

	fetch("/generate", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ prompt: jsonData, apiKey: apiKey }),
	})
		.then((response) => response.json())
		.then((data) => {
			let result = JSON.stringify(data.result[0], null, 2)
				.replace(/\\"/g, '"')
				.replace(/\\n/g, "\n")
				.replace(/\\t/g, "\t");

			result = result.slice(1, result.length - 1);
			resultList.push(result);

			let resultElement = document.getElementById(`result-text-${id}`);
			resultElement.innerHTML = result;
			document.getElementById(`hidden-result-text-${id}`).value = result;

			Prism.highlightElement(resultElement);
		})
		.catch((error) => {
			let resultElement = document.getElementById(`result-text-${id}`);
			resultElement.innerHTML =
				"Can't generate json, please check your api key";

			console.error("Error:", error);
		});
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
//#region On page interact

//Generate prompt
const promptList = [];
const resultList = [];

function submitForm(event) {
	event.preventDefault();

	var jsonData = document.getElementById("editing").value;
	var apiKey = document.getElementById("api_key").value;

	promptList.push(jsonData);

	document.getElementById("editing").value = "";
	document.getElementById("highlighting-content").innerHTML = "";

	let id = promptList.length;
	appendResultToHTML(id);

	fetch("/generate", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ prompt: jsonData, apiKey: apiKey }),
	})
		.then((response) => response.json())
		.then((data) => {
			let result = JSON.stringify(data.result[0], null, 2)
				.replace(/\\"/g, '"')
				.replace(/\\n/g, "\n")
				.replace(/\\t/g, "\t");

			result = result.slice(1, result.length - 1);
			resultList.push(result);

			let resultElement = document.getElementById(`result-text-${id}`);
			resultElement.innerHTML = result;
			document.getElementById(`hidden-result-text-${id}`).value = result;

			Prism.highlightElement(resultElement);
		})
		.catch((error) => {
			let resultElement = document.getElementById(`result-text-${id}`);
			resultElement.innerHTML =
				"Can't generate json, please check your api key";

			console.error("Error:", error);
		});
}

function appendResultToHTML(id) {
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
