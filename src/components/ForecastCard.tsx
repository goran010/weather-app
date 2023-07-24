import iconsData from "../assets/descriptions.json";

const ForecastCard = (props: {
  data: {
    maxTemp: number;
    minTemp: number;
    date: string;
    weatherCode: number;
  };
}) => {
  interface WeatherData {
    [key: string]: {
      day: {
        description: string;
        image: string;
      };
      night: {
        description: string;
        image: string;
      };
    };
  }
  const { weatherCode, date, minTemp, maxTemp } = props.data;
  const icons: WeatherData = iconsData;
  const icon = icons[weatherCode.toString()].day.image;
  return (
    <div className="flex flex-col justify-between md:w-1/5  w-1/2  py-6 gap-4">
      <h2 className=" text-xs text-center min-w-min">{date}</h2>
      <img src={icon} className="w-1/2 max-w-[80px] m-auto" alt="" />
      <div className="flex justify-evenly max-w-[160px] m-auto">
        <p className="text-center font-semibold ">{maxTemp}&deg;C</p>
        <p className="text-center ">{minTemp}&deg;C</p>
      </div>

      <p className="min-w-min text-center text-xs text-gray-500">
        Patchy rain season
      </p>
    </div>
  );
};

export default ForecastCard;
