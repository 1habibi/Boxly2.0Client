import { createSlice } from "@reduxjs/toolkit";
import { userApiSlice } from "@/features/user/userApiSlice.js";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    id: null,
    email: null,
    roles: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApiSlice.endpoints.currentUser.matchFulfilled,
      (state, action) => {
        const { id, email, roles } = action.payload;
        state.id = id;
        state.email = email;
        state.roles = roles;
      }
    );
  },
});

export const { setCredentials, logOut } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
