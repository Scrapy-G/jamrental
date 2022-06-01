import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker, PickerProps } from "@react-native-picker/picker";

import colors from "../config/colors";
import { PickerItem } from "../types";
import AppText from "./Text";

type AppPickerProps = PickerProps<string> & {
	items: PickerItem[];
	onValueChange: (arg1: string) => void;
	width?: number | string;
	prompt: string;
};

function AppPicker({
	items,
	onValueChange,
	width = "100%",
	...rest
}: AppPickerProps) {
	const [selectedValue, setSelectedValue] = useState<string>();

	return (
		<View style={[styles.container, { width }]}>
			<Picker
				selectedValue={selectedValue}
				onValueChange={(itemValue: string, itemIndex: number) => {
					setSelectedValue(itemValue);
					onValueChange(itemValue);
				}}
				style={styles.picker}
				dropdownIconColor={colors.primary}
				mode='dropdown'
				{...rest}
			>
				{items.map(({ label, value }, i) => (
					<Picker.Item key={i} label={label} value={value} />
				))}
			</Picker>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 15,
		overflow: "hidden",
		borderWidth: 1,
		height: 55,
		justifyContent: "center",
		paddingHorizontal: 8,
		backgroundColor: colors.gray700,
	},
	picker: {
		color: colors.white,
		height: 55,

		marginVertical: 8,
	},
});

export default AppPicker;
