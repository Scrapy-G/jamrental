import { StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import React, { useReducer } from "react";
import { Ionicons } from "@expo/vector-icons";

import colors from "../config/colors";

type FavoriteProps = {
	checked: boolean;
	onChange: () => void;
	style?: ViewStyle
};

export default function Favorite({ checked = false, onChange, style }: FavoriteProps) {
	const [favorited, toggleFavorited] = useReducer(
		(oldVal) => !oldVal,
		checked
	);

	return (
		<TouchableWithoutFeedback onPress={toggleFavorited}>
			<View style={[styles.container, style]}>
				<Ionicons
					name={favorited ? "heart" : "heart-outline"}
					size={23}
					color={favorited ? colors.primary : colors.white}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 40,
		width: 40,
		borderRadius: 20,
		backgroundColor: colors.black,
		justifyContent: "center",
		alignItems: "center",
	},
});
