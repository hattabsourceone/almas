import React from "react";
import image from "@assets/LandingPage/about.png";
import { Link } from "react-router-dom";

const LandingAboutUs: React.FC = () => {
  return (
    <div className="h-auto bg-lite-gray w-full">
      <div
        data-aos="fade-top"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        className="flex flex-col items-center md:items-start md:flex-row justify-around w-full py-14 md:py-24 xl:py-20 2xl:py-12"
      >
        <div className="w-[95%] md:w-[50%] flex items-center justify-center">
            <img className="w-[345px] lg:w-[455px] xl:w-[500px]" src={image} />
        </div>
        <div className="w-[95%] md:w-[50%]">
          <h1 className="font-medium uppercase text-[#201F41] text-[40px] xl:text-[50px] 2xl:text-[60px] pb-2 lg:mb-4 xl:mb-6 2xl:mb-10">
            About Us
          </h1>
          <p className="text-[16px] text-[#88787e] italic font-bold pb-10 w-[95%] 2xl:w-[80%] leading-8 lg:leading-10" style={{ fontFamily: '"Times New Roman", Times, serif'}}>
            We are a global supplier of high-quality certified loose diamonds at
            competitive prices. Our business operation team sources diamond
            stones directly from diamond production facilities around the world,
            skipping the middle-man, to deliver to you best quality diamonds at
            best possible prices.
          </p>
          <Link
            to="/about"
            className="text-[15px] 2xl:text-[18px] font-medium text-white bg-[#201F41] py-2 px-8 rounded-full"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LandingAboutUs;
