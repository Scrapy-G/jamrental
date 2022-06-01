import React from "react";
import {
	View,
	StyleSheet,
	ViewStyle,
	TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./Text";
import colors from "../config/colors";

type ListOptionProps = {
	leftIcon: React.ComponentProps<typeof Ionicons>["name"];
	title: string;
	showChevron?: boolean;
	rightIcon?: React.ComponentProps<typeof Ionicons>["name"];
	rightIconColor?: string;
	style?: ViewStyle;
	color?: string;
	onPress?: () => void;
};

function ListOption({
	leftIcon: icon,
	title,
	style,
	color = colors.white,
	onPress,
	rightIcon,
	rightIconColor,
}: ListOptionProps) {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={[styles.container, style]}>
				<Ionicons
					style={styles.icon}
					name={icon as React.ComponentProps<typeof Ionicons>["name"]}
					size={24}
					color={color}
				/>
				<AppText style={[styles.text, { color }]}>{title}</AppText>
				{rightIcon && (
					<Ionicons
						name={rightIcon}
						size={24}
						color={rightIconColor || color}
					/>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 24,
		height: 55,
		alignItems: "center",
		borderRadius: 30,
		backgroundColor: colors.gray700,
		flexDirection: "row",
	},
	icon: {
		marginRight: 12,
	},
	text: {
		flex: 1,
	},
});

export default ListOption;
