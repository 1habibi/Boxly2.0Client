import { apiSlice } from "@/app/api/apiSlice.js";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...userData },
      }),
    }),
    refreshAccessToken: builder.query({
      query: () => ({
        url: "/auth/refresh-tokens",
        method: "GET",
      }),
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshAccessTokenQuery,
  useGetCurrentUserQuery,
} = authApiSlice;
