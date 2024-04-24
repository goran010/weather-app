import WorldCities from "../components/WorldCities";
import Forecast from "../components/Forecast";
import SelectedCity from "../components/SelectedCity";
import WorldMap from "../components/WorldMap";
import Charts from "../components/Charts";
import { useSpring, animated } from "@react-spring/web";

const Home = () => {
  const animationProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 800 },
  });
  return (
    <animated.main
      className="px-6 sm:px-20 lg:px-28 w-full lg:grid grid-cols-12 gap-6 lg:gap-4 xl:gap-8 flex flex-col"
      id="main"
      style={animationProps}
    >
      <SelectedCity />
      <WorldCities />
      <Charts />
      <WorldMap />
      <Forecast />
    </animated.main>
  );
};

export default Home;
