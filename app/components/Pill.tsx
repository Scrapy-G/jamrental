import React from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	ViewStyle,
} from "react-native";

import Text from "./Text";
import colors from "../config/colors";

type PillProps = {
	active?: boolean;
	onPress: (arg: string) => void;
	title: string;
	style?: ViewStyle;
};

function Pill({ active = false, title, onPress, style }: PillProps) {
	return (
		<TouchableWithoutFeedback onPress={() => onPress(title)}>
			<View
				style={[
					styles.container,
					style,
					{
						backgroundColor: active ? colors.white : colors.gray700,
					},
				]}
			>
				<Text style={{ color: active ? colors.black : colors.gray200 }}>
					{title}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		borderRadius: 20,
		height: 35,
		justifyContent: "center",
		width: 100,
	},
});

export default Pill;
