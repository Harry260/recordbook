function calculateInsulin(ICR = false) {
	var items = window["activeItems"] || [{ total_grams: 0 }];
	if (ICR) {
		var totalGrams = 0;
		items.forEach((item) => {
			totalGrams += item.total_grams;
		});
		window["insulinUnits"] = Math.round(totalGrams / ICR);
		var ins = Math.round(totalGrams / ICR);
		return ins;
	} else {
		return false;
	}
}

export default calculateInsulin;
