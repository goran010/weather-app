import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Input from "../Input";
import { changeSignInStatus } from "../../store/ui-slice";
import { useStoreSelector } from "../../store/hooks";
import Profile from "../Profile";
import { RxHamburgerMenu } from "react-icons/rx";

const MainNavigation = () => {
  const dispatch = useDispatch();

  const isSignedIn = useStoreSelector((state: any) => {
    return state.ui.isSignedIn;
  });
  console.log(isSignedIn);
  const signOutHandler = async () => {
    try {
      dispatch(changeSignInStatus());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="px-8 sm:px-28 sm:relative sticky top-0 bg-white z-20">
      <div className="justify-between py-4 flex flex-col gap-5 lg:grid grid-cols-12 grid-rows-5 gap-x-16 content-end">
        <RxHamburgerMenu className="w-9 h-9 lg:hidden"/>
        <Profile />
        <Input />
      </div>
    </header>
  );
};

export default MainNavigation;
