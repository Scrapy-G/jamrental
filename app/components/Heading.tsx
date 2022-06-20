import React from "react";
import { StyleSheet, TextStyle } from "react-native";

import Text from "./Text";

type Props = {
	children: any;
	style?: TextStyle;
};

export default function Heading({ children, style }: Props) {
	return (
		<Text bold style={[styles.heading, style]}>
			{children}
		</Text>
	);
}

const styles = StyleSheet.create({
	heading: {
		fontSize: 34,
		marginVertical: 12,
	},
});
