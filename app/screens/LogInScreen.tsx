import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";

import Form from "../components/form/Form";
import Screen from "../components/Screen";
import FormField from "../components/form/FormField";
import SubmitButton from "../components/form/SubmitButton";
import NavHeader from "../navigation/NavHeader";
import Text from "../components/Text";
import { Link } from "@react-navigation/native";
import routes from "../navigation/routes";
import colors from "../config/colors";
import useApi from "../api/useApi";
import { logIn } from "../api/auth";
import { useAuth } from "../auth/context";
import ErrorBanner from "../components/ErrorBanner";
import LoadingScreen from "./LoadingScreen";

const validationSchema = Yup.object().shape({
	email: Yup.string().required().email().label("Email"),
	password: Yup.string().required().min(6).label("Password"),
});

const initialValues = {
	email: "",
	name: "",
};

function LogInScreen() {
	const authApi = useApi(logIn);
	const { setUser } = useAuth();

	const handleSubmit = async ({ email, password }: any) => {
		const userCredentials = await authApi.request(email, password);
		const user = userCredentials;
		if (user) setUser(user);
	};

	return (
		<Screen style={styles.screen}>
			<LoadingScreen
				backgroundColor='#00000070'
				visible={authApi.loading}
				label=''
			/>
			<ErrorBanner
				visible={authApi.error}
				error='Incorrect email/password'
			/>
			<ScrollView>
				<NavHeader title='Log in' showBackIcon={false} />
				<Form
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
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
					to={{ screen: routes.REGISTER, params: {} }}
					style={styles.text}
				>
					<Text>Don't have an account? </Text>
					<Text style={{ color: colors.primary }}>Sign up</Text>
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

export default LogInScreen;
