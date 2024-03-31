import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";
import cartReducer from "./Slice/cartSlice";
import clickedProductReducer from "./Slice/clickedProductSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    clicked: clickedProductReducer,
  },
});
