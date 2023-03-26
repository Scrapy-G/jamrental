import { LatLng } from "react-native-maps";
import config from "../config/api";

const getAddress = async (coordinates: LatLng) => {
	const endpoint = "https://api.geoapify.com/v1/geocode/reverse?";
	const key = config.geoapifyKey;

	const result = await fetch(
		`${endpoint}lat=${coordinates.latitude}&lon=${coordinates.longitude}&apiKey=${key}`
	);

	return await result.json();
};

export default getAddress;
