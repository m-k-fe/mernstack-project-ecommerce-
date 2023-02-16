import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async ({ paymentInfo, method, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/users/cart/cash-order",
        { paymentInfo, method },
        { headers: { Authorization: token } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/users/orders", {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },
  reducers: {},
  extraReducers: {
    [getOrders.fulfilled]: (state, { payload }) => {
      state.orders = payload;
    },
  },
});

export const {} = orderSlice.actions;
export default orderSlice.reducer;
