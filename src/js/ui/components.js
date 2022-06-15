import $ from "jquery";

const components = {
	auth: {
		loginBtn: $(".login-btn"),
		createBtn: $(".create-btn"),
		passwordInput: $(".password-input"),
		emailInput: $(".email-input"),
		userName: $(".user-name-input"),
		btnSignOut: $(".btn-sign-out"),
	},
	foodList: {
		listWrap: $(".food-list"),
		listSearch: $(".food-list-search-input"),
		addItemsBtn: $(".add-item-btn"),
		cancelQuantityBtn: $(".cancel-quantity-btn"),
		quantityChoose: $(".food-quantity-choose"),
		quantityInput: $(".food-quantity-input"),
		quantitySlider: $(".choose-range"),
		quantityLabel: $(".food-quantity-label"),
		itemList: $(".item-list"),
		noItemNotice: $(".add-to-calc"),
		insulinCount: $(".insulin-count"),
	},
	ratio: {
		ratioBtn: $(".ratio-btn"),
		ratioLabel: $(".ratio-label"),
		ratioPopUp: $(".ratio-pop-up"),
		ratioItem: $(".ratio-item"),
		ratioInput: $(".ratio-in"),
		ratioNameInput: $(".ratio-name-in"),
		ratioSaveBtn: $(".save-ratio-btn"),
		ratioCancelBtn: $(".ratio-cancel-btn"),
		ratioPopOverlay: $(".ratio-pop-overlay"),
	},
	records: {
		recordsSaveBtn: $(".record-save-btn"),
		recordsCancelBtn: $(".record-cancel-btn"),
		recordsTitle: $(".record-save-title"),
		recordBloodSugar: $(".record-save-blood"),
		recordInsulin: $(".record-save-insulin"),
		recordDate: $(".record-save-date"),
		recordsOverlay: $(".save-record-overlay"),
		saveRecordsOpen: $(".save-record-open"),
	},
	viewer: {
		viewerHeader: $(".record-head"),
		closeRecordBtn: $(".close-record"),
		recordLane: $(".record-lane"),
		recordDate: $(".rd"),
		recordOverlay: $(".record-overlay"),
		recordLoader: $(".loader-icon"),
		recordLane: $(".record-lane"),
		userIcon: $(".user-icon-viewer"),
	},
};

export default components;
