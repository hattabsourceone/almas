import DiamondActions from "@components/shared/DiamondActions/DiamondActions";
import React from "react";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

const voidMethod = () => {};

const DiamondDetailesViewers: React.FC<Props> = ({ data }) => {
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
      className="flex flex-col w-[98%] lg:w-[60%] xl:w-[54%] 2xl:w-[45%] text-[#1f1f41] font-normal lg:-ml-10"
      style={{ fontFamily: '"Plain Light", sans-serif' }}
    >
      <h3 className="text-[24px] font-medium mb-6">
        {data?.diamond_size} Carat {data?.shape?.value_name}
      </h3>
      <span className="text-[16px] text-[#88787e] mb-6">
        SKU: N{data?.stock_num || "\u00A0"}
      </span>
      <span className="text-[14px] text-[#666] mb-2">
        Ex Tax:{" "}
        {data?.total_sales_price
          ? formatPrice(data?.total_sales_price)
          : "\u00A0"}
      </span>
      <div className="line-top-bottom-new xl:w-[90%] 2xl:w-[80%]"></div>
      <div className="flex flex-col sm:flex-row text-nowrap space-y-2 sm:space-y-0">
        <div className="w-[50%] lg:w-[45%] 2xl:w-[38%] space-x-10 flex flex-row">
          <div className="flex flex-col space-y-2 text-[16px] font-semibold text-[#333333]">
            <p>Carat:</p>
            <p>Cut:</p>
            <p>Clarity:</p>
            <p>Symmetry:</p>
            <p>Lab:</p>
            <p>Culet:</p>
            <p>Depth:</p>
          </div>
          <div className="flex flex-col space-y-2 text-[16px] text-[#88787e]">
            <p className="bold">{data?.diamond_size || "\u00A0"}</p>
            <p className="bold">{data?.cut?.value_name || "--"}</p>
            <p className="bold">{data?.clarity?.value_name || "\u00A0"}</p>
            <p className="bold">{data?.symmetry?.value_name || "\u00A0"}</p>
            <p className="bold">{data?.lab || "\u00A0"}</p>
            <p className="bold">
              {data?.culet_size ? data?.culet_size?.value_name : "\u00A0"}
            </p>
            <p className="bold">{data?.depth || "\u00A0"}%</p>
          </div>
        </div>
        <div className="w-[50%] space-x-4 flex flex-row">
          <div className="flex flex-col space-y-2 text-[16px] font-semibold text-[#333333]">
            <p className="bold">Shape:</p>
            <p className="bold">Color:</p>
            <p className="bold">Polish:</p>
            <p className="bold">Fluorescence:</p>
            <p className="bold">Dimentions:</p>
            <p className="bold">Table:</p>
          </div>
          <div className="flex flex-col space-y-2 text-[16px] text-[#88787e]">
            <p className="bold">{data?.shape?.value_name || "\u00A0"}</p>
            <p className="bold">{data?.color?.value_name || "\u00A0"}</p>
            <p className="bold">{data?.polish?.value_name || "\u00A0"}</p>
            <p className="bold">
              {data?.fluor_intensity?.value_name || "\u00A0"}
            </p>
            <p className="bold">
              {data?.meas_depth} * {data?.meas_length} * {data?.meas_width} mm
            </p>
            <p className="bold">{data?.table || "\u00A0"}%</p>
          </div>
        </div>
      </div>
      <div className="line-top-bottom-new xl:w-[90%] 2xl:w-[80%] pt-8"></div>
      <p className="text-[27px] text-[#444] font-medium pt-3">
        Price:{" "}
        <span className="text-[25px] text-[#000]">
          {" "}
          {formatPrice(data?.total_sales_price)}
        </span>{" "}
        <span className="text-[11px] font-medium">ex (VAT)</span>
      </p>
      <div className="w-full py-4 mt-4">
        <DiamondActions
          data={data}
          compareCount={voidMethod}
          isDetails={true}
        />
      </div>
    </div>
  );
};

export default DiamondDetailesViewers;
