import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";
import Rating from "./rating/Rating";

type ListItem = {
	title: string;
	image: string;
	rating: number;
	subTitle: number | string;
	onPress: () => void;
};
function ListItem({ title, image, rating, subTitle, onPress }: ListItem) {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<Image style={styles.image} uri={image} />
				<View style={styles.detailsContainer}>
					<Text style={styles.title} bold numberOfLines={1}>
						{title}
					</Text>
					<Rating value={rating} color={colors.primary} />
					<View style={styles.textContainer}>
						<Text bold>{subTitle}</Text>
						<Text style={styles.subText}>/ per day</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 300,
		height: 90,
		backgroundColor: colors.gray400,
		borderRadius: 16,
		flexDirection: "row",
		overflow: "hidden",
	},
	detailsContainer: {
		flex: 1,
		padding: 12,
	},
	image: {
		height: 90,
		width: 90,
	},
	subText: {
		fontSize: 12,
		color: colors.gray200,
		marginLeft: 6,
	},
	textContainer: {
		marginTop: 6,
		flexDirection: "row",
		alignItems: "flex-end",
	},
	title: {
		marginBottom: 4,
	},
});

export default ListItem;
