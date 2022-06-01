import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ListOption from "../components/ListOption";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import colors from "../config/colors";
import routes from "../navigation/routes";
import useApi from "../api/useApi";
import { logOut } from "../api/auth";
import { useAuth } from "../auth/context";

const accountOptions = [
	{
		title: "Favorites",
		icon: "heart-outline",
		target: routes.FAVORITES,
	},
	{
		title: "My Vehicles",
		icon: "car-outline",
		target: routes.MY_VEHICLES,
	},
];

function AccountScreen({ navigation }: any) {
	const { request: logOutUser } = useApi(logOut);
	const { setUser } = useAuth();

	const handleLogOut = () => {
		logOutUser();
		setUser(null);
	};

	return (
		<Screen style={styles.screen}>
			<View style={styles.profileInfo}>
				<Image
					source={require("../../assets/profile.png")}
					style={styles.image}
				/>
				<AppText>Chad McKenzie</AppText>
				<AppText small style={styles.subTitle}>
					(876) 123 - 4567
				</AppText>
			</View>

			{accountOptions.map(({ title, icon, target }, i) => (
				<ListOption
					key={i}
					style={styles.options}
					leftIcon={
						icon as React.ComponentProps<typeof Ionicons>["name"]
					}
					title={title}
					onPress={() => navigation.navigate({ name: target })}
					rightIcon='chevron-forward'
				/>
			))}
			<ListOption
				style={styles.options}
				leftIcon='power'
				title='Logout'
				color='#df5050'
				showChevron={false}
				onPress={handleLogOut}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({
	image: {
		borderRadius: 45,
		height: 90,
		marginBottom: 12,
		width: 90,
	},
	options: {
		marginVertical: 5,
	},
	profileInfo: {
		marginVertical: 42,
		alignItems: "center",
	},
	screen: {
		padding: 12,
	},
	subTitle: {
		color: colors.gray200,
	},
});

export default AccountScreen;
