import { getAuth, updateProfile } from "firebase/auth";

type User = {
	displayName?: string;
	email?: string;
	photoURL?: string;
};

const updateUser = async (userInfo: User) => {
	const auth = getAuth();

	if (auth.currentUser === null) return;

	return await updateProfile(auth.currentUser, userInfo);
	// return new Promise((resolve, reject) => {
	// 	setTimeout(() => {
	// 		resolve("anything");
	// 	}, 2000);
	// });
};

export { updateUser };
