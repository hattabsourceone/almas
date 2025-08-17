/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { MdNoPhotography } from "react-icons/md";

export type Props = {
  data: any;
  removeFromShoppinglist: (id: string) => void;
};

const DiamondShoppingListCard: React.FC<Props> = ({
  data,
  removeFromShoppinglist,
}) => {
  return (
    <div className="border rounded-lg p-10 flex flex-col items-center bg-white shadow-md">
      {data.image_file && data.image_file.toString().trim().length > 10 ? (
        data.image_file.includes("http0") ? (
          <iframe
            className="h-36 w-36"
            src={data.image_file.replace("http0", "https")}
          />
        ) : (
          <img className="h-36 w-36" src={data.image_file} alt="diamond" />
        )
      ) : (
        <div className="d-flex justify-content-center align-items-center col">
          <MdNoPhotography className="h-36 w-36 p-10" />
        </div>
      )}
      <h2 className="text-lg font-bold text-gray-800 mb-2">
        {data.diamond_size + " Caret " + data.shape.value_name}
      </h2>
      <div className="flex flex-row space-x-4">
        <div className="text-left w-full">
          <div className="mb-2">
            <span className="font-semibold">Carat:</span>{" "}
            <span className="text-gray-500">{data.diamond_size}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Shape:</span>{" "}
            <span className="text-gray-500">{data.shape.value_name}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Cut:</span>{" "}
            <span className="text-gray-500">{data.cut.value_name || "--"}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Color:</span>{" "}
            <span className="text-gray-500">{data.color.value_name}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Clarity:</span>{" "}
            <span className="text-gray-500">{data.clarity.value_name}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Polish:</span>{" "}
            <span className="text-gray-500">{data.polish.value_name}</span>
          </div>
        </div>
        <div className="flex flex-col text-left w-full">
          <div className="mb-2">
            <span className="font-semibold">Symmetry:</span>{" "}
            <span className="text-gray-500">{data.symmetry.value_name}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Fluorescence:</span>{" "}
            <span className="text-gray-500">
              {data.fluor_intensity.value_name}
            </span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Lab:</span>{" "}
            <span className="text-gray-500">GIA</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => removeFromShoppinglist(data.id)}
        className="mt-4 px-4 py-2 text-xs font-semibold text-white rounded-full bg-red-500"
      >
        Remove
      </button>
    </div>
  );
};

export default DiamondShoppingListCard;
