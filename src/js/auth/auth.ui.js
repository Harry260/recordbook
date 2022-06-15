import Auth from "./auth";
import components from "../ui/components";
import bpop from "../ui/bottom-pop";
import getErrorMsg from "./errorMsg";

Auth.redirectAuto();
components.auth.loginBtn.on("click", async () => {
	const email = components.auth.emailInput.val();
	const password = components.auth.passwordInput.val();

	if (!email || !password) {
		bpop("Please enter the required information", 3000, true);
	}

	await Auth.signIn(email, password).then((user) => {
		if (user.success) {
			console.log("Signed in");
		} else {
			console.log(user.data);
			bpop(getErrorMsg(user.data.errorCode), 3000, true);
		}
	});
});

components.auth.createBtn.on("click", async () => {
	const email = components.auth.emailInput.val();
	const password = components.auth.passwordInput.val();
	const userName = components.auth.userName.val();

	if (!email || !password || !userName) {
		bpop("Please enter the required information", 3000, true);
	}

	await Auth.createAccount(email, password, userName).then((user) => {
		if (user.success) {
			console.log("Created account");
		} else {
			console.log(user.data);
			bpop(getErrorMsg(user.data.errorCode), 3000, true);
		}
	});
});

components.auth.btnSignOut.on("click", async () => {
	await Auth.SignOut();
});

export default Auth;
