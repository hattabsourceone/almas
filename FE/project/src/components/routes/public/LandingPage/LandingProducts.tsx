import { Products } from "@components/shared/FakeData/FakeData";
import React from "react";
import TypesJewellery from "../Jewellery/TypesJewellery";
import HomeTypesJewellery from "../Jewellery/HomeTypesJewellery";

export type Props = {
  title: string;
  description: string;
};

const LandingProducts: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="mt-4">
        <h1 className="text-[#201F41] font-medium text-center text-[45px] mb-2 lg:w-[80%] xl:w-full mx-auto">
          {title}
        </h1>
        <p className="text-center text-[#666] text-[12px]">{description}</p>
      </div>
      <HomeTypesJewellery />
    </div>
  );
};

export default LandingProducts;
