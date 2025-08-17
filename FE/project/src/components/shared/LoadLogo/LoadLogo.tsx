import React from "react";
import logo from "@assets/logo.svg";
import { Link } from "react-router-dom";

const LoadLogo: React.FC = () => {
  return (
    <Link to={"/"}>
      <img className="h-[55px] md:h-[32px] xl:h-[55px] mx-auto" src={logo} alt="Almas Online Logo" />
    </Link>
  );
};

export default LoadLogo;
