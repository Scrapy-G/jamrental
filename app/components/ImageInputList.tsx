import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import ImageInput from "./ImageInput";

type ImageImputListProps = {
	imageUris: string[];
	onAddImage: (arg: string | null) => void;
	onRemoveImage: (arg: string) => void;
};

function ImageInputList({
	imageUris = [],
	onAddImage,
	onRemoveImage,
}: ImageImputListProps) {
	const scrollViewRef = useRef<ScrollView>(null);

	return (
		<View>
			<ScrollView
				horizontal
				ref={scrollViewRef}
				onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
			>
				<View style={styles.container}>
					{imageUris.map((imageUri, i) => (
						<ImageInput
							key={i}
							imageUri={imageUri}
							onChangeImage={() => onRemoveImage(imageUri)}
						/>
					))}
					<ImageInput onChangeImage={onAddImage} />
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
});

export default ImageInputList;
