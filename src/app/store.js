import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/app/api/apiSlice.js";
import authReducer from "../features/auth/authSlice.js";
import userReducer from "../features/user/userSlice.js";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: true,
});
