import { View, TextInputProps, TextStyle } from "react-native";
import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

import defaultStyles from "../config/defaultStyles";

const { colors } = defaultStyles;

type InputProps = TextInputProps & {
	style?: any;
};

export default function AppTextInput({ style, ...rest }: InputProps) {
	const [focused, setFocused] = useState<boolean>(false);

	return (
		<TextInput
			placeholderTextColor={colors.gray300}
			style={[
				{ borderColor: focused ? colors.primary : colors.gray700 },
				styles.input,
				style,
			]}
			{...rest}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
		/>
	);
}

const styles = StyleSheet.create({
	container: {},
	input: {
		width: "100%",
		color: colors.white,
		height: 55,
		alignItems: "center",
		backgroundColor: colors.gray700,
		borderRadius: 15,
		borderWidth: 2,
		marginVertical: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
		...defaultStyles.text,
	},
	label: {
		color: colors.gray200,
	},
});
