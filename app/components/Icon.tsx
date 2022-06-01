import { View, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./Text";
import colors from "../config/colors";

type Props = {
	name: any;
	size?: number;
	color?: string;
	label?: string;
};

export default function Icon({
	name,
	size = 25,
	color = "white",
	label,
}: Props) {
	return (
		<View style={styles.container}>
			<Ionicons name={name} size={size} color={color} />
			{label && (
				<AppText style={[styles.label, { color }]}>{label}</AppText>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	label: {
		textTransform: "capitalize",
		fontSize: 12,
		maxWidth: 70,
		textAlign: "center",
		marginTop: 7,
	},
});
