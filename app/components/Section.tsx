import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../config/colors";
import Text from "./Text";

type SectionProps = {
	title?: string;
	FooterComponent?: React.ReactNode;
	children: any;
};

function Section({ title, FooterComponent, children }: SectionProps) {
	return (
		<View style={styles.container}>
			{title && (
				<Text bold style={styles.sectionTitle}>
					{title}
				</Text>
			)}
			<View>{children}</View>
			<View style={styles.footer}>{FooterComponent}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 24,
		paddingTop: 12,
		borderBottomColor: colors.gray600,
		borderBottomWidth: 1,
	},
	sectionTitle: {
		textTransform: "uppercase",
		color: colors.gray200,
		fontSize: 13,
		marginBottom: 12,
	},
	footer: {
		alignItems: "flex-end",
		marginTop: 12,
	},
});

export default Section;
