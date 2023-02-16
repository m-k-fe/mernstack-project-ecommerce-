import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserInfo = createAsyncThunk(
  "users/getUserInfo",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/users/info",
        withCredentials: true,
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const sendToAdmin = createAsyncThunk(
  "users/sendToAdmin",
  async ({ info, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/api/users/send-to-admin",
        data: {
          name: info.name,
          email: info.email,
          object: info.object,
          msg: info.msg,
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

export const editProfile = createAsyncThunk(
  "users/editProfile",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: "/api/users/edit-profile",
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

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
  },
  reducers: {},
  extraReducers: {
    [getUserInfo.fulfilled]: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export default usersSlice.reducer;
