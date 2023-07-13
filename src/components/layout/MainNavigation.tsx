import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Input from "../Input";
import { signIn } from "../../store/ui-slice";
import { useSelector } from "react-redux/es/exports";
const MainNavigation = () => {
  const dispatch = useDispatch();
  const signInHandler = () => {
    dispatch(signIn());
  };
  const isSignedIn = useSelector((state: any) => {
    return state.ui.isSignedIn;
  });
  return (
    <header className="sm:px-36 px-12">
      <div className=" mx-auto flex flex-row justify-between pb-10 pt-5 flex-wrap sm:flex-nowrap gap-y-3">
        <h1 className="text-xl font-semibold sm:max-w-max w-2/4 order-0">Weather app</h1>
        <Input />
        <div className="flex pointer-events-auto sm:min-w-min w-2/4 justify-end sm:hidden">
          <button
            data-collapse-toggle="mobile-menu-3"
            type="button"
            className="md:hidden text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
            aria-controls="mobile-menu-3"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <nav
          className="hidden md:flex justify-between items-center w-full md:w-auto md:order-1"
          id="mobile-menu-3"
        >
          <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
            <li >
              <NavLink
                to={"/"}
                className="bg-blue-700 md:bg-transparent  block pl-3 pr-4 py-2 text-base md:hover:text-blue-700 md:p-0 rounded order-2"
                aria-current="page"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "rgb(29 78 216)" : "rgb(55 65 81)",
                  };
                }}
              >
                Home
              </NavLink>
            </li>
            {!isSignedIn && (
              <li className="sm:block hidden">
                <NavLink
                  to="/signIn"
                  className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 text-base md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 order-3"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "rgb(29 78 216)" : "rgb(55 65 81)",
                    };
                  }}
                >
                  Sign in
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        {isSignedIn && (
          <li onClick={signInHandler} className="cursor-pointer sm:block hidden order-4">
            <h1>Sign Out</h1>
          </li>
        )}
      </div>
    </header>
  );
};

export default MainNavigation;
