import { Link } from "react-router-dom";
//hooks
import { useNavigate } from "react-router-dom";
import { useStoreDispatch } from "../store/hooks";
import { useRef } from "react";

//auth
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

//slice actions
import { changeSignInStatus } from "../store/ui-slice";

const SignUp = () => {
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signUpHandler = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(
      auth,
      emailRef.current!.value,
      passwordRef.current!.value
    ).then((userCredential) => {
      // Signed up
      const user = userCredential.user;
    });
    dispatch(changeSignInStatus());
    navigate("/");
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <form
        className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2"
        onSubmit={signUpHandler}
      >
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Full Name"
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            ref={emailRef}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            ref={passwordRef}
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the Terms of Service and Privacy Policy
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?{" "}
          <Link className="text-blue" to="/signIn">
            Sign in
          </Link>
          .
        </div>
      </form>
    </div>
  );
};

export default SignUp;
