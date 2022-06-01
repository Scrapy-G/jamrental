import { StyleSheet } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
	useFonts,
	Rubik_400Regular,
	Rubik_600SemiBold,
} from "@expo-google-fonts/rubik";
import { User } from "firebase/auth";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import colors from "./app/config/colors";
import { createContext, useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import RegisterScreen from "./app/screens/RegisterScreen";
import LogInScreen from "./app/screens/LogInScreen";
import { AuthContext } from "./app/auth/context";

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: colors.black,
	},
};

export default function App() {
	const [fontsLoaded] = useFonts({ Rubik_400Regular, Rubik_600SemiBold });
	const [authLoaded, setAuthLoaded] = useState<boolean>(false);
	const [user, setUser] = useState<User>();

	useEffect(() => {
		SplashScreen.preventAutoHideAsync();
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) setUser(user);
			setAuthLoaded(true);
		});
	}, []);

	useEffect(() => {
		if (fontsLoaded && authLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, authLoaded]);

	if (!fontsLoaded && !authLoaded) return null;

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			<NavigationContainer theme={theme}>
				<AppNavigator />
			</NavigationContainer>
		</AuthContext.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 24,
	},
});
