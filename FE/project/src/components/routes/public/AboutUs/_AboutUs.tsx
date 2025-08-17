import React from "react";

import banner from "@assets/AboutUs/banner.jpg";
import { useEffect } from "react";
import Banner from "@components/shared/Banner/Banner";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import { useLocation } from "react-router-dom";
import OfficeLocation from "./OfficeLocation";
import WhoWeAre from "./WhoWeAre";

const AboutUs: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    document.title = "About Us";
  }, []);
  return (
    <>
      <Banner title="About Us" img={banner} />
      <div
        className=" mt-4 xl:ml-[35px] 2xl:ml-20 "
        style={{ color: "#333333" }}
      >
        <Breadcrumb
          menu={[
            {
              title: "About Us",
              link: pathname,
              level: 1,
            },
          ]}
        />
      </div>
      <div className="bg-center bg-no-repeat bg-cover mx-auto w-full lg:pt-[15px] xl:pt-[0px] lg:pb-[130px] lg:bg-[length:120%_83%] 2xl:bg-cover sm:bg-[length:100%_100%] md:bg-[length:110%_90%] lg:bg-[url('/src/assets/AboutUs/about-us-inner-bg.jpg')]">
        <div className="container d-flex flex-column sm:mt-3 xl:mt-1 sm:!pl-[37px] xl:!pl-[51px] 2xl:max-w-[1560px] 2xl:!w-[1560px]">
          <WhoWeAre />
        </div>
      </div>
      <div className="bg-[center] bg-no-repeat mx-auto w-full  bg-[url('/src/assets/AboutUs/loaction-bg.jpg')]">
        <div className="container d-flex flex-col w-full mx-auto my-4 py-4 px-4 2xl:!w-[1560px]">
          <OfficeLocation small={false} />
        </div>
      </div>
      <Contact />
    </>
  );
};

export default AboutUs;
