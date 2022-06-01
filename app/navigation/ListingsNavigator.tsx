import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import MyVehiclesScreen from "../screens/MyVehiclesScreen";
import colors from "../config/colors";
import IconButton from "../components/IconButton";
import Heading from "../components/Heading";
import Screen from "../components/Screen";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import SearchScreen from "../screens/SearchScreen";

const ListingsNavigator = () => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name={routes.LISTINGS} component={ListingsScreen} />
			<Stack.Screen
				name={routes.LISTING_DETAILS}
				component={ListingDetailsScreen}
				options={{ presentation: "modal" }}
			/>
		</Stack.Navigator>
	);
};

export default ListingsNavigator;
