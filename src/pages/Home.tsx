
import WorldCities from "../components/WorldCities";
import FuturePrediction from "../components/FuturePrediction";
import SelectedCity from "../components/SelectedCity";
import WorldMap from "../components/WorldMap";

const Home = () => {
  return (
    <main className="px-36 w-full grid grid-cols-5 grid-rows-4 gap-6 ">
      <SelectedCity />
      <WorldCities />
      <WorldMap />
      <FuturePrediction />
    </main>
  );
};

export default Home;
