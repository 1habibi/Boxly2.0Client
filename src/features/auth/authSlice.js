import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice } from "@/features/auth/authApiSlice.js";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		accessToken: null,
		isAuthenticated: false,
		isTokenRefreshing: false
	},
	reducers: {
		setCredentials: (state, action) => {
			const { accessToken } = action.payload;
			state.accessToken = accessToken;
		},
		logOut: (state, action) => {
			state.accessToken = null;
			state.isAuthenticated = false;
			sessionStorage.removeItem("accessToken");
		},
		setTokenRefreshing: (state, action) => {
			state.isTokenRefreshing = action.payload;
		}
	},
	extraReducers: builder => {
		builder
			.addMatcher(
				authApiSlice.endpoints.login.matchFulfilled,
				(state, action) => {
					const { accessToken } = action.payload;
					state.accessToken = accessToken;
					state.isAuthenticated = true;
				}
			)
			.addMatcher(
				authApiSlice.endpoints.getCurrentUser.matchFulfilled,
				(state, action) => {
					state.isAuthenticated = true;
				}
			)
			.addMatcher(
				authApiSlice.endpoints.getCurrentProfile.matchFulfilled,
				(state, action) => {
					state.isAuthenticated = true;
				}
			);
	}
});

export const { setCredentials, logOut, setTokenRefreshing } = authSlice.actions;

export default authSlice.reducer;

export const selectIsTokenRefreshing = state => state.auth.isTokenRefreshing;
export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectCurrentUser = state => state.auth.user;
export const selectCurrentProfile = state => state.auth.profile;
export const selectCurrentToken = state => state.auth?.accessToken;
