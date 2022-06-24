import React from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import Picker from "../Picker";
import Text from "../Text";
import colors from "../../config/colors";
import ErrorMessage from "./ErrorMessage";
import { PickerItem } from "../../types";

type FormPickerProps = {
	label?: string;
	name: string;
	width?: number | "100%";
	items: PickerItem[];
	placeholder: string;
};

function FormPicker({
	placeholder,
	items,
	name,
	width = "100%",
	label,
}: FormPickerProps) {
	const { setFieldTouched, handleChange, errors, touched }: any =
		useFormikContext();

	return (
		<View style={styles.container}>
			{label && (
				<Text small style={styles.label}>
					{label}
				</Text>
			)}
			<Picker
				items={items}
				onValueChange={handleChange(name)}
				prompt={placeholder}
				width={width}
				onBlur={() => setFieldTouched(true)}
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
		marginBottom: 8,
	},
});

export default FormPicker;
