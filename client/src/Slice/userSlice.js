// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.isAdmin = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setAuth: (state, action) => {
      state.isAuthenticated = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setAdmin: (state, action) => {
      state.isAdmin = true;
    },
  },
});

export const { setUser, clearUser, setAuth, setError, setAdmin } =
  userSlice.actions;

export default userSlice.reducer;
