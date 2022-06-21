import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useAuth } from "../auth/context";

import Text from "../components/Text";
import colors from "../config/colors";

function Account() {
	const { user } = useAuth();
    
	return (
		<View style={styles.container}>
			<Image
				source={require("../../assets/profile.png")}
				style={styles.image}
			/>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>{user.displayName}</Text>
				<Text style={styles.subTitle}>{user.email}</Text>
				<Text color={colors.primary}>Edit ></Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		borderRadius: 6,
		height: 90,
		width: 90,
	},
	container: {
		marginVertical: 42,
		flexDirection: "row",
		backgroundColor: colors.black,
		borderRadius: 10,
		padding: 16,
	},
	contentContainer: {
		marginLeft: 16,
	},
	subTitle: {
		color: colors.gray300,
		marginBottom: 8,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.white,
		marginBottom: 5,
	},
});

export default Account;
