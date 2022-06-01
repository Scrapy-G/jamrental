import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";

import Text from "../Text";

type TextMarkerProps = {
	title: string | number;
	highlight?: boolean;
};

function TextMarker({ title, highlight = false }: TextMarkerProps) {
	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: highlight ? colors.black : colors.white,
					borderColor: highlight ? colors.primary : colors.black,
				},
			]}
		>
			<Text
				bold
				style={{ color: highlight ? colors.white : colors.black }}
			>
				{title}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 12,
		justifyContent: "center",
		height: 30,
		borderRadius: 5,
		borderWidth: 1,
	},
});

export default TextMarker;
