//hooks
import { useStoreSelector } from "../store/hooks";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

//icons
import iconsData from "../assets/descriptions.json";
import { CircleFlag } from "react-circle-flags";

//interfaces
import { cityState , weatherIconsData} from "../Models/ModelsList";

const SelectedCity = () => {
  const selectedCityIndex: number = useStoreSelector(
    (state) => state.ui.selectedCity
  );

  let cityData = useStoreSelector(
    (state) => state.city.cities[selectedCityIndex]
  );

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

  const icons: weatherIconsData = iconsData;

  const icon = icons[weatherCode][isDay ? "day" : "night"].image;

  return (
    <div className="w-full h-full row-start-1 row-end-5 start-1 col-span-2 -z-20">
      <div className="w-full h-full bg-white shadow-2xl p-6 rounded-2xl border-2 border-gray-50  grid grid-cols-2 grid-rows-8 gap-x-8 min-h-min ">
        <div className="col-span-2 row-span-3 border-b-2 flex flex-col justify-between">
          <h2 className="text-xl font-bold w-full">Thursday, March 23, 2023</h2>
          <div className="flex gap-2 mt-2">
            <h3 className="text-lg ">
              <span className="font-semibold capitalize">{cityName}</span>,{" "}
              {countryName}
            </h3>
            <CircleFlag countryCode={countryCode} className="h-7" />
          </div>

          <div className="w-full flex justify-between h-4/5  ">
            <div className="flex w-1/2 ">
              <div className="flex flex-col align-center justify-center gap-1">
                <h2 className="flex text-2xl font-bold w-full">{temp} °C</h2>
                <p className="flex text-base text-gray-500 w-full">
                  Feels like +{feelTemp}&deg;C
                </p>
                <p className="flex text-base text-gray-500 w-full">{text}</p>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <img src={icon} alt="weather_icon" className="w-1/3 max-w-8" />
            </div>
          </div>
        </div>
        <div className="col-span-2 row-span-4 flex justify-evenly items-center flex-wrap">
          <div className="flex justify-between w-1/2 pr-5  pt-4 ">
            <h2>Relative humidity</h2> <p>{humidity}%</p>
          </div>
          <div className="flex justify-between w-1/2 pl-5 pt-4">
            <h2>Pressure</h2> <p>{pressure} mb</p>
          </div>
          <div className="flex w-1/2 justify-between pr-5 border-t-2 pt-11">
            <h2>Max temp</h2> <p>30 °C</p>
          </div>
          <div className="flex w-1/2 justify-between pl-5 border-t-2 pt-11">
            <h2>Min temp</h2> <p>13 °C</p>
          </div>
          <div className="flex w-1/2 justify-between pr-5 border-t-2 pt-11">
            <h2>Visibility</h2> <p>Good</p>
          </div>
          <div className="flex w-1/2 justify-between pl-5 border-t-2 pt-11">
            <h2>Wind</h2> <p>{wind} km/h</p>
          </div>
          <div className="flex w-1/2 justify-between pr-5 border-t-2 pt-11">
            <h2>UV indeks</h2> <p>{uv}</p>
          </div>
          <div className="flex w-1/2 justify-between pl-5 border-t-2 pt-11">
            <h2>Moon</h2> <p>{uv}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCity;
