import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

/* Creating a reducer and action creator. */
const { actions, reducer } = createSlice({
  name: "storeToken",
  initialState,
  reducers: {
    store: {
      prepare: (token) => ({
        payload: { token },
      }),
      reducer: (draft, action) => {
        draft[action.payload.token] = action.payload.token;
      },
    },
  },
});

export const { store } = actions;

export default reducer;
