import { LatLng } from "react-native-maps";

export type Feature = {
	name: string;
	icon: string;
};

export type Features = {
	airCondition?: boolean;
	keylessEntry?: boolean;
};

export type Vehicle = {
	make: string;
	model: string;
	features: Feature[];
	fuel: "premium" | "regular";
	image: string;
	coordinates: LatLng;
	price: number;
	rating: number;
	seats: number;
	thumbnail: string;
	images: string[];
	type: "manual" | "automatic";
	provider: User;
	year: number;
};

export type PickerItem = {
	label: string;
	value: string;
};

export type User = {
	email: string;
	name: string;
};
