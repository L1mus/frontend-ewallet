import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService.js";
import { userService } from "../../services/userService.js";

/**
 * Redux slice for managing registration and account recovery (forgot password, PIN creation).
 * * @typedef {Object} RegisterState
 * @property {Array} registerUser - List of registered users (Mock Database).
 * @property {number} lastId - The last used ID for generating new registrations.
 * @property {boolean} isLoading - Status for ongoing asynchronous operations.
 * @property {string|null} successMsg - Success feedback message.
 * @property {string|null} error - Centralized error message object.
 */

const initialState = {
  isLoading: false,
  successMsg: null,
  error: null,
};

const registerUser = createAsyncThunk(
    "authRegister/registerUser",
    async (payload, { rejectWithValue }) => {
      try {
        const data = await authService.register(payload);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Registration failed");
      }
    },
);

const forgotPasswordUser = createAsyncThunk(
    "authRegister/forgotPasswordUser",
    async (payload, { rejectWithValue }) => {
      try {
        const data = await authService.forgotPassword(payload);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to send recovery email");
      }
    },
);

const createPinUser = createAsyncThunk(
    "authRegister/createPinUser",
    async (payload, { rejectWithValue }) => {
      try {
        const data = await userService.changePin({
          current_pin: "",
          new_pin: payload.pin,
          confirm_new_pin: payload.pin
        });
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to create PIN");
      }
    },
);

const updateProfileUser = createAsyncThunk(
    "authRegister/updateProfileUser",
    async (payload, { rejectWithValue }) => {
      try {
        const data = await userService.updateProfile(payload);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update profile");
      }
    },
);

const changePasswordUser = createAsyncThunk(
    "authRegister/changePasswordUser",
    async (payload, { rejectWithValue }) => {
      try {
        const data = await userService.changePassword(payload);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to change password");
      }
    },
);

const changePinUser = createAsyncThunk(
    "authRegister/changePinUser",
    async (payload, { rejectWithValue }) => {
      try {
        const data = await userService.changePin(payload);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update PIN");
      }
    },
);

const resetPasswordUser = createAsyncThunk(
    "authRegister/resetPasswordUser",
    async (payload, { rejectWithValue }) => {
      try {
        const data = await authService.resetPassword(payload);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to reset password");
      }
    },
);

const registerSlice = createSlice({
  name: "authRegister",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.successMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
        // Register
        .addCase(registerUser.fulfilled, (state) => {
          state.isLoading = false;
          state.successMsg = "Registration successful! Please log in to your account.";
        })
        // Forgot Password
        .addCase(forgotPasswordUser.fulfilled, (state) => {
          state.isLoading = false;
          state.successMsg = "A password recovery link has been sent to your email.";
        })
        // Reset Password
        .addCase(resetPasswordUser.fulfilled, (state) => {
          state.isLoading = false;
          state.successMsg = "Your password has been successfully updated.";
        })
        // Update Profile
        .addCase(updateProfileUser.fulfilled, (state) => {
          state.isLoading = false;
          state.successMsg = "Your profile has been successfully updated!";
        })
        // Change Password
        .addCase(changePasswordUser.fulfilled, (state) => {
          state.isLoading = false;
          state.successMsg = "Password successfully changed!";
        })
        // Change PIN
        .addCase(changePinUser.fulfilled, (state) => {
          state.isLoading = false;
          state.successMsg = "Your PIN has been successfully updated!";
        })
        .addMatcher(
            (action) => action.type.startsWith("authRegister/") && action.type.endsWith("/pending"),
            (state) => {
              state.isLoading = true;
              state.error = null;
              state.successMsg = null;
            },
        )
        .addMatcher(
            (action) => action.type.startsWith("authRegister/") && action.type.endsWith("/rejected"),
            (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            },
        );
  },
});

export const registerActions = {
  ...registerSlice.actions,
  registerUser,
  forgotPasswordUser,
  resetPasswordUser,
  updateProfileUser,
  changePasswordUser,
  changePinUser,
};

export default registerSlice.reducer;
