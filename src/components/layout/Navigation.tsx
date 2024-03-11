import { NavLink } from "react-router-dom";

//hooks
import { useStoreSelector } from "../../store/hooks";

//auth
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useEffect, useState } from "react";

const Navigation = () => {
  const isSignedIn = useStoreSelector((state) => state.ui.isSignedIn);

  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    setUser(auth.currentUser);
  }, [auth.currentUser]);
  //logic for signing out
  const signOutHandler = async () => {
    try {
      await signOut(auth);
      setUser(auth.currentUser);
      console.log(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="w-full h-full flex justify-evenly items-end">
      <NavLink
        to={"/"}
        className="bg-blue-700 md:bg-transparent  block pl-3 pr-4 py-2 text-base md:hover:text-blue-700 md:p-0 rounded "
        aria-current="page"
        style={({ isActive }) => {
          return {
            color: isActive ? "rgb(29 78 216)" : "rgb(55 65 81)",
          };
        }}
      >
        Home
      </NavLink>

      <NavLink
        to={"/About"}
        className="bg-blue-700 md:bg-transparent  block pl-3 pr-4 py-2 text-base md:hover:text-blue-700 md:p-0 rounded "
        aria-current="page"
        style={({ isActive }) => {
          return {
            color: isActive ? "rgb(29 78 216)" : "rgb(55 65 81)",
          };
        }}
      >
        About
      </NavLink>

      {!user && (
        <NavLink
          to="/signIn"
          className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 text-base md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
          style={({ isActive }) => {
            return {
              color: isActive ? "rgb(29 78 216)" : "rgb(55 65 81)",
            };
          }}
        >
          Sign in
        </NavLink>
      )}
      {user && (
        <button className="cursor-pointer" onClick={signOutHandler}>
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default Navigation;
