import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import {
  logOut,
  setCredentials,
  setTokenRefreshing,
} from "@/features/auth/authSlice.js";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token;
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const accessToken = sessionStorage.getItem("accessToken");

  if (
    result?.error?.status === 401 &&
    args.url !== "/auth/login" &&
    accessToken
  ) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh-tokens", api, {
      ...extraOptions,
      onQueryStarted: (arg, { dispatch }) => {
        dispatch(setTokenRefreshing(true));
      },
      onSuccess: (data, arg, { dispatch }) => {
        // Установить состояние загрузки после получения ответа
        dispatch(setTokenRefreshing(false));
      },
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
  tagTypes: ["Order", "Profile"],
  endpoints: (builder) => ({}),
});
