import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import Form from "../components/form/Form";
import Screen from "../components/Screen";
import * as Yup from "yup";

import FormField from "../components/form/FormField";
import SubmitButton from "../components/form/SubmitButton";
import NavHeader from "../navigation/NavHeader";
import useApi from "../api/useApi";
import { registerUser } from "../api/auth";
import { updateUser } from "../api/profile";
import LoadingScreen from "./LoadingScreen";
import Text from "../components/Text";
import colors from "../config/colors";
import { Link } from "@react-navigation/native";
import routes from "../navigation/routes";
import { useAuth } from "../auth/context";
import ErrorBanner from "../components/ErrorBanner";

const validationSchema = Yup.object().shape({
	name: Yup.string().required().label("Name"),
	email: Yup.string().required().email().label("Email"),
	password: Yup.string().required().min(6).label("Password"),
});

const initialValues = {
	email: "",
	name: "",
	password: "",
};

type LoginProperties = {
	email: string;
	password: string;
	name: string;
};

function RegisterScreen() {
	const authApi = useApi(registerUser);
	const profileApi = useApi(updateUser);
	const { setUser } = useAuth();

	const handleSubmit = async (newUser: LoginProperties) => {
		const userCredential = await authApi.request(newUser);
		await profileApi.request({ displayName: newUser.name });
		setUser(userCredential.user);
	};

	return (
		<Screen style={styles.screen}>
			<LoadingScreen
				backgroundColor='#00000070'
				visible={authApi.loading || profileApi.loading}
				label=''
			/>
			<ErrorBanner
				visible={authApi.error}
				error='Something went wrong. Try again later'
			/>
			<ScrollView>
				<NavHeader title='Register' showBackIcon={false} />
				<Form
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					<FormField label='Name' name='name' placeholder='Name' />
					<FormField label='Email' name='email' placeholder='Email' />
					<FormField
						label='Password'
						name='password'
						placeholder='Password'
						secureTextEntry
					/>
					<SubmitButton title='Submit' disabled={false} />
				</Form>
				<Link
					to={{ screen: routes.LOGIN, params: {} }}
					style={styles.text}
				>
					<Text>Already have an account? </Text>
					<Text style={{ color: colors.primary }}>Log in</Text>
				</Link>
			</ScrollView>
		</Screen>
	);
}

const styles = StyleSheet.create({
	screen: {
		paddingHorizontal: 12,
	},
	text: {
		textAlign: "center",
		marginTop: 12,
	},
});

export default RegisterScreen;
