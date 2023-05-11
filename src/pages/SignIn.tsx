import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "../store/ui-slice";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signInHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    dispatch(signIn());
    navigate("/");
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form className="bg-white px-6 py-8 rounded shadow-md text-black w-full" onSubmit={signInHandler}>
          <h1 className="mb-8 text-3xl text-center">Sign in</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />
          <input
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

        <div className="text-grey-dark mt-6">
          Don't have an account?{" "}
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
