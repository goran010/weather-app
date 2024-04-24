//charts from https://www.react-google-charts.com/
import { Chart } from "react-google-charts";

//hooks
import { useState, useEffect, useRef, useCallback } from "react";
import { useStoreSelector } from "../store/hooks";
import { useLoaderData } from "react-router-dom";

//interfaces
import { forecastCityState } from "../Models/ModelsList";

export const optionsTemperatureChart = {
  title: "Forecasted maximal and minimal temperature for the next five days",
  titleTextStyle: {
    fontSize: 12,
    bold: false,
  },
  curveType: "function",
  pointSize: 2,
  legend: { position: "bottom" },
  chartArea: { width: "85%" },
};

export const optionsWindChart = {
  title: "Forecasted maximum wind speeds for the next five days",
  titleTextStyle: {
    fontSize: 12,
    bold: false,
  },
  curveType: "function",
  pointSize: 2,
  legend: { position: "bottom" },
  chartArea: { width: "85%" },
};
// Function to calculate the date for the next days
const getNextDays = (daysToAdd: number) =>
  new Date(new Date().getTime() + (daysToAdd + 1) * 24 * 60 * 60 * 1000);

const Charts = () => {
  // State and selector hooks
  const selectedCityIndex = useStoreSelector((state) => state.ui.selectedCity);
  const loadedData = useLoaderData() as forecastCityState;
  const maxTempsData = useStoreSelector((state) => state.forecast.forecastData);

  // State for forecast data
  const [forecastData, setForecastData] = useState(loadedData.forecastData);

  // Effect to update forecast data when selectedCityIndex or maxTempsData changes

  useEffect(() => {
    if (selectedCityIndex !== 0) {
      console.log(maxTempsData);
      if (maxTempsData.maxTemp.length > 0) {
        setForecastData(maxTempsData);
      }
    }
  }, [selectedCityIndex, maxTempsData]);

  // Function to generate temperature data array
  const generateTemperatureDataArray = useCallback((): [
    string,
    number,
    number
  ][] => {
    return forecastData.maxTemp.map((data, index) => [
      `${getNextDays(index).getDate()}.${getNextDays(index).getMonth() + 1}.`,
      forecastData.minTemp[index],
      forecastData.maxTemp[index],
    ]);
  }, [forecastData]);

  // Function to generate wind data array
  const generateWindDataArray = useCallback((): [string, number][] => {
    return forecastData.maxWind.map((data, index) => [
      `${getNextDays(index).getDate()}.${getNextDays(index).getMonth() + 1}.`,
      forecastData.maxWind[index],
    ]);
  }, [forecastData]);

  // Generate data arrays
  const temperatureDataArray: [string, number, number][] =
    generateTemperatureDataArray();
  const windDataArray: [string, number][] = generateWindDataArray();

  let chartsHeight;
  if (window.innerWidth < 1280) {
    chartsHeight = "100%";
  }
  if (window.innerWidth > 1280) {
    chartsHeight = `${window.innerWidth / 7}px`;
  }
  if (window.innerWidth > 1550) {
    chartsHeight = `${window.innerWidth / 6}px`;
  }
  if (window.innerWidth > 1810) {
    chartsHeight = `${window.innerWidth / 5.5}px`;
  }
  if (window.innerWidth > 2100) {
    chartsHeight = `${window.innerWidth / 5.5}px`;
  }
  if (window.innerWidth > 2400) {
    chartsHeight = `${window.innerWidth / 5}px`;
  }

  return (
    <div className="row-start-4 row-span-3 xl:row-span-3 col-start-1 col-end-8 flex flex-col md:flex-row justify-between w-full h-full gap-8">
      <Chart
        className="bg-white shadow-2xl rounded-2xl border-2 border-gray-50 "
        chartType="LineChart"
        data={[
          ["date", "min temp °C ", "max temp °C "],
          ...temperatureDataArray,
        ]}
        options={optionsTemperatureChart}
        width={"100%"}
        height={chartsHeight}
      />

      <Chart
        className="bg-white shadow-2xl rounded-2xl border-2 border-gray-50"
        chartType="LineChart"
        data={[["DATE", "wind speed in km/h"], ...windDataArray]}
        options={optionsWindChart}
        width={"100%"}
        height={chartsHeight}
      />
    </div>
  );
};
export default Charts;
