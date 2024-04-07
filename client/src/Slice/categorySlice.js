import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, actions) {
      state.categories = actions.payload;
    },
    resetCategories(state) {
      state.categories = null;
    },
  },
});

export const { setCategories, resetCategories } = categorySlice.actions;

export default categorySlice.reducer;
