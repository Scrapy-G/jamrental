import React, { ErrorInfo, useEffect, useRef, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import Form from "../components/form/Form";
import Screen from "../components/Screen";
import * as Yup from "yup";
import {
	getAuth,
	PhoneAuthProvider,
	signInWithCredential,
} from "firebase/auth";
import { initializeApp, getApp } from "firebase/app";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

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
import FormPhoneInput from "../components/form/FormPhoneInput";
import { ErrorData } from "@firebase/util";

const validationSchema = Yup.object().shape({
	name: Yup.string().required().label("Name"),
	password: Yup.string().required().min(6).label("Password"),
	phoneNumber: Yup.number()
		.required()
		.min(10000000, "Invalid phone number")
		.max(99999999999, "Invalid phone number")
		.label("Phone number"),
});

const initialValues = {
	phoneNumber: "",
	name: "",
	password: "",
};

type LoginProperties = {
	password: string;
	name: string;
	phoneNumber: number;
};

const app = getApp();
const auth = getAuth();

function RegisterScreen({ navigation, route }: any) {
	const { code } = route.params;
	const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
	const [verificationId, setVerificationId] = useState<string>("");

	useEffect(() => {
		if (code) {
			console.log(code);
			verifyCode(code);
		}
	}, [code, navigation]);

	const verifyCode = async (verificationCode: string) => {
		console.log("verifying");
		try {
			const credential = PhoneAuthProvider.credential(
				verificationId,
				verificationCode
			);
			await signInWithCredential(auth, credential);
			console.log({ text: "Phone authentication successful 👍" });
		} catch (err: any) {
			console.log({ text: `Error: ${err.message}`, color: "red" });
		}
	};

	const sendVerificationCode = async (phoneNumber: number) => {
		if (!recaptchaVerifier.current) return;
		console.log("sending code");
		console.log("phoneNumber", phoneNumber);
		try {
			const phoneProvider = new PhoneAuthProvider(auth);
			const verificationId = await phoneProvider.verifyPhoneNumber(
				"+" + phoneNumber.toString(),
				recaptchaVerifier.current
			);
			console.log(verificationId);
			setVerificationId(verificationId);
			//open verification modal here
			console.log("Verification code has been sent to your phone.");
		} catch (err: any) {
			console.log(`Error: ${err.message}`);
		}
	};

	const authApi = useApi(registerUser);
	const profileApi = useApi(updateUser);
	// const {  setUser } = useAuth();

	const handleSubmit = async (newUser: LoginProperties) => {
		await sendVerificationCode(newUser.phoneNumber);
		navigation.navigate(routes.VERIFY_PHONE, {
			phoneNumber: newUser.phoneNumber,
		});

		// const userCredential = await authApi.request(newUser);
		// const displayName = newUser.name;
		// const phoneNumber = "876" + newUser.phoneNumber;
		// await profileApi.request(newUser.email, {
		// 	displayName,
		// 	phoneNumber,
		// });
		// setUser({
		// 	...userCredential.user.providerData[0],
		// 	phoneNumber,
		// 	displayName,
		// });
	};

	return (
		<Screen>
			<FirebaseRecaptchaVerifierModal
				ref={recaptchaVerifier}
				firebaseConfig={app.options}
				// attemptInvisibleVerification
			/>
			<ScrollView style={styles.container}>
				<LoadingScreen
					backgroundColor='#00000070'
					visible={authApi.loading || profileApi.loading}
					label=''
				/>
				<ErrorBanner
					visible={authApi.error}
					error='Something went wrong. Try again later'
				/>

				<NavHeader title='Create an Account' />
				<View style={styles.formContainer}>
					<Form
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						<FormPhoneInput name='phoneNumber' />
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
		padding: 16,
		backgroundColor: colors.black,
		borderRadius: 10,
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
