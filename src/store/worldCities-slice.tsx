import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { worldCityState } from "../Models/ModelsList";

interface WorldCitiesState {
  cities: string[];
  citiesData: worldCityState[];
}

/*the possibility to fetching cities from firebase should be built in */

const initialState: WorldCitiesState = {
  cities: ["London", "Moscow", "New York", "Sydney", "Tokio"],
  citiesData: [],
};

export const fetchCity = createAsyncThunk<worldCityState[]>(
  "worldCitiesSlice/fetchCity",
  async () => {
    const citiesNames = initialState.cities;
    let responseArray: worldCityState[] = [];
    await Promise.all(
      citiesNames.map(async (cityName) => {
        try {
          const responseGeo = await axios.get(
            `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
          );
          const dataGeo = responseGeo.data.results[0];

          const responseWeather = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${dataGeo.latitude}&longitude=${dataGeo.longitude}&hourly=temperature_2m,uv_index,surface_pressure,relativehumidity_2m,apparent_temperature,rain,cloudcover_low,windspeed_10m,weathercode&current_weather=true&forecast_days=2&timezone=GMT`
          );
          const dataWeather = responseWeather.data.current_weather;

          responseArray.push({
            countryName: dataGeo.country,
            lat: dataGeo.latitude,
            lon: dataGeo.longitude,
            countryCode: dataGeo.country_code.toLowerCase(),
            cityName: dataGeo.name,
            temperature: dataWeather.temperature,
            weatherCode: dataWeather.weathercode,
            isDay: dataWeather.is_day,
          });
        } catch (err) {
          console.error(err);
        }
      })
    );
    return responseArray;
  }
);

const worldCitiesSlice = createSlice({
  name: "WorldCities",
  initialState: initialState as WorldCitiesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCity.fulfilled, (state, action) => {
      state.citiesData = [];
      state.citiesData = action.payload;
    });
  },
});

export default worldCitiesSlice.reducer;
