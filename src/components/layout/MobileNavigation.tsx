import React from "react";
import { NavLink } from "react-router-dom";

//icons
import { FiHome, FiInfo} from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { PiSignOutBold } from "react-icons/pi";
import Profile from "../Profile";

//slice functions
import { changeMenuOpen } from "../../store/ui-slice";

//hooks
import { useStoreDispatch } from "../../store/hooks";

const MobileNavigation: React.FC<{ isSignedIn: boolean;}> = ({ isSignedIn }) => {
  const dispatch = useStoreDispatch();

  return (
    <div className="fixed top-0 left-0 h-screen lg:hidden z-50 w-full">
      <div className="w-1/2 bg-gray-900 shadow-2xl rounded-r-2xl border-gray-50 h-full">
        <nav className="flex flex-col items-start justify-center align-middle w-full h-[92%]">
          <IoClose
            className="h-9 w-9 absolute top-4 left-[42%] cursor-pointer text-black-500 hover:text-red-600"
            onClick={() => dispatch(changeMenuOpen())}
          />

          <NavLink
            to="/"
            onClick={() => dispatch(changeMenuOpen())}
            className="flex w-full h-14 justify-center items-center hover:bg-slate-600 hover:text-white"
          >
            <FiHome className="inline-block mr-2" />
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => dispatch(changeMenuOpen())}
            className="flex w-full h-14 justify-center items-center hover:bg-slate-600 hover:text-white"
          >
            <FiInfo className="inline-block mr-2" />
            About
          </NavLink>
          {isSignedIn ? (
            <NavLink
              to="/signIn"
              onClick={() => dispatch(changeMenuOpen())}
              className="flex w-full h-14 justify-center items-center hover:bg-slate-600 hover:text-white"
            >
              <CiLogin className="inline-block mr-2" /> Sign In
            </NavLink>
          ) : (
            <button className="flex w-full h-14 justify-center items-center hover:bg-slate-600 hover:text-white">
              <PiSignOutBold className="inline-block mr-2"/>
             Sign Out
            </button>
          )}
        </nav>
        <div className="w-full pl-3">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
