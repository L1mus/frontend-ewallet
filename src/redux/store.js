import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistCombineReducers,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/es/storage";
import env from "../utils/environment";

import authReducer from "./slice/authSlice.js";
import transactionReducer from "./slice/transactionSlice";

const persistConfig = {
  key: "ew-DB",
  storage,
  whitelist: ["authReducer"],
  blacklist: [
    "activeTooltip",
    "mousePosition",
    "zIndex",
    "chartData",
    "chartLayout",
  ],
};

const persistedReducer = persistCombineReducers(persistConfig, {
  authReducer,
  transactionReducer,
});

const store = configureStore({
  reducer: persistedReducer,
  devTools: env.environment === "development",
  middleware: (defaultMiddleware) => {
    return defaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    });
  },
});

export const persistor = persistStore(store);
export default store;
