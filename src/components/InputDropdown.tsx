import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { CircleFlag } from "react-circle-flags";
import { InputDropdownProps, CityLocationData } from "../Models/ModelsList";

const InputDropdown: React.FC<InputDropdownProps> = ({
  searchedName,
  changeCity,
}) => {
  const BASE_METEO_API_URL = process.env.REACT_APP_BASE_METEO_API_URL;
  const [cities, setCities] = useState([] as CityLocationData[]);

  // Memoize fetchNames to avoid unnecessary recreation on each render
  const fetchNames = useCallback(
    async (cityName: string) => {
      try {
        const response = await axios.get(
          `${BASE_METEO_API_URL}?name=${cityName}&count=5`
        );
        setCities(response.data.results);
      } catch (err) {
        console.error(err);
      }
    },
    [BASE_METEO_API_URL]
  );

  // fetch new cities when searched term is changed
  useEffect(() => {
    fetchNames(searchedName);
  }, [searchedName, fetchNames]);

  return (
    <ul className="bg-white min-w-max border-slate-200 border-2 rounded-md absolute w-full top-0 pt-10 text-black">
      {cities.length ? (
        cities.map((item) => (
          <li
            key={item.id}
            className="cursor-pointer min-w-max bg-white p-2 pl-3 pb-2  p-w-3 hover:bg-slate-200 flex gap-1"
            onClick={() => {
              changeCity({
                lat: item.latitude,
                lon: item.longitude,
                cityName: item.name,
                countryName: item.country,
                countryCode: item.country_code.toLowerCase(),
              });
            }}
          >
            <CircleFlag
              countryCode={item.country_code.toLowerCase()}
              className="h-6"
            />
            <p className="font flex flex-col sm:flex-row">
              <span>
                {`
              ${item.name}, 
              ${item.admin1 ? `${item.admin1},` : "("} 
              `}
              </span>
              <span>
                {`
              ${item.latitude.toFixed(2)}°E ,   
              ${item.longitude.toFixed(2)}°N, 
              ${item.elevation ? `${item.elevation}m ` : ""})`}
              </span>
            </p>
          </li>
        ))
      ) : (
        <li className="cursor-pointer">No cities found</li>
      )}
    </ul>
  );
};

export default InputDropdown;
