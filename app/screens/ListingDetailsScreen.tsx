import { View, Image, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";

import Screen from "../components/Screen";
import Heading from "../components/Heading";
import Rating from "../components/rating/Rating";
import Icon from "../components/Icon";
import colors from "../config/colors";
import Text from "../components/Text";
import AppModal from "../components/AppModal";
import AppButton from "../components/Button";
import { Vehicle } from "../types";
import Price from "../components/Price";
import Section from "../components/Section";
import ImageCarousel from "../components/ImageCarousel";
import Favorite from "../components/Favorite";

export default function ListingDetailsScreen({ route }: any) {
	const vehicle: Vehicle = route.params;

	// console.log(vehicle);
	return (
		<Screen>
			<ScrollView>
				<View style={styles.imageContainer}>
					<ImageCarousel images={vehicle.images} />
					<Favorite
						checked
						onChange={() => {}}
						style={styles.favoriteIcon}
					/>
				</View>

				<Section>
					<Heading>
						{vehicle.make} {vehicle.model} {vehicle.year}
					</Heading>
					<Rating
						style={styles.rating}
						value={vehicle.rating}
						color={colors.primary}
						fontSize={16}
					/>
					<Price
						price={vehicle.price}
						fontSize={20}
						color={colors.primary}
					/>
				</Section>

				<Section title="Basics">
					<View style={styles.iconContainer}>
						<Icon
							name="car-outline"
							label={vehicle.transmission}
							color={colors.white}
							size={30}
						/>
						<Icon
							name="beaker-outline"
							label={vehicle.fuel}
							color={colors.white}
						/>
						<Icon
							name="md-person-add-outline"
							label={vehicle.seats + " seats"}
							color={colors.white}
						/>
					</View>
				</Section>

				<Section
					title="Features"
					FooterComponent={
						<Text small bold color={colors.primary}>
							View all
						</Text>
					}
				>
					<View style={styles.iconContainer}>
						{vehicle.features
							.slice(0, 4)
							.map(({ name, icon }, i) => (
								<Icon
									key={i}
									name={icon}
									label={name}
									color={colors.white}
								/>
							))}
					</View>
				</Section>
			</ScrollView>
		</Screen>
	);
}

const styles = StyleSheet.create({
	detailContainer: {
		paddingHorizontal: 24,
		alignItems: "center",
	},
	favoriteIcon: {
		position: "absolute",
		bottom: 10,
		right: 24,
	},
	features: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
	},
	heading: {
		marginBottom: 6,
	},
	iconContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-around",
		marginTop: 12,
	},
	image: {
		width: "100%",
		height: 290,
	},
	imageContainer: {
		marginBottom: 24,
		overflow: "hidden",
	},
	rating: {
		marginVertical: 8,
	},
});
