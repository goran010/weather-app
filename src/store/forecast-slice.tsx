import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
interface forecastState {
  forecastData: {
    maxTemp: number[];
    minTemp: number[];
  };
}
const initialState: forecastState = {
  forecastData: {
    maxTemp: [],
    minTemp: [],
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
    });
  },
});
export const fetchForecast = createAsyncThunk(
  "forecast/fetchData",
  async (obj: { lat: number; lon: number }) => {
    const data = await axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${obj.lat}&longitude=${obj.lon}&daily=temperature_2m_max,temperature_2m_min&timezone=GMT&forecast_days=5`
      )
      .then((response) => {
        return {
          maxTemp: response.data.daily.temperature_2m_max,
          minTemp: response.data.daily.temperature_2m_min,
        };
      });

    return data;
  }
);

export default forecastSlice;
