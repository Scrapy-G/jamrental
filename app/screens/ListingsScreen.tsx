import { LatLng } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Dimensions, View } from "react-native";
import * as Location from "expo-location";
import Carousel from "react-native-snap-carousel";
import React, { useState, useEffect, useRef } from "react";

import { Vehicle } from "../types";
import ListItem from "../components/ListItem";
import Map from "../components/map/Map";
import mapStyles from "../config/map";
import routes from "../navigation/routes";
import Text from "../components/Text";
import Screen from "../components/Screen";
import useApi from "../api/useApi";
import { getListings } from "../api/listings";
import Button from "../components/Button";
import Loader from "../components/Loader";
import colors from "../config/colors";
import LoadingScreen from "./LoadingScreen";

function ListingsScreen({ navigation }: any) {
	const {
		data: listings,
		loading,
		request: loadListings,
		error,
	} = useApi(getListings);

	const [mapCoords, setMapCoords] = useState<LatLng>();
	const [areaSearched, setAreaSearched] = useState<boolean>(true);
	const [selectedItemIndex, setItemIndex] = useState<number>(0);
	const [currentLocation, setLocation] = useState<LatLng>();

	const carouselRef = useRef<Carousel<Vehicle>>(null);

	useEffect(() => {
		requestLocationPermission().then((latlng) => loadListings(latlng));
	}, []);

	useEffect(() => {
		carouselRef.current?.snapToItem(selectedItemIndex);
	}, [selectedItemIndex]);

	const requestLocationPermission = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();

		if (status !== "granted") {
			alert("You need to enabled location permission to use this app");
			setLocation(mapStyles.defaultLocation);
		}

		const {
			coords: { longitude, latitude },
		} = await Location.getCurrentPositionAsync();
		setLocation({ longitude, latitude });

		return { longitude, latitude };
	};

	const formatAmount = (n: number) => {
		return "J$" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	if (!currentLocation) return <LoadingScreen />;

	return (
		<Screen>
			<View style={styles.topBar}>
				<Button
					style={styles.searchButton}
					title='Search this area'
					disabled={loading || areaSearched}
					onPress={() => {
						loadListings(mapCoords);
						setAreaSearched(true);
					}}
				/>
			</View>
			<Map
				initialRegion={{ ...currentLocation, ...mapStyles.delta }}
				markerItems={listings}
				selectedMarkerIndex={selectedItemIndex}
				handleMarkerPress={setItemIndex}
				labelExtractor={(item) => formatAmount(item.price)}
				prefix='$'
				onPanDrag={(e) => {
					setMapCoords(e.nativeEvent.coordinate);
					areaSearched && setAreaSearched(false);
				}}
			/>
			<LinearGradient
				colors={["transparent", colors.black]}
				style={styles.listingsContainer}
			>
				{loading && <Loader size={100} />}
				{listings && (
					<Carousel
						ref={carouselRef}
						data={listings}
						renderItem={({ item, index }) => (
							<ListItem
								key={index}
								image={item.thumbnail}
								rating={item.rating}
								subTitle={formatAmount(item.price)}
								title={
									item.make +
									" " +
									item.model +
									" " +
									item.year
								}
								onPress={() => {
									console.log("press");
									navigation.navigate(
										routes.LISTING_DETAILS,
										item
									);
								}}
							/>
						)}
						sliderWidth={Dimensions.get("window").width}
						itemWidth={295}
						swipeThreshold={10}
						lockScrollWhileSnapping
						onSnapToItem={setItemIndex}
						enableMomentum
					/>
				)}
				{listings?.length === 0 && (
					<Text style={styles.message}>No rentals in this area.</Text>
				)}
			</LinearGradient>
		</Screen>
	);
}

const styles = StyleSheet.create({
	filterButton: {
		marginLeft: 10,
		borderWidth: 0,
	},
	listingsContainer: {
		width: "100%",
		justifyContent: "center",
		position: "absolute",
		bottom: 0,
		zIndex: 100,
		alignItems: "center",
	},
	searchButton: {
		width: 200,
	},
	topBar: {
		width: "100%",
		position: "absolute",
		alignItems: "center",
		zIndex: 1,
		top: 10,
	},
	message: {
		marginVertical: 10,
	},
});

export default ListingsScreen;
