import { apiSlice } from "@/app/api/apiSlice.js";

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getAllUsers: builder.query({
			query: () => ({
				url: "/user/all",
				method: "GET"
			}),
			providesTags: ["User"]
		}),
		getAllCouriers: builder.query({
			query: () => ({
				url: "/user/couriers",
				method: "GET"
			}),
			providesTags: ["User"]
		}),
		editUser: builder.mutation({
			query: ({ userData, id }) => ({
				url: `/user/${id}/email-change`,
				method: "PATCH",
				body: { ...userData }
			}),
			invalidatesTags: ["User"]
		}),
		editUserPassword: builder.mutation({
			query: ({ passwordData, id }) => ({
				url: `/user/${id}/password-change`,
				method: "PATCH",
				body: { ...passwordData }
			}),
			invalidatesTags: ["User"]
		})
	})
});

export const {
	useGetAllUsersQuery,
	useGetAllCouriersQuery,
	useEditUserMutation,
	useEditUserPasswordMutation
} = userApiSlice;
