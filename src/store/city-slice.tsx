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
      text: string;
      countryCode: string;
      lat: number;
      lon: number;
      weatherCode: string;
      isDay: boolean;
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
      uv: 0,
      pressure: 0,
      wind: 0,
      text: "",
      countryCode: "",
      lat: 0,
      lon: 0,
      weatherCode: "3",
      isDay: true,
    },
  ],
};
const citySlice = createSlice({
  name: "country",
  initialState: initialState as cityState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const data = action.payload.data.hourly;
      const currentData = action.payload.currentData;
      //with -2 results are correct

      const today = new Date(),
        time = today.getHours();
      state.cities.push({
        name: action.payload.cityName,
        country: action.payload.countryName,
        feelTemp: data.apparent_temperature[time],
        humidity: data.relativehumidity_2m[time],
        temp: currentData.temperature,
        uv: data.uv_index[time],
        pressure: data.surface_pressure[time],
        wind: currentData.windspeed,
        text: "",
        countryCode: action.payload.countryCode,
        lat: action.payload.lat,
        lon: action.payload.lon,
        weatherCode: action.payload.weatherCode,
        isDay: action.payload.isDay,
      });
    });
  },
});

export const fetchData = createAsyncThunk(
  "city/fetchData",
  async (obj: {
    lat: number;
    lon: number;
    cityName: string;
    countryName: string;
    countryCode: string;
  }) => {
    const data = await axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${obj.lat}&longitude=${obj.lon}&hourly=temperature_2m,uv_index,surface_pressure,relativehumidity_2m,apparent_temperature,rain,cloudcover_low,windspeed_10m,weathercode&current_weather=true&forecast_days=2&timezone=GMT`
      )
      .then((response) => {
        console.log(response);
        return {
          lon: obj.lon,
          lat: obj.lat,
          currentData: response.data.current_weather,
          data: response.data,
          cityName: obj.cityName,
          countryName: obj.countryName,
          countryCode: obj.countryCode,
          weatherCode: response.data.current_weather.weathercode,
          isDay: response.data.current_weather.is_day === 0 ? false : true,
        };
      });
    return data;
  }
);

export default citySlice;
