//imported map features from https://www.react-simple-maps.io/
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

//hooks
import { useStoreDispatch, useStoreSelector } from "../store/hooks";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

//list of world countires and it's capital cities
import WorldCapitals from "../assets/countryCapitals.json";

//interfaces
import { cityState } from "../Models/ModelsList";

//actions from slices
import { fetchData } from "../store/city-slice";
import { changeSelectedCity } from "../store/ui-slice";
import { fetchForecast } from "../store/forecast-slice";

//axios from  https://axios-http.com/
import axios from "axios";

//fetch data for selected capital city
const fetchCapitalCityData = async (capitalCityName: any) => {
  const apiURL = `https://geocoding-api.open-meteo.com/v1/search?name=${capitalCityName}&count=1`;

  const fetchedCityData = await axios
    .get(apiURL)
    .then((response) => {
      return response.data.results[0];
    })
    .catch((err) => console.error(err));

  return {
    lat: fetchedCityData.latitude,
    lon: fetchedCityData.longitude,
    countryName: fetchedCityData.country,
    cityName: fetchedCityData.name,
    countryCode: fetchedCityData.country_code.toLowerCase(),
  };
};

const WorldMap = () => {
  const dispatch = useStoreDispatch();

  //index of selected city
  const selectedCityIndex: number = useStoreSelector(
    (state) => state.ui.selectedCity
  );

  //name of selected city
  const selectedCityName: string = useStoreSelector(
    (state) => state.city.cities[selectedCityIndex].cityName
  );

  const storeCityCordsData = useStoreSelector((state) => {
    const { lon, lat } = state.city.cities[selectedCityIndex];
    return [lon, lat];
  });

  //loaded data from page loader
  const loadedData = useLoaderData() as cityState;
  const [cityCordsData, setCityCords] = useState([
    loadedData.lon,
    loadedData.lat,
  ]);

  //if selectedCityIndex is changed schange cords data
  useEffect(() => {
    if (selectedCityIndex !== 0) {
      setCityCords(storeCityCordsData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCityIndex]);

  //event handler, click on map country
  const countryClickHandler = async (countryName: string) => {
    //find name of capital city for selected country
    const { city } = WorldCapitals.find(
      (country) => country.country === countryName
    )!;

    //check if that city is alredy selected
    if (city?.toLowerCase() !== selectedCityName.toLowerCase()) {
      //get data for new selected city
      const { cityName, lat, lon, countryCode } = await fetchCapitalCityData(
        city
      );

      //change weather data
      await dispatch(
        fetchData({
          cityName,
          countryName,
          lat,
          lon,
          countryCode,
        })
      );

      //get forecast data
      await dispatch(fetchForecast({ lat, lon }));

      //change data in ui
      dispatch(changeSelectedCity());
    }
  };

  return (
    <ComposableMap
      projection="geoEqualEarth"
      className="col-start-8 col-end-13 row-start-4 row-span-4 xl:row-span-5  bg-white shadow-2xl rounded-2xl border-2 border-gray-50 "
    >
      <ZoomableGroup>
        <Geographies geography="\map.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "rgb(23 32 52)",
                    outline: "none",
                    transition: "fill 0.25s linear",
                  },
                  hover: {
                    fill: "#3d3d8f",
                    outline: "none",
                    transition: "fill 0.25s linear",
                    cursor: "pointer",
                  },
                  pressed: {
                    fill: "rgb(23 32 52)",
                    outline: "none",
                  },
                }}
                stroke="fff"
                onClick={() => countryClickHandler(geo.properties.name)}
              />
            ))
          }
        </Geographies>
        {cityCordsData[0] !== 0 && cityCordsData[1] !== 0 && (
          <Marker coordinates={[cityCordsData[0], cityCordsData[1]]}>
            <circle r={3} fill="#F53" />
          </Marker>
        )}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default WorldMap;
