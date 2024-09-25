//hooks
import { useStoreDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

//slice actions
import { changeSignInStatus } from "../store/ui-slice";

//auth and firebase
import { auth, db, googleProvider } from "../firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

//router
import { Link } from "react-router-dom";

//slice actions
import { fetchCities } from "../store/worldCities-slice";

const SignIn = () => {
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();

  //refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signInHandler = async (e: React.FormEvent<EventTarget>) => {
    //prevent page refresh
    e.preventDefault();

    try {
      // Attempts to sign in with email and password
      await signInWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
      // Updates the user sign-in status
      dispatch(changeSignInStatus());

      // Fetches cities data for that user
      dispatch(fetchCities());

      //navigate to home page
      navigate("/");
    } catch (error) {
      // Catches any error during sign-in
      if (error instanceof Error && "code" in error) {
        // Check if it's a Firebase specific error
        if (error.code === "auth/invalid-email") {
          alert("invalid email");
          emailRef.current!.focus();
        }
        if (error.code === "auth/wrong-password") {
          alert("wrong password");
          passwordRef.current!.focus();
        }
      } else {
        // Catches other exceptions
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const signInWithGoogleHandler = async (e: React.FormEvent<EventTarget>) => {
    //prevent page refresh
    e.preventDefault();

    try {
      //firebase auth with google
      await signInWithPopup(auth, googleProvider);
      console.log(auth.currentUser?.uid);

      if (auth.currentUser?.metadata.creationTime) {
        // Convert creationTime to a Date object
        const creationTime = new Date(auth.currentUser.metadata.creationTime);
        // Current date
        const currentTime = new Date();

        //if diffrence is greater than 10 seconds in milliseconds
        if (currentTime.getTime() - creationTime.getTime() <= 10000) {
          await setDoc(
            doc(collection(db, "UsersCities"), auth.currentUser.uid),
            {
              cities: ["Belgrade", "Zagreb", "Ljubljana", "Sarajevo", "Skopje"],
              userUID: auth.currentUser.uid,
              email: auth.currentUser.email,
            }
          );
        }
      }
      // Fetches cities data
      dispatch(fetchCities());

      // Updates the user sign-in status and redirects the user to the home page
      dispatch(changeSignInStatus());

      //navigate to home page
      navigate("/");
    } catch (error) {
      // Catches other exceptions
      console.log(error);
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 gap-3">
        <form
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
          onSubmit={signInHandler}
        >
          <h1 className="mb-8 text-3xl text-center">Sign in</h1>
          <input
            ref={emailRef}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            required
          />
          <input
            ref={passwordRef}
            type="password"
            className="block border border-grey w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
          >
            Sign In
          </button>
        </form>
        <button
          onClick={signInWithGoogleHandler}
          className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
        >
          Sign In with Google
        </button>
        <div className="text-grey-dark mt-3 ">
          Don't have an account?{" "}
          <Link className="text-blue-700 hover:text-red-500" to="/signUp">
            Sign up
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default SignIn;
