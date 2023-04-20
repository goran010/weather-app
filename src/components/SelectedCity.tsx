import { useStoreDispatch, useStoreSelector } from "../store/hooks";
import { useEffect } from "react";
import { addCity } from "../store/city-slice";
import axios from "axios";
const SelectedCity = () => {
  const dispatch = useStoreDispatch();
  const cityData = useStoreSelector((state) => {
    return state.city;
  });
  
  const getData = () => {
    
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "f3a683fbc3msh385d4da297ee7e9p134996jsne879cdba850c",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
    axios
      .get(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityData.name}`,
        options
      )
      .then((response) => {
        console.log(response.data);
        dispatch(addCity(response.data));
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getData();
  }, [cityData]);
  const {
    name,
    country,
    feelTemp,
    humidity,
    temp,
    uv,
    pressure,
    wind,
    img,
    text,
  } = cityData;

  return (
    <div className="w-full h-full row-span-3 col-span-2">
      <div className="w-full h-full bg-white shadow-2xl p-6 rounded-2xl border-2 border-gray-50  grid grid-cols-2 grid-rows-8 gap-x-8 ">
        <div className="col-span-2 row-span-3 border-b-2 flex flex-col justify-between">
          <h2 className="text-xl font-bold w-full">Thursday, March 23, 2023</h2>
          <h3 className="text-lg">
            {" "}
            <span className="font-semibold">{name}</span>, {country}
          </h3>
          <div className="w-full flex justify-between h-4/5  ">
            <div className="flex w-1/2 ">
              <div className="flex flex-col align-center justify-center gap-1">
                <h2 className="flex text-2xl font-bold w-full">{temp} °C</h2>
                <p className="flex text-base text-gray-500 w-full">
                  Feels like +{feelTemp}&deg;C
                </p>
                <p className="flex text-base text-gray-500 w-full">{text}</p>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <img src={img} alt="weather_icon" className="w-1/3 max-w-8" />
            </div>
          </div>
        </div>
        <div className="col-span-2 row-span-4 flex justify-evenly items-center flex-wrap">
          <div className="flex justify-between w-1/2 pr-5  pt-4 ">
            <h2>Relative humidity</h2> <p>{humidity}%</p>
          </div>
          <div className="flex justify-between w-1/2 pl-5 pt-4">
            <h2>Pressure</h2> <p>{pressure} mb</p>
          </div>
          <div className="flex w-1/2 justify-between pr-5  border-t-2 pt-11">
            <h2>Max temp</h2> <p>30 °C</p>
          </div>
          <div className="flex w-1/2 justify-between pl-5  border-t-2 pt-11">
            <h2>Min temp</h2> <p>13 °C</p>
          </div>
          <div className="flex w-1/2 justify-between pr-5 border-t-2 pt-11">
            <h2>Visibility</h2> <p>Good</p>
          </div>
          <div className="flex w-1/2 justify-between pl-5 border-t-2 pt-11">
            <h2>Wind</h2> <p>{wind} km/h</p>
          </div>
          <div className="flex w-1/2 justify-between pr-5 border-t-2 pt-11">
            <h2>UV indeks</h2> <p>{uv}</p>
          </div>
          <div className="flex w-1/2 justify-between pl-5 border-t-2 pt-11">
            <h2>Moon</h2> <p>{uv}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCity;
