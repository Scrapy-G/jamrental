import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./Text";

type Props = {
	rating: number;
	style?: any;
};

export default function CardRating({ rating, style }: Props) {
	return (
		<View style={[styles.container, style]}>
			<AntDesign name='star' size={10} color='white' />
			<AppText style={styles.text} weight='bold'>
				{rating.toPrecision(2)}
			</AppText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.orange,
		borderRadius: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: 18,
		width: 42,
	},
	text: {
		fontSize: 12,
		color: "white",
		marginLeft: 2,
	},
});
