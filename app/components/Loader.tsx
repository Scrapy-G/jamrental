import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

import Screen from "./Screen";
import Text from "./Text";
import colors from "../config/colors";

type LoaderProps = {
	size: number;
};

function Loader({ size }: LoaderProps) {
	return (
		<View style={styles.container}>
			<LottieView
				autoPlay
				style={{
					width: size,
					height: size,
				}}
				source={require("../../assets/loader.json")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 18,
		color: colors.primary,
	},
});

export default Loader;
