import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

import { useStoreDispatch, useStoreSelector } from "../store/hooks";

import { useState, useEffect, MouseEventHandler } from "react";
import { useLoaderData } from "react-router-dom";
import { ZoomableGroup } from "react-simple-maps";
import { cityState } from "../Models/ModelsList";
import WorldCapitals from "../assets/countryCapitals.json";
import { fetchData } from "../store/city-slice";
import { changeSelectedCity } from "../store/ui-slice";
import { fetchForecast } from "../store/forecast-slice";
import axios from "axios";

const fetchNames = async (cityName: any) => {
  const data = await axios
    .get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
    )
    .then((response) => {
      return response.data.results[0];
    })
    .catch((err) => console.error(err));

  return {
    lat: data.latitude,
    lon: data.longitude,
    countryName: data.country,
    cityName: data.name,
    countryCode: data.country_code.toLowerCase(),
  };
};
const WorldMap = () => {
  const dispatch = useStoreDispatch();

  const selectedCityIndex: number = useStoreSelector(
    (state) => state.ui.selectedCity
  );

  const cordsData = useStoreSelector(
    (state) => state.city.cities[selectedCityIndex]
  );

  const loadedData = useLoaderData() as cityState;
  const [cords, setCords] = useState(loadedData);

  useEffect(() => {
    if (selectedCityIndex !== 0) {
      setCords(cordsData);
    }
  }, [selectedCityIndex, cordsData]);

  const countryClickHandler = async (countryName: string) => {
    const capitalCity = WorldCapitals.find(
      (country) => country.country == countryName
    )!.city;

    const { cityName, lat, lon, countryCode } = await fetchNames(capitalCity);
    await dispatch(
      fetchData({
        cityName,
        countryName,
        lat,
        lon,
        countryCode,
      })
    );
    dispatch(changeSelectedCity());
    dispatch(fetchForecast({ lat: lat, lon: lon }));
  };
  return (
    <ComposableMap
      projection="geoEqualEarth"
      className="col-start-8 col-end-13 row-start-4 row-span-4 bg-white shadow-2xl rounded-2xl border-2 border-gray-50 aspect-[16/11]"
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
                  },
                  hover: {
                    fill: "#3d3d8f",
                    outline: "none",
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
        <Marker coordinates={[cords.lon, cords.lat]}>
          <circle r={3} fill="#F53" />
        </Marker>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default WorldMap;
