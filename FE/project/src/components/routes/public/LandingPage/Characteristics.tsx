import React from "react";
import shape from "@assets/LandingPage/icons/shape-ico.png";
import carat from "@assets/LandingPage/icons/carat-ico.png";
import color from "@assets/LandingPage/icons/color-ico.png";
import cut from "@assets/LandingPage/icons/cut-ico.png";
import clarity from "@assets/LandingPage/icons/clarity-ico.png";
import price from "@assets/LandingPage/icons/price-ico.png";
import colorActive from "@assets/LandingPage/icons/color-active.png";

export type Props = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const Characteristics: React.FC<Props> = ({ selected, setSelected }) => {
  return (
    <div data-aos="fade-right" className="w-[90%] md:w-[35%] mt-16 mx-auto">
      <ul className="flex flex-wrap gap-x-6 md:gap-x-4 xl:gap-x-10 gap-y-5 md:gap-y-3 lg:gap-y-6 w-[85%] md:w-[90%] lg:w-[85%] xl:w-[95%] 2xl:w-[70%] ml-8 justify-center md:justify-normal">
        <li
          onClick={() => {
            setSelected("shape");
          }}
          className={`rounded-full h-[90px] w-[90px] xl:h-[118px] xl:w-[118px] shadow-[0px_0px_40px_#cacaca] text-[13px] xl:text-[14px] font-bold cursor-pointer flex flex-col items-center justify-center space-y-1 hover:border-[#1f1f3c] border-[1px] ${
            selected === "shape"
              ? "text-[#1f1f3c] border-[#1f1f3c]"
              : "text-[#53556b]"
          }`}
        >
          <img src={shape} className="w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]"/>
          <p>Shape</p>
        </li>
        <li
          onClick={() => {
            setSelected("carat");
          }}
          className={`rounded-full h-[90px] w-[90px] xl:h-[118px] xl:w-[118px] shadow-[0px_0px_40px_#cacaca] text-[13px] xl:text-[14px] font-bold cursor-pointer flex flex-col items-center justify-center space-y-1 hover:border-[#1f1f3c] border-[1px] ${
            selected === "carat"
              ? "text-[#1f1f3c] border-[#1f1f3c]"
              : "text-[#53556b]"
          }`}
        >
          <img src={carat} className="w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]" />
          <p>Carat</p>
        </li>
        <li
          onClick={() => {
            setSelected("color");
          }}
          className={`rounded-full h-[90px] w-[90px] xl:h-[118px] xl:w-[118px] shadow-[0px_0px_40px_#cacaca] text-[13px] xl:text-[14px] font-bold cursor-pointer flex flex-col items-center justify-center space-y-1 hover:border-[#1f1f3c] border-[1px] ${
            selected === "color"
              ? "text-[#1f1f3c] border-[#1f1f3c]"
              : "text-[#53556b]"
          }`}
        >
          <img src={selected === "color" ? colorActive:color} className="w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]" />
          <p>Color</p>
        </li>

        <li
          onClick={() => {
            setSelected("cut");
          }}
          className={`rounded-full h-[90px] w-[90px] xl:h-[118px] xl:w-[118px] shadow-[0px_0px_40px_#cacaca] text-[13px] xl:text-[14px] font-bold cursor-pointer flex flex-col items-center justify-center space-y-1 hover:border-[#1f1f3c] border-[1px] ${
            selected === "cut"
              ? "text-[#1f1f3c] border-[#1f1f3c]"
              : "text-[#53556b]"
          }`}
        >
          <img src={cut} className="w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]" />
          <p>Cut</p>
        </li>
        <li
          onClick={() => {
            setSelected("clarity");
          }}
          className={`rounded-full h-[90px] w-[90px] xl:h-[118px] xl:w-[118px] shadow-[0px_0px_40px_#cacaca] text-[13px] xl:text-[14px] font-bold cursor-pointer flex flex-col items-center justify-center space-y-1 hover:border-[#1f1f3c] border-[1px] ${
            selected === "clarity"
              ? "text-[#1f1f3c] border-[#1f1f3c]"
              : "text-[#53556b]"
          }`}
        >
          <img src={clarity} className="w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]" />
          <p>Clarity</p>
        </li>
        <li
          onClick={() => {
            setSelected("price");
          }}
          className={`rounded-full h-[90px] w-[90px] xl:h-[118px] xl:w-[118px] shadow-[0px_0px_40px_#cacaca] text-[13px] xl:text-[14px] font-bold cursor-pointer flex flex-col items-center justify-center space-y-1 hover:border-[#1f1f3c] border-[1px] ${
            selected === "price"
              ? "text-[#1f1f3c] border-[#1f1f3c]"
              : "text-[#53556b]"
          }`}
        >
          <img src={price} className="w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]" />
          <p>Price</p>
        </li>
      </ul>
    </div>
  );
};

export default Characteristics;
