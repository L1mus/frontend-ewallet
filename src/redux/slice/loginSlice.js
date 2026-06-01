import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {authService} from "../../services/authService.js";
import {userService} from "../../services/userService.js";
import api from "../../services/api.js";

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

const loginUser = createAsyncThunk("auth/loginUser", async (payload, { rejectWithValue }) => {
    try {
        const data = await authService.login(payload);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        const profile = await userService.getProfile();
        return { token: data.token, has_pin: data.has_pin, ...profile };
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login failed.");
    }
});

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
        clearError: (state) => { state.error = null; },
        updateUserPin: (state) => {
            if (state.loginUser) state.loginUser.has_pin = true;
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
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLogin = true;
                state.token = action.payload.token;
                state.loginUser = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, () => ({
                ...initialState,
            }))
            .addCase(logoutUser.rejected, () => ({
                ...initialState,
            }));
    },
});

export const loginActions = {
  ...loginSlice.actions,
  loginUser,
  logoutUser,
};

export default loginSlice.reducer;
