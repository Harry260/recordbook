function getFoodListCard(foodItemList) {
	var html = foodItemList.map(
		(item, index) => `
      <div class="food-item v-center sbtw-center" data-item-id="${index}">
      <div class="food-info v-center">
         <img
            class="cancel-food"
            src="./src/assets/icons/cancel.png",
            alt="Image"
         />
         <img
            class="item-icon"
            src="https://avatars.dicebear.com/api/initials/${item.title}.svg"
         />
         
         <span class="food-item-label">${item.title}</span>
      </div>
      <div class="food-quantity">
         <span class="food-quant">${item.user_quantity} ${item.unit}</span>
         <span class="food-grams">~ ${Math.round(item.total_grams)} g</span>
      </div>
   </div>
   `
	);
	return html;
}

export default getFoodListCard;
