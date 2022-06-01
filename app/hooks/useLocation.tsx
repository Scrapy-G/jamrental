import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { LatLng } from "react-native-maps";
import mapConfig from "../config/map";

const useLocation = () => {
	const [currentLocation, setLocation] = useState<LatLng>();

	useEffect(() => {
		requestPermission();
	}, []);

	const requestPermission = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();

		if (status !== "granted") {
			alert("You need to enabled location permission to use this app");
			setLocation(mapConfig.defaultLocation);
		}

		const {
			coords: { longitude, latitude },
		} = await Location.getCurrentPositionAsync();
		setLocation({ longitude, latitude });
	};

	return currentLocation;
};

export default useLocation;
