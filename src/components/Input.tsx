import { FormEvent, useRef, useState, useEffect } from "react";
import { useStoreDispatch } from "../store/hooks";
import { fetchData } from "../store/city-slice";
import { changeSelectedCity } from "../store/ui-slice";
import axios from "axios";
import InputDropdown from "./InputDropdown";
import { fetchForecast } from "../store/forecast-slice";
import { IoSearch } from "react-icons/io5";

const fetchNames = async (cityName: string) => {
  const BASE_METEO_API_URL = process.env.REACT_APP_BASE_METEO_API_URL;

  const data = await axios
    .get(`${BASE_METEO_API_URL}?name=${cityName}&count=1`)
    .then((response) => {
      return response.data.results[0];
    })
    .catch((err) => console.error(err));
  return {
    lat: data.latitude,
    lon: data.longitude,
    countryName: data.country,
    cityName: data.name,
    countryCode: data.country_code.toLowerCase(),
  };
};

const Input = () => {
  const dispatch = useStoreDispatch();

  const cityInputData = useRef<HTMLInputElement>(null);
  const [searchedName, setSearchedName] = useState("");
  const [inputedName, setInputedName] = useState("");

  const getDataHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (
      cityInputData.current!.value.trim() !== "" &&
      cityInputData.current!.value.trim().length > 3
    ) {
      const cityData = await fetchNames(cityInputData.current!.value.trim());
      await changeCity(cityData);
      await dispatch(
        fetchForecast({
          lat: cityData.lat,
          lon: cityData.lon,
        })
      );
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
        countryCode: cityData.countryCode,
      })
    );
    dispatch(changeSelectedCity());
    dispatch(
      fetchForecast({
        lat: cityData.lat,
        lon: cityData.lon,
      })
    );
    cityInputData.current!.value = "";
    setSearchedName("");
  };
  return (
    <form
      onSubmit={getDataHandler}
      className="z-20 w-full flex flex-col h-min relative  rounded-lg"
    >
      <IoSearch className="h-5 w-5 absolute z-40 top-2.5 left-3 text-gray-800" />
      <input
        ref={cityInputData}
        onChange={(event) => setInputedName(event.target.value.trim())}
        type="text"
        name="citySearch"
        id="citySearch"
        className="bg-white rounded-lg text-gray-900 sm:text-sm  focus:ring-blue-500 focus:border-blue-500 
        w-full h-10 pl-10 p-2 z-10 overflow-hidden "
        placeholder="Search for a city..."
      />
      {searchedName !== "" && searchedName.length > 2 && (
        <InputDropdown searchedName={searchedName} changeCity={changeCity} />
      )}
    </form>
  );
};

export default Input;
