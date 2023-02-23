import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./features/StoreToken";

export const store = configureStore({
  reducer: {
    token: tokenSlice,
  },
});

store.subscribe(() => {
  saveState(store.getState());
});

function saveState(state) {
  const formatedState = JSON.stringify(state);
  localStorage.setItem('store', formatedState)
}

export default store;
