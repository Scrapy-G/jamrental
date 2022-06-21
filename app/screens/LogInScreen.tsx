import React, { useState } from "react";
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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const validationSchema = Yup.object().shape({
	email: Yup.string().required().email().label("Email"),
	password: Yup.string().required().min(6).label("Password"),
});

const initialValues = {
	email: "",
	name: "",
};

const auth = getAuth();

function LogInScreen() {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>();

	const handleSubmit = async ({ email, password }: any) => {
		setLoading(true);
		setError(null);
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Screen>
			<LoadingScreen backgroundColor='#00000070' visible={loading} />
			<ErrorBanner visible={error} error='Incorrect email/password' />
			<ScrollView style={styles.container}>
				<NavHeader title='Log in' showBackIcon={false} />
				<View style={styles.formContainer}>
					<Form
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						<FormField name='email' placeholder='Email' />
						<FormField
							name='password'
							placeholder='Password'
							secureTextEntry
						/>
						<Text
							underline
							small
							style={{ textAlign: "right", marginVertical: 6 }}
							color={colors.gray300}
						>
							Forgot password?
						</Text>
						<SubmitButton title='Submit' disabled={false} />
					</Form>
					<Link
						to={{ screen: routes.REGISTER, params: {} }}
						style={styles.text}
					>
						<Text style={{ color: colors.gray200 }}>
							Don't have an account?{" "}
						</Text>
						<Text bold underline color={colors.gray200}>
							Sign up
						</Text>
					</Link>
				</View>
			</ScrollView>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 18,
	},
	formContainer: {
		backgroundColor: colors.black,
		borderRadius: 10,
		padding: 16,
		marginVertical: 30,
	},
	text: {
		textAlign: "center",
		marginVertical: 12,
	},
});

export default LogInScreen;
