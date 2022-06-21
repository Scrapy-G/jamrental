import React from "react";
import { StyleSheet } from "react-native";
import colors from "../../config/colors";

import Text from "../Text";

type ErrorMessageProps = {
	error: string | undefined;
	visible: boolean;
};

function ErrorMessage({ error, visible }: ErrorMessageProps) {
	if (!visible || !error) return null;

	return (
		<Text small style={styles.error}>
			{error}
		</Text>
	);
}

const styles = StyleSheet.create({
	error: { color: colors.red, marginVertical: 7 },
});

export default ErrorMessage;
