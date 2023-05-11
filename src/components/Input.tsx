import { FormEvent, useRef } from "react";
import { useStoreDispatch } from "../store/hooks";
import { fetchData } from "../store/city-slice";
import { changeSelectedCity } from "../store/ui-slice";

const Input = () => {
  const cityInputData = useRef<HTMLInputElement>(null);
  const dispatch = useStoreDispatch();

  const getDataHandler = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(fetchData(cityInputData.current!.value));
    dispatch(changeSelectedCity());
    //return cityInputData.current ? (cityInputData.current.value = "") : null;
  };
  return (
    <>
      <div className="relative mt-2 rounded-md shadow-sm w-1/3">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 "></div>
        <form onSubmit={getDataHandler}>
          <input
            ref={cityInputData}
            type="text"
            name="price"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
            placeholder="Search..."
          />
        </form>
      </div>
    </>
  );
};

export default Input;
