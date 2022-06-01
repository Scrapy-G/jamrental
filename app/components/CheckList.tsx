import React from "react";
import { View, StyleSheet } from "react-native";
import CheckListItem from "./CheckListItem";

type CheckListProps = {
	items: any[];
	onAddItem: (arg: any) => void;
	onRemoveItem: (arg: any) => void;
	selectedItems: any[];
};

function CheckList({
	items,
	onAddItem,
	onRemoveItem,
	selectedItems,
}: CheckListProps) {
	return (
		<View style={styles.container}>
			{items.map((item, i) => (
				<CheckListItem
					key={i}
					icon={item.icon}
					value={item.name}
					onSelect={() => onAddItem(item)}
					onDeselect={() => onRemoveItem(item)}
					selected={selectedItems.includes(item)}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default CheckList;
