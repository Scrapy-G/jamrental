import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Image } from "react-native-expo-image-cache";
import Carousel from "react-native-snap-carousel";

type ImageCarouselProps = {
	images: string[];
};
function ImageCarousel({ images }: ImageCarouselProps) {
	return (
		<View>
			<Carousel
				data={images}
				renderItem={({ item: imageUri, index }) => (
					<Image style={styles.image} key={index} uri={imageUri} />
				)}
				sliderWidth={Dimensions.get("window").width}
				itemWidth={Dimensions.get("window").width}
				sliderHeight={300}
				activeSlideOffset={50}
				lockScrollWhileSnapping
				decelerationRate={0}
				autoplay
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		height: 300,
		resizeMode: "contain",
	},
	imageContainer: {},
});

export default ImageCarousel;
