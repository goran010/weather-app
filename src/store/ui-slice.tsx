import { createSlice } from "@reduxjs/toolkit";
interface uiState {
  isSignedIn: boolean;
  selectedCity: number;
  hamburgerMenuOpened: boolean;
}
const initialState: uiState = {
  isSignedIn: true,
  selectedCity: 0,
  hamburgerMenuOpened: false,
};
const uiSlice = createSlice({
  name: "ui",
  initialState: initialState as uiState,
  reducers: {
    changeSignInStatus(state) {
      state.isSignedIn = !state.isSignedIn;
    },
    changeSelectedCity(state) {
      state.selectedCity++;
    },
    changeMenuOpen(state) {
      state.hamburgerMenuOpened = !state.hamburgerMenuOpened;
    },
  },
});
export const { changeSignInStatus, changeSelectedCity,changeMenuOpen } = uiSlice.actions;
export default uiSlice;


