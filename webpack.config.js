const path = require("path");

module.exports = {
	entry: {
		main: "./src/js/index.js",
		viewer: "./src/js/viewer.js",
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
	},
	optimization: {
		minimize: false,
	},
};
