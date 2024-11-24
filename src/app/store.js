import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modalSlice";
import { authApi } from "../services/authApi";
import statusReducer from "../features/statusSlice";
import currentUserReducer from "../features/currentUserSlice";
import { todoApi } from "../services/todoApi";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    status: statusReducer,
    currentUser: currentUserReducer,
    [authApi.reducerPath]: authApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, todoApi.middleware),
});
