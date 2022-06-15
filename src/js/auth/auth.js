import "../config";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from "firebase/auth";

const Auth = {
	createAccount: async (email, password, name = null) => {
		return new Promise((resolve, reject) => {
			const auth = getAuth();
			createUserWithEmailAndPassword(auth, email, password)
				.then(async (userCredential) => {
					// Signed in
					const user = userCredential.user;

					await updateProfile(user, {
						displayName: name,
					});
					resolve({
						success: true,
						data: user,
					});
					Auth.redirectAuto();
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					resolve({
						success: false,
						data: {
							errorCode,
							errorMessage,
						},
					});
				});
		});
	},
	signIn: async (email, password) => {
		return new Promise((resolve, reject) => {
			const auth = getAuth();
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					resolve({
						success: true,
						data: user,
					});
					Auth.redirectAuto();
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					resolve({
						success: false,
						data: {
							errorCode,
							errorMessage,
						},
					});
				});
		});
	},
	SignOut: async () => {
		return new Promise((resolve, reject) => {
			const auth = getAuth();
			signOut(auth)
				.then(() => {
					resolve({
						success: true,
					});
					Auth.redirectAuto();
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					resolve({
						success: false,
						data: {
							errorCode,
							errorMessage,
						},
					});
				});
		});
	},
	getCurrentUser: () => {
		return new Promise((resolve, reject) => {
			const auth = getAuth();
			auth.onAuthStateChanged((user) => {
				if (user) {
					resolve({
						success: true,
						data: user,
					});
				} else {
					resolve({
						success: false,
					});
				}
			});
		});
	},
	redirectAuto: () => {
		var is_root = /^\/(?:|index\.aspx?)$/i.test(location.pathname);
		Auth.getCurrentUser().then((user) => {
			if (user.success) {
				if (!is_root) {
					location.href = "/";
				}
			} else {
				if (is_root) {
					location.href = "login.html";
				}
			}
		});
	},
};

export default Auth;
