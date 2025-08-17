import useSelectedProps from "@components/hooks/useSelectedProps";
import React, { useState } from "react";
import SearchSetting from "./SearchSetting";
import Contact from "@components/shared/Contact/Contact";
import HeaderJewelleryDetails from "../JewelleryDetails/HeaderJewelleryDetails";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";

const MakeJewelleryDiamondSelect: React.FC = () => {
  const { selectedJewellery } = useSelectedProps();
  const [data, setData] = useState<any>();

  return (
    <div className="flex flex-col w-full pt-4">
      <div className="md:-ml-10 lg:-ml-12 xl:-ml-10 2xl:ml-0">
        <Breadcrumb
          menu={[
            {
              title: selectedJewellery.category || " ",
              link: `/jewellery/${selectedJewellery.category}`,
              level: 1,
            },
            {
              title: selectedJewellery.type || " ",
              link: `/jewellery/${selectedJewellery.category}/${selectedJewellery.type}`,
              level: 2,
            },
            {
              title: selectedJewellery.name || " ",
              link: "", // TODO here
              level: 3,
            },
          ]}
        />
      </div>
      <div className="flex flex-col w-[96%] md:w-[96%] lg:w-[94%] xl:w-[90%] 2xl:w-[80%] mx-auto pb-4 mt-3">
        <HeaderJewelleryDetails
          category_name={selectedJewellery.category}
          route={2}
          price={0}
        />
        <p className="pb-2 text-[12px] text-[#666] pt-6">
          Select your perfect diamond from thousands of our confict-free &
          natural diamonds.
        </p>
        <SearchSetting />
      </div>
      <Contact />
    </div>
  );
};

export default MakeJewelleryDiamondSelect;
