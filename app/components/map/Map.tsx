import React, { useEffect, useRef } from "react";
import MapView, { MapViewProps, Marker } from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";

import mapStyle from "../../config/mapStyles.json";
import TextMarker from "./TextMarker";
import { Vehicle } from "../../types";

type MapProps = MapViewProps & {
	markerItems: Vehicle[];
	prefix: string;
	labelExtractor: (arg: Vehicle) => number | string;
	handleMarkerPress: (arg: number) => void;
	selectedMarkerIndex: number;
};

function Map({
	markerItems,
	labelExtractor,
	prefix,
	handleMarkerPress,
	selectedMarkerIndex,
	...rest
}: MapProps) {
	const mapRef = useRef<MapView>(null);

	useEffect(() => {
		if (!markerItems) return;
		const camera = {
			center: markerItems[selectedMarkerIndex].coordinates,
		};
		mapRef.current?.animateCamera(camera, { duration: 200 });
	}, [selectedMarkerIndex]);

	return (
		<MapView
			style={styles.map}
			customMapStyle={mapStyle}
			toolbarEnabled={false}
			showsUserLocation
			showsMyLocationButton={false}
			{...rest}
			ref={mapRef}
		>
			{markerItems?.map((item: any, i: number) => (
				<Marker
					key={i}
					coordinate={item.coordinates}
					onPress={() => handleMarkerPress(i)}
				>
					<TextMarker
						title={labelExtractor(item)}
						highlight={i === selectedMarkerIndex}
					/>
				</Marker>
			))}
		</MapView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});

export default Map;
