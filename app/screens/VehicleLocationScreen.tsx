import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { LatLng, Marker, Region } from "react-native-maps";
import { geohashForLocation } from "geofire-common";

import Screen from "../components/Screen";
import defaultStyles from "../config/defaultStyles";
import useLocation from "../hooks/useLocation";
import mapConfig from "../config/map";
import Section from "../components/Section";
import getAddress from "../api/address";
import useApi from "../api/useApi";
import AppText from "../components/Text";
import Button from "../components/Button";
import LoadingScreen from "./LoadingScreen";
import Loader from "../components/Loader";
import { updateListing } from "../api/listings";
import routes from "../navigation/routes";

function VehicleLocationScreen({ navigation, route }: any) {
	const { listingRefId } = route.params;

	const addressApi = useApi(getAddress);
	const listingApi = useApi(updateListing);

	const [vehicleAddress, setVehicleAddress] = useState<any>();
	const [vehicleCoords, setVehicleCoords] = useState<LatLng | null>(null);
	const currentLocation = useLocation();

	useEffect(() => {
		if (!vehicleCoords) return;
		addressApi.request(vehicleCoords.latitude, vehicleCoords.longitude);
	}, [vehicleCoords]);

	useEffect(() => {
		loadAddress();
	}, [vehicleCoords]);

	const loadAddress = async () => {
		if (!vehicleCoords) return;
		const response = await addressApi.request(
			vehicleCoords.latitude,
			vehicleCoords.longitude
		);
		const result = await response.json();
		setVehicleAddress(result.features[0].properties);
	};

	const handleNext = async () => {
		if (!vehicleCoords) return;

		const geoHash = geohashForLocation([
			vehicleCoords.latitude,
			vehicleCoords.longitude,
		]);

		const result = await listingApi.request(listingRefId, {
			coordinates: vehicleCoords,
			geoHash,
		});
		if (result) navigation.navigate(routes.ADD_IMAGES, { listingRefId });
	};

	if (!currentLocation) return <LoadingScreen />;

	return (
		<Screen style={styles.container}>
			<MapView
				initialRegion={
					{ ...currentLocation, ...mapConfig.delta } as Region
				}
				style={styles.map}
				customMapStyle={defaultStyles.mapStyles}
				toolbarEnabled={false}
				showsUserLocation
				showsMyLocationButton={false}
				onPress={(e) => {
					console.log("coord", e.nativeEvent);
					setVehicleCoords(e.nativeEvent.coordinate);
				}}
			>
				{vehicleCoords && <Marker coordinate={vehicleCoords} />}
			</MapView>
			<Section title='Vehicle Location'>
				{addressApi.loading ? (
					<Loader size={45} />
				) : (
					(vehicleAddress && (
						<>
							<AppText>
								{vehicleAddress?.address_line1 + ","}
							</AppText>
							<AppText>{vehicleAddress?.address_line2}</AppText>
						</>
					)) || <AppText>Select a location</AppText>
				)}
			</Section>
			<View style={styles.buttonContainer}>
				<Button
					title='Next'
					onPress={handleNext}
					disabled={vehicleCoords === null}
				/>
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height * 0.7,
	},
	buttonContainer: {
		paddingHorizontal: 24,
	},
});

export default VehicleLocationScreen;
