import { orderApiSlice } from "@/features/order/orderApiSlice.js";
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setOrders: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      orderApiSlice.endpoints.getUserOrders.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
    builder.addMatcher(
      orderApiSlice.endpoints.createOrder.matchFulfilled,
      (state, action) => {
        // Обновляем данные заказов после успешного создания нового заказа
        state.items.push(action.payload); // предположим, что созданный заказ возвращается как часть ответа
      }
    );
  },
});

export const { setOrders } = orderSlice.actions;

export default orderSlice.reducer;

export const selectOrders = (state) => state.order.items;
