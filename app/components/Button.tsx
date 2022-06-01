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
							? colors.gray700
							: colors.primary,
					},
					style,
				]}
			>
				<Text
					bold
					style={{ color: disabled ? colors.gray200 : colors.white }}
				>
					{title}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		borderRadius: 30,
		justifyContent: "center",
		marginVertical: 5,
		paddingVertical: 12,
		paddingHorizontal: 32,
		width: "100%",
		height: 55,
	},
});
