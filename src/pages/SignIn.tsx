import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeSignInStatus } from "../store/ui-slice";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRef } from "react";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const signInHandler = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        email.current!.value,
        password.current!.value
      );
      dispatch(changeSignInStatus());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogleHandler = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }

    dispatch(changeSignInStatus());
    navigate("/");
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
          onSubmit={signInHandler}
        >
          <h1 className="mb-8 text-3xl text-center">Sign in</h1>
          <input
            ref={email}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />
          <input
            ref={password}
            type="password"
            className="block border border-grey w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
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
        <div className="text-grey-dark mt-6">
          Don't have an account?
          <Link className="text-blue" to="/signUp">
            Sign up
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default SignIn;
