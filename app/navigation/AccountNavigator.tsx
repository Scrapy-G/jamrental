import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import AccountScreen from "../screens/AccountScreen";
import MyVehicleNavigator from "./MyVehicleNavigator";

const AccountNavigator = () => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name={routes.ACCOUNT_OPTIONS}
				component={AccountScreen}
			/>
			<Stack.Screen
				name={routes.MY_VEHICLES}
				component={MyVehicleNavigator}
			/>
		</Stack.Navigator>
	);
};

export default AccountNavigator;
