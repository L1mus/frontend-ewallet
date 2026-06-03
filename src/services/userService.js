import api from "./api";

export const userService = {
    getProfile: async () => {
        const res = await api.get("/users/profile");
        console.log(res);
        return res.data.data;
    },

    getDashboard: async () => {
        const res = await api.get("/users/dashboard");
        return res.data.data;
    },

    updateProfile: async (payload) => {
        const formData = new FormData();
        if (payload.full_name) formData.append("full_name", payload.full_name);
        if (payload.phone)     formData.append("phone", payload.phone);
        if (payload.picture)   formData.append("profile_picture_url", payload.picture);
        const res = await api.patch("/users/profile", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    },

    changePin: async (payload) => {
        const res = await api.patch("/users/pin", {
            current_pin:     payload.current_pin,
            new_pin:         payload.new_pin,
            confirm_new_pin: payload.confirm_new_pin,
        });
        return res.data;
    },

    changePassword: async (payload) => {
        const res = await api.patch("/users/password", {
            current_password: payload.current_password,
            new_password:     payload.new_password,
        });
        return res.data;
    },

    getTransactionReport: async (period) => {
        const res = await api.get("/users/report", { params: { period } });
        return res.data.data;
    },

    getTransactionHistory: async (params = {}) => {
        const res = await api.get("/users/transactions", { params });
        return { data: res.data.data, meta: res.data.meta };
    },

    findReceiver: async (params = {}) => {
        const res = await api.get("/users/transfer", { params });
        return { data: res.data.data, meta: res.data.meta };
    },

    createPin: async (payload) => {
        const res = await api.post("/users/pin/set", {
            new_pin:         payload.new_pin,
            confirm_new_pin: payload.confirm_new_pin,
        });
        return res.data;
    },
};