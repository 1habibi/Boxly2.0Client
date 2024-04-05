import { apiSlice } from "@/app/api/apiSlice.js";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrders: builder.query({
      query: (userId) => ({
        url: `/order/user/${userId}`,
        method: "GET",
      }),
    }),
    postOrderQr: builder.mutation({
      query: (qr) => ({
        url: "/order/createQR",
        method: "POST",
        body: { qr },
      }),
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order/create",
        method: "POST",
        body: { ...orderData },
      }),
    }),
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "GET",
      }),
    }),
    getOrderByIdWithItems: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}/with-items`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserOrdersQuery,
  usePostOrderQrMutation,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetOrderByIdWithItemsQuery,
} = orderApiSlice;
