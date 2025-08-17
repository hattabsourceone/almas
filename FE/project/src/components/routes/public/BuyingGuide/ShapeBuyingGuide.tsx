import React from "react";

import image from "@assets/BuyingGuide/shape.jpg";
import circle from "@assets/LandingPage/Collections/circle.png";

const ShapeBuyingGuide: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row xl:gap-7 items-start justify-start">
      {/* Left Column with Text and Circle */}
      <div className="w-full lg:w-1/2 relative">
        {/* Circle Background */}
        <div className="absolute bottom-0 left-[-40px] w-[450px] h-[450px] bg-[#f8f8f8] rounded-full z-[1]" />
        <div
          className="text-[18px] 2xl:text-[18px] text-[#53556b] mb-6 lg:mb-[16px] font-plain-light leading-[26px] md:leading-[30px] lg:leading-[30px] z-10 relative"
          style={{ textShadow: "0 0 0 rgba(0, 0, 0, 0.5)" }}
        >
          <h1 className="text-start font-normal text-[33px] text-[#444] sm:mb-[10px] sm:mt-[20px] 2xl:mt-[80px] lg:mt-[40px]">
            Shapes
          </h1>
          <div className="lg:leading[30px] text-[#53556b]  [text-shadow:_0_0_0_rgb(0_0_#000_/_100%)]" style={{textShadow:" 0px 0px #000"}}>
            <p className="mb-[16px]  text-[#53556b]   text-[18px]">
              Diamonds come in different shapes. And while different people
              prefer different shapes, the round diamond shape is the most
              popular: About 80% of engagement rings contain a round diamond.
              Whatever your taste or preference, however, Almas online have
              access to a large pool of diamonds stones of various shapes.
            </p>
            <p className="mb-[16px] text-[#53556b]   text-[18px]">
              Diamonds are renowned for their ability to transmit light and
              sparkle so intensely. We often think of a diamond’s cut as shape
              (round, heart, oval, marquise, pear), but a diamond’s cut grade is
              actually about how well a diamond’s facets interact with light.
            </p>
            <p className="mb-[16px]">
              Precise artistry and workmanship are required to fashion a stone,
              so its proportions, symmetry and polish deliver the magnificent
              return of light only possible in a diamond.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column (Image) */}
      <div className="w-full lg:w-1/2 xl:w-[80%] flex  xl:mt-12 pb-[30px] xl:px-[15px]">
        <img className="w-auto h-auto" src={image} alt={image} />
      </div>
    </div>
  );
};

export default ShapeBuyingGuide;
