import React from "react";
import {
	View,
	StyleSheet,
	ViewStyle,
	TouchableWithoutFeedback,
	TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./Text";
import colors from "../config/colors";

type ListOptionProps = {
	icon: React.ComponentProps<typeof Ionicons>["name"];
	title: string;
	iconColor?: string;
	textStyle?: TextStyle;
	showChevron?: boolean;
	style?: ViewStyle;
	color?: string;
	onPress?: () => void;
};

function ListOption({
	icon,
	iconColor = colors.gray500,
	textStyle,
	title,
	style,
	color = colors.gray200,
	onPress,
}: ListOptionProps) {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={[styles.container, style]}>
				<Ionicons
					style={styles.icon}
					name={icon as React.ComponentProps<typeof Ionicons>["name"]}
					size={24}
					color={iconColor}
				/>
				<AppText style={[styles.text, { color }, textStyle]}>
					{title}
				</AppText>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 12,
		height: 55,
		alignItems: "center",
		backgroundColor: colors.gray700,
		flexDirection: "row",
		borderTopWidth: 1,
		borderColor: colors.gray600,
	},
	icon: {
		marginRight: 12,
	},
	text: {
		flex: 1,
	},
});

export default ListOption;
