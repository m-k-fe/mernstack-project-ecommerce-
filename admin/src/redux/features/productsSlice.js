import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/products",
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      console.log(err.response.data.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/api/products",
        data,
        withCredentials: true,
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "users/editProduct",
  async ({ data, id, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `/api/products/${id}`,
        data,
        withCredentials: true,
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id) => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/products/${id}`,
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "delete",
        url: `/api/products/${id}`,
        withCredentials: true,
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {},
  },
  reducers: {},
  extraReducers: {
    [getAllProducts.fulfilled]: (state, { payload }) => {
      state.products = payload;
    },
    [getProduct.fulfilled]: (state, { payload }) => {
      state.product = payload;
    },
  },
});

export default productsSlice.reducer;
