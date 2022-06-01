import { View, Image, Modal, StyleSheet, Button } from "react-native";
import { useState } from "react";

import Screen from "../components/Screen";
import Heading from "../components/Heading";
import Rating from "../components/Rating";
import Icon from "../components/Icon";
import colors from "../config/colors";
import Widget from "../components/Widget";
import AppText from "../components/Text";
import AppModal from "../components/AppModal";
import AppButton from "../components/Button";
import AppDateRangePicker from "../components/AppDateRangePicker";

const car = {
	id: 1,
	name: "Blue BMW 2020",
	image: require("../../assets/car.png"),
	features: {
		ac: true,
		seats: 5,
		fuel: "premium",
		type: "automatic",
	},
};

export default function CarListing() {
	const [showDateModal, setShowDateModal] = useState<boolean>(false);

	return (
		<Screen>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={car.image} />
			</View>
			<View style={styles.detailContainer}>
				<Heading style={styles.heading} weight='bold' size={1}>
					{car.name}
				</Heading>
				<Rating rating={4.9} totalReviews={10} />
				<View style={styles.features}>
					<Icon
						name='snowflake'
						label='air con'
						color={colors.gray300}
					/>
					<Icon
						name='account-supervisor-outline'
						label={car.features.seats + " seats"}
						color={colors.gray300}
					/>
					<Icon
						name='water-outline'
						label={`Gas (${car.features.fuel})`}
						color={colors.gray300}
					/>
					<Icon
						name='steering'
						label={car.features.type}
						color={colors.gray300}
					/>
				</View>
				<Widget
					style={styles.widget}
					label='trips dates'
					LeftIconComponent={
						<Icon
							name='calendar-range-outline'
							color={colors.gray300}
							size={30}
						/>
					}
					onPress={() => setShowDateModal(true)}
				>
					<AppText>Thu, Apr 28, 12:00AM</AppText>
					<AppText>Sat, Apr 30, 12:00AM</AppText>
				</Widget>
				<AppModal visible={showDateModal}>
					<AppDateRangePicker />
					{/* <AppButton
						title='something'
						onPress={() => setShowDateModal(false)}
					/>
					<AppButton
						title='something'
						secondary
						onPress={() => setShowDateModal(false)}
					/> */}
				</AppModal>
				<Widget
					style={styles.widget}
					label='Pickup & Dropoff location'
					LeftIconComponent={
						<Icon
							name='map-marker-outline'
							color={colors.gray300}
							size={30}
						/>
					}
					onPress={() => console.log("location")}
				>
					<AppText>Sam Sharpe Sq.</AppText>
					<AppText>Montego Bay</AppText>
				</Widget>
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	detailContainer: {
		paddingHorizontal: 24,
		alignItems: "center",
	},
	features: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		marginVertical: 16,
	},
	heading: {
		marginBottom: 6,
	},
	image: {
		width: "100%",
		height: 290,
	},
	imageContainer: {
		borderBottomRightRadius: 30,
		borderBottomLeftRadius: 30,
		marginBottom: 24,
		overflow: "hidden",
	},
	widget: {
		marginVertical: 16,
	},
});
