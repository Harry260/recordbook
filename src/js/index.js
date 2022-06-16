import "./auth/auth.ui";
import Auth from "./auth/auth";
import "./food/list";
import "./records/records";
import components from "./ui/components";

async function _init() {
	var userData = await Auth.getCurrentUser();
	var user = userData.data;
	var { uid, displayName } = user;

	components.viewer.userIcon.attr(
		"src",
		`https://avatars.dicebear.com/api/big-smile/${uid}.svg`
	);

	components.settings.greetText.text(`Hello, ${displayName}`);
}

components.settings.logOutBtn.on("click", () => {
	Auth.SignOut();
});
_init();
