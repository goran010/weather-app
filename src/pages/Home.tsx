import WorldCities from "../components/WorldCities";
import FuturePrediction from "../components/FuturePrediction";
import SelectedCity from "../components/SelectedCity";
import WorldMap from "../components/WorldMap";

const Home = () => {
  return (
    <main className="px-8 sm:px-36  w-full lg:grid  grid-cols-5  gap-6 flex flex-col ">
      <SelectedCity />
      <WorldCities />
      <WorldMap />
      <FuturePrediction />
    </main>
  );
};

export default Home;
