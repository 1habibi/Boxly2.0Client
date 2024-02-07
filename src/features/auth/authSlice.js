import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice } from "@/features/auth/authApiSlice.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    user: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
    logOut: (state, action) => {
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApiSlice.endpoints.login.matchFulfilled,
        (state, action) => {
          const { accessToken } = action.payload;
          state.accessToken = accessToken;
        }
      )
      .addMatcher(
        authApiSlice.endpoints.getCurrentUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        }
      );
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user.email;
export const selectCurrentToken = (state) => state.auth.accessToken;
