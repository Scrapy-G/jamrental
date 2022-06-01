import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAXH7KCKy3OORIjwNq7_c863nEOSzeAN7s",
	authDomain: "jamrental-9966d.firebaseapp.com",
	projectId: "jamrental-9966d",
	storageBucket: "jamrental-9966d.appspot.com",
	messagingSenderId: "733441877610",
	appId: "1:733441877610:web:54d130f1d768c84130cc13",
	measurementId: "G-X3ZG7SC7LR",
};

const app = initializeApp(firebaseConfig);
const clientDb = getFirestore(app);
const clientStorage = getStorage();
const auth = getAuth(app);

export { clientDb, clientStorage };
