import React from "react";
import busCareImage from "@assets/Contact/bus-care-bg-dots.jpg"; // Import the image
import dotsImage from "@assets/WhyAlmas/dots.png";

const FreeWarranty: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row relative mx-auto w-[95%] md:w-[91%] lg:w-[88%] xl:w-[84%] 2xl:w-[74%]">
      {/* Left Column */}
      <div className="w-[95%] mx-auto md:w-1/2 flex-1 relative">
        {/* Light Circle in Background */}
        <div className="absolute top-0 left-0  bg-[#c7c7c77b] rounded-full opacity-40 -z-10 sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] xl:w-[350px] xl:h-[350px] 2xl:w-[400px] 2xl:h-[400px]"></div>
        <h1
          id="lifetime"
          className="text-[#201f41] text-left font-medium mb-[20px] xl:mb-[30px] text-[40px] md:text-[50px] 2xl:text-[60px] 2xl:w-[30%]"
        >
          FREE
          <br />
          LIFETIME WARRANTY
        </h1>
        <h2 className="text-[#88787e] text-3xl italic sm:text-[30px] sm:mb-[25px]">
          Conditions And Exclusions
        </h2>
        <p className="text-[14px] font-bold text-[#53556b] italic sm:pr-[0px] sm:my-[0px] sm:text-[14px] sm:leading-[20px] sm:mb-[20px] md:mb-[30px] 2xl:w-[70%]">
          The foregoing Manufacturer Warranty and Complimentary Services are
          available only to the person who purchased the covered product from
          Almas-Online.
        </p>
        <p className="text-[14px] font-bold text-[#53556b] italic sm:pr-[0px] sm:my-[0px] sm:text-[14px] sm:leading-[20px] sm:mb-[20px] md:mb-[30px]">
          We do not provide warranties for loss of stones or theft.
        </p>
      </div>
      {/* Right Column */}
      <div className="w-[95%] mx-auto md:w-1/2 text-start leading-[1.4] lg:px-6  text-[16px] text-[#88787e]">
        <p className="sm:mb-[20px] sm:leading-[25px] xl:mb-[30px] xl:leading-[1.4]">
          We stand behind our products and guarantee that all items will be free
          from manufacturing defects for the life of the products. If you
          believe your item has a manufacturing defect, you may return it to us
          for inspection. If we determine your merchandise is damaged due to a
          manufacturing defect, we will repair the merchandise or, if we deem
          appropriate, replace the item. If the item is no longer available,
          Almas-Online may, in its discretion, replace with like-kind or allow a
          refund equal to the selling price of the original item or component.
        </p>
        <p className="sm:mb-[20px] sm:leading-[25px] xl:mb-[30px] xl:leading-[1.4]">
          If we determine that the damage is not caused by a manufacturing
          defect, then we will notify you and let you know if repair services
          are available at cost or otherwise.
        </p>
        <p className="sm:mb-[20px] sm:leading-[25px] xl:mb-[30px] xl:leading-[1.4]">
          Please note that slight irregularities and variations in craftsmanship
          or natural characteristics, or internal inclusions, visible or
          otherwise are unique and individual to each item. These
          characteristics are considered as part of the character of the item
          and should not be considered a defect.
        </p>
      </div>
    </div>
  );
};

export default FreeWarranty;
