import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useStoreSelector } from "../store/hooks";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { ZoomableGroup } from "react-simple-maps";
const WorldMap = () => {
  const selectedCityIndex: number = useStoreSelector(
    (state) => state.ui.selectedCity
  );
  const cordsData = useStoreSelector(
    (state) => state.city.cities[selectedCityIndex]
  );

  const loadedData = useLoaderData() as {
    name: string;
    country: string;
    temp: number;
    feelTemp: number;
    text: string;
    img: string;
    pressure: number;
    uv: number;
    wind: number;
    humidity: number;
    countryCode: string;
    lat: number;
    lon: number;
  };
  const [cords, setCords] = useState(loadedData);

  useEffect(() => {
    if (selectedCityIndex !== 0) {
      setCords(cordsData);
    }
  }, [selectedCityIndex]);

  return (
    <ComposableMap
      projection="geoEqualEarth"
      className="col-start 3 col-span-3 row-start-3 row-end-5  w-full bg-white shadow-2xl rounded-2xl border-2 border-gray-50 aspect-[16/10]"
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
                    fill: "#151552",
                    outline: "none",
                  },
                  hover: {
                    fill: "#3d3d8f",
                    outline: "none",
                  },
                  pressed: {
                    fill: "#3d3d8f",
                    outline: "none",
                  },
                }}
                stroke="fff"
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
