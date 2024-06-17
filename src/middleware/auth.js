import { authApiSlice } from "@/features/auth/authApiSlice.js";
import { createListenerMiddleware } from "@reduxjs/toolkit";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	matcher: authApiSlice.endpoints.login.matchFulfilled,
	effect: async (action, listenerApi) => {
		listenerApi.cancelActiveListeners();
		if (action.payload.accessToken) {
			sessionStorage.setItem("accessToken", action.payload.accessToken);
		}
	}
});
