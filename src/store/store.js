import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./slices/chatSlice";
import usersSlice from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    chat: chatSlice,
    users: usersSlice
  }
}) 