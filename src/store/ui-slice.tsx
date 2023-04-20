import { createSlice } from "@reduxjs/toolkit";
interface uiState {
  isSignedIn: boolean;
}
const initialState: uiState = { isSignedIn: true };
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    signIn(state) {
      state.isSignedIn = !state.isSignedIn;
    },
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice;
