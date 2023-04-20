import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface cityState {
  name: string;
  country: string;
  feelTemp: number;
  humidity: number;
  temp: number;
  uv: number;
  pressure: number;
  wind: number;
  img: string;
  text: string;
}
const initialState: cityState = {
  name: "Rijeka",
  country: "",
  feelTemp: 3,
  humidity: 2,
  temp: 0,
  uv: 1,
  pressure: 0,
  wind: 0,
  img: "",
  text: "",
};
const citySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    addCity(state, action) {
      const city = state;
      city.country = action.payload.location.country;
      city.feelTemp = action.payload.current.feelslike_c;
      city.humidity = action.payload.current.humidity;
      city.temp = action.payload.current.temp_c;
      city.uv = action.payload.current.uv;
      city.pressure = action.payload.current.pressure_mb;
      city.wind = action.payload.current.wind_kph;
      city.img = action.payload.current.condition.icon;
      city.text = action.payload.current.condition.text;
    },
    changeCity(state, action: PayloadAction<string>) {
      const city = state;
      city.name = action.payload;
    },
  },
});
export const { addCity, changeCity } = citySlice.actions;
export default citySlice;
