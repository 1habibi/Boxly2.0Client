import {
	logOut,
	setCredentials,
	setTokenRefreshing
} from "@/features/auth/authSlice.js";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = sessionStorage.getItem("accessToken");
		if (token) {
			headers.set("authorization", `${token}`);
		}
		return headers;
	}
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	const accessToken = sessionStorage.getItem("accessToken");

	if (
		result?.error?.status === 401 &&
		args.url !== "/auth/login" &&
		accessToken
	) {
		const refreshResult = await baseQuery("/auth/refresh-tokens", api, {
			...extraOptions,
			onQueryStarted: (arg, { dispatch }) => {
				dispatch(setTokenRefreshing(true));
			},
			onSuccess: (data, arg, { dispatch }) => {
				dispatch(setTokenRefreshing(false));
			}
		});
		console.log("refresh result: ", refreshResult);
		if (refreshResult?.data) {
			api.dispatch(setCredentials({ ...refreshResult.data }));
			sessionStorage.setItem("accessToken", refreshResult.data.accessToken);
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(logOut());
		}
	}
	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Order", "Profile", "User"],
	endpoints: builder => ({})
});
