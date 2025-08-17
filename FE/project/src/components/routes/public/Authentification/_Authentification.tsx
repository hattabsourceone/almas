import React from "react";
import SignupImage from "@assets/Auth/signup-1.jpg";
import Login from "./Login";
import Register from "./Register";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import Contact from "@components/shared/Contact/Contact";

const Authentification: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="flex flex-col">
      <div
        className="flex items-center justify-center h-[200px] sm:h-[216px] md:h-[260px] lg:h-[349px] xl:h-[438px] 2xl:h-[660px] md:justify-start md:px-16 lg:px-16 xl:-mt-8 2xl:px-64 2xl:-mt-4"
        style={{
          background: `url(${SignupImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-white uppercase font-medium text-[40px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[65px]">
          Login
        </h1>
      </div>
      <div className="mt-[20px] -ml-9 md:-ml-10 lg:-ml-11 xl:-ml-9 2xl:ml-0">
        <Breadcrumb
          menu={[
            {
              title: "Account",
              link: "/profile",
              level: 1,
            },
            {
              title: "Login",
              link: pathname,
              level: 1,
            },
          ]}
        />
      </div>
      <div className="mx-auto flex flex-col md:flex-row w-[95%] lg:w-[93%] xl:w-[90%] 2xl:w-[80%] mt-3 md:space-x-7">
        <Register />
        <Login />
      </div>
      <Contact />
    </div>
  );
};

export default Authentification;
