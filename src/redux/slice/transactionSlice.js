import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transactionService } from "../../services/transactionService.js";
import { userService } from "../../services/userService.js";

const initialState = {
    transactions: [],
    dashboardSummary: null,
    chartData: [],
    currentTransaction: null,
    isLoading: false,
    error: null,
    successMsg: null,
};

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
    }
);

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
    }
);

const getUserDashboard = createAsyncThunk(
    "transaction/getUserDashboard",
    async (_, { rejectWithValue }) => {
        try {
            const data = await userService.getDashboard();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to get dashboard.");
        }
    }
);

const getTransactionReport = createAsyncThunk(
    "transaction/getTransactionReport",
    async (payload = {}, { rejectWithValue }) => {
        try {
            const period = payload?.period || "week";
            const data = await userService.getTransactionReport(period);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to get report.");
        }
    }
);

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        clearCurrentTransaction: (state) => {
            state.currentTransaction = null;
        },
        clearError: (state) => {
            state.error = null;
            state.successMsg = null;
        },
        removeTransaction: (state, action) => {
            state.transactions = state.transactions.filter(
                (tx) => tx.transaction_id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDashboard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dashboardSummary = action.payload;
            })
            .addCase(getTransactionReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chartData = Array.isArray(action.payload?.data)
                    ? action.payload.data
                    : Array.isArray(action.payload)
                        ? action.payload
                        : [];
            })
            .addCase(getTransactionHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(deleteTransactionHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions = state.transactions.filter(
                    (tx) => tx.transaction_id !== action.payload
                );
            })
            .addCase(transfer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentTransaction = action.payload;
                state.successMsg = "Transfer successfully sent!";
            })
            .addCase(topUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentTransaction = action.payload;
                state.successMsg = "Top-up successful!";
            })
            .addCase("authLogin/logoutUser/fulfilled", () => initialState)
            .addMatcher(
                (action) =>
                    action.type.startsWith("transaction/") &&
                    action.type.endsWith("/pending"),
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                    state.successMsg = null;
                }
            )
            .addMatcher(
                (action) =>
                    action.type.startsWith("transaction/") &&
                    action.type.endsWith("/rejected"),
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            );
    },
});

export const transactionActions = {
    ...transactionSlice.actions,
    transfer,
    topUp,
    getUserDashboard,
    getTransactionReport,
    getTransactionHistory,
    deleteTransactionHistory,
};

export default transactionSlice.reducer;