import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

function ListSeparator() {
	return <View style={styles.separator}></View>;
}

const styles = StyleSheet.create({
	separator: {
		borderBottomWidth: 1,
		borderColor: colors.gray600,
	},
});

export default ListSeparator;
