import { Chart } from "react-google-charts";
import { useStoreSelector } from "../store/hooks";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { forecastCityState } from "../Models/ModelsList";

export const data = [
  ["Day", "night"],
  [37.8, 20],
  [30.9, 12],
  [25.4, 11],
  [10.5, 5],
  [10.4, 7],
];

export const optionsTemperatureChart = {
  title: "Maximal and minimal temperature in next 5 days, in celsius °C",
  subtitle: "in celsius",
  curveType: "function",
  legend: { position: "bottom" },
  animation: {
    startup: true,
    easing: "linear",
    duration: 1000,
  },
};

export const optionsWindChart = {
  title: "Maximal wind speed in next 5 days, in km/h ",
  curveType: "function",
  legend: { position: "bottom" },
  animation: {
    startup: true,
    easing: "linear",
    duration: 1000,
  },
};

const Charts = () => {
  const selectedCityIndex: number = useStoreSelector(
    (state) => state.ui.selectedCity
  );
  const loadedData = useLoaderData() as forecastCityState;

  const maxTempsData = useStoreSelector((state) => state.forecast.forecastData);

  const [forecastData, setForecastData] = useState(loadedData.forecastData);

  const date = new Date();

  useEffect(() => {
    if (selectedCityIndex !== 0) {
      setForecastData(maxTempsData);
    }
  }, [selectedCityIndex, maxTempsData]);

  let temperatureDataArray: Array<[string, number, number]> = [];
  let windDataArray: Array<[string, number]> = [];

  forecastData.maxTemp.forEach((temp, index) => {
    temperatureDataArray.push([
      `${date.getDate() + index + 1}. ${date.getMonth() + 1}.`,
      forecastData.minTemp[index],
      forecastData.maxTemp[index],
    ]);
    windDataArray.push([
      `${date.getDate() + index + 1}. ${date.getMonth() + 1}.`,
      forecastData.maxWind[index],
    ]);
  });

  console.log(temperatureDataArray, data);
  return (
    <div className="flex justify-between col-start-1 col-end-8 row-start-4 row-span-3 h-full gap-8">
      <div className="w-full min-w-max h-full bg-white shadow-2xl rounded-2xl border-2 border-gray-50">
        <Chart
          chartType="LineChart"
          data={[["day", "min temp", "max temp"], ...temperatureDataArray]}
          options={optionsTemperatureChart}
          height="100%"
          width="100%"
        />
      </div>
      <div className="w-full h-full bg-white shadow-2xl rounded-2xl border-2 border-gray-50">
        <Chart
          chartType="LineChart"
          data={[["day", "wind speed"], ...windDataArray]}
          options={optionsWindChart}
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export default Charts;
