/*the possibility to fetching cities from firebase should be built in */

import { useStoreDispatch, useStoreSelector } from "../store/hooks";
import CityCard from "./CityCard";
import { fetchCity } from "../store/worldCities-slice";
import { useEffect } from "react";
import { worldCityState } from "../Models/ModelsList";

const WorldCities = () => {
  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(fetchCity());
  }, [dispatch]);

  const citiesData = useStoreSelector(
    (state) => state.worldCities.citiesData as worldCityState[]
  );

  return (
    <div className="w-full h-full  bg-white shadow-2xl p-6 rounded-2xl border-2 border-gray-50 col-start-3 col-span-3 row-start-1 row-span-2">
      <h2 className="w-full h-1/6"> World cities</h2>
      <div className="w-full h-4/6 flex justify-between flex-wrap max-[400px]:gap-x-0 gap-x-2">
        {citiesData.map((city, index) => {
          return (
            <CityCard
              key={index}
              data={{
                cityName: city.cityName,
                countryName: city.countryName,
                feelTemp: city.feelTemp,
                lat: city.lat,
                lon: city.lon,
                countryCode:city.countryCode
              }}
            ></CityCard>
          );
        })}
      </div>
    </div>
  );
};

export default WorldCities;
