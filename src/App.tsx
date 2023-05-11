import React from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage"
import RootLayout from "./pages/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

const homeLoader = async () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f3a683fbc3msh385d4da297ee7e9p134996jsne879cdba850c",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };
  const data = await axios
    .get(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=Rijeka`,
      options
    )
    .then((response) => {
      return {
        name: response.data.location.name,
        country: response.data.location.country,
        feelTemp: response.data.current.feelslike_c,
        humidity: response.data.current.humidity,
        temp: response.data.current.temp_c,
        uv: response.data.current.uv,
        pressure: response.data.current.pressure_mb,
        wind: response.data.current.wind_kph,
        img: response.data.current.condition.icon,
        text: response.data.current.condition.text,
      };
    })
    .catch((err) => console.error(err));
  return data;
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
      errorElement:<ErrorPage/>
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
