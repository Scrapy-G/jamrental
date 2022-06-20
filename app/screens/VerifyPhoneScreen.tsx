import React from "react";
import { StyleSheet } from "react-native";
import CodeInput from "react-native-confirmation-code-input";
import colors from "../config/colors";
import NavHeader from "../navigation/NavHeader";
import Screen from "../components/Screen";
import Text from "../components/Text";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import routes from "../navigation/routes";

const app = getApp();
const auth = getAuth();

function VerifyPhoneScreen({ navigation }: any) {
	const handleFulfill = (code: string) => {
		navigation.navigate({
			name: routes.REGISTER,
			params: { code },
			merge: true,
		});
	};

	return (
		<Screen style={styles.screen}>
			<NavHeader title='Verify' />
			<Text color={colors.gray300}>
				We have sent OTP on your number +1 8764908825
			</Text>
			<CodeInput
				className={"border-b"}
				space={1}
				codeLength={6}
				size={50}
				inputPosition='center'
				codeInputStyle={styles.input}
				containerStyle={styles.codeContainer}
				onFulfill={handleFulfill}
				activeColor={colors.primary}
				inactiveColor={colors.black}
			/>
			<Text color={colors.gray300} style={{ textAlign: "center" }}>
				Resend code?
			</Text>
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
		marginBottom: 120,
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
});

export default VerifyPhoneScreen;
