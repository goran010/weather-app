import React from "react";
import { useStoreDispatch } from "../store/hooks";
import { changeSelectedCity } from "../store/ui-slice";
import { fetchData } from "../store/city-slice";
import { fetchForecast } from "../store/forecast-slice";

const CityCard = (props: {
  data: {
    lat: number;
    lon: number;
    cityName: string;
    countryName: string;
    countryCode: string;
    weatherCode: string;
    isDay: boolean;
  };
}) => {
  const { cityName, lon, lat, countryCode, countryName} =props.data;
  const dispatch = useStoreDispatch();
  const clickHandler = async () => {
    await dispatch(
      fetchData({
        cityName,
        lon,
        lat,
        countryCode,
        countryName,
      })
    );
    dispatch(changeSelectedCity());
    dispatch(
      fetchForecast({
        lat: lat,
        lon: lon,
      })
    );
  };

  return (
    <div className="bg-white shadow-2xl p-6 pb-4 rounded-2xl border-2 border-gray-50 flex flex-col justify-center justify-self-center h-36  ">
      <div className="flex flex-col gap-2 w-full">
        <h3 className="font-bold text-gray-600 text-center">
          {props.data.cityName}
        </h3>
        <div className="flex">
          <h2 className="font-bold text-gray-600 text-center">15 °C</h2>{" "}
          <img src="#" alt="" />
        </div>
      </div>
      <div
        className="w-full place-items-end text-right border-t-2 border-gray-100 mt-2"
        onClick={clickHandler}
      >
        <a href="#" className="text-indigo-600 text-xs font-medium ">
          View weather
        </a>
      </div>
    </div>
  );
};

export default CityCard;
