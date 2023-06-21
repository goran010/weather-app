
import CityCard from "./CityCard";

const WorldCities = () => {
  return (
    <div className=" flex flex-row flex-wrap justify-between  gap-2  lg:col-span-3  -z-20">
      <CityCard data={"London"} />
      <CityCard data={"Moscow"} />
      <CityCard data={"New York"} />
      <CityCard data={"New York"} />
    </div>
  );
};

export default WorldCities;
