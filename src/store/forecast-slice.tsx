import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
interface forecastState {
  forecastData: {
    maxTemp: number[];
    minTemp: number[];
    weatherCode: number[];
  };
}
const initialState: forecastState = {
  forecastData: {
    maxTemp: [],
    minTemp: [],
    weatherCode: [],
  },
};

const forecastSlice = createSlice({
  name: "forecast",
  initialState: initialState as forecastState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchForecast.fulfilled, (state, action) => {
      state.forecastData.maxTemp = action.payload.maxTemp;
      state.forecastData.minTemp = action.payload.minTemp;
      state.forecastData.weatherCode = action.payload.weatherCode;
    });
  },
});
export const fetchForecast = createAsyncThunk(
  "forecast/fetchData",
  async (obj: { lat: number; lon: number }) => {
    const data = await axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${obj.lat}&longitude=${obj.lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=GMT&forecast_days=5`
      )
      .then((response) => {
        console.log(response)
        return {
          maxTemp: response.data.daily.temperature_2m_max,
          minTemp: response.data.daily.temperature_2m_min,
          weatherCode: response.data.daily.weathercode,
        };
      });

    return data;
  }
);

export default forecastSlice;
