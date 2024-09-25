//hooks
import { useDispatch } from "react-redux";
import { useStoreSelector } from "../../store/hooks";

//slice actions
import { changeMenuOpen } from "../../store/ui-slice";

//components
import Profile from "../Profile";
import Input from "../Input";

//icons
import { RxHamburgerMenu } from "react-icons/rx";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";

const Header = () => {
  const dispatch = useDispatch();

  const isMenuOpened = useStoreSelector((state) => {
    return state.ui.hamburgerMenuOpened;
  });

  return (
    <header className="px-6 sm:px-20 lg:px-28 lg:py-3 py-5 sm:relative sticky top-0 bg-gray-900 z-20 mb-4 text-white flex flex-col justify-between  gap-3 lg:gap-5 lg:grid grid-cols-12 grid-rows-1 gap-x-16 content-end">
      {/*mobile view */}
      <RxHamburgerMenu
        className="w-8 h-8 lg:hidden"
        onClick={() => dispatch(changeMenuOpen())}
      />
      {isMenuOpened && <MobileNavigation isSignedIn={true} />}

      {/*desktop view */}
      <div className="hidden lg:block col-start-1 col-end-1">
        <Profile />
      </div>
      <div className="hidden lg:flex col-start-2 col-end-8">
        <Navigation />
      </div>
      <div className="col-start-9 col-end-13 h-full flex items-center">
        <Input />
      </div>
    </header>
  );
};

export default Header;
