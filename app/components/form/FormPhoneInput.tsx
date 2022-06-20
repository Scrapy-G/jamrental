import { useFormikContext } from "formik";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import colors from "../../config/colors";
import Text from "../Text";
import ErrorMessage from "./ErrorMessage";

type FormPhoneInputProps = {
	label?: string;
	name: string;
};

function FormPhoneInput({ label, name }: FormPhoneInputProps) {
	const [focused, setFocused] = useState<boolean>(false);
	const { setFieldTouched, handleChange, errors, touched }: any =
		useFormikContext();

	const handleTextChange = (text: string) => {
		handleChange(name)(text);
	};

	return (
		<View style={styles.container}>
			{label && (
				<Text small style={styles.label}>
					{label}
				</Text>
			)}
			<PhoneInput
				defaultCode='JM'
				layout='second'
				onChangeText={handleTextChange}
				textInputProps={{
					placeholderTextColor: colors.gray300,
					onFocus: () => setFocused(true),
					onBlur: () => {
						setFocused(false);
						setFieldTouched(name);
					},
					selectionColor: colors.primary,
				}}
				disableArrowIcon
				withDarkTheme
				containerStyle={[
					styles.inputContainer,
					{ borderColor: focused ? colors.primary : colors.gray700 },
				]}
				textInputStyle={styles.textInput}
				textContainerStyle={styles.textContainer}
				countryPickerButtonStyle={styles.countryPicker}
				codeTextStyle={styles.codeTextStyle}
			/>
			<ErrorMessage error={errors[name]} visible={touched[name]} />
		</View>
	);
}

const styles = StyleSheet.create({
	codeTextStyle: {
		marginRight: 0,
		color: colors.gray200,
	},
	container: {
		marginVertical: 8,
	},
	inputContainer: {
		backgroundColor: colors.gray700,
		borderRadius: 15,
		width: "100%",
		overflow: "hidden",
		marginVertical: 8,
		borderWidth: 2,
		height: 60,
	},
	countryPicker: {
		width: 70,
		justifyContent: "flex-end",
		padding: 0,
	},
	textContainer: {
		backgroundColor: colors.gray700,
	},
	textInput: {
		color: colors.white,
	},
	label: {
		color: colors.gray200,
	},
});

export default FormPhoneInput;
