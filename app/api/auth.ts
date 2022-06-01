import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

type User = {
	email: string;
	password: string;
};

const auth = getAuth();

const registerUser = async ({ email, password }: User) => {
	return await createUserWithEmailAndPassword(auth, email, password);
};

const logIn = async (email: string, password: string) => {
	return await signInWithEmailAndPassword(auth, email, password);
};

const logOut = async () => {
	return signOut(auth);
};

export { registerUser, logOut, logIn };
