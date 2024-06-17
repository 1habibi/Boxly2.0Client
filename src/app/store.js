import authReducer from "../features/auth/authSlice.js";
import { apiSlice } from "@/app/api/apiSlice.js";
import { listenerMiddleware } from "@/middleware/auth.js";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer
	},
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware()
			.concat(apiSlice.middleware)
			.prepend(listenerMiddleware.middleware);
	},
	devTools: true
});

setupListeners(store.dispatch);
