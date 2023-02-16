import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios({
        metod: "get",
        url: "/api/users/all-orders",
        withCredentials: true,
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getOrder = createAsyncThunk(
  "orders/getOrder",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/users/orders/${id}`,
        withCredentials: true,
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const changeOrderStatus = createAsyncThunk(
  "orders/changeOrderStatus",
  async ({ id, status, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `/api/users/orders/${id}`,
        data: {
          status,
        },
        withCredentials: true,
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    order: {},
  },
  reducers: {},
  extraReducers: {
    [getAllOrders.fulfilled]: (state, { payload }) => {
      state.orders = payload;
    },
    [getOrder.fulfilled]: (state, { payload }) => {
      state.order = payload;
    },
  },
});

export default ordersSlice.reducer;
