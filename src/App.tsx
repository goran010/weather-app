import React from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import RootLayout from "./pages/RootLayout";
import AboutPage from "./pages/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";


let lat = 45.327,
  lon = 14.44;

navigator.geolocation.getCurrentPosition((position) => {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
});

const homeLoader = async () => {
  const day = new Date().getHours();

  const cityData = await axios
    .get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}7&localityLanguage=en`
    )
    .then((response) => response.data)
    .catch((err) => console.error(err));
  const weatherData = await axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,uv_index,surface_pressure,relativehumidity_2m,apparent_temperature,rain,cloudcover_low,windspeed_10m&current_weather=true`
    )
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));
  const forecastData = await axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=GMT&forecast_days=5`
    )
    .then((response) => {
      return {
        maxTemp: response.data.daily.temperature_2m_max,
        minTemp: response.data.daily.temperature_2m_min,
        weatherCode: response.data.daily.weathercode,
      };
    });
  const dataHourly = weatherData!.data.hourly;
  return {
    cityName: cityData.city.charAt(0).toUpperCase() + cityData.city.slice(1),
    countryName: cityData.countryName,
    feelTemp: dataHourly.apparent_temperature[day],
    humidity: dataHourly.temperature_2m[day],
    temp: dataHourly.temperature_2m[day],
    uv: dataHourly.uv_index[day],
    pressure: dataHourly.surface_pressure[day],
    wind: dataHourly.windspeed_10m[day],
    text: "",
    countryCode: "hr",
    lon: lon,
    lat: lat,
    forecastData: forecastData,
    weatherCode: weatherData!.data.current_weather.weathercode,
    isDay: weatherData!.data.current_weather.is_day === 0 ? false : true,
  };
};
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: homeLoader,
        },
        { path: "/signIn", element: <SignIn /> },
        { path: "/signUp", element: <SignUp /> },
        { path: "/About", element: <AboutPage /> },
      ],
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
