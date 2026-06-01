import api from "./api";

export const authService = {
    login: async (payload) => {
        const res = await api.post("/auth", payload);
        return res.data.data;
    },

    register: async (payload) => {
        const res = await api.post("/auth/register", {
            full_name: payload.full_name,
            email: payload.email,
            password: payload.password,
            confirm_password: payload.confirm_password,
        });
        return res.data.data;
    },

    logout: async () => {
        const res = await api.post("/auth/logout");
        return res.data;
    },

    forgotPassword: async (payload) => {
        const res = await api.post("/auth/forgot-password", { email: payload.email });
        return res.data.data;
    },

    resetPassword: async (payload) => {
        const res = await api.post("/auth/reset-password", {
            token: payload.token,
            new_password: payload.new_password,
            confirm_password: payload.confirm_password,
        });
        return res.data;
    },
};