import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      const data = action.payload;
      state.cities.push({
        name: data.location.name,
        country: data.location.country,
        feelTemp: data.current.feelslike_c,
        humidity: data.current.humidity,
        temp: data.current.temp_c,
        uv: data.current.uv,
        pressure: data.current.pressure_mb,
        wind: data.current.wind_kph,
        img: data.current.condition.icon,
        text: data.current.condition.text,
      });
    });
  },
});
export const fetchData = createAsyncThunk(
  "city/fetchData",
  async (cityName: string) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "f3a683fbc3msh385d4da297ee7e9p134996jsne879cdba850c",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
    const data = await axios
      .get(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityName}`,
        options
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.error(err));
    return data;
  }
);
export const {} = citySlice.actions;
export default citySlice;
