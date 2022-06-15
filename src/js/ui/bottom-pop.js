import $ from "jquery";
function bpop(text = "Your text goes here", timeout = 1000, error = false) {
	var popObj = document.createElement("div");
	var jqPopObj = $(popObj);
	popObj.innerHTML = `
   <div class="bottom-pop center ${
		error ? "pop-error" : ""
   }"><span>${text}</span></div>
   `;

	$("body").append(popObj);
	jqPopObj.find(".bottom-pop").css("bottom", "0");
	setTimeout(() => {
		jqPopObj.find(".bottom-pop").css("bottom", "-100px");
		setTimeout(() => {
			jqPopObj.remove();
		}, 1000);
	}, timeout);
}

export default bpop;
