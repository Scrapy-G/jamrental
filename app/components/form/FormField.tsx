import { View, TextInputProps } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import TextInput from "../TextInput";
import Text from "../Text";
import colors from "../../config/colors";
import ErrorMessage from "./ErrorMessage";

type Props = TextInputProps & {
	label?: string;
	name: string;
	width?: number | "100%";
};

export default function FormField({
	name,
	width = "100%",
	label,
	...rest
}: Props) {
	const { setFieldTouched, handleChange, errors, touched }: any =
		useFormikContext();

	return (
		<View style={styles.container}>
			{label && (
				<Text small style={styles.label}>
					{label}
				</Text>
			)}

			<TextInput
				onBlur={() => setFieldTouched(name)}
				onChangeText={handleChange(name)}
				style={{ width }}
				{...rest}
			/>
			<ErrorMessage error={errors[name]} visible={touched[name]} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 8,
	},
	label: {
		color: colors.gray200,
	},
});
