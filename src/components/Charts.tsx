//charts from https://www.react-google-charts.com/
import { Chart } from "react-google-charts";

//hooks
import { useState, useEffect } from "react";
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
  animation: {
    startup: true,
    easing: "linear",
    duration: 500,
  },
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
  animation: {
    startup: true,
    easing: "linear",
    duration: 500,
  },
};

// Function to calculate the date for the next days
const getNextDays = (daysToAdd:number) => new Date(new Date().getTime() + (daysToAdd + 1) * 24 * 60 * 60 * 1000);

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
      setForecastData(maxTempsData);
    }
  }, [selectedCityIndex, maxTempsData]);

  // Function to generate temperature data array
  const generateTemperatureDataArray = () => {
    return forecastData.maxTemp.map((data, index) => ([
      `${getNextDays(index).getDate()}.${getNextDays(index).getMonth() + 1}.`,
      forecastData.minTemp[index],
      forecastData.maxTemp[index],
    ]));
  };

  // Function to generate wind data array
  const generateWindDataArray = () => {
    return forecastData.maxWind.map((data, index) => ([
      `${getNextDays(index).getDate()}.${getNextDays(index).getMonth() + 1}.`,
      forecastData.maxWind[index],
    ]));
  };

  // Generate data arrays
  const temperatureDataArray = generateTemperatureDataArray();
  const windDataArray = generateWindDataArray();

  // Render charts
  return (
    <div className="flex flex-col md:flex-row justify-between gap-8 row-start-4 row-span-4 xl:row-span-4 col-start-1 col-end-8">
      <Chart
        className="md:w-1/2 w-full aspect-[16/9] md:aspect-auto bg-white shadow-2xl rounded-2xl border-2 border-gray-50 overflow-hidden"
        chartType="LineChart"
        data={[["date", "min temp °C ", "max temp °C "], ...temperatureDataArray]}
        options={optionsTemperatureChart}
        height="100%"
        width="100%"
      />
      <Chart
        className="md:w-1/2 w-full h-full aspect-[16/9] md:aspect-auto bg-white shadow-2xl rounded-2xl border-2 border-gray-50 overflow-hidden"
        chartType="LineChart"
        data={[["DATE", "wind speed in km/h"], ...windDataArray]}
        options={optionsWindChart}
        height="100%"
        width="100%"
      />
    </div>
  );
};

export default Charts;

