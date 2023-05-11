import { createSlice } from "@reduxjs/toolkit";
import SelectedCity from "../components/SelectedCity";
interface uiState {
  isSignedIn: boolean;
  selectedCity: number;
}
const initialState: uiState = { isSignedIn: true, selectedCity: 0 };
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    signIn(state) {
      state.isSignedIn = !state.isSignedIn;
    },
    changeSelectedCity(state) {
      state.selectedCity++;
    },
  },
});
export const { signIn,changeSelectedCity} = uiSlice.actions;
export default uiSlice;
