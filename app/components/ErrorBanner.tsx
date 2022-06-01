import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../config/colors";
import AppText from "./Text";

type ErrorBannerProps = {
	visible: boolean;
	error: string;
};
function ErrorBanner({ visible, error }: ErrorBannerProps) {
	if (!visible) return null;

	return (
		<View style={styles.container}>
			<AppText style={styles.text}>{error}</AppText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: -10,
		width: Dimensions.get("window").width,
		height: 30,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#df5050",
	},
	text: {
		color: colors.white,
		fontSize: 14,
	},
});

export default ErrorBanner;
