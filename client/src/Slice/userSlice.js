// userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isAdmin: false,
  contact: null,
  pincode: null,
  avatar: null,
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
    setContact: (state, action) => {
      state.contact = action.payload;
    },

    setPincode: (state, action) => {
      state.pincode = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setAdmin: (state) => {
      state.isAdmin = true;
    },
    setAlpha: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  setAuth,
  setError,
  setAdmin,
  setContact,
  setPincode,
} = userSlice.actions;

export default userSlice.reducer;
