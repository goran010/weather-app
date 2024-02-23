//components
import FuturePredictionCard from "./ForecastCard";

//hooks
import { useStoreSelector } from "../store/hooks";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

//interfaces
import { forecastCityState } from "../Models/ModelsList";

const Forecast = () => {
  const selectedCityIndex: number = useStoreSelector(
    (state) => state.ui.selectedCity
  );

  const loadedData = useLoaderData() as forecastCityState;

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
    <div className="flex w-full items-center justify-center ">
      <div className="w-full bg-white shadow-2xl rounded-2xl border-2 border-gray-50 gap-x-12">
        <div className="w-full flex justify-between flex-wrap pt-3 pb-2 gap-y-14">
          {forecastData.maxTemp.map((maxTemp, index) => {
            return (
              <FuturePredictionCard
                key={index}
                data={{
                  maxTemp: maxTemp,
                  minTemp: forecastData.minTemp[index],
                  date: `${date.getDate() + index + 1}. ${date.getMonth()}.`,
                  weatherCode: forecastData.weatherCode[index],
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
