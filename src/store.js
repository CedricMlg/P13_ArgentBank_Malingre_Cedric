import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./features/StoreToken";

/* Creating a store object that is used to store the state of the application. */
export const store = configureStore({
  reducer: {
    token: tokenSlice,
  },
});

/* Saving the state to local storage. */
store.subscribe(() => {
  saveState(store.getState());
});

/**
 * It takes a state object, formats it as a string, and saves it to local storage.
 * @param state - The state object that you want to save.
 */
function saveState(state) {
  const formatedState = JSON.stringify(state);
  localStorage.setItem('store', formatedState)
}

export default store;
