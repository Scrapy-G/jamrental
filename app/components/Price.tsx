import React from "react";
import { View, StyleSheet } from "react-native";

import Text from "./Text";
import colors from "../config/colors";

type PriceProps = {
	price: string | number;
	fontSize?: number;
};

function Price({ price, fontSize = 16 }: PriceProps) {
	return (
		<View style={styles.container}>
			<Text style={{ fontSize }} bold>
				{price}
			</Text>
			<Text style={{ fontSize: fontSize * 0.7 }} color={colors.gray200}>
				/ per day
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "flex-end",
	},
});

export default Price;
