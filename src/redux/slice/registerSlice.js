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
    clearError: (prevState) => {
      return {
        ...prevState,
        error: initialState.error,
      };
    },
    updateBalance: (state, action) => {
      const { userId, newBalance } = action.payload;
      const userIdx = state.registerUser.findIndex((u) => u.id === userId);
      if (userIdx !== -1) {
        state.registerUser[userIdx].balance = newBalance;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registerUser.push(action.payload);
        state.lastId++;
        state.successMsg = `Register success, Welcome ${action.payload?.username}`;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // forgotPasswordUser
      .addCase(forgotPasswordUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const idx = state.registerUser.findIndex(
          (u) => u.email === action.payload.email,
        );
        if (idx !== -1) {
          state.registerUser[idx] = {
            ...state.registerUser[idx],
            ...action.payload,
          };
        }
        state.successMsg = `Email sending to ${action.payload?.email}`;
      })
      // Create PIN
      .addCase(createPinUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const idx = state.registerUser.findIndex(
          (u) => u.email === action.payload.email,
        );
        if (idx !== -1) {
          state.registerUser[idx] = {
            ...state.registerUser[idx],
            pin: action.payload.pin,
          };
        }
        state.successMsg = "PIN created successfully";
      })
      // Update Profile
      .addCase(updateProfileUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const idx = state.registerUser.findIndex(
          (u) => u.email === action.payload.email,
        );
        if (idx !== -1) {
          state.registerUser[idx] = {
            ...state.registerUser[idx],
            ...action.payload,
          };
        }
        state.successMsg = "Profil berhasil diperbarui!";
      })
      // Change Password
      .addCase(changePasswordUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const idx = state.registerUser.findIndex(
          (u) => u.email === action.payload.email,
        );
        if (idx !== -1) {
          state.registerUser[idx] = {
            ...state.registerUser[idx],
            password: action.payload.password,
          };
        }
        state.successMsg = "Kata sandi berhasil diubah!";
      })
      //Change PIN
      .addCase(changePinUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const idx = state.registerUser.findIndex(
          (u) => u.email === action.payload.email,
        );
        if (idx !== -1) {
          state.registerUser[idx] = {
            ...state.registerUser[idx],
            pin: action.payload.pin,
          };
        }
        state.successMsg = "PIN keamanan berhasil diubah!";
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("authRegister/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
          state.successMsg = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("authRegister/") &&
          action.type.endsWith("/rejected"),
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
  createPinUser,
  updateProfileUser,
  changePasswordUser,
  changePinUser,
};

export default registerSlice.reducer;
