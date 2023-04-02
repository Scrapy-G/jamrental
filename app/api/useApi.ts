import { useEffect, useState } from "react";

const useApi = (apiCall: (...args: any) => Promise<any>) => {
	const [error, setError] = useState<any>();
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<any>();

	const request = async (...params: any) => {
		setLoading(true);
		setError(false);

		try {
			const response = await apiCall(...params);
			setData(response);
			return response;
		} catch (error) {
			setError(error);
			console.log("error", error);
		} finally {
			setLoading(false);
		}
	};

	return { data, loading, error, request };
};

export default useApi;
