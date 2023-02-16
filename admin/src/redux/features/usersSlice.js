import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/users/all-info",
        withCredentials: true,
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

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

export const getUser = createAsyncThunk(
  "users/getUser",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/users/${id}`,
        withCredentials: true,
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateUsersRole = createAsyncThunk(
  "users/updateUsersRole",
  async ({ id, role, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "patch",
        url: `/api/users/update-role/${id}`,
        data: {
          role,
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

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "delete",
        url: `/api/users/delete/${id}`,
        withCredentials: true,
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getAllMessages = createAsyncThunk(
  "users/getAllMessages",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/users/all-messages",
        withCredentials: true,
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getMessage = createAsyncThunk(
  "users/getMessage",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/users/message/${id}`,
        withCredentials: true,
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "users/deleteMessage",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "delete",
        url: "/api/users/delete-message/" + id,
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
    custommers: [],
    custommer: {},
    message: {},
    messages: [],
  },
  reducers: {},
  extraReducers: {
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.custommers = payload;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.custommer = payload;
    },
    [updateUsersRole.fulfilled]: (state, { payload }) => {
      state.message = payload;
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.message = payload;
    },
    [getUserInfo.fulfilled]: (state, { payload }) => {
      state.custommer = payload;
    },
    [getAllMessages.fulfilled]: (state, { payload }) => {
      state.messages = payload;
    },
    [getMessage.fulfilled]: (state, { payload }) => {
      state.message = payload;
    },
  },
});

export default usersSlice.reducer;
