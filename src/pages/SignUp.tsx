//router
import { Link } from "react-router-dom";

//hooks
import { useNavigate } from "react-router-dom";
import { useStoreDispatch } from "../store/hooks";
import { useRef } from "react";

//auth
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";

//firebase
import { collection, doc, setDoc } from "firebase/firestore";

//slice actions
import { changeSignInStatus } from "../store/ui-slice";

const SignUp = () => {
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();

  //refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const signUpHandler = async (e: React.FormEvent<EventTarget>) => {
    // Prevents the default form behavior to prevent page refresh
    e.preventDefault();
    if (passwordRef.current?.value == confirmPasswordRef.current?.value) {
      try {
        // Attempts to create a new user using the entered email and password
        await createUserWithEmailAndPassword(
          auth,
          emailRef.current!.value,
          passwordRef.current!.value
        );

        // If user creation is successful, sets a document in the "UsersCities" collection with data
        if (auth.currentUser) {
          await setDoc(
            doc(collection(db, "UsersCities"), auth.currentUser.uid),
            {
              cities: ["Belgrade", "Zagreb", "Ljubljana", "Sarajevo", "Skopje"],
              userUID: auth.currentUser.uid,
              email: auth.currentUser.email,
            }
          );
        }

        // Updates the user sign-in status and redirects the user to the home page
        dispatch(changeSignInStatus());
        navigate("/");
      } catch (error) {
        console.log(error);
        if (error instanceof Error && "code" in error) {
          // Check if it's a Firebase specific error
          if (error.code == "auth/invalid-email") {
            alert("invalid email");
            emailRef.current!.focus();
          }
          if (error.code == "auth/weak-password") {
            alert("Password should be at least 6 characters");
            passwordRef.current!.focus();
          }
        } else {
          // Catches other exceptions
          console.error("An unexpected error occurred:", error);
        }
      }
    } else {
      alert("passwords are not same");
      confirmPasswordRef.current?.focus();
    }
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
            required
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            ref={emailRef}
            required
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
            required
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the{" "}
            <span className="text-blue-900 hover:text-red-700 cursor-pointer">
              Terms of Service and Privacy Policy
            </span>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?{" "}
          <Link className="text-blue-700 hover:text-red-500" to="/signIn">
            Sign in
          </Link>
          .
        </div>
      </form>
    </div>
  );
};

export default SignUp;
