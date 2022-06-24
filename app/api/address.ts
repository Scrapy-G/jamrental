import { LatLng } from "react-native-maps";

const getAddress = async (coordinates: LatLng) => {
	const endpoint = "https://api.geoapify.com/v1/geocode/reverse?";
	const key = "310e3ad74eb24148a720b9860f02f35a";

	const result = await fetch(
		`${endpoint}lat=${coordinates.latitude}&lon=${coordinates.longitude}&apiKey=${key}`
	);

	return await result.json();
};

export default getAddress;
