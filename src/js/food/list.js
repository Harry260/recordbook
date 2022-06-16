import $ from "jquery";
import components from "../ui/components";
import bpop from "../ui/bottom-pop";
import calculateInsulin from "./calculate";
import Ratio from "./ratio";
import getFoodListCard from "./food-list-card";

const foodListComponents = components.foodList;

const foodList = {
	updateFoodItemList: function (list) {
		var foodItemList = window["activeItems"] || [] || list;
		var extraFoodItemList = localStorage.getItem("customFoodItems") || "[]";
		extraFoodItemList = JSON.parse(extraFoodItemList);

		foodItemList = foodItemList.concat(extraFoodItemList);
		if (foodItemList.length === 0) {
			foodListComponents.noItemNotice.show();
		} else {
			foodListComponents.noItemNotice.hide();
		}

		var html = getFoodListCard(foodItemList);

		var insulin = calculateInsulin(Ratio.getCurrentRatio());
		if (insulin === false) {
			foodListComponents.insulinCount.text("Error");
		} else {
			console.log(insulin);
			foodListComponents.insulinCount.text(insulin + " units");
		}
		foodListComponents.itemList.html(html);
	},
	getList: async () => {
		return new Promise(async (resolve, reject) => {
			fetch("../../../carbs.json")
				.then((response) => response.json())
				.then((data) => {
					resolve(data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	updateList: async () => {
		var list = await foodList.getList();

		var html = list.map(
			(item) => `
		<div class="food-list-item v-center" data-gram="${item.ch_gram}" data-title="${
				item.name
			}" data-unit=${item.unit}>
			<div class="item-icon">
				<img
					src="https://avatars.dicebear.com/api/initials/${item.name}.svg"
					alt="Image"
				/>
			</div>
			<div class="item-name">
				<h2>${item.name}</h2>
				<span>${getSubTitle(item.ch_gram, item.unit)}</span>
			</div>
		</div>
		`
		);

		function getSubTitle(gram, unit) {
			var quantityDefault = {
				count: 1,
				ml: 100,
			};

			return `~ ${Math.round(gram * quantityDefault[unit])}g in ${
				quantityDefault[unit]
			} ${unit}`;
		}

		foodListComponents.listWrap.html(html.join(" "));
	},
	chooseQuantity(title, gram, unit) {
		window["active_items"] = { title, gram, unit };
		if (title === false) {
			foodListComponents.quantityChoose.css("bottom", "-100%");
		} else {
			foodListComponents.quantityChoose.css("bottom", 0);
			foodListComponents.quantityLabel.text(title);
			if (unit === "ml") {
				foodListComponents.quantitySlider.attr("max", "999");
				foodListComponents.quantityInput.attr("max", "999");
				foodListComponents.quantitySlider.val("100");
				foodListComponents.quantityInput.val("100");
			} else {
				foodListComponents.quantitySlider.attr("max", "100");
				foodListComponents.quantityInput.attr("max", "100");
				foodListComponents.quantitySlider.val("4");
				foodListComponents.quantityInput.val("4");
			}
		}
	},
};
window["x"] = foodList.chooseQuantity;
foodListComponents.listSearch.on("keyup", function () {
	var value = $(this).val();

	$(".food-list-item")
		.show()
		.filter(function () {
			return $(this).text().toLowerCase().trim().indexOf(value) == -1;
		})
		.hide();
});

foodListComponents.cancelQuantityBtn.on("click", () =>
	foodList.chooseQuantity(false)
);

foodListComponents.quantityInput.on("input", function () {
	var value = $(this).val();
	console.log(value);
	foodListComponents.quantitySlider.val(value);
});

foodListComponents.quantitySlider.on("change", function () {
	var value = $(this).val();
	foodListComponents.quantityInput.val(value);
});

foodListComponents.addMobileFood.on("click", function () {
	foodListComponents.foodListPopup.show();
});

foodListComponents.foodListPopupClose.on("click", function () {
	foodListComponents.foodListPopup.hide();
});
foodListComponents.addItemsBtn.on("click", function () {
	var quantity = foodListComponents.quantityInput.val();
	var { title, gram, unit } = window.active_items;

	window.active_items.user_quantity = parseInt(quantity);
	window.active_items.total_grams = quantity * gram;
	console.log(window.active_items);

	var object = window.active_items;
	var tempActiveItems = window["activeItems"] || [];
	tempActiveItems.push(object);
	window["activeItems"] = tempActiveItems;

	foodList.updateFoodItemList(tempActiveItems);

	bpop(
		`Added ${quantity} (~${Math.round(
			gram * quantity
		)}) ${unit} of ${title} to your list`
	);

	foodList.chooseQuantity(false);
});

$(document).on("click", ".food-list-item", function () {
	var gram = $(this).data("gram");
	var title = $(this).data("title");
	var unit = $(this).data("unit");

	foodList.chooseQuantity(title, gram, unit);
});

$(document).on("click", ".food-item", function () {
	var id = $(this).data("item-id");
	var items = window["activeItems"];
	var title = items[id].title;
	items.splice(parseInt(id), 1);
	window["activeItems"] = items;
	foodList.updateFoodItemList(items);

	bpop(`Removed ${title} from your list`);
});

foodList.updateList();
export default foodList;
