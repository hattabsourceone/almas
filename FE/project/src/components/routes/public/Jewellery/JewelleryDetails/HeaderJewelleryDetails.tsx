import useSelectedProps from "@components/hooks/useSelectedProps";
import React from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

type HeaderJewelleryDetailsPrps = {
  category_name: string;
  route: number;
  price: number;
  data?: any;
};

const HeaderJewelleryDetails: React.FC<HeaderJewelleryDetailsPrps> = ({
  category_name,
  route,
  price,
  data,
}) => {
  const { selectedJewellery, selectedDiamond } = useSelectedProps();
  const navigate = useNavigate();
  const { model_id } = useParams<{ model_id: string }>();

  function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }

  function getFilterFromCookies() {
    const filter = Cookies.get("currentQuery");
    if (filter) {
      return `?${filter}`;
    }
    return {};
  }
  const filterObject = getFilterFromCookies();
  const serializedFilter = encodeURIComponent(JSON.stringify(filterObject));

  return (
    <div className="flex flex-row w-full my-4 header-jewellery-details border-[1px] border-[#aaa]">
      {/* first button */}
      <div className="px-4 py-2 hidden w-1/3 md:w-1/4 md:flex flex-col justify-content-center align-items-center">
        <h2 className="text-[17px] font-normal">Create Your</h2>
        <h6 className="text-[14px] font-normal">{category_name}</h6>
      </div>
      {/* second button */}
      <div
        onClick={() =>
          navigate(`/jewellery-details/${selectedJewellery.jewellery_id}`)
        }
        className={`w-1/3 md:w-1/4 d-flex ${route == 1 ? "active" : null} ${
          route > 1 ? "cursor-pointer" : null
        }`}
      >
        <div className="w-12 h-20 hidden md:block">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="fill-[#1f1f41]"
          >
            <polygon points="0,0 100,50 0,100" />
          </svg>
        </div>
        <div className="justify-content-center align-items-center pl-2 hidden md:flex">
          <h1 className="text-[55px] text-[#444] font-medium">1</h1>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1 w-full">
          <h5 className="text-[14px] md:text-[17px] font-normal text-[#444]">
            Settings
          </h5>
          <h6 className="text-[13px] font-normal text-[#444] hidden md:block">
            Price: {formatPrice(price || selectedJewellery.price)}
          </h6>
          <div className="flex-row space-x-5 hidden md:flex">
            {route > 1 && (
              <a
                href={`/jewellery-details/${selectedJewellery.jewellery_id}`}
                className="text-sm lg:text-[17px] font-normal text-[#201f41] cursor-pointer underline"
              >
                View
              </a>
            )}
            <a
              href={`/jewellery/${selectedJewellery.category}/${selectedJewellery.type}`}
              className="text-sm lg:text-[17px] font-normal text-[#201f41] cursor-pointer underline"
            >
              Change
            </a>
          </div>
          {/* <a className="text-base font-semibold underline" href="#">
            Change
          </a> */}
        </div>
      </div>
      {/* third button */}
      <div
        onClick={() => {
          if (route >= 2) {
            navigate(
              `/jewellery-details/${selectedJewellery.jewellery_id}/selected_setting/SelectedDiamondDetails/${selectedDiamond.diamond_id}`
            );
          }
        }}
        className={`px-0 w-1/3 md:w-1/4 flex flex-row ${
          route == 2 ? "active" : null
        } ${route > 2 ? "cursor-pointer" : "cursor-not-allowed"}`}
      >
        <div className="h-[40px] w-6 md:w-12 md:h-20">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className={` md:fill-[#1f1f41] ${
              route >= 2 ? "fill-[#1f1f41]" : "fill-[#D6D6D6]"
            }`}
          >
            <polygon points="0,0 100,50 0,100" />
          </svg>
        </div>

        <div className="justify-content-center align-items-center pl-2 hidden md:flex">
          <h1
            className={`text-[55px] font-medium ${
              route > 1 ? "text-[#444]" : "text-[#a7a7a7]"
            }`}
          >
            2
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1 w-full">
          <h5
            className={`text-[14px] md:text-[17px] font-normal ${
              route > 1 ? "text-[#444]" : "text-[#a7a7a7]"
            }`}
          >
            Diamonds
          </h5>
          {data?.diamond_size && route > 1 && (
            <h6 className="text-[13px] hidden md:block font-normal text-[#444] text-center">
              {Number(data.diamond_size).toFixed(2)} ct. tw.{" "}
              {data?.shape?.value_name} - {formatPrice(data?.total_sales_price)}
            </h6>
          )}
          {data?.diamond_size && route > 1 && (
            <div className="hidden md:flex flex-row space-x-4">
              {data?.diamond_size && route > 2 && (
                <a
                  href={`/jewellery-details/${model_id}/selected_setting/SelectedDiamondDetails/${data?.id}`}
                  className="text-sm lg:text-[17px] font-normal text-[#201f41] cursor-pointer underline"
                >
                  View
                </a>
              )}
              <a
                href={`/jewellery-details/${model_id}/selected_setting/${getFilterFromCookies()}`}
                className="text-sm lg:text-[17px] font-normal text-[#201f41] cursor-pointer underline"
              >
                Change
              </a>
            </div>
          )}
        </div>
      </div>
      {/* forth button */}
      <div
        className={`px-0 w-1/3 md:w-1/4 flex flex-row ${
          route == 3 ? "active" : "cursor-not-allowed"
        }`}
      >
        <div className="h-[40px] w-6 md:w-12 md:h-20">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className={` md:fill-[#1f1f41] ${
              route == 3 ? "fill-[#1f1f41]" : "fill-[#D6D6D6]"
            }`}
          >
            <polygon points="0,0 100,50 0,100" />
          </svg>
        </div>
        <div className="hidden md:flex justify-content-center align-items-center pl-2">
          <h1
            className={`text-[55px] font-medium ${
              route > 2 ? "text-[#444]" : "text-[#a7a7a7]"
            }`}
          >
            3
          </h1>
        </div>
        <div className="flex flex-row items-center justify-center w-full">
          <h5
            className={`text-[14px] md:text-[17px] font-normal ${
              route > 2 ? "text-[#444]" : "text-[#a7a7a7]"
            }`}
          >
            Complete
          </h5>
        </div>
      </div>
    </div>
  );
};

export default HeaderJewelleryDetails;
