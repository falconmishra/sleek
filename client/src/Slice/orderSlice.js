import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  address: "",
  customerId: "",
  customerEmail: "",
  products: [],
  totalPrice: "",
  status: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const {
        username,
        address,
        customerId,
        customerEmail,
        products,
        totalPrice,
        status,
      } = action.payload;
      state.username = username;
      state.address = address;
      state.customerId = customerId;
      state.customerEmail = customerEmail;
      state.products = products;
      state.totalPrice = totalPrice;
      state.status = status;
    },

    clearOrders: (state) => {
      (state.username = ""),
        (state.address = ""),
        (state.customerId = ""),
        (state.customerEmail = ""),
        (state.products = []),
        (state.totalPrice = ""),
        (state.status = "");
    },
  },
});

export const { addOrder, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
