import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  TotalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;

      const existingItemIndex = state.items.findIndex(
        (item) => item._id === newItem._id
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quan++;
      } else {
        state.items.push({ ...newItem, quan: 1 });
      }
      state.TotalPrice += newItem.price;
    },

    removeItemFromCart(state, action) {
      const itemId = action.payload._id;
      state.items = state.items.filter((item) => item._id !== itemId);
      state.TotalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quan,
        0
      );
    },
    increaseItemQuan(state, action) {
      const newItem = action.payload;
      const foundItem = state.items.find((item) => item._id === newItem._id);
      if (foundItem) {
        foundItem.quan++;
        state.TotalPrice += foundItem.price;
      }
    },
    decreaseItemQuan(state, action) {
      const newItem = action.payload;
      const foundItem = state.items.find((item) => item._id === newItem._id);
      if (foundItem && foundItem.quan > 1) {
        foundItem.quan--;
        state.TotalPrice -= foundItem.price;
      }
    },
    clearCart(state) {
      state.items = [];
      state.TotalPrice = 0;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuan,
  decreaseItemQuan,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
