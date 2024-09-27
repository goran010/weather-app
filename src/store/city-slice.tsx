import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { cityState } from "../Models/ModelsList";

const initialState: { cities: cityState[] } = {
  cities: [
    {
      cityName: "",
      countryName: "",
      feelTemp: 0,
      humidity: 0,
      temp: 0,
      uv: 0,
      pressure: 0,
      wind: 0,
      precipitation: 0,
      countryCode: "",
      lat: 0,
      lon: 0,
      weatherCode: "3",
      isDay: true,
      minTemp: 0,
      maxTemp: 0,
      daylight: 0,
    },
  ],
};

 const BASE_FORECAST_API_URL = process.env.REACT_APP_BASE_FORECAST_API_URL;

const citySlice = createSlice({
  name: "country",
  initialState: initialState as { cities: cityState[] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      //with -2 results are correct

      const data = action.payload;
      state.cities.push({
        cityName: data.cityName,
        countryName: data.countryName,
        feelTemp: data.feelTemp,
        humidity: data.humidity,
        temp: data.temp,
        uv: data.uv,
        pressure: data.pressure,
        wind: data.wind,
        precipitation: data.precipitation,
        countryCode: data.countryCode,
        lat: data.lat,
        lon: data.lon,
        weatherCode: data.weatherCode,
        isDay: data.isDay,
        minTemp: data.minTemp,
        maxTemp: data.maxTemp,
        daylight: data.daylight,
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
    const data: cityState = await axios
      .get(
        `${BASE_FORECAST_API_URL}?latitude=${obj.lat}&longitude=${obj.lon}&daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,daylight_duration&hourly=temperature_2m,uv_index,surface_pressure,relativehumidity_2m,apparent_temperature,rain,windspeed_10m,weathercode&current_weather=true&forecast_days=2&timezone=GMT`
      )
      .then((response) => {
        const today = new Date(),
          time = today.getHours() - 1;
        return {
          wind: response.data.current_weather.windspeed,
          temp: response.data.current_weather.temperature,
          feelTemp: response.data.hourly.apparent_temperature[time],
          humidity: response.data.hourly.relativehumidity_2m[time],
          uv: response.data.hourly.uv_index[time],
          pressure: response.data.hourly.surface_pressure[time],
          minTemp: response.data.daily.temperature_2m_min[0],
          maxTemp: response.data.daily.temperature_2m_max[0],
          precipitation: response.data.daily.precipitation_sum[0],
          daylight: response.data.daily.daylight_duration[0] / 3600,
          isDay: response.data.current_weather.is_day === 0 ? false : true,
          weatherCode: response.data.current_weather.weathercode,
          lon: obj.lon,
          lat: obj.lat,
          cityName: obj.cityName,
          countryName: obj.countryName,
          countryCode: obj.countryCode,
        };
      });
    return data;
  }
);

export default citySlice;
