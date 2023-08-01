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
    changeSignInStatus(state) {
      if (state.isSignedIn===false) {
        state.isSignedIn = true;
      } else {
        state.isSignedIn = false;
      }

      console.log(state.isSignedIn);
    },
    changeSelectedCity(state) {
      state.selectedCity++;
    },
  },
});
export const { changeSignInStatus, changeSelectedCity } = uiSlice.actions;
export default uiSlice;
