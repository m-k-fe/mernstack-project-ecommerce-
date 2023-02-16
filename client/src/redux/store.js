import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import cartSlice from "./features/cartSlice";
import orderSlice from "./features/orderSlice";
import productsSlice from "./features/productsSlice";
import usersSlice from "./features/usersSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    cart: cartSlice,
    order: orderSlice,
    users: usersSlice,
  },
});
export default store;
