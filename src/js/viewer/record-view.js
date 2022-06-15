import { getDatabase, ref, onValue } from "firebase/database";
import moment from "moment";
import createBloodSugarChart from "./chart";
import Auth from "../auth/auth";
import getFoodListCard from "../food/food-list-card";
import components from "../ui/components";
import $ from "jquery";
import bpop from "../ui/bottom-pop";

async function getRecordForDate(date) {
	var user = await Auth.getCurrentUser();

	components.viewer.userIcon.attr(
		"src",
		`https://avatars.dicebear.com/api/big-smile/${user.data.displayName}.svg`
	);
	components.viewer.recordOverlay.fadeIn().css("display", "flex");
	var data = window["records"][date];

	if (!data) {
		components.viewer.recordOverlay.fadeOut();
		bpop("Record not found!", 3000, true);
		return;
	}
	var html = "";
	var BSChartData = [];
	var InsulinChartData = [];
	Object.keys(data).map((key) => {
		components.viewer.recordDate.text(
			moment(data[key].date).format("MMMM Do YYYY")
		);
		var { title, date, time, bloodSugar, insulin, food_list, ratio } =
			data[key];

		html += `
         <div class="record-item">
            <div class="record-item-title v-center sbtw-center">
               <div class="text-sec v-center">
                  <h1 class="record-title">${title}</h1>
                  <span class="ratio-tag">1:${ratio}</span>
               </div>
               <div class="info-wrap v-center">
                  <div class="info-item v-center visible-${bloodSugar}">
                     <img src="./src/assets/icons/pulse.png" />
                     <span>${bloodSugar}</span>
                  </div>
                  <div class="info-item v-center visible-${bloodSugar}">
                     <img src="./src/assets/icons/water.png" />
                     <span>${insulin} Units</span>
                  </div>
               </div>
            </div>
            <div class="food-item-list">${getFoodListCard(food_list).join(
				""
			)}</div>
         </div>
         `;
		var x = moment(time, "HH:mm:ss").format("HH:mm A");
		if (bloodSugar) {
			BSChartData.push({
				x,
				y: bloodSugar,
			});
		}
		if (insulin) {
			InsulinChartData.push({
				x,
				y: insulin,
			});
		}
	});

	var chartObj = [];
	if (BSChartData.length > 0) {
		chartObj.push({
			label: "Blood Sugar",
			data: sortObjDates(BSChartData, "x"),
			borderColor: "#f55376",
		});
	}
	if (InsulinChartData.length > 0) {
		chartObj.push({
			label: "Insulin",
			data: sortObjDates(InsulinChartData, "x"),
			borderColor: "#0070f3",
		});
	}
	if (chartObj.length > 0) {
		createBloodSugarChart(chartObj);
	}
	document.querySelector(".record-list-root").innerHTML = html;
	components.viewer.recordLane.fadeIn();
	components.viewer.recordLoader.fadeOut();
}
function sortObjDates(times, key = "date") {
	times.sort((a, b) => a[key].localeCompare(b[key]));
	return times;
}

async function getDateList() {
	try {
		var user = await Auth.getCurrentUser();
		var recordName = window.currentRecord || "Records";
		var bucket = `user_data/${user.data.uid}/${recordName}/records`;
		const db = getDatabase();

		components.viewer.userIcon.attr(
			"src",
			`https://avatars.dicebear.com/api/big-smile/${user.data.displayName}.svg`
		);
		const starCountRef = ref(db, bucket);
		onValue(starCountRef, (snapshot) => {
			var data = snapshot.val();

			if (!data) {
				rCatch();

				return;
			}
			window["records"] = data;

			Object.keys(data).map((key) => {
				var txtDate = moment(key).format("DD MMMM YYYY");
				var html = `
			<div class="date-item sbtw-center v-center" data-date="${key}">
			<div class="v-center name-icon-gp">
				<img
					src="https://avatars.dicebear.com/api/initials/${moment(key).format("D")}.svg"
				/>
				<div class="date-title">${txtDate}</div>
			</div>
			<div class="date-day">Monday</div>
		</div>`;
				$(".date-list").append(html);
			});

			$(".full-loader").remove();

			const urlParams = new URLSearchParams(window.location.search);
			const dt = urlParams.get("record");

			if (dt) {
				var dtArray = dt.split("");
				var date =
					dtArray[0] +
					dtArray[1] +
					dtArray[2] +
					dtArray[3] +
					"-" +
					dtArray[4] +
					dtArray[5] +
					"-" +
					dtArray[6] +
					dtArray[7];

				getRecordForDate(date);
			}
		});
	} catch (error) {
		rCatch();
	}
}
getDateList();

function rCatch() {
	bpop(
		`No records found! (or error occurred). Going back in 5 seconds`,
		9000,
		true
	);
	$(".full-loader").find("img").remove();

	setTimeout(() => (window.location.href = "/"), 5000);
}

$(document).on("click", ".date-item", function () {
	var date = $(this).data("date");

	getRecordForDate(date);
});

export default getRecordForDate;
