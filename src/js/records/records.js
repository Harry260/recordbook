import "./records.ui";
import "../config";
import Auth from "../auth/auth";
import { getDatabase, ref, set } from "firebase/database";
import components from "../ui/components";
import bpop from "../ui/bottom-pop";

const Records = {
	async save(obj) {
		var user = await Auth.getCurrentUser();
		var recordName = window.currentRecord || "Records";
		var bucket = `user_data/${user.data.uid}/${recordName}/records/${
			obj.date
		}/${obj.time.replace(/:/g, "-")}`;
		const db = getDatabase();
		set(ref(db, bucket), obj).then(() => {
			components.records.recordsOverlay.hide();
			bpop("Record saved successfully!");
		});
	},
};

export default Records;
