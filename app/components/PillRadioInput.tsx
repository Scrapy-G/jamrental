import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import Pill from "./Pill";

type PillRadioInputProps = {
	items: string[];
	onChange?: () => void;
};

function PillRadioInput({ items, onChange }: PillRadioInputProps) {
	const [selectedItem, setSelectedItem] = useState<string>(items[0]);

	const handlePress = (item: string) => {
		setSelectedItem(item);
	};

	return (
		<View style={styles.container}>
			{items.map((item, i) => (
				<Pill
					style={styles.pill}
					key={i}
					title={item}
					active={item === selectedItem}
					onPress={handlePress}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
	pill: {
		marginRight: 10,
	},
});

export default PillRadioInput;
