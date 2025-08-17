import React from "react";
import carat from "@assets/LandingPage/icons/carat-ico.png";
import color from "@assets/LandingPage/icons/color-ico.png";
import cut from "@assets/LandingPage/icons/cut-ico.png";
import clarity from "@assets/LandingPage/icons/clarity-ico.png";
import colorActive from "@assets/LandingPage/icons/color-active.png";

export type Props = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const CharacteristicsBuyingGuide: React.FC<Props> = ({
  selected,
  setSelected,
}) => {
  return (
    <div>
      <ul className="flex flex-wrap gap-x-6 md:gap-x-4 xl:gap-x-10 gap-y-5 md:gap-y-3 lg:gap-y-6 w-[85%] md:w-[90%] lg:w-[95%] xl:w-[95%] 2xl:w-[95%] justify-center md:justify-normal mt-8 lg:mt-20">
        <li
          onClick={() => {
            setSelected("Cut");
          }}
          className={`rounded-full h-[90px] w-[90px] xl:h-[118px] xl:w-[118px] shadow-[0px_0px_40px_#cacaca] text-[13px] xl:text-[14px] font-bold cursor-pointer flex flex-col items-center justify-center space-y-1 hover:border-[#1f1f3c] border-[1px] ${
            selected === "Cut"
              ? "text-[#1f1f3c] border-[#1f1f3c]"
              : "text-[#53556b]"
          }`}
        >
          <img
            src={cut}
            className="w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]"
          />
          <p>Cut</p>
        </li>
        <li
          onClick={() => {
            setSelected("Color");
          }}
          className={`rounded-full h-[90px] w-[90px] xl:h-[118px] xl:w-[118px] shadow-[0px_0px_40px_#cacaca] text-[13px] xl:text-[14px] font-bold cursor-pointer flex flex-col items-center justify-center space-y-1 hover:border-[#1f1f3c] border-[1px] ${
            selected === "Color"
              ? "text-[#1f1f3c] border-[#1f1f3c]"
              : "text-[#53556b]"
          }`}
        >
          <img
            src={selected === "Color" ? colorActive : color}
            className="w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]"
          />
          <p>Color</p>
        </li>
        <li
          onClick={() => {
            setSelected("Carat");
          }}
          className={`rounded-full h-[90px] w-[90px] xl:h-[118px] xl:w-[118px] shadow-[0px_0px_40px_#cacaca] text-[13px] xl:text-[14px] font-bold cursor-pointer flex flex-col items-center justify-center space-y-1 hover:border-[#1f1f3c] border-[1px] ${
            selected === "Carat"
              ? "text-[#1f1f3c] border-[#1f1f3c]"
              : "text-[#53556b]"
          }`}
        >
          <img
            src={carat}
            className="w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]"
          />
          <p>Carat</p>
        </li>
        <li
          onClick={() => {
            setSelected("Clarity");
          }}
          className={`rounded-full h-[90px] w-[90px] xl:h-[118px] xl:w-[118px] shadow-[0px_0px_40px_#cacaca] text-[13px] xl:text-[14px] font-bold cursor-pointer flex flex-col items-center justify-center space-y-1 hover:border-[#1f1f3c] border-[1px] ${
            selected === "Clarity"
              ? "text-[#1f1f3c] border-[#1f1f3c]"
              : "text-[#53556b]"
          }`}
        >
          <img
            src={clarity}
            className="w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]"
          />
          <p>Clarity</p>
        </li>
      </ul>
    </div>
  );
};

export default CharacteristicsBuyingGuide;
