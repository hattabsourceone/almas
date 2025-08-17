import React, { useEffect, useState } from "react";

import axios from "axios";
import leftFlower from "@assets/SearchDiamond/left_flower.png";
import rightFlower from "@assets/SearchDiamond/right_flower.png";
import Loading from "@components/shared/Loading/Loading";
import { BASE_URL } from "@components/api/api";
import { useLocation, useNavigate } from "react-router-dom";
import FilterShape from "../../SearchDiamond/FilterShape";
import FilterDetails from "../../SearchDiamond/FilterDetails";
import FilterCertificate from "../../SearchDiamond/FilterCertificate";
import SelectSettingSubpage from "./SelectSettingSubpage";
import useSelectedProps from "@components/hooks/useSelectedProps";
import NotDiamondFound from "@components/shared/NotFond.tsx/NotDiamondFound";

type FilterProps = {
  clarities: string[];
  colors: string[];
  min_carat: number;
  max_carat: number;
  min_price: number;
  max_price: number;
  shapes: string[];
};

type DiamondDetail = {
  clarity: { value_name: string };
  color: { value_name: string };
  cut: { value_name: string };
  diamond_id: number;
  diamond_size: number;
  fluor_intensity: { value_name: string };
  id: number;
  image_file: string;
  lab: string;
  polish: { value_name: string };
  shape: { value_name: string };
  symmetry: { value_name: string };
  total_sales_price: number;
};

