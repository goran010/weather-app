import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import MainNavigation from "../components/layout/Header";
const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <Outlet/>
      <Footer />
    </>
  );
};

export default RootLayout;
