//hooks
import { useStoreSelector } from "../store/hooks";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

//icons
import iconsData from "../assets/descriptions.json";
import { CircleFlag } from "react-circle-flags";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

//interfaces
import { cityState, weatherIconsData } from "../Models/ModelsList";

const SelectedCity = () => {
  const selectedCityIndex: number = useStoreSelector(
    (state) => state.ui.selectedCity
  );

  let cityData = useStoreSelector(
    (state) => state.city.cities[selectedCityIndex]
  );

  //loaded data from page loader
  const loadedData = useLoaderData() as cityState;

  const [data, setData] = useState(loadedData);

  useEffect(() => {
    if (selectedCityIndex !== 0) {
      setData(cityData);
    }
  }, [selectedCityIndex, cityData]);

  const {
    cityName,
    countryName,
    temp,
    feelTemp,
    text,
    pressure,
    uv,
    wind,
    humidity,
    countryCode,
    weatherCode,
    isDay,
  } = data;

  //icons for weather code
  const icons: weatherIconsData = iconsData;
  const icon = icons[weatherCode][isDay ? "day" : "night"].image;

  //select favorite city logic
  const [isFavorite, setIsFavorite] = useState(false);
  const changeIsFavoriteStatus = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="col-start-1 col-end-7  xl:col-end-6 row-start-1 row-end-4 flex flex-col pt-6 ">
      <div className="flex gap-2 text-xl content-end align-bottom">
        <h3 className="text-2xl">
          <span className="font-semibold capitalize">{cityName}</span>,{" "}
          {countryName}
        </h3>
        <CircleFlag countryCode={countryCode} className="h-6 translate-y-0.5" />
      </div>
      <div className=" bg-white shadow-2xl p-6 py-8 rounded-2xl border-2 border-gray-50 relative h-full">
        {isFavorite ? (
          <FaStar
            className="h-7 w-7 absolute top-4 right-4 cursor-pointer text-orange-500"
            onClick={() => changeIsFavoriteStatus()}
          />
        ) : (
          <FaRegStar
            className="h-7 w-7 absolute top-4 right-4 text-black cursor-pointer"
            onClick={() => changeIsFavoriteStatus()}
          />
        )}

        <div className="flex justify-between">
          <div className="flex items-center justify-center w-2/3">
            <img src={icon} alt="weather_icon" />
          </div>
          <div className="flex w-1/3 flex-col gap-1 justify-center">
            <h2 className="text-3xl font-bold min-w-max">{temp}°C</h2>
            <p className="text-gray-500 min-w-max ">
              Feels like +{feelTemp}&deg;C
            </p>
            <p className="text-gray-500 max-w-max">{text}</p>
          </div>
        </div>
        <div className="col-span-2 row-span-4 flex justify-evenly items-center flex-wrap gap-y-3 ">
          <div className="flex justify-between w-1/2  pt-4 ">
            <h2 className="w-9/12 min-w-max">Humidity</h2>{" "}
            <p className="w-4/12">{humidity}%</p>
          </div>
          <div className="flex justify-between w-1/2 pt-4">
            <h2 className="w-8/12">Pressure</h2>{" "}
            <p className="w-4/12 min-w-max">{pressure} mb</p>
          </div>
          <div className="flex w-1/2 justify-between">
            <h2 className="w-9/12 min-w-max">Max temp</h2> <p className="w-4/12">30°C</p>
          </div>
          <div className="flex w-1/2 justify-between ">
            <h2 className="w-8/12">Min temp</h2> <p className="w-4/12">13 °C</p>
          </div>
          <div className="flex w-1/2 justify-between">
            <h2 className="w-9/12">Visibility</h2>{" "}
            <p className="w-4/12">Good</p>
          </div>
          <div className="flex w-1/2 justify-between ">
            <h2 className="w-8/12">Wind</h2>{" "}
            <p className="w-4/12 min-w-max">{wind} km/h</p>
          </div>
          <div className="flex w-1/2 justify-between">
            <h2 className="w-9/12 min-w-max">UV indeks</h2> <p className="w-4/12">{uv}</p>
          </div>
          <div className="flex w-1/2 justify-between">
            <h2 className="w-8/12">Moon</h2> <p className="w-4/12">{uv}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCity;
