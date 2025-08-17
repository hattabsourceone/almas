import React from "react";

import { Obj } from "./DiamondCharacteristics";

export type Props = {
  selectedObj: Obj;
};

const CharacteristicDescription: React.FC<Props> = ({ selectedObj }) => {
  return (
    <div data-aos="fade-right" className="flex flex-col h-auto w-[90%] mx-auto md:w-[65%] mb-4 md:mb-0">
      <div>
        <h2 className="text-[27px] font-normal text-[#444] pb-2 sm:text-center md:text-start">
          {selectedObj.name}
        </h2>
        <p
          className="text-[12px] text-[#666] sm:text-center md:text-start"
          style={{ fontFamily: '"Open Sans", sans-serif' }}
        >
          {selectedObj.description}
        </p>
      </div>
      <div className="flex flex-row w-full justify-end pr-10">
        {selectedObj.elemant}
      </div>
    </div>
  );
};

export default CharacteristicDescription;
