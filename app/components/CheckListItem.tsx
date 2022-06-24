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
				borderWidth: selected ? 1 : 0,
			}}
			icon={icon}
			iconColor={selected ? colors.primary : colors.gray300}
			textStyle={{ color: selected ? colors.primary : colors.gray200 }}
			title={value}
			onPress={selected ? onDeselect : onSelect}
		/>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default CheckListItem;
