import {
	StyleSheet,
	TouchableNativeFeedback,
	View,
	ViewStyle,
} from "react-native";
import React from "react";

import Text from "./Text";
import colors from "../config/colors";

type Props = {
	title: string;
	onPress: (event?: any) => void;
	style?: ViewStyle;
	disabled?: boolean;
};

export default function Button({
	disabled = false,
	title,
	onPress,
	style,
}: Props) {
	return (
		<TouchableNativeFeedback
			onPress={() => {
				if (!disabled) onPress();
			}}
		>
			<View
				style={[
					styles.button,
					{
						backgroundColor: disabled
							? colors.primaryDark
							: colors.primary,
					},
					style,
				]}
			>
				<Text bold style={styles.text}>
					{title}
				</Text>
			</View>
		</TouchableNativeFeedback>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		borderRadius: 10,
		justifyContent: "center",
		marginVertical: 5,
		paddingHorizontal: 32,
		width: "100%",
		height: 48,
	},
	text: {
		color: colors.black,
		textTransform: "uppercase",
	},
});
