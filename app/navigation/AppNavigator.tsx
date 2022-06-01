import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Screen from "../components/Screen";

import colors from "../config/colors";
import routes from "./routes.js";
import ListingsScreen from "../screens/ListingsScreen";
import AccountScreen from "../screens/AccountScreen";
import AccountNavigator from "./AccountNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ListingsNavigator from "./ListingsNavigator";
import MyVehicleNavigator from "./MyVehicleNavigator";
import { getAuth } from "firebase/auth";
import AuthNavigator from "./AuthNavigator";
import { useAuth } from "../auth/context";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTabs = () => {
	const { user } = useAuth();

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: colors.black,
					borderTopWidth: 0,
					height: 70,
				},
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: colors.gray300,
			}}
		>
			<Tab.Screen
				name={routes.MAP}
				component={ListingsScreen}
				options={{
					tabBarIcon: ({ size, color }) => (
						<Ionicons
							name='map-outline'
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name={routes.ACCOUNT}
				component={user ? AccountScreen : AuthNavigator}
				options={{
					tabBarIcon: ({ size, color }) => (
						<Ionicons
							name='person-outline'
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const AppNavigator = () => (
	<Stack.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
		<Stack.Screen name={routes.HOME} component={HomeTabs} />
		<Stack.Screen
			name={routes.MY_VEHICLES}
			component={MyVehicleNavigator}
		/>
		<Stack.Screen
			options={{ presentation: "modal" }}
			name={routes.LISTING_DETAILS}
			component={ListingDetailsScreen}
		/>
	</Stack.Navigator>
);

export default AppNavigator;
