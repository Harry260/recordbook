import components from "../ui/components";
import calculateInsulin from "./calculate";
import bpop from "../ui/bottom-pop";
import $ from "jquery";

const Ratio = {
	getCurrentRatio: function () {
		var ratio = localStorage.getItem("ratio") || 10;
		return parseInt(ratio);
	},
	newRatio: function (name, val) {
		var ratio_list = localStorage.getItem("ratio_list") || "{}";
		ratio_list = JSON.parse(ratio_list);

		if (name && val) {
			ratio_list[name] = val;
			localStorage.setItem("ratio_list", JSON.stringify(ratio_list));
			localStorage.setItem("ratio", val);
			this.setRatioList();

			return true;
		} else {
			return false;
		}
	},
	getRatio: function () {
		var ratios =
			localStorage.getItem("ratio_list") ||
			JSON.stringify({
				"Sample Ratio 1": 10,
				"Custom Ratio 2": 14,
			});
		return JSON.parse(ratios);
	},
	setDefRatio: function () {
		var ratio = Ratio.getCurrentRatio();
		components.ratio.ratioLabel.text("1:" + ratio);
		window["currentRatio"] = ratio;
		this.setRatioList();
	},
	setRatio: function (name) {
		var ratio_list = Ratio.getRatio();
		if (ratio_list[name]) {
			localStorage.setItem("ratio", ratio_list[name]);
			window["currentRatio"] = ratio_list[name];
			this.setDefRatio();

			var insulin = calculateInsulin(Ratio.getCurrentRatio());
			components.foodList.insulinCount.text(insulin + " units");
		}
	},
	setRatioList() {
		var ratio_list = Ratio.getRatio();
		ratio_list["New Ratio"] = "ratio";
		var html = Object.keys(ratio_list).map(
			(item) => `
      <div class="ratio-item" data-ratio="${item}">
            <span
               >${item}
               <span class="ratio-tag"
                  >1:${ratio_list[item]}</span
               ></span
            >
         </div>
      `
		);

		components.ratio.ratioPopUp.html(html);
	},
};

$(document).on("click", ".ratio-item", (e) => {
	var ratio = $(e.currentTarget).data("ratio");
	if (ratio === "New Ratio") {
		components.ratio.ratioPopOverlay.fadeIn("fast").css("display", "flex");
	} else {
		Ratio.setRatio(ratio);
	}
});

components.ratio.ratioCancelBtn.click(() =>
	components.ratio.ratioPopOverlay.fadeOut()
);

components.ratio.ratioSaveBtn.click(() => {
	var name = components.ratio.ratioNameInput.val();
	var val = components.ratio.ratioInput.val();

	if (name && val) {
		Ratio.newRatio(name, val);
		components.ratio.ratioPopOverlay.fadeOut();
		Ratio.setRatio(name);
		bpop("Ratio Successfully Created! ^_^", 2000, false);
	} else {
		bpop("Please enter a Ratio name and a value", 2000, true);
	}
});
Ratio.setDefRatio();
export default Ratio;
