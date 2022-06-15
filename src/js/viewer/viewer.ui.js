import components from "../ui/components";
import $ from "jquery";

$(".record-list").scroll(function () {
	if (!$(this).scrollTop()) {
		components.viewer.viewerHeader.addClass("record-head-def");
	} else {
		components.viewer.viewerHeader.removeClass("record-head-def");
	}
});

$(document).on("click", ".close-record", () => {
	var rv = components.viewer.recordOverlay;
	rv.fadeOut();
});
