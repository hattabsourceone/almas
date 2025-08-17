import React from "react";
import { Diamond } from "./Collections";

type Props = {
  data: Diamond;
};

const CollectionItem: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col justify-center pl-[20%] h-full">
      <h3
        className={`text-white text-[13px] lg:text-[22px] xl:text-[26px] font-medium`}
      >
        {data?.diamond_size} Carat {data?.shape.value_name}
      </h3>
      <div className="flex flex-row items-center pt-2 lg:pt-6">
        <div className="flex flex-col space-y-1 w-min">
          <h6 className="text-white text-start text-capitalize text-[8px] md:text-xs xl:text-sm">
            <span className="font-semibold pr-1">cut:</span>{" "}
          </h6>
          <h6 className="text-white text-start text-capitalize text-[8px] md:text-xs xl:text-sm">
            <span className="font-semibold pr-1">color:</span>{" "}
          </h6>
          <h6 className="text-white text-start text-capitalize text-[8px] md:text-xs xl:text-sm">
            <span className="font-semibold pr-1">clarity:</span>{" "}
          </h6>
          <h6 className="text-white text-start text-capitalize text-[8px] md:text-xs xl:text-sm">
            <span className="font-semibold pr-1">polish:</span>{" "}
          </h6>
          <h6 className="text-white text-start text-capitalize text-[8px] md:text-xs xl:text-sm">
            <span className="font-semibold pr-1">symmetry:</span>{" "}
          </h6>
          <h6 className="text-white text-start text-capitalize text-[8px] md:text-xs xl:text-sm">
            <span className="font-semibold pr-1">Fluorescence:</span>
          </h6>
        </div>
        <div className="flex flex-col space-y-1 pl-4">
          <h6 className="text-white text-start text-capitalize text-[8px] md:text-xs xl:text-sm">
            {data?.cut.value_name || "--"}
          </h6>
          <h6 className="text-white text-start text-capitalize text-[8px] md:text-xs xl:text-sm">
            {data?.color.value_name}
          </h6>
          <h6 className="text-white text-start text-capitalize text-[8px] md:text-xs xl:text-sm">
            {data?.clarity.value_name}
          </h6>
          <h6 className="text-white text-start text-capitalize text-[8px] md:text-xs xl:text-sm">
            {data?.polish.value_name}
          </h6>
          <h6 className="text-white text-start text-capitalize text-[8px] md:text-xs xl:text-sm">
            {data?.symmetry.value_name}
          </h6>
          <h6 className="text-white text-start text-capitalize text-[8px] md:text-xs xl:text-sm">
            {data?.fluor_intensity.value_name}
          </h6>
        </div>
      </div>
      <h6 className="text-white font-medium md:font-semibold pt-1 text-start text-capitalize text-[11px] lg:text-[13px] xl:text-[15px]">
        Price: ${data?.total_sales_price}
      </h6>
      <button className="mt-1 lg:mt-3 text-[10px] md:text-[12px] lg:text-[14px] font-normal text-white bg-black py-1 md:py-2 px-4 rounded-full w-28 md:w-32">
        View Stone
      </button>
    </div>
  );
};

export default CollectionItem;