const SearchSetting: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const { selectedJewellery } = useSelectedProps();
  const [selectedShape, setSelectedShape] = useState<string[]>([
    selectedJewellery.shape,
  ]);
  const clampValue = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(value, max));
  const [minPrice, setMinPrice] = useState<number>(() => {
    const price = searchParams.get("price");
    if (price) {
      const [min] = price.split(";").map(Number);
      return clampValue(min || 480, 480, 35140);
    }
    return 480;
  });
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    const price = searchParams.get("price");
    if (price) {
      const [, max] = price.split(";").map(Number);
      return clampValue(max || 35140, 480, 35140);
    }
    return 35140;
  });
  const [minCarat, setMinCarat] = useState<number>(
    selectedJewellery.category.toLowerCase().includes("earring")
      ? Math.max(0.3, Number(((selectedJewellery.caret - 0.12) / 2).toFixed(2))) /* getEarringStoneCarat(selectedJewellery.caret)[0] */
      : selectedJewellery.caret - 0.12
  );
  const [maxCarat, setMaxCarat] = useState<number>(
    selectedJewellery.category.toLowerCase().includes("earring")
      ? Number(((selectedJewellery.caret + 0.12) / 2).toFixed(2)) /* getEarringStoneCarat(selectedJewellery.caret)[1] */
      : selectedJewellery.caret + 0.12
  );
  const [minCut, setMinCut] = useState<number>(() => {
    const cut = searchParams.get("cut");
    if (cut) {
      const [min] = cut.split(";").map(Number);
      return min < 0 ? 0 : min;
    }
    return 0;
  });
  const [maxCut, setMaxCut] = useState<number>(() => {
    const cut = searchParams.get("cut");
    if (cut) {
      const [, max] = cut.split(";").map(Number);
      return max < 0 ? 0 : max;
    }
    return 2;
  });
  const [minColor, setMinColor] = useState<number>(() => {
    const color = searchParams.get("color");
    if (color) {
      const [min] = color.split(";").map(Number);
      return min < 0 ? 0 : min;
    }
    return 0;
  });
  const [maxColor, setMaxColor] = useState<number>(() => {
    const color = searchParams.get("color");
    if (color) {
      const [, max] = color.split(";").map(Number);
      return max < 0 ? 0 : max;
    }
    return 7;
  });
  const [minClarity, setMinClarity] = useState<number>(() => {
    const clarity = searchParams.get("clarity");
    if (clarity) {
      const [min] = clarity.split(";").map(Number);
      return min < 0 ? 0 : min;
    }
    return 0;
  });
  const [maxClarity, setMaxClarity] = useState<number>(() => {
    const clarity = searchParams.get("clarity");
    if (clarity) {
      const [, max] = clarity.split(";").map(Number);
      return max < 0 ? 0 : max;
    }
    return 7;
  });
  const [certificateIncluded, setCertificateIncluded] = useState<boolean>(
    searchParams.get("certificate") === "true" || false
  );
  const cutlables = ["Good", "Very Good", "Excellent"];
  const [sort, setSort] = useState<string>("price_low_high");
  const [pageSize, setPageSize] = useState<number>(24);
  const [filterInformations, setFilterInformations] =
    useState<FilterProps | null>(null);
  const [isEarring, setisEarring] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<DiamondDetail[] | null>(
    null
  );
  const shapesPriorityOrder = [
    "Round",
    "Princess",
    "Emerald",
    "Asscher",
    "Cushion Modified",
    "Marquise",
    "Radiant",
    "Oval",
    "Pear",
    "Heart",
  ];
  const colorsPriorityOrder = ["K", "J", "I", "H", "G", "F", "E", "D"];
  const clarityPriorityOrder = [
    "SI2",
    "SI1",
    "VS2",
    "VS1",
    "VVS2",
    "VVS1",
    "IF",
    "FL",
  ];
  const [pages, setPages] = useState<number>(
    parseInt(searchParams.get("page") || "1")
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const [display, setDisplay] = useState<string>("list");
  const [isLoadingFilter, setIsLoadingFilter] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const sortList: string[] = [
    "price_low_high",
    "price_high_low",
    "carat_low_high",
    "carat_high_low",
    "cut_low_high",
    "cut_high_low",
    "color_high_low",
    "color_low_high",
    "clarity_high_low",
    "clarity_low_high",
  ];

  function getEarringStoneCarat(carat: number): number[] {
    switch (carat) {
      case 0.6:
        return [0.3, 0.39];
      case 0.8:
        return [0.4, 0.59];
      case 1.25:
        return [0.6, 0.87];
      case 1.76:
        return [0.88, 0.99];
      case 2.0:
        return [1, 1.1];
      default:
        return [];
    }
  }

  const sortColorsFilter = (colors: string[]) => {
    const sortedList = colors.sort((a: any, b: any) => {
      const indexA = colorsPriorityOrder.indexOf(a);
      const indexB = colorsPriorityOrder.indexOf(b);
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      if (indexA !== -1) {
        return -1;
      }
      if (indexB !== -1) {
        return 1;
      }
      return 0;
    });
    return sortedList;
  };

  const sortClarityFilter = (clarity: string[]) => {
    const sortedList = clarity.sort((a: any, b: any) => {
      const indexA = clarityPriorityOrder.indexOf(a);
      const indexB = clarityPriorityOrder.indexOf(b);
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      if (indexA !== -1) {
        return -1;
      }
      if (indexB !== -1) {
        return 1;
      }
      return 0;
    });
    return sortedList;
  };

  const sortShapesFilter = (shapes: string[]) => {
    const sortedList = shapes.sort((a: any, b: any) => {
      const indexA = shapesPriorityOrder.indexOf(a);
      const indexB = shapesPriorityOrder.indexOf(b);
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      if (indexA !== -1) {
        return -1;
      }
      if (indexB !== -1) {
        return 1;
      }
      return 0;
    });
    return sortedList;
  };

  useEffect(() => {
    getFilterInformations();
  }, []);

  const getFilterInformations = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/get_filters`);
      response.data.data.shapes = sortShapesFilter(response.data.data.shapes);
      response.data.data.color = sortColorsFilter(response.data.data.colors);
      response.data.data.clarity = sortClarityFilter(
        response.data.data.clarities
      );
      setFilterInformations(response.data.data);
    } catch (error) {
      setIsLoadingFilter(false);
      console.error("Error fetching filter information:", error);
    } finally {
      setIsLoadingFilter(false);
    }
  };

  const getDiamondsData = async () => {
    try {
      setIsLoading(true);
      let cutOptions: string[] = cutlables.slice(minCut, maxCut + 1);
      if (cutOptions.length === 3) {
        cutOptions.push("");
      }
      const data = {
        shape: [selectedJewellery.shape],
        min_price: minPrice,
        max_price: maxPrice,
        min_carat: minCarat,
        max_carat: maxCarat,
        color: colorsPriorityOrder.slice(minColor, maxColor + 1),
        cut: cutOptions,
        clarity: clarityPriorityOrder.slice(minClarity, maxClarity + 1),
        certificate: certificateIncluded,
        limit: pageSize,
        page: pages,
        sort_by: sort,
      };
      let url;
      console.log("final body --------------", data);
      if (
        selectedJewellery.category.toLocaleLowerCase().includes("earring") &&
        selectedJewellery.type.toLocaleLowerCase().includes("stud")
      ) {
        url = "get_selected_sorted_diamonds";
        setisEarring(true);
      } else {
        url = "get_selected_diamonds";
        setisEarring(false);
      }
      const response = await axios.post(`${BASE_URL}/api/v1/${url}`, data);
      setTotalPages(parseInt(response.data.total_pages));
      setResponseData(response.data.data);
      console.log("final result --------------", response.data);
      setTimeout(() => {
        const scrollDiv = document.getElementById("page");
        if (scrollDiv) {
          window.scrollTo({ top: scrollDiv.offsetTop + 1, behavior: "smooth" });
        }
      }, 300);
    } catch (error) {
      console.log("error there:", error);
    } finally {
      setIsLoading(false);
      navigate(
        `?page=${pages}&price=${minPrice};${maxPrice}&clarity=${minClarity};${maxClarity}&cut=${minCut};${maxCut}&certificate=${certificateIncluded}&color=${minColor};${maxColor}`
      );
    }
  };

  useEffect(() => {
    getDiamondsData();
    if (pages) {
      if (pages < 1) {
        setPageSize(1);
        return;
      }
      navigate(
        `?page=${pages}&price=${minPrice};${maxPrice}&clarity=${minClarity};${maxClarity}&cut=${minCut};${maxCut}&certificate=${certificateIncluded}&color=${minColor};${maxColor}`
      );
    }
  }, [pages, pageSize, sort]);

  return (
    <div className="flex flex-col w-full relative">
      <img
        src={leftFlower}
        alt=""
        className="absolute w-[15%] left-0 pointer-events-none"
      />
      <img
        src={rightFlower}
        alt=""
        className="absolute w-[15%] right-0 pointer-events-none"
      />
      <div className="relative z-10 flex flex-col w-[98%] lg:w-[99%] xl:w-[85%] mx-auto">
        {isLoadingFilter ? (
          <div className="container h-screen">
            <Loading />
          </div>
        ) : (
          filterInformations && (
            <div className="mx-auto flex flex-col w-full">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-5 lg:gap-4 pt-0 mt-4">
                <FilterShape
                  shapes={[selectedJewellery.shape]}
                  selectedShape={selectedShape}
                  setSelectedShape={(_) => {}}
                />
                <FilterDetails
                  min={filterInformations.min_price || 0}
                  max={35140}
                  title="Price"
                  lable="Price ($)"
                  setMax={setMaxPrice}
                  setMin={setMinPrice}
                  range={null}
                  hintmin={minPrice}
                  hintmax={maxPrice}
                />
                <FilterDetails
                  step={0.01}
                  min={
                    selectedJewellery.category.toLowerCase().includes("earring")
                      ? Math.max(0.3, Number(((selectedJewellery.caret - 0.12) / 2).toFixed(2))) /* getEarringStoneCarat(selectedJewellery.caret)[0] */
                      : selectedJewellery.caret - 0.12 || 0
                  }
                  max={
                    selectedJewellery.category.toLowerCase().includes("earring")
                      ? Number(((selectedJewellery.caret + 0.12) / 2).toFixed(2)) /* getEarringStoneCarat(selectedJewellery.caret)[1] */
                      : selectedJewellery.caret + 0.12 || 0
                  }
                  title="Carat"
                  lable="Carat"
                  setMin={setMinCarat}
                  setMax={setMaxCarat}
                  disabled={true}
                  range={null}
                />
                <FilterDetails
                  max={cutlables.length - 1}
                  lables={cutlables}
                  title="Cut"
                  setMin={setMinCut}
                  setMax={setMaxCut}
                  range={null}
                  hintmin={minCut}
                  hintmax={maxCut}
                />
                <FilterDetails
                  max={(colorsPriorityOrder.length || 1) - 1}
                  title="Color"
                  lables={colorsPriorityOrder || []}
                  setMin={setMinColor}
                  setMax={setMaxColor}
                  range={null}
                  hintmin={minColor}
                  hintmax={maxColor}
                />
                <FilterDetails
                  max={(clarityPriorityOrder.length || 1) - 1}
                  title="Clarity"
                  lables={clarityPriorityOrder || []}
                  setMin={setMinClarity}
                  setMax={setMaxClarity}
                  range={null}
                  hintmin={minClarity}
                  hintmax={maxClarity}
                />
              </div>
              <div className="flex flex-row w-full justify-between mx-auto mb-6">
                <FilterCertificate
                  certificateIncluded={certificateIncluded}
                  setCertificateIncluded={setCertificateIncluded}
                />
                <button
                  onClick={getDiamondsData}
                  className="text-[14px] font-medium capitalize text-white bg-[#201F41] rounded-full w-[85px] h-[35px] mr-2 lg:mr-6 xl:mr-6 2xl:mr-8"
                  style={{
                    fontFamily: '"Merriweather Sans", sans-serif',
                    boxShadow:
                      "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <p>Search</p>
                </button>
              </div>
            </div>
          )
        )}
      </div>
      {isLoading ? (
        <div className="container h-screen">
          <Loading />
        </div>
      ) : responseData && responseData.length > 0 ? (
        <div className="w-full overflow-x-scroll mx-auto flex flex-column ">
          <SelectSettingSubpage
            display={display}
            setDisplay={setDisplay}
            page={pages}
            setPage={setPages}
            totalPage={totalPages}
            data={responseData}
            sortList={sortList}
            setSort={setSort}
            pageSize={pageSize}
            setPageSize={setPageSize}
            isEarring={isEarring}
          />
        </div>
      ) : isLoading ? (
        <div className="container h-screen">
          <Loading />
        </div>
      ) : (
        <NotDiamondFound />
      )}
    </div>
  );
};

export default SearchSetting;
