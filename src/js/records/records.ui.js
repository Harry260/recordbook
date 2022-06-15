import components from "../ui/components";
import $ from "jquery";
import bpop from "../ui/bottom-pop";
var recordComponents = components.records;
import Records from "./records";
import moment from "moment";
import Ratio from "../food/ratio";

$.fn.setNow = function (onlyBlank) {
	var now = new Date($.now()),
		year,
		month,
		date,
		hours,
		minutes,
		seconds,
		formattedDateTime;

	year = now.getFullYear();
	month =
		now.getMonth().toString().length === 1
			? "0" + (now.getMonth() + 1).toString()
			: now.getMonth() + 1;
	date =
		now.getDate().toString().length === 1
			? "0" + now.getDate().toString()
			: now.getDate();
	hours =
		now.getHours().toString().length === 1
			? "0" + now.getHours().toString()
			: now.getHours();
	minutes =
		now.getMinutes().toString().length === 1
			? "0" + now.getMinutes().toString()
			: now.getMinutes();
	seconds =
		now.getSeconds().toString().length === 1
			? "0" + now.getSeconds().toString()
			: now.getSeconds();

	formattedDateTime =
		year +
		"-" +
		month +
		"-" +
		date +
		"T" +
		hours +
		":" +
		minutes +
		":" +
		seconds;

	if (onlyBlank === true && $(this).val()) {
		return this;
	}

	$(this).val(formattedDateTime);

	return this;
};
recordComponents.recordDate.setNow();

recordComponents.recordsSaveBtn.on("click", function () {
	var recordDate = recordComponents.recordDate.val() || false,
		recordBloodSugar = recordComponents.recordBloodSugar.val() || false,
		recordInsulin = recordComponents.recordInsulin.val() || false,
		recordTitle = recordComponents.recordsTitle.val();

	if (!recordTitle) {
		bpop("Please enter a title for your record.", 2000, true);
	} else if (!recordDate) {
		bpop("Please select a date and time for your record.", 2000, true);
	} else {
		Records.save({
			title: recordTitle,
			date: moment(recordDate).format("YYYY-MM-DD"),
			time: moment(recordDate).format("HH:mm:ss"),
			bloodSugar: recordBloodSugar,
			insulin: recordInsulin,
			dateTimeISO: recordDate,
			food_list: activeItems,
			ratio: Ratio.getCurrentRatio(),
		});
	}
});

recordComponents.recordsCancelBtn.on("click", () =>
	recordComponents.recordsOverlay.hide()
);
recordComponents.saveRecordsOpen.on("click", () => {
	recordComponents.recordInsulin.val(window.insulinUnits);
	recordComponents.recordsOverlay.show().css("display", "flex");
});
