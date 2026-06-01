import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {transactionService} from "../../services/transactionService.js";

/**
 * Redux slice for managing transaction data (Transfers & Top-Ups).
 * @typedef {Object} TransactionState
 * @property {Array} transactions History of all user transactions.
 * @property {Object|null} currentTransaction Data for the transaction that was just processed.
 * @property {boolean} isLoading  Status of the currently running asynchronous process.
 * @property {string|null} error Error message if a transaction fails.
 * @property {string|null} successMsg Success message after a transaction succeeds.
 */

const initialState = {
    transactions: [],
    currentTransaction: null,
    isLoading: false,
    error: null,
    successMsg: null,
};

/**
 * Thunk: Transfer money to another user.
 * Requires sender data from getState() for balance validation,
 * so the balance does not need to be passed manually from the component.
 */
const transfer = createAsyncThunk(
    "transaction/transfer",
    async (payload, { rejectWithValue }) => {
        try {
            const data = await transactionService.transfer(payload);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Transfer transaction failed to process."
            );
        }
    },
);

/**
 * Thunk: Top up e-wallet balance.
 * Reads the balance and user data from getState() to ensure consistency
 * with the data currently active in the login session.
 */
const topUp = createAsyncThunk(
    "transaction/topUp",
    async (payload, { rejectWithValue }) => {
        try {
            const data = await transactionService.topup(payload);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Top-up failed."
            );
        }
    },
);

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        clearCurrentTransaction: (state) => { state.currentTransaction = null; },
        clearError: (state) => {
            state.error = null;
            state.successMsg = null;
        },
        removeTransaction: (state, action) => {
            state.transactions = state.transactions.filter(
                (tx) => tx.id !== action.payload,
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(transfer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentTransaction = action.payload;
                state.successMsg = "Transfer successfully sent!";
            })
            .addCase(topUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentTransaction = action.payload;
                state.successMsg = "top-up successfully!";
            })
            .addCase("authLogin/logoutUser/fulfilled", () => initialState)
            .addMatcher(
                (action) => action.type.startsWith("transaction/") && action.type.endsWith("/pending"),
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                    state.successMsg = null;
                },
            )
            .addMatcher(
                (action) => action.type.startsWith("transaction/") && action.type.endsWith("/rejected"),
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            );
    },
});

export const transactionActions = {
  ...transactionSlice.actions,
  transfer,
  topUp,
};

export default transactionSlice.reducer;
