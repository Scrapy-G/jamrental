import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { getUserListings } from "../api/listings";
import useApi from "../api/useApi";
import { useAuth } from "../auth/context";

import IconButton from "../components/IconButton";
import ListItem from "../components/ListItem";
import ListSeparator from "../components/ListSeparator";
import Loader from "../components/Loader";
import PillRadioInput from "../components/PillRadioInput";
import Screen from "../components/Screen";
import colors from "../config/colors";
import NavHeader from "../navigation/NavHeader";
import routes from "../navigation/routes";
import { Vehicle } from "../types";

const radioItems = ["rented", "active", "inactive"];

function MyVehiclesScreen({ navigation }: any) {
	const {
		data: listings,
		error,
		loading,
		request: loadUserListings,
	} = useApi(getUserListings);
	const { user } = useAuth();

	useEffect(() => {
		console.log("loading listings", user.email);
		loadUserListings(user.email);
	}, [navigation]);

	// console.log("listings", listings);

	return (
		<Screen style={styles.container}>
			<NavHeader title="My Vehicles" />
			<View style={styles.listingsContainer}>
				{loading && <Loader size={110} />}
				{listings && (
					<FlatList
						data={listings}
						renderItem={({ item }) => (
							<ListItem
								title={`${item.make} ${item.model} ${item.year}`}
								image={item.thumbnail}
								onPress={() =>
									navigation.navigate(
										routes.LISTING_DETAILS,
										item
									)
								}
								subTitle={item.price}
								containerStyle={styles.listingItem}
								imageStyle={styles.image}
							/>
						)}
						keyExtractor={(item) => item.id}
						ItemSeparatorComponent={ListSeparator}
					/>
				)}
			</View>
			<IconButton
				size={60}
				name="add"
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
		borderRadius: 50,
	},
	image: {
		borderRadius: 10,
		height: 70,
		width: 70,
	},
	listingItem: {
		borderRadius: 0,
		backgroundColor: "transparent",
		borderWidth: 0,
		marginTop: 20,
	},
	listingsContainer: {
		marginTop: 30,
	},
});

export default MyVehiclesScreen;
