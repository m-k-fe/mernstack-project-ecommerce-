import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/api/auth/login-admin",
        data: {
          email: user.email,
          password: user.password,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const forgotPasswordAdmin = createAsyncThunk(
  "auth/forgotPasswordAdmin",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/api/auth/forgot-password-admin",
        data: {
          email,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const resetPasswordAdmin = createAsyncThunk(
  "auth/resetPasswordAdmin",
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: "/api/auth/reset-password",
        data: {
          password,
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

export const getAccessToken = createAsyncThunk(
  "auth/getAccessToken",
  async () => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/auth/refresh-token",
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const logOutAdmin = createAsyncThunk(
  "auth/logOutAdmin",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/api/auth/logout",
        withCredentials: true,
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    loginError: null,
    loginSuccess: null,
    forgotSuccess: null,
    forgotError: null,
    resetSuccess: null,
    resetError: null,
    token: null,
  },
  reducers: {
    reset: (state, { payload }) => {
      state.loading = false;
      state.loginSuccess = null;
      state.loginError = null;
      state.forgotSuccess = null;
      state.forgotError = null;
      state.resetSuccess = null;
      state.resetError = null;
    },
  },
  extraReducers: {
    [loginAdmin.pending]: (state, { payload }) => {
      state.loading = true;
      state.loginSuccess = false;
      state.loginError = null;
    },
    [loginAdmin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loginSuccess = payload.message;
      state.loginError = null;
    },
    [loginAdmin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.loginSuccess = null;
      state.loginError = payload;
    },
    [forgotPasswordAdmin.pending]: (state, { payload }) => {
      state.loading = true;
      state.forgotSuccess = false;
      state.forgotError = null;
    },
    [forgotPasswordAdmin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.forgotSuccess = payload.message;
      state.forgotError = null;
    },
    [forgotPasswordAdmin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.forgotSuccess = null;
      state.forgotError = payload;
    },
    [resetPasswordAdmin.pending]: (state, { payload }) => {
      state.loading = true;
      state.resetSuccess = false;
      state.resetError = null;
    },
    [resetPasswordAdmin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.resetSuccess = payload.message;
      state.resetError = null;
    },
    [resetPasswordAdmin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.resetSuccess = null;
      state.resetError = payload;
    },
    [getAccessToken.pending]: (state, { payload }) => {
      state.token = null;
    },
    [getAccessToken.fulfilled]: (state, { payload }) => {
      state.token = payload.accessToken;
    },
    [getAccessToken.rejected]: (state, { payload }) => {
      state.token = null;
    },
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
