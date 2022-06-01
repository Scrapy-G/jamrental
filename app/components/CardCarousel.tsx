import React from "react";
import { View, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

function CardCarousel({ items, renderItem, ...rest }) {
	return (
		<Carousel
			data={items}
			renderItem={renderItem}
			sliderWidth={500}
			itemWidth={300}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default CardCarousel;
