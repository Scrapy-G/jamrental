import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import RegisterScreen from "../screens/RegisterScreen";
import LogInScreen from "../screens/LogInScreen";

const AuthNavigator = () => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name={routes.LOGIN} component={LogInScreen} />
			<Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
		</Stack.Navigator>
	);
};

export default AuthNavigator;
