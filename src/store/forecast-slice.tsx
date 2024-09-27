import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { forecastState } from "../Models/ModelsList";

const initialState: forecastState = {
  forecastData: {
    maxTemp: [],
    minTemp: [],
    maxWind: [],
    weatherCode: [],
  },
};

const BASE_FORECAST_API_URL = process.env.REACT_APP_BASE_FORECAST_API_URL;

const forecastSlice = createSlice({
  name: "forecast",
  initialState: initialState as forecastState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchForecast.fulfilled, (state, action) => {
      state.forecastData.maxTemp = action.payload.maxTemp;
      state.forecastData.minTemp = action.payload.minTemp;
      state.forecastData.maxWind = action.payload.maxWind;
      state.forecastData.weatherCode = action.payload.weatherCode;
    });
  },
});
export const fetchForecast = createAsyncThunk(
  "forecast/fetchData",
  async (obj: { lat: number; lon: number }) => {
    const data = await axios
      .get(
        `${BASE_FORECAST_API_URL}?latitude=${obj.lat}&longitude=${obj.lon}&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,weathercode&timezone=GMT&forecast_days=6`
      )
      .then((response) => {
        return {
          maxTemp: response.data.daily.temperature_2m_max,
          minTemp: response.data.daily.temperature_2m_min,
          maxWind: response.data.daily.wind_speed_10m_max,
          weatherCode: response.data.daily.weathercode,
        };
      });

    return data;
  }
);

export default forecastSlice;
