import { Text, TextProps, TextStyle } from "react-native";
import React from "react";

import colors from "../config/colors";

type AppTextProps = TextProps & {
	color?: string;
	children: any;
	bold?: boolean;
	small?: boolean;
	style?: TextStyle;
	underline?: boolean;
};

export default function AppText({
	children,
	color = colors.white,
	bold = false,
	small = false,
	underline = false,
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
					textDecorationLine: underline ? "underline" : undefined,
				},
				style,
			]}
			{...rest}
		>
			{children}
		</Text>
	);
}
