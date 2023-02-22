import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./features/StoreToken";

export const store = configureStore({
  reducer: {
    token: tokenSlice,
  },
});

export default store;
