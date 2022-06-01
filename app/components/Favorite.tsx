import { TouchableWithoutFeedback } from "react-native";
import React, { useReducer } from "react";
import { Ionicons } from "@expo/vector-icons";

import colors from "../config/colors";

type FavoriteProps = {
	isFavorited: boolean;
	onChange: () => void;
};

export default function Favorite({
	isFavorited = false,
	onChange,
}: FavoriteProps) {
	const [favorited, toggleFavorited] = useReducer(
		(oldVal) => !oldVal,
		isFavorited
	);

	return (
		<TouchableWithoutFeedback onPress={toggleFavorited}>
			<Ionicons
				name={favorited ? "heart" : "heart-outline"}
				size={23}
				color={favorited ? colors.primary : colors.white}
			/>
		</TouchableWithoutFeedback>
	);
}
