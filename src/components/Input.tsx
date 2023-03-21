import { useRef } from "react";

const Input = (props: any) => {
  const cityInputData = useRef<HTMLInputElement>(null);
  const getDataHandler = () => {
    props.getData(cityInputData?.current?.value);
  };
  return (
    <div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
        <input
          ref={cityInputData}
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300
           placeholder:text-gray-400 sm:text-sm sm:leading-6 max-w-sm"
          placeholder="0.00"
        />
      </div>
      <button onClick={getDataHandler}>Get</button>
    </div>
  );
};

export default Input;
