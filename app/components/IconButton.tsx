import React from "react";
import {
	View,
	StyleSheet,
	ViewStyle,
	TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";

type IconButtonProps = {
	name?: React.ComponentProps<typeof Ionicons>["name"];
	IconComponent?: React.ReactNode;
	size?: number;
	style?: ViewStyle;
	onPress?: () => void;
	color?: string;
};
function IconButton({
	name,
	IconComponent,
	size = 36,
	style,
	onPress,
	color = colors.black,
}: IconButtonProps) {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View
				style={[styles.container, { height: size, width: size }, style]}
			>
				{(name && (
					<Ionicons name={name} size={size * 0.5} color={color} />
				)) ||
					IconComponent}
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		borderColor: colors.gray600,
		borderWidth: 2,
		borderRadius: 8,
	},
});

export default IconButton;
