import React, { useRef } from "react";
import { StyleSheet, ScrollView, View, TextInput } from "react-native";
import Form from "../components/form/Form";
import Screen from "../components/Screen";
import * as Yup from "yup";

import FormField from "../components/form/FormField";
import SubmitButton from "../components/form/SubmitButton";
import Text from "../components/Text";
import colors from "../config/colors";
import routes from "../navigation/routes";
import FormPhoneInput from "../components/form/FormPhoneInput";
import NavHeader from "../navigation/NavHeader";

const validationSchema = Yup.object().shape({
	email: Yup.string().email().required().trim().label("Email"),
	name: Yup.string().required().trim().label("Name"),
	password: Yup.string().required().min(6).label("Password"),
	phoneNumber: Yup.string()
		.required()
		.matches(/\+[0-9]{7,}/, "Phone number invalid")
		.label("Phone number"),
});

const initialValues = {
	phoneNumber: "",
	name: "",
	password: "",
	email: "",
};

type UserLoginInfo = {
	password: string;
	name: string;
	phoneNumber: number;
	email: string;
};

function RegisterScreen({ navigation, route }: any) {
	const emailRef = useRef();
	const nameRef = useRef<TextInput>(null);

	const handleSubmit = async (newUser: UserLoginInfo) => {
		navigation.navigate(routes.VERIFY_PHONE, {
			loginInfo: newUser,
		});
	};

	return (
		<Screen>
			<ScrollView style={styles.container}>
				<NavHeader title='Create an Account' />
				<View style={styles.formContainer}>
					<Form
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						<FormPhoneInput name='phoneNumber' />
						<FormField name='email' placeholder='Email' returnKeyType="next"/>
						<FormField name='name' placeholder='Name' />
						<FormField
							name='password'
							placeholder='Password'
							secureTextEntry
						/>
						<SubmitButton title='Sign up' disabled={false} />
					</Form>
					<Text color={colors.gray300} small style={styles.text}>
						By continuing you agree to receive SMS at this phone
						number
					</Text>
				</View>
			</ScrollView>
		</Screen>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		backgroundColor: colors.black,
		borderRadius: 10,
		padding: 16,
		marginVertical: 30,
	},
	container: {
		paddingHorizontal: 16,
		paddingBottom: 12,
	},
	text: {
		textAlign: "center",
		marginVertical: 12,
	},
});

export default RegisterScreen;
