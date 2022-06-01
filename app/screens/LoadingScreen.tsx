import React from "react";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import Screen from "../components/Screen";
import Text from "../components/Text";
import colors from "../config/colors";
import Loader from "../components/Loader";

type LoadingScreenProps = {
	visible?: boolean;
	backgroundColor?: string;
	label?: string;
};

function LoadingScreen({
	visible = true,
	backgroundColor = colors.black,
	label = "Loading...",
}: LoadingScreenProps) {
	if (!visible) return null;

	return (
		<Screen style={[styles.screen, { backgroundColor }]}>
			<Loader size={150} />
			<Text style={styles.text}>{label}</Text>
		</Screen>
	);
}

const styles = StyleSheet.create({
	screen: {
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		zIndex: 5,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	text: {
		fontSize: 18,
		color: colors.primary,
	},
});

export default LoadingScreen;
