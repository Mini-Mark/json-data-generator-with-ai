//On page intereact
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

function clearInput() {
	document.getElementById("editing").value = "";
	document.getElementById("highlighting-content").innerHTML = "";
}
