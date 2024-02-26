import WorldCities from "../components/WorldCities";
import Forecast from "../components/Forecast";
import SelectedCity from "../components/SelectedCity";
import WorldMap from "../components/WorldMap";
import Charts from "../components/Charts";

const Home = () => {
  return (
    <main
      className="px-6 sm:px-20 lg:px-28 w-full lg:grid grid-cols-12 gap-6 lg:gap-4 xl:gap-8 flex flex-col"
      id="main"
    >
      <SelectedCity />
      <WorldCities />
      <Charts />
      <WorldMap />
      <Forecast />
    </main>
  );
};

export default Home;
