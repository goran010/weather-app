import { FormEvent, useRef } from "react";
import { useStoreDispatch } from "../store/hooks";
import { fetchData } from "../store/city-slice";
import { changeSelectedCity } from "../store/ui-slice";
import axios from "axios";
const showError = (error: any) => {
  alert(error);
};
const fetchName = async (cityName: string) => {
  const data = await axios
    .get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
    )
    .then((response) => {
      console.log(response.data);
      return response.data.results[0];
    })
    .catch((err) => console.error(err));
  return {
    lat: data.latitude,
    lon: data.longitude,
    countryName: data.country,
    cityName: data.name,
  };
};
const Input = () => {
  const cityInputData = useRef<HTMLInputElement>(null);
  const dispatch = useStoreDispatch();

  const getDataHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (cityInputData.current != null) {
      const cityName = cityInputData.current.value;
      try {
        const cityData = await fetchName(cityName);
        await dispatch(
          fetchData({
            lat: cityData.lat,
            lon: cityData.lon,
            cityName: cityData.cityName,
            countryName:cityData.countryName,
            time: new Date().getHours(),
          })
        );
        dispatch(changeSelectedCity());
        cityInputData.current.value = "";
      } catch (error) {
        cityInputData.current.value = "";
        showError(error);
      }
    }
  };

  return (
    <>
      <div className="relative mt-2 rounded-md shadow-sm w-1/3">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 "></div>
        <form onSubmit={getDataHandler}>
          <input
            ref={cityInputData}
            type="text"
            name="price"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
            placeholder="Search..."
          />
        </form>
      </div>
    </>
  );
};

export default Input;
