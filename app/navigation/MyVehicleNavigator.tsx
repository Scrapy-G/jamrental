import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import MyVehiclesScreen from "../screens/MyVehiclesScreen";
import NewVehicleScreen from "../screens/NewVehicleScreen";
import AddFeaturesScreen from "../screens/AddFeaturesScreen";
import AddImagesScreen from "../screens/AddImagesScreen";
import VehicleLocationScreen from "../screens/VehicleLocationScreen";

const MyVehicleNavigator = ({ navigation }: any) => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name={routes.VEHICLES_LIST}
				options={{ title: "My Vehicles" }}
				component={MyVehiclesScreen}
			/>
			<Stack.Screen
				name={routes.NEW_VEHICLE}
				component={NewVehicleScreen}
			/>
			<Stack.Screen
				name={routes.ADD_FEATURES}
				component={AddFeaturesScreen}
			/>
			<Stack.Screen
				name={routes.ADD_IMAGES}
				component={AddImagesScreen}
			/>
			<Stack.Screen
				name={routes.VEHICLE_LOCATION}
				component={VehicleLocationScreen}
			/>
		</Stack.Navigator>
	);
};

export default MyVehicleNavigator;
