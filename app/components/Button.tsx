import {
	StyleSheet,
	TouchableWithoutFeedback,
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
		<TouchableWithoutFeedback
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
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		borderRadius: 10,
		justifyContent: "center",
		marginVertical: 5,
		paddingVertical: 12,
		paddingHorizontal: 32,
		width: "100%",
		height: 55,
	},
	text: {
		color: colors.black,
		textTransform: "uppercase",
	},
});
