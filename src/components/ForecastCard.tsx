const ForecastCard = (props: {
  data: {
    maxTemp: number;
    minTemp: number;
    date: string;
  };
}) => {
  return (
    <div className="flex-column justify-items-center justify-between md:w-1/5  w-1/2  py-6 gap-7">
      <h2 className=" text-xs text-center min-w-min">{props.data.date}</h2>
      <svg
        className="w-full h-20 fill-stroke text-yellow-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        ></path>
      </svg>
      <div className="flex justify-evenly max-w-[160px] m-auto">
        <p className="text-center font-semibold ">{props.data.maxTemp}&deg;C</p>
        <p className="text-center ">{props.data.minTemp}&deg;C</p>
      </div>

      <p className="min-w-min text-center text-xs text-gray-500">
        Patchy rain season
      </p>
    </div>
  );
};

export default ForecastCard;
