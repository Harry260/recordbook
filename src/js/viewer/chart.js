import Chart from "chart.js/auto";
import bpop from "../ui/bottom-pop";

function createBloodSugarChart(data) {
	console.log(data);
	try {
		if (window.aChart) {
			window.aChart.destroy();
		}

		var weeklyHistoryChartEl = document
			.getElementById("weeklyHistory")
			.getContext("2d");

		var ctx = weeklyHistoryChartEl;
		var data = {
			datasets: data,
		};

		var ch = new Chart(ctx, {
			type: "line",
			data: data,
			options: {
				scales: {
					xAxes: [
						{
							scaleLabel: {
								display: true,
							},
							type: "time",
							time: {
								unit: "second",

								displayFormats: {
									second: "HH:mm A",
								},
							},

							position: "bottom",
						},
					],
				},
			},
		});

		window["aChart"] = ch;
	} catch (error) {
		document.querySelector(".chart-wrap").innerHTML = "";
	}
}

export default createBloodSugarChart;
