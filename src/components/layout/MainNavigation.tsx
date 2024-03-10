import { useDispatch } from "react-redux";
import Input from "../Input";
import { changeMenuOpen, changeSignInStatus } from "../../store/ui-slice";
import { useStoreSelector } from "../../store/hooks";
import Profile from "../Profile";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileNav from "./MobileNavigation";

const MainNavigation = () => {
  const dispatch = useDispatch();

  const isSignedIn = useStoreSelector((state) => {
    return state.ui.isSignedIn;
  });
  const isMenuOpened = useStoreSelector((state) => {
    return state.ui.hamburgerMenuOpened;
  });

  const signOutHandler = async () => {
    try {
      dispatch(changeSignInStatus());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="px-6 sm:px-20 lg:px-28 sm:relative sticky top-0 bg-white z-20">
      <div className="flex flex-col justify-between py-3 lg:py-5 gap-3 lg:gap-5 lg:grid grid-cols-12 grid-rows-5 gap-x-16 content-end">
        <button
          onClick={() => dispatch(changeMenuOpen())}
          className="lg:hidden"
        >
          <RxHamburgerMenu className="w-8 h-8" />
        </button>

        {isMenuOpened && <MobileNav isSignedIn={true} />}
        <div className="hidden md:block col-start-1 col-end-3 row-start-2 row-span-4">
          <Profile />
        </div>

        <Input />
      </div>
    </header>
  );
};

export default MainNavigation;
