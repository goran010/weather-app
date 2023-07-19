import FuturePredictionCard from "./ForecastCard";
import { useStoreSelector } from "../store/hooks";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
const Forecast = () => {
  const selectedCityIndex: number = useStoreSelector(
    (state) => state.ui.selectedCity
  );

  const loadedData = useLoaderData() as {
    name: string;
    country: string;
    temp: number;
    feelTemp: number;
    text: string;
    img: string;
    pressure: number;
    uv: number;
    wind: number;
    humidity: number;
    countryCode: string;
    forecastData: {
      maxTemp: number[];
      minTemp: number[];
    };
  };

  const forecastStoreData = useStoreSelector(
    (state) => state.forecast.forecastData
  );
  const [forecastData, setForecastData] = useState(loadedData.forecastData);
  const date = new Date();
  useEffect(() => {
    if (selectedCityIndex !== 0) {
      setForecastData(forecastStoreData);
    }
  }, [selectedCityIndex, forecastStoreData]);

  return (
    <div className="w-full flex items-center justify-center col-start-1 col-span-5 row-start-8 row-soan-2">
      <div className=" flex-column  w-full bg-white shadow-2xl p-6 rounded-2xl border-2 border-gray-50 gap-x-12">
        <div className="w-full flex justify-between flex-row flex-wrap  ">
          {forecastData.maxTemp.map((day, index) => {
            return (
              <FuturePredictionCard
                key={index}
                data={{
                  maxTemp: day,
                  minTemp: forecastData.minTemp[index],
                  date: `${date.getDate() + index + 1}. ${date.getMonth()}.`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Forecast;
