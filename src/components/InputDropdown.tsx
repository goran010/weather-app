import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { CircleFlag } from "react-circle-flags";

const InputDropdown = ({
  searchedName,
  changeCity,
}: {
  searchedName: string;
  changeCity({
    lat,
    lon,
    cityName,
    countryName,
  }: {
    lat: number;
    lon: number;
    cityName: string;
    countryName: string;
    countryCode: string;
  }): Promise<void>;
}) => {
  const [cities, setCities] = useState([] as any[]);

  const fetchNames = async (cityName: string) => {
    await axios
      .get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=5`
      )
      .then((response) => {
        setCities(response.data.results);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchNames(searchedName);
  }, [searchedName]);

  return (
    <ul className="bg-white min-w-max border-slate-200 border-2 rounded-md absolute w-full top-0 pt-10">
      {cities ? (
        cities.map((item) => {
          return (
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
                  {" "}
                  {`
              ${item.name}, 
              ${item.admin1 ? `${item.admin1},` : "("} 
              `}
                </span>
                <span>{`
              ${
                item.latitude.toFixed(2)
                  ? ` (${item.latitude.toFixed(2)}°E ,`
                  : ""
              }   
              ${
                item.longitude.toFixed(2)
                  ? `${item.latitude.toFixed(2)}°N  ,`
                  : ""
              } 
              ${item.elevation ? `${item.elevation}m ` : ""})`}</span>
              </p>
            </li>
          );
        })
      ) : (
        <li className="cursor-pointer">No cities found</li>
      )}
    </ul>
  );
};

export default InputDropdown;
