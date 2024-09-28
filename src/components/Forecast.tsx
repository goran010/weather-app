//components
import FuturePredictionCard from "./ForecastCard";

//hooks
import { useStoreSelector } from "../store/hooks";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

//interfaces
import { forecastCityState } from "../Models/ModelsList";

const Forecast = () => {
  //index of selected city
  const selectedCityIndex: number = useStoreSelector(
    (state) => state.ui.selectedCity
  );

  //forecast data from loader
  const loadedForecastData = (useLoaderData() as forecastCityState)
    .forecastData;
  const [forecastData, setForecastData] = useState(loadedForecastData);

  //forecast data from store
  const storeForecastData = useStoreSelector(
    (state) => state.forecast.forecastData
  );

  //date logic
  const getNextDays = (daysToAdd: number) => {
    return new Date(
      new Date().getTime() + (daysToAdd + 1) * 24 * 60 * 60 * 1000
    );
  };

  //updating forecast data
  useEffect(() => {
    if (selectedCityIndex !== 0) {
      setForecastData(storeForecastData);
    }
  }, [selectedCityIndex, storeForecastData]);

  return (
    <div className="flex w-full h-full items-center justify-center row-start-10 row-span-2 col-start-1 col-end-13 lg:row-start-12 lg:col-end-8">
      <div className="w-full bg-white shadow-2xl rounded-2xl border-2 border-gray-50 gap-x-12">
        <div className="w-full flex justify-between flex-wrap pt-3 pb-2 gap-y-14">
          {forecastData.maxTemp.map((maxTemp, index) => {
            return (
              <FuturePredictionCard
                key={index}
                data={{
                  maxTemp: maxTemp,
                  minTemp: forecastData.minTemp[index],
                  date: `${getNextDays(index).getDate()}.
                  ${getNextDays(index).getMonth() + 1}.`,
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
