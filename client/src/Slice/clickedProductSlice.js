// clickedProductSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  product: null,
};

// Create a slice
const clickedProductSlice = createSlice({
  name: "clickedProduct",
  initialState,
  reducers: {
    // Action to set the clicked product
    setClickedProduct(state, action) {
      state.product = action.payload;
    },
    // Action to clear the clicked product
    clearClickedProduct(state) {
      state.product = null;
    },
  },
});

// Export action creators
export const { setClickedProduct, clearClickedProduct } =
  clickedProductSlice.actions;

// Export reducer
export default clickedProductSlice.reducer;
