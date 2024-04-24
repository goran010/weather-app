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

//react spring, aniamtions
import { animated, useSpring } from "@react-spring/web";

const CityCard = (props: { data: worldCityState }) => {
  const dispatch = useStoreDispatch();

  const {
    cityName,
    countryName,
    lat,
    lon,
    countryCode,
    temperature,
    weatherCode,
    isDay,
  } = props.data;

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

  //styles for animation
  const [styles, setStyles] = useSpring(() => ({
    transform: "scale(1)", // Initial scale
    config: { tension: 300, friction: 10 }, // Adjust these values as needed
  }));

  return (
    <animated.div
      style={styles}
      className="bg-white shadow-lg p-2 py-6 rounded-2xl border-2 border-gray-50 flex flex-col justify-between h-full min-w-[130px] cursor-pointer"
      onClick={() => clickHandler()}
      onMouseEnter={() => setStyles({ transform: "scale(1.05)" })}
      onMouseLeave={() => setStyles({ transform: "scale(1)" })}
    >
      <div className="flex flex-col gap-2 w-full content-center">
        <h3 className="font-bold text-gray-600 text-center">
          {props.data.cityName}
        </h3>
        <div className="flex flex-col pt-8">
          <h2 className="font-bold text-xl text-gray-700 text-center">
            {temperature} °C
          </h2>{" "}
          <img
            src={icon}
            alt="weather_icon"
            className="flex flex-col justify-start"
          />
        </div>
      </div>
    </animated.div>
  );
};

export default CityCard;
