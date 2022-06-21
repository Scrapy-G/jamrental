import React from "react";
import { View, StyleSheet } from "react-native";

import IconButton from "../components/IconButton";
import PillRadioInput from "../components/PillRadioInput";
import Screen from "../components/Screen";
import colors from "../config/colors";
import NavHeader from "../navigation/NavHeader";
import routes from "../navigation/routes";

const radioItems = ["rented", "active", "inactive"];

function MyVehiclesScreen({ navigation }: any) {
	return (
		<Screen style={styles.container}>
			<NavHeader title='My Vehicles' />
			<IconButton
				size={60}
				name='add'
				style={styles.addButton}
				onPress={() => navigation.navigate(routes.NEW_VEHICLE)}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 12,
		position: "relative",
	},
	addButton: {
		backgroundColor: colors.primary,
		borderWidth: 0,
		position: "absolute",
		right: 24,
		bottom: 50,
	},
});

export default MyVehiclesScreen;
