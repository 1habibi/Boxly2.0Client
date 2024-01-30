import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "@/features/auth/authSlice.js";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    console.log("token", token);
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403 || result?.error?.status === 401) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      "/auth/refresh-tokens",
      api,
      extraOptions
    );
    console.log("refresh result: ", refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
