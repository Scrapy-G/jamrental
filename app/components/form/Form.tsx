import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

type FormProps = {
	initialValues: any;
	onSubmit: (arg: any) => void;
	validationSchema: Yup.ObjectSchema<any>;
	children: React.ReactNode;
};

function Form({
	initialValues,
	onSubmit,
	validationSchema,
	children,
}: FormProps) {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{() => <>{children}</>}
		</Formik>
	);
}

export default Form;
