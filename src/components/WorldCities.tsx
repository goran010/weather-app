//hooks
import { useStoreDispatch, useStoreSelector } from "../store/hooks";
import { useEffect } from "react";

//components
import CityCard from "./CityCard";

//slice funstions
import { fetchCities } from "../store/worldCities-slice";

//interfaces
import { worldCityState } from "../Models/ModelsList";
import { auth } from "../firebase/firebase";

const WorldCities = () => {
  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const citiesData = useStoreSelector(
    (state) => state.worldCities.citiesData as worldCityState[]
  );
  return (
    <div className="bg-white shadow-2xl rounded-2xl border-2 border-gray-50 col-start-7 xl:col-start-6  col-end-13 row-start-1 row-end-4 flex flex-col flex-wrap px-6">
      <h2 className="w-full pt-6 text-lg">Favorite cities</h2>
      <div className="w-full overflow-x-scroll scroll-smooth " id="scrollbar">
        <div className="w-full flex gap-9 py-6 justify-between">
          {citiesData.map((city, index) => {
            return (
              <CityCard
                key={index}
                data={{
                  cityName: city.cityName,
                  countryName: city.countryName,
                  temperature: city.temperature,
                  lat: city.lat,
                  lon: city.lon,
                  countryCode: city.countryCode,
                  weatherCode: city.weatherCode,
                  isDay: city.isDay,
                }}
              ></CityCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorldCities;
