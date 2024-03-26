//types
import { MouseEvent } from "react";

//navigation router links
import { NavLink } from "react-router-dom";

//hooks
import { useStoreSelector } from "../../store/hooks";
import {useEffect, useState } from "react";
//auth
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";


const Navigation = () => {
  // Retrieve the sign-in status from the store
  const isSignedIn = useStoreSelector((state) => state.ui.isSignedIn);

  // State to track the current user
  const [user, setUser] = useState(auth.currentUser);

  // Effect to update the current user when authentication state changes
  useEffect(() => {
    setUser(auth.currentUser);
  }, [auth.currentUser]);

  // Function to handle signing out
  const signOutHandler = async () => {
    try {
      // Sign out the user
      await signOut(auth);
      // Update the user state
      setUser(auth.currentUser);
      // Log the current user
      console.log(auth.currentUser);
    } catch (error) {
      // Handle sign-out errors
      console.log(error);
    }
  };

  // Function to handle hover effect on NavLink
  const handleHover = (event: MouseEvent<HTMLAnchorElement>) => {
    // Change text color to blue on hover
    event.currentTarget.style.color = "rgb(51 171 240)";
  };

  // Function to handle mouse out effect on NavLink
  const handleMouseOut = (event: MouseEvent<HTMLAnchorElement>) => {
    // Change text color back to white if the link is not active
    if (!event.currentTarget.classList.contains("active")) {
      event.currentTarget.style.color = "rgb(255 255 255)";
    }
  };

  return (
    <nav className="w-full h-full flex justify-evenly items-center">

      <NavLink
        to={"/"}
        className="block pl-3 pr-4 py-2 text-base md:p-0 rounded"
        aria-current="page"
        style={({ isActive }) => ({

          color: isActive ? "rgb(51 171 240)" : "rgb(255 255 255)",
        })}
        onMouseOver={handleHover}
        onMouseOut={handleMouseOut}
      >
        Home
      </NavLink>


      <NavLink
        to={"/About"}
        className="block pl-3 pr-4 py-2 text-base md:p-0 rounded"
        aria-current="page"
        style={({ isActive }) => ({

          color: isActive ? "rgb(51 171 240)" : "rgb(255 255 255)",
        })}
        onMouseOver={handleHover}
        onMouseOut={handleMouseOut}
      >
        About
      </NavLink>


      {!user && (
        <NavLink
          to="/signIn"
          className="border-b border-gray-100 text-base md:border-0 block pl-3 pr-4 py-2 md:p-0"
          style={({ isActive }) => ({
            color: isActive ? "rgb(51 171 240)" : "rgb(255 255 255)",
          })}
          onMouseOver={handleHover}
          onMouseOut={handleMouseOut}
        >
          Sign in
        </NavLink>
      )}

      {user && (
        <button
          className="border-b border-gray-100 text-base md:border-0 block pl-3 pr-4 py-2 md:p-0"
          onClick={signOutHandler}
        >
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default Navigation;



