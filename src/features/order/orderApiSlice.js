import { apiSlice } from "@/app/api/apiSlice.js";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrders: builder.query({
      query: (userId) => ({
        url: `/order/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    postOrderQr: builder.mutation({
      query: (qr) => ({
        url: "/order/createQR",
        method: "POST",
        body: { qr },
      }),
      invalidatesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order/create",
        method: "POST",
        body: { ...orderData },
      }),
      invalidatesTags: ["Order"],
    }),
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    getOrderByIdWithItems: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}/with-items`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetUserOrdersQuery,
  usePostOrderQrMutation,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetOrderByIdWithItemsQuery,
  useDeleteOrderMutation,
} = orderApiSlice;
