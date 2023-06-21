import React, { useEffect } from "react";
import { useStoreDispatch } from "../store/hooks";
import { changeSelectedCity } from "../store/ui-slice";
import { fetchData } from "../store/city-slice";

const CityCard = (props: { data: any }) => {
  useEffect(() => {}, []);
  const dispatch = useStoreDispatch();
  const clickHandler = async () => {
    await dispatch(fetchData(props.data));
    dispatch(changeSelectedCity());
  };
 
  return (
    <div className="bg-white shadow-2xl p-6 pb-4 rounded-2xl border-2 border-gray-50  min-w-min w-2/12  flex flex-col justify-center justify-self-center">
      <div>
        <h3 className="font-bold text-gray-600 text-center">{props.data}</h3>
      </div>
      <div className="my-5">
        <div className="flex flex-row justify-between items-center">
          <div id="icon">
            <img src="" alt="" />
          </div>
          <div id="temp">
            <h4 className="text-3xl">12&deg;C</h4>
            <p className="text-xs text-gray-500">Feels like +14&deg;C</p>
          </div>
        </div>
      </div>
      <div
        className="w-full place-items-end text-right border-t-2 border-gray-100 mt-2"
        onClick={clickHandler}
      >
        <a href="#" className="text-indigo-600 text-xs font-medium">
          View more
        </a>
      </div>
    </div>
  );
};

export default CityCard;
