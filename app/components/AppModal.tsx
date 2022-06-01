import { View, Modal, StyleSheet, Button } from "react-native";
import React from "react";

import colors from "../config/colors";
import AppText from "./Text";

type ModalProps = {
	visible: boolean;
	children: React.ReactNode;
};
export default function AppModal({ visible, children }: ModalProps) {
	return (
		<Modal visible={visible} transparent={true}>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>{children}</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		backgroundColor: "#00000090",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		backgroundColor: colors.gray700,
		borderRadius: 16,
		paddingHorizontal: 36,
		paddingVertical: 24,
		width: 325,
	},
});
