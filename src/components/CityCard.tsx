//hooks
import { useStoreDispatch } from "../store/hooks";

//slice functions
import { changeSelectedCity } from "../store/ui-slice";
import { fetchData } from "../store/city-slice";
import { fetchForecast } from "../store/forecast-slice";

//icons
import iconsData from "../assets/descriptions.json";

//interfaces
import { worldCityState, weatherIconsData } from "../Models/ModelsList";

const CityCard = (props: { data: worldCityState }) => {
  const dispatch = useStoreDispatch();

  const { cityName, countryName, lat, lon, countryCode,temperature, weatherCode,isDay } = props.data;

  
  const clickHandler = async () => {
    await dispatch(
      fetchData({
        cityName,
        countryName,
        lat,
        lon,
        countryCode,
      })
    );
    dispatch(changeSelectedCity());
    await dispatch(
      fetchForecast({
        lat: lat,
        lon: lon,
      })
    );
  };

  const icons: weatherIconsData = iconsData;
  const icon = icons[weatherCode][isDay ? "day" : "night"].image;

  return (
    <div
      className="bg-white shadow-lg p-2 py-6 rounded-2xl border-2 border-gray-50 hover:scale-105 flex flex-col justify-between h-full min-w-[130px] cursor-pointer"
      onClick={() => clickHandler()}
    >
      <div className="flex flex-col gap-2 w-full content-center">
        <h3 className="font-bold text-gray-600 text-center">
          {props.data.cityName}
        </h3>
        <div className="flex flex-col pt-8">
          <h2 className="font-bold text-xl text-gray-700 text-center">{ temperature} °C</h2>{" "}
          <img
            src={icon}
            alt="weather_icon"
            className="flex flex-col justify-start"
          />
        </div>
      </div>
    </div>
  );
};

export default CityCard;
