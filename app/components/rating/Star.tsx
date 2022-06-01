import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../config/colors";

type StarProps = {
	fill?: "full" | "half" | "empty";
	size?: number;
};

export default function Star({ fill = "full", size = 12 }: StarProps) {
	return (
		<FontAwesome
			name={fill == "half" ? "star-half" : "star"}
			color={fill == "empty" ? colors.gray300 : colors.yellow}
			size={size}
		/>
	);
}
