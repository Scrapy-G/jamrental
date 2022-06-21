import { View, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Constant from "expo-constants";

import colors from "../config/colors";

export default function Screen({ children, style }: any) {
	return (
		<>
			<StatusBar style='light' />
			<SafeAreaView style={[styles.screen, style]}>
				<View style={[styles.view, style]}>{children}</View>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	screen: {
		backgroundColor: colors.gray700,
		flex: 1,
		paddingTop: Constant.statusBarHeight,
	},
	view: {
		flex: 1,
	},
});
