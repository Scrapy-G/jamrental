import React from "react";

import Text from "./Text";

type Props = {
	children: any;
};

export default function Heading({ children }: Props) {
	return (
		<Text bold style={{ fontSize: 28 }}>
			{children}
		</Text>
	);
}
