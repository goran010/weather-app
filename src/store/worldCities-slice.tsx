import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/index";
interface WorldCitiesState {
  cities: string[];
  citiesData: object[];
}
const initialState: WorldCitiesState = {
  cities: ["London", "Moscow", "New York", "Paris"],
  citiesData: [],
};

export const fetchCity = createAsyncThunk<
  object[], // Type of the returned data (an array of objects)
  void,
  { state: RootState } // Extra argument configuration
>("worldCitiesSlice/fetchCity", async (_, { getState }) => {
  const state: RootState = getState();
  const citiesNames = state.worldCities.cities;

  const dataArray: object[] = [];

  await Promise.all(
    citiesNames.map(async (cityName) => {
      try {
        const response = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
        );
        console.log(response.data.results[0]);
        dataArray.push(response.data.results[0]);
      } catch (err) {
        console.error(err);
      }
    })
  );
  console.log(dataArray);
  return dataArray;
});

const worldCitiesSlice = createSlice({
  name: "WorldCities",
  initialState: initialState as WorldCitiesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCity.fulfilled, (state, action) => {
      state.citiesData = [];
      action.payload.forEach((item) => {
        state.citiesData.push(item);
      });
    });
  },
});

export default worldCitiesSlice.reducer;
