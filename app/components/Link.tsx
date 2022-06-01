import { Link } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import colors from "../config/colors";

function AppLink({ children, rest }: any) {
	return (
		<Link {...rest} style={styles.link}>
			{children}
		</Link>
	);
}

const styles = StyleSheet.create({
	link: {
		color: colors.primary,
	},
});

export default AppLink;
