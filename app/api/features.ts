import { clientDb } from "./client";
import { getDocs, collection, doc, addDoc } from "firebase/firestore";

const endpoint = "features";
const getFeatures = async () => {
	const querySnapshot = await getDocs(collection(clientDb, "features"));
	const results: any[] = [];
	querySnapshot.forEach((doc) => {
		results.push(doc.data());
	});
	return results;
};

export { getFeatures };

const features = [
	{
		name: "Air condition",
		icon: "snow-outline",
	},
	{
		name: "Keyless entry",
		icon: "lock-open-outline",
	},
	{
		name: "USB charger",
		icon: "flash-outline",
	},
	{
		name: "Bluetooth",
		icon: "bluetooth-outline",
	},
	{
		name: "AUX input",
		icon: "volume-low-outline",
	},
	{
		name: "Blind spot warning",
		icon: "radio-outline",
	},
	{
		name: "Backup camera",
		icon: "videocam-outline",
	},
];
const initFeatures = async () => {
	features.forEach((feature) => {
		addDoc(collection(clientDb, endpoint), feature);
	});
};

// initFeatures();
