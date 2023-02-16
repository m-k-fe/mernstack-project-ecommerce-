import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ setError, setSuccess, setUser, user }, { rejectWithValue }) => {
    const { email, password } = user;
    try {
      const response = await axios({
        method: "post",
        url: "/api/auth/login",
        data: {
          email,
          password,
        },
        withCredentials: true,
      });
      setSuccess(response.data.message);
      setUser({
        email: "",
        password: "",
      });
    } catch (err) {
      setError(err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getToken = createAsyncThunk("auth/getToken", async () => {
  try {
    const response = await axios({
      method: "get",
      url: "/api/auth/refresh-token",
      withCredentials: true,
    });
    return response.data.accessToken;
  } catch (err) {
    console.log(err.response.data.message);
  }
});

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {},
  extraReducers: {
    [getToken.pending]: (state, { payload }) => {
      state.token = null;
    },
    [getToken.fulfilled]: (state, { payload }) => {
      state.token = payload;
    },
    [getToken.rejected]: (state, { payload }) => {
      state.token = null;
    },
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
