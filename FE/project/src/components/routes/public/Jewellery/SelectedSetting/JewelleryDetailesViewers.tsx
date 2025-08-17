// import useSelectedProps from ''
import useSelectedProps from "@components/hooks/useSelectedProps";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  seconddata?: any;
};

const JewelleryDetailesViewers: React.FC<Props> = ({ data, seconddata }) => {
  const { selectedDiamond, setSelectedDiamond, secondselectedDiamond, secondsetSelectedDiamond } = useSelectedProps();
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }

  return (
    <div
      className="w-[95%] lg:w-[40%] mx-auto text-[#000] pt-10 lg:pt-0"
      style={{ fontFamily: '"Plain Light", sans-serif' }}
    >
      <h3 className="text-[18px] font-semibold mb-6 underline underline-offset-8 decoration-2">
        {seconddata
          ? Number(data?.diamond_size + seconddata?.diamond_size).toFixed(2)
          : Number(data?.diamond_size).toFixed(2)}{" "}
        Total Carat Weight {data?.shape?.value_name} Diamond
      </h3>
      <h3 className="text-[17px] font-semibold mb-3">
        {Number(data?.diamond_size).toFixed(2)} Carat {data?.shape?.value_name}
      </h3>
      <p className="text-[16px] text-[#666] mb-3">SKU: {data?.stock_num}</p>
      <p className="text-[14px] text-[#666] mb-1">
        Ex Tax: {formatPrice(data?.total_sales_price)}
      </p>
      <div className="flex flex-row space-x-14">
        <div className="flex flex-col space-y-3 text-[16px] font-semibold text-[#333333]">
          <p>Cut:</p>
          <p>Color:</p>
          <p>Clarity:</p>
          {seconddata && (
            <>
              <p>Polish:</p>
              <p>Symmetry:</p>
              <p>Fluorescence:</p>
              <p>Lab:</p>
            </>
          )}
        </div>
        <div className="flex flex-col space-y-3 text-[16px] text-[#88787e]">
          <p className="bold">{data?.cut?.value_name || "--"}</p>
          <p className="bold">{data?.color?.value_name}</p>
          <p className="bold">{data?.clarity?.value_name}</p>
          {seconddata && (
            <>
              <p className="bold">{data?.polish?.value_name || "\u00A0"}</p>
              <p className="bold">{data?.symmetry?.value_name || "\u00A0"}</p>
              <p className="bold">
                {data?.fluor_intensity?.value_name || "\u00A0"}
              </p>
              <p className="bold">{data?.lab || "\u00A0"}</p>
            </>
          )}
        </div>
      </div>
      <p className="text-[35px] italic text-[#444] font-normal pt-4">
        {formatPrice(data?.total_sales_price)}
        <span className="text-[15px] text-[#000] pl-3 font-medium">
          (ex VAT)
        </span>
      </p>
      {seconddata && (
        <>
          <h3 className="text-[17px] font-semibold mb-3 pt-10">
            {Number(seconddata?.diamond_size).toFixed(2)} Carat {seconddata?.shape?.value_name}
          </h3>
          <p className="text-[16px] text-[#666] mb-3">
            SKU: {seconddata?.stock_num}
          </p>
          <p className="text-[14px] text-[#666] mb-1">
            Ex Tax: {formatPrice(seconddata?.total_sales_price)}
          </p>
          <div className="flex flex-row space-x-14">
            <div className="flex flex-col space-y-3 text-[16px] font-semibold text-[#333333]">
              <p>Cut:</p>
              <p>Color:</p>
              <p>Clarity:</p>
              <p>Polish:</p>
              <p>Symmetry:</p>
              <p>Fluorescence:</p>
              <p>Lab:</p>
            </div>
            <div className="flex flex-col space-y-3 text-[16px] text-[#88787e]">
              <p className="bold">{seconddata?.cut?.value_name || "--"}</p>
              <p className="bold">
                {seconddata?.color?.value_name || "\u00A0"}
              </p>
              <p className="bold">
                {seconddata?.clarity?.value_name || "\u00A0"}
              </p>
              <p className="bold">
                {seconddata?.polish?.value_name || "\u00A0"}
              </p>
              <p className="bold">
                {seconddata?.symmetry?.value_name || "\u00A0"}
              </p>
              <p className="bold">
                {seconddata?.fluor_intensity?.value_name || "\u00A0"}
              </p>
              <p className="bold">{seconddata?.lab || "\u00A0"}</p>
            </div>
          </div>
          <p className="text-[35px] italic text-[#444] font-normal pt-4">
            {formatPrice(seconddata?.total_sales_price)}
            <span className="text-[15px] text-[#000] pl-3 font-medium">
              (ex VAT)
            </span>
          </p>
        </>
      )}
      <div className="border-b-[1px] border-slate-400 w-[100%] pt-6"></div>
      <div className="no-padding py-4 d-flex justify-content-center justify-content-sm-start ">
        <button
          onClick={() => {
            setSelectedDiamond({
              ...selectedDiamond,
              diamond_id: data?.id,
              price: data?.total_sales_price,
            });
            if (seconddata) {
              secondsetSelectedDiamond({
                ...secondselectedDiamond,
                diamond_id: seconddata?.id,
                price: seconddata?.total_sales_price,
              });
            } else {
              secondsetSelectedDiamond({
                ...secondselectedDiamond,
                diamond_id: 0,
                price: 0,
              });
            }
            navigate(`${pathname}/make-order`);
          }}
          className="text-base font-medium text-white bg-[#201F41] py-3 px-12 rounded-full"
        >
          Choose Diamonds
        </button>
      </div>
    </div>
  );
};

export default JewelleryDetailesViewers;
