import { View, ViewStyle, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

import colors from "../../config/colors";
import Text from "../Text";

type RatingProps = {
	value: number;
	color?: string;
	style?: ViewStyle;
	fontSize?: number;
};

export default function Rating({
	value,
	color = "white",
	style,
	fontSize = 13,
}: RatingProps) {
	return (
		<View style={[{ flexDirection: "row" }, style]}>
			{value ? (
				<>
					<FontAwesome name='star' color={color} size={fontSize} />
					<Text style={{ color, marginLeft: 3, fontSize }} bold>
						{value}
					</Text>
				</>
			) : (
				<Text style={styles.text}>No ratings</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 12,
		color: colors.gray200,
	},
});
