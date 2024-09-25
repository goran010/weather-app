//types
import { MouseEvent } from "react";

//navigation router links
import { NavLink } from "react-router-dom";

//hooks
import { useStoreDispatch} from "../../store/hooks";
import { useEffect, useState } from "react";
//auth
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { fetchCities } from "../../store/worldCities-slice";
import { changeSignInStatus } from "../../store/ui-slice";

const Navigation = () => {
  const dispatch = useStoreDispatch();

  // State to track the current user
  const [user, setUser] = useState(auth.currentUser);
  // Effect to update the current user when authentication state changes
  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  // Function to handle signing out
  const signOutHandler = async () => {
    try {
      // Check if there is a signed-in user
      if (auth.currentUser) {
        console.log("Signing out user:", auth.currentUser.uid);

        // Sign out the user
        await signOut(auth);

        // Fetch cities data after sign-out
        dispatch(fetchCities());

        // Update the user sign-in status to indicate sign-out
        dispatch(changeSignInStatus());

        // Logs the current user should be null
        console.log("User signed out:", auth.currentUser);
      } else {
        console.log("No user is signed in.");
      }
    } catch (error) {
      console.error("Error signing out:", error);
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
