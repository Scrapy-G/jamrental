import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import Form from "../components/form/Form";
import Screen from "../components/Screen";
import * as Yup from "yup";
import {
	getAuth,
	PhoneAuthProvider,
	signInWithCredential,
	updateEmail,
	updateProfile,
} from "firebase/auth";
import { getApp } from "firebase/app";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import FormField from "../components/form/FormField";
import SubmitButton from "../components/form/SubmitButton";
import NavHeader from "../navigation/NavHeader";
import LoadingScreen from "./LoadingScreen";
import Text from "../components/Text";
import colors from "../config/colors";
import routes from "../navigation/routes";
import ErrorBanner from "../components/ErrorBanner";
import FormPhoneInput from "../components/form/FormPhoneInput";

const validationSchema = Yup.object().shape({
	email: Yup.string().email().required().label("Email"),
	name: Yup.string().required().label("Name"),
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

const app = getApp();
const auth = getAuth();

function RegisterScreen({ navigation, route }: any) {
	const { code } = route.params; //from verify phone screen
	const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
	const [verificationId, setVerificationId] = useState<string>("");

	const [userInfo, setUser] = useState<UserLoginInfo>();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>();

	useEffect(() => {
		if (code) {
			setLoading(true);
			verifyCode(code);
		}
	}, [code, navigation]);

	const verifyCode = async (verificationCode: string) => {
		console.log("verifying");
		setLoading(true);
		try {
			const credential = PhoneAuthProvider.credential(
				verificationId,
				verificationCode
			);
			await signInWithCredential(auth, credential);
			updateUserProfile();
			console.log({ text: "Phone authentication successful 👍" });
		} catch (err: any) {
			console.log(`Error: ${err.message}`);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const updateUserProfile = () => {
		if (!auth.currentUser) return;
		updateProfile(auth.currentUser, {
			displayName: userInfo?.name,
		});

		if (userInfo) updateEmail(auth.currentUser, userInfo.email);
	};

	const sendVerificationCode = async (phoneNumber: number) => {
		if (!recaptchaVerifier.current) return;
		// console.log("sending code", phoneNumber);
		setLoading(true);
		setError(null);
		try {
			const phoneProvider = new PhoneAuthProvider(auth);
			const verificationId = await phoneProvider.verifyPhoneNumber(
				"+" + phoneNumber.toString(),
				recaptchaVerifier.current
			);
			setVerificationId(verificationId);
			// console.log("Verification code has been sent to your phone.");
		} catch (err: any) {
			console.log(`Error: ${err.message}`);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (newUser: UserLoginInfo) => {
		await sendVerificationCode(newUser.phoneNumber);
		setUser(newUser);
		navigation.navigate(routes.VERIFY_PHONE, {
			phoneNumber: newUser.phoneNumber,
		});
	};

	return (
		<Screen>
			<LoadingScreen visible={loading} />
			<FirebaseRecaptchaVerifierModal
				ref={recaptchaVerifier}
				firebaseConfig={app.options}
				// attemptInvisibleVerification
			/>
			<ErrorBanner error={error} visible={error} />
			<ScrollView style={styles.container}>
				<ErrorBanner
					visible={error}
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
						<FormField name='email' placeholder='Email' />
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
