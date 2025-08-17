import React, { useEffect, useState } from "react";
import UpperNav from "./UpperNav";
import MainNavbar from "./MainNavbar";
import BottomNav from "./BottomNav";
import SubMenuNav from "./SubMenuNav";

const NavBar: React.FC = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleScreenChange = () => {
      setIsLargeScreen(mediaQuery.matches);
    };

    handleScreenChange();

    mediaQuery.addEventListener("change", handleScreenChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  return (
    <>
      <UpperNav />
      <MainNavbar />
      <BottomNav />
      <SubMenuNav />
    </>
  );
};

export default NavBar;
