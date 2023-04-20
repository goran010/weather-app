import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import citySlice from "./city-slice";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    city: citySlice.reducer,
  },
});

export type storeDispatch = typeof store.dispatch;
export type RootState=ReturnType<typeof store.getState>