import React from "react";
import { View, StyleSheet } from "react-native";
import Heading from "../components/Heading";
import IconButton from "../components/IconButton";

type NavHeaderProps = {
	navigation?: any;
	title: string;
	showBackIcon?: boolean;
};
function NavHeader({ navigation, title, showBackIcon = true }: NavHeaderProps) {
	return (
		<View style={styles.container}>
			{showBackIcon && (
				<IconButton
					name='chevron-back'
					onPress={() => navigation.goBack()}
					style={styles.icon}
				/>
			)}
			<Heading>{title}</Heading>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		height: 150,
	},
	icon: {
		marginRight: 24,
	},
});

export default NavHeader;
