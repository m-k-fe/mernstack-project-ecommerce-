import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/products",
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      console.log(err);
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

export const filterByCategory = createAsyncThunk(
  "products/filterByCategory",
  async (category) => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/products?category=${category}`,
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const filterByPrice = createAsyncThunk(
  "products/filterByPrice",
  async (query) => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/products?${query}`,
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addReview = createAsyncThunk(
  "products/addReview",
  async ({ star, productId, comment, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: "/api/products/ratings",
        data: {
          star,
          productId,
          comment,
        },
        withCredentials: true,
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.Data.message);
    }
  }
);

export const getRelatedProducts = createAsyncThunk(
  "products/getRelatedProducts",
  async ({ category, id }) => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/products?category=${category}`,
        withCredentials: true,
      });
      return { relatedProducts: response.data, id };
    } catch (err) {
      console.log(err);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    relatedProducts: [],
    product: {},
  },
  reducers: {},
  extraReducers: {
    [getProducts.fulfilled]: (state, { payload }) => {
      state.products = payload;
    },
    [getProduct.fulfilled]: (state, { payload }) => {
      state.product = payload;
    },
    [getRelatedProducts.fulfilled]: (state, { payload }) => {
      state.relatedProducts = payload.relatedProducts.filter(
        (item) => item._id !== payload.id
      );
    },
    [filterByCategory.fulfilled]: (state, { payload }) => {
      state.products = payload;
    },
    [filterByPrice.fulfilled]: (state, { payload }) => {
      state.products = payload;
    },
    [addReview.fulfilled]: (state, { payload }) => {
      state.product = payload;
    },
  },
});

export const {} = productsSlice.actions;
export default productsSlice.reducer;
