import React from "react";
import { useStoreDispatch } from "../store/hooks";
import { changeSelectedCity } from "../store/ui-slice";
import { fetchData } from "../store/city-slice";

const CityCard = (props: {
  data: {
    lat: number;
    lon: number;
    cityName: string;
    countryName: string;
    countryCode: string;
  };
}) => {
  const { cityName, lon, lat, countryCode, countryName } = props.data;
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
  };

  return (
    <div className="bg-white shadow-2xl p-6 pb-4 rounded-2xl border-2 border-gray-50 flex flex-col justify-center justify-self-center h-36 sm:w-2/6 w-5/12 sm:max-w-[190px] min-[400px]:max-w-[100px] my-2 ">
      <div>
        <h3 className="font-bold text-gray-600 text-center">
          {props.data.cityName}
        </h3>
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
