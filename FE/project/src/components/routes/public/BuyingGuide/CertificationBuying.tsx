import React from "react";
import { useNavigate } from "react-router-dom";

const CertificationBuying: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto flex flex-col items-center justify-start w-[96%] md:w-[95%] lg:w-[93%] xl:w-[90%] 2xl:w-[81%]">
      <h1 className="text-center text-[#211F41] font-medium text-[28px] md:text-[34px] mb-10">
        Certification
      </h1>
      <p className="lg:leading-[30px] lg:text-[16px] text-[#53556b] [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]  text-base font-medium text-center mb-[20px] sm:mb-[16px] leading-[30px] sm:text-[14px] 2xl:text-[16px] sm:leading-[26px]   2xl:leading-[30px] mx-auto w-full ">
        At Almas-online, it is our mission to take the mystery out of your
        purchase by offering only the best quality loose diamonds available,
        along with expert guidance and education. Our diamonds are certified by
        top certification bodies in the world. We're confident that you won't
        find a better diamond for the price.
      </p>
      <p className="lg:leading-[30px] w-full lg:text-[16px] text-[#53556b] [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]  text-base font-medium text-center mb-[30px] sm:mb-[20px] leading-[30px] text-[16px] sm:text-[14px] sm:leading-[26px] mx-auto 2xl:text-[16px]  2xl:leading-[30px]">
        This combination of exceptional quality and extraordinary value has
        drawn a lot of people to Almas-online.
      </p>
      <h1 className="text-center text-[#211F41] font-medium text-[28px] md:text-[34px] mb-[30px] xl:mb-[40px] w-full sm:mb-[20px]">
        Highest Diamond Quality
      </h1>
      <p className="lg:leading-[30px]  w-full lg:text-[16px] 2xl:text-[16px] text-[#53556b] [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]  text-base font-medium text-center mb-[20px] leading-[30px] sm:text-[14px] sm:leading-[26px]  xl:leading-[30px]  mx-auto  ">
        Almas-online offers one of the most extensive collections of the world's
        finest cut diamonds. Selected for exceptional quality, cut, color, and
        clarity, our{" "}
        <span
          onClick={() => navigate("/search-inventory/all-diamond")}
          className="font-bold cursor-pointer text-[#211F41]"
        >
          loose diamonds
        </span>{" "}
        are evaluated based on a standardized grading scale. Each loose diamond
        is accompanied by a grading report from the GIA, HRD, or IGI, which are
        the top independent diamond grading labs that are highly respected for
        their consistency and stringent grading standards.
      </p>
    </div>
  );
};

export default CertificationBuying;
