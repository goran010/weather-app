import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";

const ErrorPage = () => {
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <MdSignalWifiConnectedNoInternet0 className="w-24 h-24" />
      <div className="w-5/12 text-center my-10">
        <h1 className="font-bold mb-4 color-gray-900">No internet comnection</h1>
        No internet connection was found. Check your connection and try again
      </div>
      <button
        className="bg-gray-900 hover:bg-gray-700 text-white py-4 px-20 w-fit rounded-3xl mb-32"
        onClick={refreshPage}
      >
        Try again
      </button>
    </main>
  );
};

export default ErrorPage;
