import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ListOption from "../components/ListOption";
import Screen from "../components/Screen";
import Text from "../components/Text";
import colors from "../config/colors";
import routes from "../navigation/routes";
import { useAuth } from "../auth/context";
import { getAuth } from "firebase/auth";
import { ScrollView } from "react-native-gesture-handler";
import Account from "../components/Account";

const accountOptions = [
	// {
	// 	title: "Favorites",
	// 	icon: "heart-outline",
	// 	target: routes.FAVORITES,
	// },
	{
		title: "My Vehicles",
		icon: "car-outline",
		target: routes.MY_VEHICLES,
	},
];

function AccountScreen({ navigation }: any) {
	const { setUser } = useAuth();

	const handleLogOut = () => {
		const auth = getAuth();
		auth.signOut();
		setUser(null);
	};

	return (
		<Screen>
			<ScrollView style={styles.screen}>
				<Text style={styles.heading}>Account</Text>
				<Account />
				{accountOptions.map(({ title, icon, target }, i) => (
					<ListOption
						key={i}
						icon={
							icon as React.ComponentProps<
								typeof Ionicons
							>["name"]
						}
						title={title}
						onPress={() => navigation.navigate({ name: target })}
					/>
				))}
				<ListOption
					icon='power'
					title='Logout'
					showChevron={false}
					onPress={handleLogOut}
				/>
			</ScrollView>
		</Screen>
	);
}

const styles = StyleSheet.create({
	heading: {
		color: colors.primary,
		fontSize: 34,
		fontWeight: "bold",
	},
	screen: {
		padding: 16,
		paddingTop: 50,
	},
});

export default AccountScreen;
