import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";

import Screen from "../components/Screen";
import useApi from "../api/useApi";
import { getFeatures } from "../api/features";
import NavHeader from "../navigation/NavHeader";
import CheckList from "../components/CheckList";
import { Feature } from "../types";
import Button from "../components/Button";
import { updateListing } from "../api/listings";
import routes from "../navigation/routes";
import LoadingScreen from "./LoadingScreen";

function AddFeaturesScreen({ navigation, route }: any) {
	const { listingRefId } = route.params;
	const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);

	const {
		data: allFeatures,
		error: getFeaturesError,
		request: loadFeatures,
		loading: featuresLoading,
	} = useApi(getFeatures);

	const {
		data: result,
		error: updateError,
		request: saveFeatures,
		loading: savingFeatures,
	} = useApi(updateListing);

	useEffect(() => {
		loadFeatures();
	}, []);

	if (featuresLoading || savingFeatures || !allFeatures)
		return <LoadingScreen />;

	const handleSubmit = async () => {
		console.log("submitted");
		await saveFeatures(listingRefId, { features: selectedFeatures });
		navigation.navigate(routes.VEHICLE_LOCATION, { listingRefId });
	};

	return (
		<Screen>
			<ScrollView style={styles.container}>
				<NavHeader title='Features' />

				<View style={styles.listContainer}>
					<CheckList
						items={allFeatures}
						selectedItems={selectedFeatures}
						onAddItem={(item) =>
							setSelectedFeatures([...selectedFeatures, item])
						}
						onRemoveItem={(item) =>
							setSelectedFeatures(
								selectedFeatures.filter(
									(feature) => feature.name !== item.name
								)
							)
						}
					/>
				</View>

				<Button
					style={styles.button}
					title='Next'
					onPress={handleSubmit}
					disabled={selectedFeatures.length === 0}
				/>
			</ScrollView>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 12,
		paddingBottom: 24,
	},
	button: {
		marginVertical: 24,
	},
	listContainer: {
		marginTop: 50,
	},
});

export default AddFeaturesScreen;
