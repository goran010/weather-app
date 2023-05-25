import React from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import RootLayout from "./pages/RootLayout";
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
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,uv_index,surface_pressure,relativehumidity_2m,apparent_temperature,rain,cloudcover_low,windspeed_10m`
    )
    .then((response) => response.data.hourly)
    .catch((err) => console.error(err));

  return {
    name: cityData.city.charAt(0).toUpperCase() + cityData.city.slice(1),
    country: cityData.countryName,
    feelTemp: weatherData.apparent_temperature[day],
    humidity: weatherData.temperature_2m[day],
    temp: weatherData.temperature_2m[day],
    uv: weatherData.uv_index[day],
    pressure: weatherData.surface_pressure[day],
    wind: weatherData.windspeed_10m[day],
    img: "",
    text: "",
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
      ],
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
