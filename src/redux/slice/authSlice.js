import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService.js";
import { userService } from "../../services/userService.js";
import api from "../../services/api.js";

const initialState = {
    loginUser: null,
    token: null,
    isLogin: false,
    isLoading: false,
    error: null,
    successMsg: null,
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

const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
    try {
        await authService.logout();
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
});

const registerUser = createAsyncThunk("auth/registerUser", async (payload, { rejectWithValue }) => {
    try {
        return await authService.register(payload);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
});

const forgotPasswordUser = createAsyncThunk("auth/forgotPasswordUser", async (payload, { rejectWithValue }) => {
    try {
        return await authService.forgotPassword(payload);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to send recovery email");
    }
});

const resetPasswordUser = createAsyncThunk("auth/resetPasswordUser", async (payload, { rejectWithValue }) => {
    try {
        return await authService.resetPassword(payload);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to reset password");
    }
});

const updateProfileUser = createAsyncThunk("auth/updateProfileUser", async (payload, { rejectWithValue }) => {
    try {
        return await userService.updateProfile(payload);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
});

const changePasswordUser = createAsyncThunk("auth/changePasswordUser", async (payload, { rejectWithValue }) => {
    try {
        return await userService.changePassword(payload);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to change password");
    }
});

const changePinUser = createAsyncThunk("auth/changePinUser", async (payload, { rejectWithValue }) => {
    try {
        return await userService.changePin(payload);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update PIN");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.successMsg = null;
        },
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
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLogin = true;
                state.token = action.payload.token;
                state.loginUser = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, () => ({ ...initialState }))
            .addCase(logoutUser.rejected, () => ({ ...initialState }))
            .addCase(registerUser.fulfilled, (state) => {
                state.successMsg = "Registration successful! Please log in to your account.";
            })
            .addCase(forgotPasswordUser.fulfilled, (state) => {
                state.successMsg = "A password recovery link has been sent to your email.";
            })
            .addCase(resetPasswordUser.fulfilled, (state) => {
                state.successMsg = "Your password has been successfully updated.";
            })
            .addCase(updateProfileUser.fulfilled, (state, action) => {
                state.successMsg = "Your profile has been successfully updated!";
                if (state.loginUser) {
                    state.loginUser = { ...state.loginUser, ...(action.payload?.data || action.payload) };
                }
            })
            .addCase(changePasswordUser.fulfilled, (state) => {
                state.successMsg = "Password successfully changed!";
            })
            .addCase(changePinUser.fulfilled, (state) => {
                state.successMsg = "Your PIN has been successfully updated!";
            })
            .addMatcher(
                (action) => action.type.startsWith("auth/") && action.type.endsWith("/pending"),
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                    state.successMsg = null;
                },
            )
            .addMatcher(
                (action) => action.type.startsWith("auth/") && action.type.endsWith("/fulfilled"),
                (state) => {
                    state.isLoading = false;
                },
            )
            .addMatcher(
                (action) => action.type.startsWith("auth/") && action.type.endsWith("/rejected"),
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            );
    },
});

export const authActions = {
    ...authSlice.actions,
    loginUser,
    logoutUser,
    registerUser,
    forgotPasswordUser,
    resetPasswordUser,
    updateProfileUser,
    changePasswordUser,
    changePinUser,
};

export default authSlice.reducer;