import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/app/api/apiSlice.js";
import authReducer from "../features/auth/authSlice.js";
import { listenerMiddleware } from "@/middleware/auth.js";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .prepend(listenerMiddleware.middleware);
  },
  devTools: true,
});
