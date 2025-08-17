/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { MdNoPhotography } from "react-icons/md";
import planImages from "@assets/default/default_plans";

export type Props = {
  data: any;
  removeFromCompare: (diamond_id: string) => void;
};

const DiamondCompareCard: React.FC<Props> = ({ data, removeFromCompare }) => {
  const SmallPlanImage = (shape: any) => {
    const key = shape["shape"].includes("Cushion")
      ? "cushion"
      : shape["shape"].toLowerCase();
    const imageSrc = planImages[key];
    if (imageSrc) {
      return (
        <img
          className="max-h-[100px] max-w-[100px] bg-[#111] cursor-pointer"
          src={imageSrc}
          alt="diamond"
        />
      );
    } else {
      return <MdNoPhotography className="max-h-[100px] max-w-[100px]" />;
    }
  };

  return (
    <div
      className="border rounded-sm p-4 flex flex-row items-start bg-white shadow-md space-x-4 sm:space-x-20 lg:space-x-10 xl:space-x-20"
      style={{ fontFamily: '"Plain Light", sans-serif' }}
    >
      <div className="flex flex-col">
        <div className="border h-[100px] w-[100px]">
          {data.image_file && data.image_file.toString().trim().length > 10 ? (
            data.image_file.includes("http0") ? (
              <iframe
                className="max-h-[100px] max-w-[100px]"
                src={data.image_file.replace("http0", "https")}
              />
            ) : (
              <img
                className="max-h-[100px] max-w-[100px]"
                src={data.image_file}
                alt="diamond"
              />
            )
          ) : (
            <SmallPlanImage shape={data.shape.value_name} />
          )}
        </div>
        <button
          onClick={() => removeFromCompare(data.id)}
          className="mt-10 h-[35px] min-w-[90px] text-[15px] font-medium text-[#201f41] hover:bg-[#201f41] hover:text-white rounded-full border-[#201f41] border-[1px]"
        >
          x Remove
        </button>
      </div>
      <div className="flex flex-col">
        <p className="text-[15px] 2xl:text-[20px] font-bold text-[#333333] mb-2">
          {Number(data.diamond_size).toFixed(2) +
            " Caret " +
            data.shape.value_name}
        </p>
        <div
          className="flex flex-row space-x-4 sm:space-x-32 xl:space-x-16 2xl:space-x-36"
          style={{ fontFamily: '"Plain Light", sans-serif' }}
        >
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="font-normal text-[12px] 2xl:text-[16px] text-[#333333]">
                Carat:
              </span>
            </div>
            <div className="mb-2">
              <span className="font-normal text-[12px] 2xl:text-[16px] text-[#333333]">
                Shape:
              </span>
            </div>
            <div className="mb-2">
              <span className="font-normal text-[12px] 2xl:text-[16px] text-[#333333]">
                Cut:
              </span>
            </div>
            <div className="mb-2">
              <span className="font-normal text-[12px] 2xl:text-[16px] text-[#333333]">
                Color:
              </span>
            </div>
            <div className="mb-2">
              <span className="font-normal text-[12px] 2xl:text-[16px] text-[#333333]">
                Clarity:
              </span>
            </div>
            <div className="mb-2">
              <span className="font-normal text-[12px] 2xl:text-[16px] text-[#333333]">
                Polish:
              </span>
            </div>
            <div className="mb-2">
              <span className="font-normal text-[12px] 2xl:text-[16px] text-[#333333]">
                Symmetry:
              </span>
            </div>
            <div className="mb-2">
              <span className="font-normal text-[12px] 2xl:text-[16px] text-[#333333]">
                Fluorescence:
              </span>
            </div>
            <div className="mb-2">
              <span className="font-normal text-[12px] 2xl:text-[16px] text-[#333333]">
                Lab:
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {Number(data.diamond_size).toFixed(2) || "\u00A0"}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {data.shape.value_name || "\u00A0"}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {data.cut.value_name || "--"}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {data.color.value_name || "\u00A0"}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {data.clarity.value_name || "\u00A0"}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {data.polish.value_name || "\u00A0"}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {data.symmetry.value_name || "\u00A0"}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {data.fluor_intensity.value_name || "\u00A0"}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {data.lab || "\u00A0"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiamondCompareCard;
