import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createUserCart = createAsyncThunk(
  "cart/addToCart",
  async ({ cartItems, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/users/cart",
        { cart: cartItems },
        { headers: { Authorization: token } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cart-items")
      ? JSON.parse(localStorage.getItem("cart-items"))
      : [],
  },
  reducers: {
    addToCart: (state, { payload }) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id == payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].qty += 1;
      } else {
        const choosenItem = { ...payload, qty: 1 };
        state.cartItems.push(choosenItem);
      }
      localStorage.setItem("cart-items", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, { payload }) => {
      const cartItemsClone = [...state.cartItems];
      const newCartItems = cartItemsClone.filter(
        (item) => item.id != payload.id
      );
      state.cartItems = newCartItems;
      localStorage.setItem("cart-items", JSON.stringify(state.cartItems));
    },
    decreaseQty: (state, { payload }) => {
      const cartItemsClone = [...state.cartItems];
      const itemIndex = cartItemsClone.findIndex(
        (item) => item._id == payload._id
      );
      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].qty > 1)
          state.cartItems[itemIndex].qty -= 1;
        else if (state.cartItems[itemIndex].qty == 1) {
          const newCartItems = cartItemsClone.filter(
            (item) => item._id != payload._id
          );
          state.cartItems = newCartItems;
        }
        localStorage.setItem("cart-items", JSON.stringify(state.cartItems));
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart-items", JSON.stringify(state.cartItems));
    },
  },
  extraReducers: {},
});

export const { addToCart, removeFromCart, decreaseQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
