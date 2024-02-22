import { apiSlice } from "@/app/api/apiSlice.js";
import { setTokenRefreshing } from "@/features/auth/authSlice.js";

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
      onQueryStarted: (arg, { dispatch }) => {
        dispatch(setTokenRefreshing(true));
      },
      onSuccess: (data, arg, { dispatch }) => {
        // Установить состояние загрузки после получения ответа
        dispatch(setTokenRefreshing(false));
      },
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    getCurrentProfile: builder.query({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "GET",
      }),
    }),
    createProfile: builder.mutation({
      query: (profileData) => ({
        url: "/profile",
        method: "POST",
        body: { ...profileData },
      }),
    }),
    editProfile: builder.mutation({
      query: ({ profileData, id }) => ({
        url: `/profile/${id}`,
        method: "PATCH",
        body: { ...profileData },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshAccessTokenQuery,
  useLazyGetCurrentUserQuery,
  useLazyGetCurrentProfileQuery,
  useGetCurrentUserQuery,
  useGetCurrentProfileQuery,
  useCreateProfileMutation,
  useEditProfileMutation,
} = authApiSlice;
