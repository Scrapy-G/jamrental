import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";

import Button from "../components/Button";
import Screen from "../components/Screen";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import colors from "../config/colors";
import NavHeader from "../navigation/NavHeader";
import ErrorBanner from "../components/ErrorBanner";
import LoadingScreen from "./LoadingScreen";
import routes from "../navigation/routes";

function PasswordResetScreen({ navigation }: any) {
	const [email, setEmail] = useState<string>();
	const [error, setError] = useState<string | null>();
	const [loading, setLoading] = useState<boolean>(false);
	const [mailSent, setMailSent] = useState<boolean>(false);

	const handleSubmit = async () => {
		if (!email) return;

		setLoading(true);
		setError(null);
		setMailSent(false);
		try {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email);
			setMailSent(true);
		} catch (error: any) {
			setError("No account exists for this email");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Screen style={styles.screen}>
			<LoadingScreen visible={loading} />
			<ErrorBanner error={error} visible={error} />
			<NavHeader title='Reset password' />
			<Text color={colors.gray300}>
				We'll send a reset link to your email
			</Text>
			<View style={styles.contentContainer}>
				{!mailSent ? (
					<>
						<TextInput
							style={styles.input}
							value={email}
							onChangeText={(text) => setEmail(text.trim())}
							placeholder='Email address'
						/>
						<Button
							title='Reset'
							onPress={handleSubmit}
							disabled={!email || loading}
						/>
					</>
				) : (
					<>
						<Ionicons
							name='checkmark-done'
							size={70}
							color={colors.primary}
							style={styles.successIcon}
						/>
						<Text color={colors.gray300} style={styles.message}>
							Password reset link sent! Check your email,
							including spam folder
						</Text>
						<Button
							title='Go to Login'
							onPress={() => navigation.navigate(routes.LOGIN)}
						/>
					</>
				)}
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		marginTop: 50,
	},
	input: {
		marginBottom: 20,
	},
	screen: {
		paddingHorizontal: 8,
	},
	successIcon: {
		alignSelf: "center",
	},
	message: {
		textAlign: "center",
		marginVertical: 20,
	},
});

export default PasswordResetScreen;
