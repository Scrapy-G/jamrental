import React, { useState } from "react";
import { StyleSheet } from "react-native";

import useApi from "../api/useApi";
import Button from "../components/Button";
import ImageInputList from "../components/ImageInputList";
import Screen from "../components/Screen";
import NavHeader from "../navigation/NavHeader";
import { commitListing, uploadImages } from "../api/listings";
import LoadingScreen from "./LoadingScreen";

function AddImagesScreen({ navigation, route }: any) {
	const [imageUris, setImageUris] = useState<string[]>([]);
	const { listingRefId } = route.params;

	const {
		data,
		error,
		request: uploadAllImages,
		loading: savingImages,
	} = useApi(uploadImages);

	const {
		data: listingSaved,
		error: saveListingError,
		request: saveListing,
		loading: savingListing,
	} = useApi(commitListing);

	const handleSubmit = async () => {
		if (savingImages || savingListing) return;

		const uploadedImages = await uploadAllImages(listingRefId, imageUris);
		if (!uploadedImages) return;

		const result = await saveListing();
		if (!result) return;
		navigation.popToTop();
	};

	if (savingImages || savingListing) return <LoadingScreen />;

	return (
		<Screen style={styles.screen}>
			<NavHeader title='Images' />
			<ImageInputList
				imageUris={imageUris}
				onAddImage={(uri) => uri && setImageUris([...imageUris, uri])}
				onRemoveImage={(uri) =>
					setImageUris(
						imageUris.filter((imageUri) => imageUri !== uri)
					)
				}
			/>
			<Button
				style={styles.nextButton}
				title='Finish'
				onPress={handleSubmit}
				disabled={
					imageUris.length === 0 || savingImages || savingListing
				}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({
	screen: {
		paddingHorizontal: 12,
	},
	nextButton: {
		position: "absolute",
		bottom: 24,
		left: 12,
	},
});

export default AddImagesScreen;
