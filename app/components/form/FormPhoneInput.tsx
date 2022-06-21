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
		<View>
			{label && (
				<Text small style={styles.label}>
					{label}
				</Text>
			)}
			<PhoneInput
				defaultCode='JM'
				layout='first'
				onChangeFormattedText={handleTextChange}
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
					{ borderColor: focused ? colors.primary : colors.gray300 },
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
		marginRight: 10,
		color: colors.gray200,
		height: 40,
		textAlignVertical: "center",
	},
	inputContainer: {
		backgroundColor: "transparent",
		width: "100%",
		height: 50,
		borderBottomWidth: 1,
	},
	countryPicker: {
		width: 30,
		height: 30,
		marginRight: 0,
		marginTop: 8,
		backgroundColor: colors.gray300,
		paddingLeft: 10,
		borderRadius: 20,
	},
	textContainer: {
		backgroundColor: "transparent",
	},
	textInput: {
		color: colors.white,
		height: 40,
	},
	label: {
		color: colors.gray200,
	},
});

export default FormPhoneInput;
