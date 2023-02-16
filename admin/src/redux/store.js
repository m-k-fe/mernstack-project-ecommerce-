import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import ordersSlice from "./features/ordersSlice";
import productsSlice from "./features/productsSlice";
import usersSlice from "./features/usersSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    orders: ordersSlice,
    users: usersSlice,
    products: productsSlice,
  },
});

export default store;
