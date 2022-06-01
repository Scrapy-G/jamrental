import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {} from "react-native-gesture-handler";

type ListProps = {
	items: any[];
	renderItem: (arg1: any, arg2: number) => React.ReactNode;
};

function List({ items, renderItem }: ListProps) {
	return (
		<ScrollView
			horizontal
			style={styles.container}
			decelerationRate={0}
			snapToInterval={300}
			snapToAlignment={"center"}
		>
			{items.map((item, i) => renderItem(item, i))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		paddingVertical: 16,
		paddingHorizontal: 40,
	},
});

export default List;
