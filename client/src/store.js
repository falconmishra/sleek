import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";
import cartReducer from "./Slice/cartSlice";
import clickedProductReducer from "./Slice/clickedProductSlice";
import categoryReducer from "./Slice/categorySlice";
import orderReducer from "./Slice/orderSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    clicked: clickedProductReducer,
    categories: categoryReducer,
    order: orderReducer,
  },
});
