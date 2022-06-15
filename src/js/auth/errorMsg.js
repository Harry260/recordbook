var errorMessages = {
	"auth/invalid-email": "Invalid email address",
	"auth/user-not-found": "User not found",
	"auth/wrong-password": "Wrong password",
	"auth/email-already-in-use": "Email already in use",
	"auth/weak-password": "Weak password",
	"auth/network-request-failed": "Network request failed",
	"auth/user-disabled": "User disabled",
	"auth/user-token-expired": "User token expired",
};

function getErrorMsg(errorCode) {
	return errorMessages[errorCode] || "Unknown error ocurred!";
}

export default getErrorMsg;
