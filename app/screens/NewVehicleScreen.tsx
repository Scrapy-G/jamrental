import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import FormField from "../components/form/FormField";
import FormPicker from "../components/form/FormPicker";
import * as Yup from "yup";

import Screen from "../components/Screen";
import Form from "../components/form/Form";
import SubmitButton from "../components/form/SubmitButton";
import useApi from "../api/useApi";
import { addListing } from "../api/listings";
import NavHeader from "../navigation/NavHeader";
import routes from "../navigation/routes";
import LoadingScreen from "./LoadingScreen";

const validationSchema = Yup.object().shape({
	transmission: Yup.string().required().label("Transmission"),
	fuel: Yup.string().required().label("Fuel"),
	year: Yup.number().required().min(1950).max(2023).label("Year"),
	model: Yup.string().required().label("Model"),
	make: Yup.string().required().label("Make"),
	price: Yup.number().required().label("Price"),
});

const initialValues = {
	transmission: "automatic",
	fuel: "regular",
	year: "2020",
	model: "Honda",
	make: "Civic",
	price: "3500",
};

const transmissionItems = [
	{
		label: "Automatic",
		value: "automatic",
	},
	{
		label: "Manual",
		value: "manual",
	},
];

const fuelItems = [
	{
		label: "Regular",
		value: "regular",
	},
	{
		label: "Premium",
		value: "premium",
	},
];

function NewVehicleScreen({ navigation }: any) {
	const { request: createListing, loading } = useApi(addListing);

	const handleSubmit = async (listing: any) => {
		const response = await createListing(listing);
		navigation.navigate(routes.ADD_FEATURES, { listingRefId: response.id });
	};

	if (loading) return <LoadingScreen />;

	return (
		<ScrollView>
			<Screen style={styles.screen}>
				<NavHeader title='New Vehicle' />
				<View style={styles.formContainer}>
					<Form
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						<FormField
							label='Make'
							name='make'
							placeholder='Honda, Nissan, etc'
						/>
						<FormField
							label='Model'
							name='model'
							placeholder='Accord, Noah, etc'
						/>
						<FormField
							label='Year'
							name='year'
							placeholder='0000'
							width={100}
						/>
						<FormField
							label='Price per day (JMD)'
							name='price'
							placeholder='8000'
							width={120}
						/>
						<FormPicker
							items={transmissionItems}
							name='transmission'
							placeholder='Transmission'
							label='Transmission'
							width={200}
						/>
						<FormPicker
							items={fuelItems}
							name='fuel'
							placeholder='Fuel'
							label='Fuel'
							width={200}
						/>
						<View style={styles.buttonContainer}>
							<SubmitButton title='Next' disabled={loading} />
						</View>
					</Form>
				</View>
			</Screen>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		marginTop: 50,
	},
	screen: {
		paddingHorizontal: 12,
	},
	buttonContainer: {
		marginVertical: 24,
	},
});

export default NewVehicleScreen;
