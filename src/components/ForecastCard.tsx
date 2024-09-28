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
    <div className="flex flex-col justify-between lg:w-1/6 w-1/3 gap-y-1 text-xs xs:text-sm">
      <h2 className=" text-center min-w-min">{date}</h2>
      <img src={icon} className="w-4/12 max-w-[80px] m-auto" alt="" />
      <div className="flex justify-center w-full m-auto flex-row">
        <p className="text-center font-semibold">{maxTemp}&deg;C</p>
        <p className="text-center flex md:hidden xl:flex">/</p>
        <p className="text-center">{minTemp}&deg;C</p>
      </div>
    </div>
  );
};

export default ForecastCard;
