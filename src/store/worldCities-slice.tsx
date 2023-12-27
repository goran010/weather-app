import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { worldCityState } from "../Models/ModelsList";

interface WorldCitiesState {
  cities: string[];
  citiesData: worldCityState[];
}

const initialState: WorldCitiesState = {
  cities: ["London", "Moscow", "New York", "Paris","Tokio"],
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
          const response = await axios.get(
            `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
          );
          const data = response.data.results[0];
          console.log(data)
          responseArray.push({
            countryName: data.country,
            lat: data.latitude,
            lon: data.longitude,
            countryCode: data.country_code.toLowerCase(),
            cityName: data.name,
            feelTemp: 15,
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
