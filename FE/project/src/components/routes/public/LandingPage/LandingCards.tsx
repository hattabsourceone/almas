import React from "react";
import pinkCardImage from "@assets/LandingPage/pink-card-side.png";
import blueCardImage from "@assets/LandingPage/blue-card-side.png";
import { useNavigate } from "react-router-dom";
const LandingCards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col lg:flex-row w-[99%] lg:w-[96%] xl:w-[92%] 2xl:w-[82%] mx-auto mt-10 space-y-7 md:space-y-0">
        <div
          data-aos="fade-right"
          className="w-[95%] mx-auto lg:w-1/2 p-4 bg-[#d9dbdd] flex flex-col sm:flex-row items-start lg:space-x-4 xl:space-x-8"
        >
          <img className="w-[98%] sm:w-[40%] xl:w-[48%]" src={blueCardImage} alt="blue-card" />
          <div>
            <p className="text-[40px] md:text-[50px] 2xl:text-[60px] text-[#201f41] uppercase xl:leading-[50px] 2xl:leading-[70px] mb-[15px] sm:mb-[40px]">
              DIAMOND RINGS
            </p>
            <p
              className="text-[16px] italic text-[#88787e] font-bold leading-8 lg:leading-10"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Explore our Collection of diamond rings for every occasion. From
              classic chic studs to high-quality statement hoops that will
              elevate your look
            </p>
            <button
              onClick={() => {
                navigate("/jewellery/Rings");
              }}
              className="bg-[#201F41] py-3 px-4 rounded-lg hover:opacity-70 mt-4 sm:mt-10"
            >
              <p className="text-[15px] 2xl:text-[18px] text-white font-medium">Enquire Now</p>
            </button>
          </div>
        </div>
        <div
          data-aos="fade-left"
          className="w-[95%] mx-auto lg:w-1/2 p-4 bg-[#f0e4d8] flex flex-col sm:flex-row items-start lg:space-x-4 xl:space-x-8"
        >
          <img className="w-[98%] sm:w-[40%] xl:w-[48%]" src={pinkCardImage} alt="pink-card" />
          <div>
            <p className="text-[40px] md:text-[50px] 2xl:text-[60px] text-[#201f41] uppercase xl:leading-[50px] 2xl:leading-[70px] mb-[15px] sm:mb-[40px]">
              DIAMOND PENDANT
            </p>
            <p
              className="text-[16px] italic text-[#88787e] font-bold leading-8 sm:leading-10"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Explore our Collection of diamond pendants for every occasion.
              From classic chic studs to high-quality statement hoops that will
              elevate your look
            </p>
            <button
              onClick={() => {
                navigate("/jewellery/Pendants");
              }}
              className="bg-[#201F41] py-3 px-4 rounded-lg hover:opacity-70 mt-4 sm:mt-10"
            >
              <p className="text-[15px] 2xl:text-[18px] text-white font-medium">Enquire Now</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingCards;
