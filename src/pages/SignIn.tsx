//hooks
import { useStoreDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

//slice actions
import { changeSignInStatus } from "../store/ui-slice";

//auth
import { auth, googleProvider } from "../firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { Link } from "react-router-dom";

const SignIn = () => {
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signInHandler = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    try {
      signInWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          console.log(error);
        });
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
            ref={emailRef}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />
          <input
            ref={passwordRef}
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
