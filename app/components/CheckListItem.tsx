import React from "react";
import { View, StyleSheet } from "react-native";
import ListOption from "./ListOption";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";

type CheckListItemProps = {
	selected?: boolean;
	icon: React.ComponentProps<typeof Ionicons>["name"];
	value: string;
	onSelect: (arg?: any) => void;
	onDeselect: (arg?: any) => void;
};

function CheckListItem({
	selected,
	icon,
	value,
	onSelect,
	onDeselect,
}: CheckListItemProps) {
	return (
		<ListOption
			style={{
				borderWidth: selected ? 2 : 0,
				borderColor: colors.primary,
				marginVertical: 8,
			}}
			leftIcon={icon}
			title={value}
			onPress={selected ? onDeselect : onSelect}
			rightIcon={selected ? "checkmark" : undefined}
			rightIconColor={colors.primary}
		/>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default CheckListItem;
