import WorldCities from "../components/WorldCities";
import Forecast from "../components/Forecast";
import SelectedCity from "../components/SelectedCity";
import WorldMap from "../components/WorldMap";
import Charts from "../components/Charts";

const Home = () => {
  return (
    <main className="px-8 sm:px-28 w-full lg:grid grid-cols-12 gap-x-16 gap-y-8 flex flex-col" id="main">
      <SelectedCity />
      <WorldCities />
      <WorldMap />
      <div className="flex flex-col row-start-4 row-span-4 col-start-1 col-end-8 gap-y-8 ">
        <Charts />
        <Forecast />
      </div>
    </main>
  );
};

export default Home;
