import React from "react";
import Stone from "@assets/Jewellery/stone.png";
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  seconddataDiamond?: any;
};

const OrderDiamondViewers: React.FC<Props> = ({ data, seconddataDiamond }) => {
  function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }

  return (
    <div className="line-top-bottom flex flex-col justify-between items-start md:items-end space-y-4 md:space-y-0 md:flex-row mx-auto w-full">
      <div className="flex flex-col">
        <div className="flex flex-row -ml-8 mb-3 space-x-1">
          <img className="w-6 h-6 mt-1" src={Stone} />
          <h3 className="mb-1 w-100 text-[19px] font-bold text-[#201F41]">
            {Number(data?.diamond_size).toFixed(2)} Carat{" "}
            {data?.shape?.value_name}
          </h3>
        </div>
        <p className="text-[16px] font-normal text-[#88787e]">
          SKU: {data?.stock_num || "\u00A0"}
        </p>
        <div className="flex flex-row space-x-4 pt-2">
          <div className="flex flex-col space-y-1">
            <span className="text-[17px] font-semibold text-[#333333]">
              Cut:
            </span>
            <span className="text-[17px] font-semibold text-[#333333]">
              Color:
            </span>
            <span className="text-[17px] font-semibold text-[#333333]">
              Clarity:
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-[17px] font-normal text-[#88787e]">
              {data?.cut?.value_name || "--"}
            </span>
            <span className="text-[17px] font-normal text-[#88787e]">
              {data?.color?.value_name || "\u00A0"}
            </span>
            <span className="text-[17px] font-normal text-[#88787e]">
              {data?.clarity?.value_name || "\u00A0"}
            </span>
          </div>
        </div>
        <p className="text-[35px] italic pt-4 font-normal text-[#333]">
          {formatPrice(data?.total_sales_price)}
          <span className="text-[15px] text-[#000] pt-2 font-normal">
            {" "}
            (ex VAT)
          </span>
        </p>
      </div>
      {seconddataDiamond && (
        <div className="flex flex-col w-1/2">
          <div className="flex flex-row -ml-8 mb-3 space-x-1">
            <img className="w-6 h-6 mt-1" src={Stone} />
            <h3 className="mb-1 w-100 text-xl font-bold text-[#201F41]">
              {Number(seconddataDiamond?.diamond_size).toFixed(2)} Carat{" "}
              {seconddataDiamond?.shape?.value_name}
            </h3>
          </div>
          <p className="text-[16px] font-normal text-[#88787e]">
            SKU: {seconddataDiamond?.stock_num || "\u00A0"}
          </p>
          <div className="flex flex-row space-x-4 pt-2">
            <div className="flex flex-col space-y-1">
              <span className="text-[17px] font-semibold text-[#333333]">
                Cut:
              </span>
              <span className="text-[17px] font-semibold text-[#333333]">
                Color:
              </span>
              <span className="text-[17px] font-semibold text-[#333333]">
                Clarity:
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[17px] font-normal text-[#88787e]">
                {seconddataDiamond?.cut?.value_name || "--"}
              </span>
              <span className="text-[17px] font-normal text-[#88787e]">
                {seconddataDiamond?.color?.value_name || "\u00A0"}
              </span>
              <span className="text-[17px] font-normal text-[#88787e]">
                {seconddataDiamond?.clarity?.value_name || "\u00A0"}
              </span>
            </div>
          </div>
          <p className="text-[35px] italic pt-4 font-normal text-[#333]">
            {formatPrice(seconddataDiamond?.total_sales_price)}
            <span className="text-[15px] text-[#000] pt-2 font-normal">
              {" "}
              (ex VAT)
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderDiamondViewers;
