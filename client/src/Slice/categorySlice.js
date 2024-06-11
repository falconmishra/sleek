import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosbase"; // Make sure axios is imported

// Define the async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await axios.get("/category/getCategories");
    return response.data.category;
  }
);

// Define the initial state for the slice
const initialState = {
  categories: [],
};

// Create the category slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    resetCategories(state) {
      state.categories = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

// Export the action creators
export const { setCategories, resetCategories } = categorySlice.actions;

// Export the reducer
export default categorySlice.reducer;
