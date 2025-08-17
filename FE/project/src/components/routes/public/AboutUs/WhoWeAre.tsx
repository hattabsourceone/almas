import image from "@assets/AboutUs/about-1.png";
import React from "react";

const WhoWeAre: React.FC = () => {
  return (
    <div className="w-full px-2 sm:px-3">
      <div className="w-full flex flex-col gap-[30px] md:flex-row my-5 xl:my-1 xl:!mt-[16px] md:!mt-[42px] lg:!mt-[24px] ">
        <div
          data-aos-duration="1000"
          data-aos="fade-right"
          className="w-[95%] sm:w-[70%] md:w-[30%] 2xl:w-[27%] mx-auto  flex items-center justify-center md:items-start"
        >
          <img className="w-full" src={image} alt="about almas online" />
        </div>
        <div className="md:w-[64%] xl:w-[67%] flex flex-col gap-2  md:pt-14 lg:pt-12">
          <div
            data-aos-duration="1000"
            data-aos="fade-left"
            className="flex flex-col gap-3 md:justify-end"
          >
            <h1 className="text-[#201F41] text-[40px] md:text-[50px]  2xl:text-[60px]  font-medium mt-4 sm:!mt-0 lg:mb-[-16px]">
              WHO WE ARE
            </h1>{" "}
            <div className="bg-slogan-bg bg-no-repeat bg-left-top lg:mt-7">
              {" "}
              <h2 className="text-start italic text-[25px] font-medium  pb-4 text-[#88787e]">
                Almas-Online{" "}
              </h2>{" "}
              <p className="text-[16px] italic pb-4 text-[#53556b] leading-[30px] max-w-[670px]">
                Is a polished loose diamonds trading platform for Manjam
                Precious Stones DMCC, whis is licensed and regulated by Dubai
                Multi Commodities Center DMCC, Company Regualtion 2003 and by
                laws of Dubai Diamond Exchange.{" "}
              </p>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:px-7 xl:px-20 ">
        <ul className="text-[15px] 2xl:text-[16px] text-[#88787E] leading-[30px] md:flex md:gap-10 md:justify-center lg:justify-between lg:ml-[-7px] xl:ml-[-58px]">
          <li
            className="md:w-[200px] lg:w-[250px] xl:w-[300px] 2xl:w-[33%] "
            data-aos-duration="1000"
            data-aos="fade-up"
          >
            We are a global supplier of high-quality certified loose diamonds at
            competitive prices. Our business operation team sources diamond
            stones directly from diamond production facilities around the world,
            skipping the middle-man, to deliver to you best quality diamonds at
            best possible prices.
          </li>
          <li
            className="md:w-[200px] lg:w-[250px] xl:w-[300px] 2xl:w-[33%] "
            data-aos-duration="1000"
            data-aos="fade-up"
          >
            At Almas-online, service and relationship matters. ‘Beyond Service’
            is what best define the level of commitment and support that
            Almas-online provides. Trust, reliability and unwavering level of
            self-involvement are the natural traits of our relationship with our
            clients. With Almas-online it always gets personal.
          </li>
          <li
            className="md:w-[200px] lg:w-[250px] xl:w-[300px] 2xl:w-[33%]"
            data-aos-duration="1000"
            data-aos="fade-up"
          >
            We specifically partner with miners and diamond cutters in Africa.
            As part of our social responsibility we continuously work with
            business that are committed to their workers’ rights and community
            development.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WhoWeAre;
