import React, { useRef, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import CodeInput from "react-native-confirmation-code-input";
import { getApp } from "firebase/app";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import {
	getAuth,
	PhoneAuthProvider,
	signInWithCredential,
	updateEmail,
	updateProfile,
} from "firebase/auth";

import colors from "../config/colors";
import NavHeader from "../navigation/NavHeader";
import Screen from "../components/Screen";
import Text from "../components/Text";
import { useAuth } from "../auth/context";
import LoadingScreen from "./LoadingScreen";
import ErrorBanner from "../components/ErrorBanner";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const app = getApp();
const auth = getAuth();
const resendTimeoutDuration = 5; //seconds

function VerifyPhoneScreen({ navigation, route }: any) {
	const { loginInfo } = route.params;

	const { setUser } = useAuth();

	const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
	const [verificationId, setVerificationId] = useState<string>("");

	const [timeInterval, setTimeInterval] = useState<number>(0);
	const [countdownStarted, setStarted] = useState<boolean>(false);

	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>();

	useEffect(() => {
		sendVerificationCode(loginInfo.phoneNumber);
	}, []);

	useEffect(() => {
		let intervalID: any;
		if (countdownStarted) {
			intervalID = setInterval(() => {
				setTimeInterval((prevTime) => {
					if (prevTime >= resendTimeoutDuration) {
						setStarted(false);
						setTimeInterval(0);
						return prevTime;
					}
					return prevTime + 1;
				});
			}, 1000);
		} else {
			clearInterval(intervalID);
		}
		return () => clearInterval(intervalID);
	}, [countdownStarted]);

	const verifyCode = async (verificationCode: string) => {
		setLoading(true);
		try {
			const credential = PhoneAuthProvider.credential(
				verificationId,
				verificationCode
			);
			const user = await signInWithCredential(auth, credential);
			await updateUserProfile();
			console.log({ text: "Phone authentication successful 👍" });
			setUser(user.user);
		} catch (err: any) {
			console.log(`Error: ${err.message}`);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const updateUserProfile = async () => {
		if (!auth.currentUser) return;
		return Promise.all([
			updateProfile(auth.currentUser, {
				displayName: loginInfo.name,
			}),
			updateEmail(auth.currentUser, loginInfo.email),
		]);
	};

	const sendVerificationCode = async (phoneNumber: number) => {
		if (!recaptchaVerifier.current) return;
		// console.log("sending code");
		setLoading(true);
		setError(null);
		try {
			const phoneProvider = new PhoneAuthProvider(auth);
			const verificationId = await phoneProvider.verifyPhoneNumber(
				"+" + phoneNumber.toString(),
				recaptchaVerifier.current
			);
			setVerificationId(verificationId);
			setStarted(true);
			console.log("Verification code has been sent to your phone.");
		} catch (err: any) {
			console.log(`Error: ${err.message}`);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Screen style={styles.screen}>
			<FirebaseRecaptchaVerifierModal
				ref={recaptchaVerifier}
				firebaseConfig={app.options}
			/>
			<LoadingScreen visible={loading} />
			<ErrorBanner error={error} visible={error} />
			<NavHeader title="Verify" />
			<Text color={colors.gray300}>
				We have sent OTP on your number {loginInfo.phoneNumber}
			</Text>
			<CodeInput
				className={"border-b"}
				space={1}
				codeLength={6}
				size={50}
				inputPosition="center"
				codeInputStyle={styles.input}
				containerStyle={styles.codeContainer}
				onFulfill={(code: string) => verifyCode(code)}
				activeColor={colors.primary}
				inactiveColor={colors.black}
			/>
			<TouchableWithoutFeedback
				onPress={() => {
					console.log("pressed");
					if (timeInterval <= 0) {
						console.log("resending");
						sendVerificationCode(loginInfo.phoneNumber);
					}
				}}
			>
				<Text
					color={!countdownStarted ? colors.primary : colors.gray300}
					style={styles.text}
				>
					Resend code?
				</Text>
			</TouchableWithoutFeedback>

			{timeInterval > 0 && (
				<Text color={colors.gray200} style={styles.text}>
					{resendTimeoutDuration - timeInterval}s
				</Text>
			)}
		</Screen>
	);
}

const styles = StyleSheet.create({
	screen: {
		paddingHorizontal: 10,
	},
	codeContainer: {
		justifyContent: "space-between",
		marginTop: 50,
		marginBottom: 50,
		maxHeight: 70,
	},
	input: {
		backgroundColor: colors.black,
		color: colors.primary,
		height: 60,
		borderRadius: 10,
		borderWidth: 1,
		fontSize: 32,
		fontWeight: "bold",
	},
	text: {
		textAlign: "center",
	},
});

export default VerifyPhoneScreen;
