import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {authService} from "../../services/authService.js";
import {userService} from "../../services/userService.js";

/**
 * Redux slice for managing login authentication status.
 * * @typedef {Object} LoginState
 * @property {Object|null} loginUser - Profile data of the currently logged-in user.
 * @property {boolean} isLogin - Status indicating if a user session is active.
 * @property {boolean} isLoading - Status for ongoing login API requests.
 * @property {string|null} error - Error message if the login attempt fails.
 * @property {string} successMsg - Success feedback message after a successful login.
 */

const initialState = {
    loginUser: null,
    token: null,
    isLogin: false,
    isLoading: false,
    error: null,
};

const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (payload, { rejectWithValue }) => {
        try {
            const data = await authService.login(payload);
            const profile = await userService.getProfile();
            return {
                token:      data.token,
                has_pin:    data.has_pin,
                full_name:  data.full_name,
                ...profile,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed. Please check your account again."
            );
        }
    },
);

const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout();
        } catch (error) {
            console.error("Logout error:", error);
            return rejectWithValue(error.response?.data?.message || "Logout failed");
        }
    },
);

const loginSlice = createSlice({
  name: "authLogin",
  initialState,
  reducers: {
    logoutUser: (prevState) => {
      return {
        ...prevState,
        loginUser: null,
        isLogin: false,
      };
    },
    clearError: (prevState) => {
      return {
        ...prevState,
        error: null,
      };
    },
    updateUserPin: (state, action) => {
      if (state.loginUser) {
        state.loginUser.pin = action.payload;
      }
    },
    syncActiveSession: (state, action) => {
      if (state.loginUser) {
        state.loginUser = { ...state.loginUser, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMsg = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
        state.loginUser = action.payload;
        state.successMsg = "Login Success";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const loginActions = {
  ...loginSlice.actions,
  loginUser,
};

export default loginSlice.reducer;
