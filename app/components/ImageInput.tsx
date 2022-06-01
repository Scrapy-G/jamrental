import React, { useEffect } from "react";
import {
	View,
	StyleSheet,
	TouchableNativeFeedback,
	Image,
	Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";

type ImageInputProps = {
	imageUri?: string;
	onChangeImage: (arg: string | null) => void;
};
function ImageInput({ imageUri, onChangeImage }: ImageInputProps) {
	useEffect(() => {
		requestPermission();
	}, []);

	const requestPermission = async () => {
		const { granted } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!granted) alert("You need to enable permission to continue");
	};

	const handlePress = () => {
		if (!imageUri) selectImage();
		else
			Alert.alert(
				"Delete",
				"Are you sure you want to remove this image?",
				[
					{ text: "Yes", onPress: () => onChangeImage(null) },
					{ text: "No" },
				]
			);
	};

	const selectImage = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 0.5,
			});

			if (!result.cancelled) onChangeImage(result.uri);
		} catch (error) {
			console.log("error reading image", error);
		}
	};

	return (
		<TouchableNativeFeedback onPress={handlePress}>
			<View style={styles.container}>
				{(imageUri && (
					<Image style={styles.image} source={{ uri: imageUri }} />
				)) || (
					<MaterialCommunityIcons
						name='camera'
						size={30}
						color={colors.gray200}
					/>
				)}
			</View>
		</TouchableNativeFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 8,
		width: 120,
		height: 120,
		backgroundColor: colors.gray700,
		margin: 5,
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
	},
	image: {
		height: "100%",
		width: "100%",
	},
});

export default ImageInput;
