import Bubbel from "@components/shared/Bubbel/Bubbel";
import React from "react";

const OnlyQuality: React.FC = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row w-[96%] md:w-[86%] lg:w-[83%] xl:w-[81%] 2xl:w-[72%] mx-auto space-y-8 lg:space-y-0 lg:space-x-3 2xl:space-x-36 z-10 relative">
        <div
          id="natural-diamond"
          className="w-[99%] lg:w-1/2 mx-auto"
          //data-aos-duration="3000"
          //data-aos="fade-left"
        >
          <h1 className="mb-8 text-[#201f41] text-[50px] 2xl:text-[60px] w-[99%] 2xl:w-[80%]">
            ONLY NATURAL & QUALITY DIAMONDS
          </h1>
          <h6 className="text-[#53556b] text-[16px] leading-6">
            Almas-online only trade natural and high-quality diamonds. All our
            diamonds are carefully selected, and they are manufactured at the
            highest precision. To make sure that our diamonds are of the highest
            standard they are all graded and certified by the world best
            laboratory Gemological Institute of America (GIA)
          </h6>
        </div>
        <div
          className="w-[99%] lg:w-1/2 mx-auto relative"
          //data-aos-duration="3000"
          //data-aos="zoom_in"
        >
          <div //data-aos-duration="3000" //data-aos="fade-left"
            className="lg:mt-96 mb-10 lg:mb-0"
          >
            <h1 className="mb-8 text-[#201f41] text-[50px] 2xl:text-[60px] w-[99%] 2xl:w-[80%]">
              CONFLICT-FREE DIAMONDS
            </h1>
            <p className="text-[#53556b] text-[16px] leading-6">
              At Almas-online, along with the global diamond industry, has a
              zero-tolerance policy toward conflict diamonds. Through measures
              such as the Kimberley Process, which tracks diamonds from mine to
              market, the industry in partnership with the United Nations,
              governments, and non-governmental organizations, polices diamond
              exports to prevent the trade of illegal diamonds. At Almas-online,
              we only purchase diamonds through the largest and most respected
              suppliers who, like us, proudly adhere to and enforce the
              standards established by the Kimberley Process. All Almas-online
              diamonds are warranted to be conflict free. If one of our
              suppliers was ever found to be in violation of that process, we
              would immediately sever that relationship. We will continue to
              support and promote any process that works to uphold legitimacy in
              the diamond trade. Diamonds are mined throughout the world,
              including major mines in Australia, Africa, Russia and Canada.
              Diamonds are a major source of good in many African nations,
              employing and providing healthcare to thousands.
            </p>
          </div>
          <div className="lg:absolute mx-auto bg-[#1f1f41] text-[#fff] rounded-full w-[400px] h-[400px] lg:w-[360px] lg:h-[360px] xl:h-[365px] xl:w-[365px] flex flex-col items-center justify-center px-8 lg:top-48 lg:-right-20 xl:right-14 2xl:right-20 transform lg:-translate-y-96">
            <h4 className="text-center text-[30px] italic font-medium">
              Unmatched Prices
            </h4>
            <p className="text-center text-[16px] mt-8">
              We source our diamonds directly from diamond miners and diamond
              manufacturers in Africa and we cut all middle agents and you get
              the best high-quality diamonds at the best possible price
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlyQuality;
