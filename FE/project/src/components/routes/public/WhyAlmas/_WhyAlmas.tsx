import React, { useEffect } from "react";

import img from "@assets/WhyAlmas/banner.jpg";
import Banner from "@components/shared/Banner/Banner";
import FreeWarranty from "./FreeWarranty";
import SecureShipping from "./SecureShipping";
import SecurePayment from "./SecurePayment";
import OnlyQuality from "./OnlyQuality";
import Contact from "@components/shared/Contact/Contact";
import { useLocation } from "react-router-dom";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import cornerdots from "@assets/WhyAlmas/corner-dots.png";

const WhyAlmas = () => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const element = document.getElementById(location.hash.substring(1));
    document.title = "Why Almas Online";
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 50,
        behavior: "smooth",
      });
    }
  }, [location]);
  return (
    <div className="" style={{ fontFamily: "Plain Light,sans-serif" }}>
      <Banner title="Why Almas online" img={img} />
      <div className="mx-auto md:w-[90%] 2xl:[80%] ">
        <div className="pt-[22px] -ml-6 sm:-ml-8 md:-ml-14 lg:-ml-14 xl:-ml-12 2xl:-ml-4">
          <Breadcrumb
            menu={[
              {
                title: "Why Almas online",
                link: pathname,
                level: 1,
              },
            ]}
          />
        </div>
      </div>
      <div className="w-full pt-14 pb-[100px] relative">
        <img
          src={cornerdots}
          className="hidden lg:block absolute right-0 top-1/2 z-0 opacity-65 transform translate-y-1/2"
        />
        <FreeWarranty />
      </div>
      <div className="pt-[50px] pb-[50px] lg:pt-[150px] lg:pb-[100px] w-full bg-[#F8F8F9]">
        <SecureShipping />
      </div>
      <div className="w-full py-[150px] relative">
        <img
          src={cornerdots}
          className="hidden lg:block absolute left-0 top-1/2 z-0 opacity-65 transform translate-y-80"
        />
        <SecurePayment />
      </div>
      <div className="flex flex-col w-full bg-[#F3F5F6] py-20 lg:py-36">
        <OnlyQuality />
      </div>
      <Contact />
    </div>
  );
};

export default WhyAlmas;
