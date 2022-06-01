import { GEOAPIFY_API_KEY as key } from "@env";

const endpoint = "https://api.geoapify.com/v1/geocode/reverse?";

console.log("key", key);
const getAddress = async (latitude: number, longitude: number) => {
	return fetch(`${endpoint}lat=${latitude}&lon=${longitude}&apiKey=${key}`);
};

export default getAddress;
