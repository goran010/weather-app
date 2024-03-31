import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//axios
import axios from "axios";

//interfaces
import { worldCityState } from "../Models/ModelsList";

//firebase
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

interface WorldCitiesState {
  cities: string[];
  citiesData: worldCityState[];
}

let initialState: WorldCitiesState = {
  cities: ["Rome", "Moscow", "Madrid", "Berlin", "London"],
  citiesData: [],
};
const usersCitiesRef = collection(db, "UsersCities");

const getCitiesArray = async () => {
  if (auth.currentUser) {
    // Fetching data from Firestore
    const data = await getDocs(usersCitiesRef); // points to the collection of cities in Firestore

    console.log(data.docs); // Make sure 'auth' is properly defined and initialized

    // Mapping the retrieved data to return id and cities array of the first document
    return data.docs.map((doc) => ({
      id: doc.id,
      cities: doc.data().cities,
    }))[0]; // Returning the first document's data}
  } else {
    return initialState; // Returning initial array if an error occurs
  }
};

export const fetchCities = createAsyncThunk<worldCityState[]>(
  "worldCitiesSlice/fetchCity",
  async () => {
    // Fetch cities array from the Firestore
    const citiesArray = await getCitiesArray();

    // Initialize an array to store response data for each city
    let responseArray: worldCityState[] = [];

    // Use Promise.all to fetch weather data for each city asynchronously
    await Promise.all(
      citiesArray.cities.map(async (cityName: string) => {
        try {
          // Fetch geocoding data for the city
          const responseGeo = await axios.get(
            `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
          );
          const dataGeo = responseGeo.data.results[0];

          // Fetch weather data for the city
          const responseWeather = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${dataGeo.latitude}&longitude=${dataGeo.longitude}&hourly=temperature_2m,uv_index,surface_pressure,relativehumidity_2m,apparent_temperature,rain,cloudcover_low,windspeed_10m,weathercode&current_weather=true&forecast_days=2&timezone=GMT`
          );
          const dataWeather = responseWeather.data.current_weather;

          // Push the response data for the city into the response array
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
          console.log(responseArray);
        } catch (err) {
          console.error(err);
        }
      })
    );

    // Return the array containing weather data for all cities
    return responseArray;
  }
);

const worldCitiesSlice = createSlice({
  name: "WorldCities",
  initialState: initialState as WorldCitiesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.citiesData = action.payload;
    });
  },
});

export default worldCitiesSlice.reducer;
