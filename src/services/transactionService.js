import api from "./api";

export const transactionService = {
    transfer: async (payload) => {
        const res = await api.post("/transactions/transfer", {
            receiver_id:  payload.receiver_id,
            amount:       payload.amount,
            description:  payload.description || "",
            pin:          payload.pin,
        });
        return res.data.data;
    },

    topup: async (payload) => {
        const res = await api.post("/transactions/topup", {
            payment_method_id: payload.payment_method_id,
            amount:            payload.amount,
        });
        return res.data.data;
    },
};