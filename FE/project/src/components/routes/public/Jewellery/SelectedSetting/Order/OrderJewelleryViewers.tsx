import React from "react";
import Ring from "@assets/Jewellery/ring.png";
import { FaCircleInfo } from "react-icons/fa6";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  setRingSize: React.Dispatch<React.SetStateAction<string>>;
  showSizeRequired?: boolean;
  isEarring?: boolean;
};

const OrderJewelleryViewers: React.FC<Props> = ({
  data,
  setRingSize,
  showSizeRequired,
  isEarring,
}) => {
  function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }

  return (
    <div className="line-bottom col col-md-6 mx-auto w-100">
      <div className=" d-flex flex-column w-100">
        <div className="flex flex-row -ml-8 mb-3 space-x-1">
          <img className="w-6 h-6" src={Ring} />
          <h3 className="mb-1 w-100 text-xl font-bold text-[#201F41]">
            {data?.name}
          </h3>
        </div>
        <p className="text-[17px] font-normal text-[#88787e]">
          <span className="text-[17px] font-normal text-[#88787e]">SKU: </span>{" "}
          {data?.sku || "\u00A0"}
        </p>
        <p className="text-[35px] italic pt-4 font-normal text-[#333]">
          {formatPrice(data?.ttlprice ?? data?.price)}
          <span className="text-[15px] text-[#000] pt-2 font-normal">
            {" "}
            (Setting Price,ex VAT)
          </span>
        </p>
        {!isEarring && !data?.category.toLowerCase().includes("pendant") && (
          <div className="flex flex-row required pb-3 space-x-10 items-center pt-4">
            <label className="control-label text-[16px] font-semibold text-nowrap text-[#333333]">
              <span className="text-red-600">*</span> Ring Size
            </label>
            <select
              name="option[286]"
              id="input-option286"
              className="option form-select text-[12px] py-2 max-w-[250px] text-[#555] border-[1px] border-[#ddd]"
              style={{ fontFamily: '"Open Sans", sans-serif' }}
              onChange={(event) => {
                setRingSize(event.target.value);
              }}
              required
            >
              <option className="" value="">
                Select Your Size
              </option>
              <option data-option-id='data-price=""' value="US 3">
                US 3
              </option>
              <option data-option-id='data-price=""' value="US 3.5">
                US 3.5
              </option>
              <option data-option-id='data-price=""' value="US 4">
                US 4
              </option>
              <option data-option-id='data-price=""' value="US 4.5">
                US 4.5
              </option>
              <option data-option-id='data-price=""' value="US 5">
                US 5
              </option>
              <option data-option-id='data-price=""' value="US 5.5">
                US 5.5
              </option>
              <option data-option-id='data-price=""' value="US 6">
                US 6
              </option>
              <option data-option-id='data-price=""' value="US 6.5">
                US 6.5
              </option>
              <option data-option-id='data-price=""' value="US 7">
                US 7
              </option>
              <option data-option-id='data-price=""' value="US 7.5">
                US 7.5
              </option>
              <option data-option-id='data-price=""' value="US 8">
                US 8
              </option>
              <option data-option-id='data-price=""' value="US 8.5">
                US 8.5
              </option>
              <option data-option-id='data-price=""' value="US 9">
                US 9
              </option>
            </select>
          </div>
        )}
        {data?.category.toLowerCase().includes("pendant") && (
          <div className="flex flex-row required pb-3 space-x-10 items-center pt-4">
            <label className="control-label text-[16px] font-semibold text-nowrap text-[#333333]">
              <span className="text-red-600">*</span> Chain Length
            </label>
            <select
              name="option[286]"
              id="input-option286"
              className="option form-select text-[12px] py-2 max-w-[250px] text-[#555] border-[1px] border-[#ddd]"
              style={{ fontFamily: '"Open Sans", sans-serif' }}
              onChange={(event) => {
                setRingSize(event.target.value);
              }}
              required
            >
              <option className="" value="">
                Select Your Size
              </option>
              <option data-option-id='data-price=""' value="16">
                16 Inches
              </option>
              <option data-option-id='data-price=""' value="18">
                18 Inches
              </option>
              <option data-option-id='data-price=""' value="20">
                20 Inches
              </option>
            </select>
          </div>
        )}
        {showSizeRequired && (
          <p className="text-[12px] capitalize pb-1 text-[#a94442]">
            {data?.category.toLowerCase().includes("pendant")
              ? "Chain Length required!"
              : "Ring Size required!"}
          </p>
        )}
        {!isEarring && (
          <div className="flex flex-row items-center space-x-1">
            <FaCircleInfo />
            <p className="text-[15px] font-normal">
              Need Help with your Ring Size go to our{" "}
              <span className="underline">
                {data?.category.toLowerCase().includes("pendant")
                  ? "Chain Length Guide"
                  : "Ring Size Guide"}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderJewelleryViewers;
