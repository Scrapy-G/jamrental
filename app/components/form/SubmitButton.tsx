import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

type SubmitButtonProps = {
	title: string;
	disabled: boolean;
};

function SubmitButton({ title, disabled = false }: SubmitButtonProps) {
	const { submitForm } = useFormikContext();

	return (
		<Button
			title={title}
			onPress={submitForm}
			disabled={disabled}
			style={{ marginVertical: 16 }}
		/>
	);
}

export default SubmitButton;
