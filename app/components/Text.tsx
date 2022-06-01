import { Text, TextProps } from "react-native";
import React from "react";
import {
	useFonts,
	Rubik_400Regular,
	Rubik_600SemiBold,
} from "@expo-google-fonts/rubik";

import colors from "../config/colors";

type AppTextProps = TextProps & {
	color?: string;
	children: any;
	bold?: boolean;
	small?: boolean;
	style?: any;
};

export default function AppText({
	children,
	color = colors.white,
	bold = false,
	small = false,
	style,
	...rest
}: AppTextProps) {
	return (
		<Text
			style={[
				{
					color,
					fontFamily: bold ? "Rubik_600SemiBold" : "Rubik_400Regular",
					fontSize: small ? 13 : 16,
				},
				style,
			]}
			{...rest}
		>
			{children}
		</Text>
	);
}
