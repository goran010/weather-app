import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface cityState {
  cities: [
    {
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
  ];
}
const initialState: cityState = {
  cities: [
    {
      name: "",
      country: "",
      feelTemp: 0,
      humidity: 0,
      temp: 0,
      uv: 1,
      pressure: 0,
      wind: 0,
      img: "",
      text: "",
    },
  ],
};
const citySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const data = action.payload.data.hourly;
      const time = action.payload.time;
      state.cities.push({
        name: action.payload.cityName,
        country: action.payload.countryName,
        feelTemp: data.apparent_temperature[time],
        humidity: data.relativehumidity_2m[time],
        temp: data.temperature_2m[time],
        uv: data.uv_index[time],
        pressure: data.surface_pressure[time],
        wind: data.windspeed_10m[time],
        img: "",
        text: "",
      });
    });
  },
});

export const fetchData = createAsyncThunk(
  "city/fetchData",
  async (obj: {
    lat: number;
    lon: number;
    time: number;
    cityName: string;
    countryName: string;
  }) => {
    const data = await axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${obj.lat}&longitude=${obj.lon}&hourly=temperature_2m,uv_index,surface_pressure,relativehumidity_2m,apparent_temperature,rain,cloudcover_low,windspeed_10m`
      )
      .then((response) => {
        return {
          data: response.data,
          cityName: obj.cityName,
          time: obj.time,
          countryName: obj.countryName,
        };
      });
    return data;
  }
);

export default citySlice;
