import { TextInputProps } from "react-native";
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
				{ borderColor: focused ? colors.primary : colors.gray300 },
				styles.input,
				style,
			]}
			{...rest}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			selectionColor={colors.primary}
		/>
	);
}

const styles = StyleSheet.create({
	container: {},
	input: {
		borderBottomWidth: 1,
		width: "100%",
		color: colors.white,
		height: 50,
		alignItems: "center",
		marginVertical: 4,
		paddingVertical: 8,
		...defaultStyles.text,
	},
	label: {
		color: colors.gray200,
	},
});
