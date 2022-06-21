import React from "react";
import { View, StyleSheet } from "react-native";
import Heading from "../components/Heading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";

type NavHeaderProps = {
	title: string;
	showBackIcon?: boolean;
};
function NavHeader({ title, showBackIcon = true }: NavHeaderProps) {
	const navigation = useNavigation();

	return (
		<View>
			<View style={styles.iconContainer}>
				{showBackIcon && (
					<MaterialCommunityIcons
						name='keyboard-backspace'
						size={36}
						color={colors.primary}
						onPress={() => navigation.goBack()}
					/>
				)}
			</View>
			<Heading style={styles.heading}>{title}</Heading>
		</View>
	);
}

const styles = StyleSheet.create({
	heading: {
		color: colors.primary,
		marginTop: 36,
	},
	icon: {
		marginRight: 24,
	},
	iconContainer: {
		marginTop: 30,
		height: 36,
	},
});

export default NavHeader;
