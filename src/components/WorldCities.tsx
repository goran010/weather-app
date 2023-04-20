
import CityCard from "./CityCard";

const WorldCities = () => {
  return (
    <div className="flex justify-end gap-5 w-11/12  justify-self-end self-start max-w-min col-span-3 ">
      <CityCard data={"London"} />
      <CityCard data={"Moscow"} />
      <CityCard data={"New York"} />
    </div>
  );
};

export default WorldCities;
