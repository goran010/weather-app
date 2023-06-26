import { createSlice } from "@reduxjs/toolkit";
interface uiState {
  isSignedIn: boolean;
  selectedCity: number;
}
const initialState: uiState = { isSignedIn: true, selectedCity: 0 };
const uiSlice = createSlice({
  name: "ui",
  initialState: initialState as uiState,
  reducers: {
    signIn(state) {
      state.isSignedIn = !state.isSignedIn;
    },
    changeSelectedCity(state) {
      state.selectedCity++;
    },
  },
});
export const { signIn, changeSelectedCity } = uiSlice.actions;
export default uiSlice;
