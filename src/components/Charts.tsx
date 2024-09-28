//charts from https://www.react-google-charts.com/
import { Chart } from "react-google-charts";

//hooks
import { useState, useEffect, useCallback, useMemo } from "react";
import { useStoreSelector } from "../store/hooks";
import { useLoaderData } from "react-router-dom";

//interfaces
import { forecastCityState } from "../Models/ModelsList";

export const optionsTemperatureChart = {
  title: "Forecasted max and min temperature for the next five days",
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
  const selectedCityIndex = useStoreSelector((state) => state.ui.selectedCity);
  const loadedData = useLoaderData() as forecastCityState;
  const maxTempsData = useStoreSelector((state) => state.forecast.forecastData);
  const [forecastData, setForecastData] = useState(loadedData.forecastData);

  // Adjust chart height based on window width
  const [chartsHeight, setChartsHeight] = useState("100%");

  const updateChartHeight = useCallback(() => {
    const width = window.innerWidth;
    if (width < 1280) setChartsHeight("auto");
    else if (width >= 1280 && width < 1550) setChartsHeight(`${width / 7}px`);
    else if (width >= 1550 && width < 1810) setChartsHeight(`${width / 6}px`);
    else if (width >= 1810 && width < 2100) setChartsHeight(`${width / 5.5}px`);
    else if (width >= 2100) setChartsHeight(`${width / 5}px`);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateChartHeight);
    updateChartHeight(); // Set the initial chart height
    return () => window.removeEventListener("resize", updateChartHeight);
  }, [updateChartHeight]);

  // Effect to update forecast data when selectedCityIndex or maxTempsData changes
  useEffect(() => {
    if (selectedCityIndex !== 0 && maxTempsData.maxTemp.length > 0) {
      setForecastData(maxTempsData);
    }
  }, [selectedCityIndex, maxTempsData]);

  // Memoized data array generation for temperature and wind data
  const temperatureDataArray = useMemo(
    () =>
      forecastData.maxTemp.map((data, index) => [
        `${getNextDays(index).getDate()}.${getNextDays(index).getMonth() + 1}.`,
        forecastData.minTemp[index],
        forecastData.maxTemp[index],
      ]),
    [forecastData]
  );

  const windDataArray = useMemo(
    () =>
      forecastData.maxWind.map((data, index) => [
        `${getNextDays(index).getDate()}.${getNextDays(index).getMonth() + 1}.`,
        forecastData.maxWind[index],
      ]),
    [forecastData]
  );

  return (
    <div className="row-start-4 row-span-3 lg:row-span-3 col-start-1 col-end-8 flex flex-col md:flex-row justify-between w-full h-full gap-8">
      <Chart
        className="bg-white shadow-2xl rounded-2xl border-2 border-gray-50"
        chartType="LineChart"
        data={[["date", "min temp °C", "max temp °C"], ...temperatureDataArray]}
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
