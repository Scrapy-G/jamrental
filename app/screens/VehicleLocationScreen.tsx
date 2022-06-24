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
import Text from "../components/Text";
import Button from "../components/Button";
import LoadingScreen from "./LoadingScreen";
import { updateListing } from "../api/listings";
import routes from "../navigation/routes";
import colors from "../config/colors";

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

	const handleLocationChange = async (coordinates: LatLng) => {
		setVehicleCoords(coordinates);
		const addressResult: any = await addressApi.request(coordinates);
		if (addressApi.error) return;
		// console.log(addressResult.features[0].properties);
		setVehicleAddress(addressResult.features[0].properties);
	};

	const handleNext = async () => {
		if (!vehicleCoords) return;

		const geoHash = geohashForLocation([
			vehicleCoords.latitude,
			vehicleCoords.longitude,
		]);

		await listingApi.request(listingRefId, {
			coordinates: vehicleCoords,
			geoHash,
		});

		navigation.navigate(routes.ADD_IMAGES, { listingRefId });
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
					console.log("coord", e.nativeEvent.coordinate);
					handleLocationChange(e.nativeEvent.coordinate);
				}}
			>
				{vehicleCoords && <Marker coordinate={vehicleCoords} />}
			</MapView>
			<Section title='Vehicle Location'>
				{addressApi.loading ? (
					<Text color={colors.gray300}>Loading...</Text>
				) : (
					(vehicleAddress && (
						<>
							<Text>{vehicleAddress?.address_line1 + ","}</Text>
							<Text>{vehicleAddress?.address_line2}</Text>
						</>
					)) || <Text color={colors.gray300}>Select a location</Text>
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
