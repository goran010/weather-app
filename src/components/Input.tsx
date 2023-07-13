import React from "react";
import { FormEvent, useRef, useState, useEffect } from "react";
import { useStoreDispatch } from "../store/hooks";
import { fetchData } from "../store/city-slice";
import { changeSelectedCity } from "../store/ui-slice";
import axios from "axios";
import InputDropdown from "./InputDropdown";
const showError = (error: any) => {
  alert(error);
};
const fetchNames = async (cityName: string) => {
  const data = await axios
    .get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
    )
    .then((response) => {
      return response.data.results[0];
    })
    .catch((err) => console.error(err));
  return {
    lat: data.latitude,
    lon: data.longitude,
    countryName: data.country,
    cityName: data.name,
    countryCode:data.country_code.toLowerCase()
  };
};
const Input = () => {
  const dispatch = useStoreDispatch();

  const cityInputData = useRef<HTMLInputElement>(null);
  const [searchedName, setSearchedName] = useState("");
  const [inputedName, setInputedName] = useState("");

  const getDataHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (cityInputData.current != null) {
      try {
        const cityData = await fetchNames(cityInputData.current.value.trim());
        changeCity(cityData);
      } catch (error) {
        showError(error);
      }
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setSearchedName(inputedName);
    }, 300);
    return () => clearTimeout(timeOutId);
  }, [inputedName]);
  //greska kod prebrzog submitanja

  const changeCity = async (cityData: {
    lat: number;
    lon: number;
    cityName: string;
    countryName: string;
    countryCode: string;
  }) => {
    await dispatch(
      fetchData({
        lat: cityData.lat,
        lon: cityData.lon,
        cityName: cityData.cityName,
        countryName: cityData.countryName,
        countryCode:cityData.countryCode
      })
    );
    dispatch(changeSelectedCity());
    cityInputData.current!.value = "";
    setSearchedName("");
  };
  return (
    <form
      onSubmit={getDataHandler}
      className="relative rounded-md shadow-sm sm:w-3/6 min-full sm:order-1 order-2 "
    >
      <input
        ref={cityInputData}
        onChange={(event) => setInputedName(event.target.value.trim())}
        type="text"
        name="price"
        id="price"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-3 p-2 z-10 relative "
        placeholder="Search..."
      />
      {searchedName !== "" && searchedName.length > 2 && (
        <InputDropdown searchedName={searchedName} changeCity={changeCity} />
      )}
    </form>
  );
};

export default Input;
