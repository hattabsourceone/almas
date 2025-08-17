import React, { useEffect, useRef, useState } from "react";

import FilterShape from "./FilterShape";
import FilterDetails from "./FilterDetails";
import FilterCertificate from "./FilterCertificate";
import axios from "axios";
import DiamondSubPages from "./DiamondSubPages/_DiamondSubPages";
import Loading from "@components/shared/Loading/Loading";
import { BASE_URL } from "@components/api/api";
import { useLocation, useNavigate } from "react-router-dom";
import Contact from "@components/shared/Contact/Contact";
import { SortByModel } from "@components/models/SortByModel";
import leftFlower from "@assets/SearchDiamond/left_flower.png";
import rightFlower from "@assets/SearchDiamond/right_flower.png";
import dotsImage from "@assets/WhyAlmas/dots.png";
import { Values } from "@components/shared/MultiRangeSlider";
import NotDiamondFound from "@components/shared/NotFond.tsx/NotDiamondFound";

type Props = {
  cut: number | null;
  color: number | null;
  clarity: number | null;
};

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
  culet_size: string;
  depth: number;
  table: number;
  meas_length: number;
  meas_width: number;
  meas_depth: number;
};

const Filter: React.FC<Props> = ({ cut, color, clarity }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const clampValue = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(value, max));
  const searchParams = new URLSearchParams(location.search);
  const [selectedShape, setSelectedShape] = useState<string[]>(() => {
    const shapes = searchParams.get("shape");
    if (shapes) {
      return shapes
        .split(",")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1));
    }
    return [];
  });

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
  const [minCarat, setMinCarat] = useState<number>(() => {
    const carat = searchParams.get("carat");
    if (carat) {
      const [min] = carat.split(";").map(Number);
      return clampValue(min || 0.3, 0.3, 3);
    }
    return 0.3;
  });

  const [maxCarat, setMaxCarat] = useState<number>(() => {
    const carat = searchParams.get("carat");
    if (carat) {
      const [, max] = carat.split(";").map(Number);
      return clampValue(max || 3, 0.3, 3);
    }
    return 3;
  });
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

  const isMounted = useRef(false);
  const [specialOffers, setSpecialOffers] = useState<unknown[] | null>(null);
  const [certificateIncluded, setCertificateIncluded] = useState<boolean>(
    searchParams.get("certificate") === "true" || false
  );
  const [isFilteredResult, setisFilteredResult] = useState<boolean>(
    searchParams.get("carat") ? true : false
  );
  const cutlables = ["Good", "Very Good", "Excellent"];
  const [sort, setSort] = useState<string>("default");
  const [pageSize, setPageSize] = useState<number>(24);
  const [filterInformations, setFilterInformations] =
    useState<FilterProps | null>(null);
  const [responseData, setResponseData] = useState<DiamondDetail[] | null>(
    null
  );
  const [pages, setPages] = useState<number>(
    parseInt(searchParams.get("page") || "1")
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const [offerPages, setOfferPages] = useState<number>(1);
  const [totalOfferPages, setTotalOfferPages] = useState<number>(1);
  const [display, setDisplay] = useState<string>("grid");
  const [isFilterLoading, setIsFilterLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const sortList: SortByModel[] = [
    { name: "Default (Latest)", value: "default" },
    { name: "price (low > high)", value: "price_low_high" },
    { name: "price (high > low)", value: "price_high_low" },
    { name: "carat (low > high)", value: "carat_low_high" },
    { name: "carat (high > low)", value: "carat_high_low" },
    { name: "cut (high > low)", value: "cut_high_low" },
    { name: "cut (low > high)", value: "cut_low_high" },
    { name: "color (low > high)", value: "color_low_high" },
    { name: "color (high > low)", value: "color_high_low" },
    { name: "clarity (low > high)", value: "clarity_low_high" },
    { name: "clarity (high > low)", value: "clarity_high_low" },
  ];

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

  const { pathname } = location;
  useEffect(() => {
    getFilterInformations().then(() => {
      if (isFilteredResult) {
        getFilteredDiamonds().then(async () => {
          setIsLoading(false);
          isMounted.current = true;
          await getSpecialOffers();
        });
      } else {
        getAllDiamonds().then(async () => {
          setIsLoading(false);
          isMounted.current = true;
          await getSpecialOffers();
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!isMounted.current) return;
    if (sort === "default") {
      if (isFilteredResult) {
        getFilteredDiamonds();
      } else {
        getAllDiamonds();
      }
    } else {
      getFilteredDiamonds();
    }
  }, [sort, pages, pageSize]);

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

  const getAllDiamonds = async () => {
    if (isFilteredResult) {
      setisFilteredResult(false);
    }
    try {
      setIsLoading(true);

      const response = await axios.post(`${BASE_URL}/api/v1/get_all_diamonds`, {
        limit: pageSize,
        page: pages,
        sort_by: sort,
      });
      setTotalPages(parseInt(response.data.total_pages));
      setResponseData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching diamond data:", error);
    }
  };

  const getSpecialOffers = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/get_all_special_offer`
      );
      setSpecialOffers(response.data.special_offers);
    } catch (error) {
      console.log("error getSpecialOffers:", error);
    }
  };

  const getFilterInformations = async () => {
    try {
      setIsFilterLoading(true);
      const response = await axios.get(`${BASE_URL}/api/v1/get_filters`);
      response.data.data.shapes = sortShapesFilter(response.data.data.shapes);
      response.data.data.color = sortColorsFilter(response.data.data.colors);
      response.data.data.clarity = sortClarityFilter(
        response.data.data.clarities
      );
      setFilterInformations(response.data.data);
    } catch (error) {
      console.error("Error fetching filter information:", error);
      setIsFilterLoading(false);
    } finally {
      setIsFilterLoading(false);
    }
  };

  const getFilteredDiamonds = async (customData?: any) => {
    setIsLoading(true);
    if (!isFilteredResult) {
      setisFilteredResult(true);
    }
    let cutOptions: string[] = cutlables.slice(minCut, maxCut + 1);
    if (cutOptions.length === 3) {
      cutOptions.push("");
    }
    const data = {
      shape: /* searchQuery.length > 0
          ? [searchQuery]
          : */ selectedShape.map((s) => s.charAt(0).toUpperCase() + s.slice(1)),
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
    const postData = customData ? customData : data;
    try {
      console.log("search body -------------", postData);
      const response = await axios.post(
        `${BASE_URL}/api/v1/get_selected_diamonds`,
        postData
      );
      setTotalPages(parseInt(response.data.total_pages));
      setResponseData(response.data.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }

    setTimeout(() => {
      const scrollDiv = document.getElementById("page");
      if (scrollDiv) {
        window.scrollTo({ top: scrollDiv.offsetTop + 1, behavior: "smooth" });
      }
    }, 300);
    setIsLoading(false);
  };

  useEffect(() => {
    if (pages) {
      if (pages < 1) {
        setPageSize(1);
        return;
      }
      if (searchParams.get("certificate")) {
        navigate(
          `?page=${pages}&carat=${minCarat};${maxCarat}&price=${minPrice};${maxPrice}&clarity=${minClarity};${maxClarity}&cut=${minCut};${maxCut}&certificate=${certificateIncluded}&color=${minColor};${maxColor}&shape=${selectedShape.join(
            ","
          )}`
        );
      } else {
        navigate(`?page=${pages}`);
      }
    }
  }, [pages]);

  return (
    <div className="flex flex-col w-full relative">
      {pathname.toString() === "/search-inventory/all-diamond" && (
        <img
          src={leftFlower}
          alt=""
          className="absolute w-[20%] left-0 pointer-events-none"
        />
      )}
      {pathname.toString() === "/search-inventory/all-diamond" && (
        <img
          src={rightFlower}
          alt=""
          className="absolute w-[20%] right-0 pointer-events-none"
        />
      )}
      <div className="flex flex-col w-full">
        <div className="flex flex-col p-2 w-[99%] md:w-[99%] lg:w-[99%] xl:w-[80%] 2xl:w-[70%] mx-auto z-10">
          {isFilterLoading && (
            <div className="container h-screen">
              <Loading />
            </div>
          )}
          {pathname.toString() === "/search-inventory/compare-products" && (
            <div className="w-full h-[320px] relative mb-6">
              <div className="h-[220px] w-[220px] rounded-full absolute z-0 inset-0 mt-14 left-28 bg-slate-50 opacity-80"></div>
              <p className="absolute z-10 text-[44px] lg:text-[45px] 2xl:text-[60px] text-[#211F41] font-medium ml-10 lg:ml-12 xl:-ml-10 2xl:ml-4 pt-20 leading-tight">
                PRODUCT
                <br />
                COMPARISON
              </p>
              <img
                className={
                  "w-[320px] h-[120px] lg:w-[390px] lg:h-[160px] object-cover absolute mt-[130px] right-4 lg:right-8 xl:-right-12"
                }
                src={dotsImage}
              />
            </div>
          )}
          {pathname.toString() === "/search-inventory/spicial-offer" && (
            <div className="w-full h-[320px] relative mb-6">
              <div className="h-[220px] w-[220px] rounded-full absolute z-0 inset-0 mt-14 left-28 bg-slate-50 opacity-80"></div>
              <p className="absolute z-10 text-[44px] lg:text-[45px] 2xl:text-[60px] text-[#211F41] font-medium ml-10 lg:ml-12 xl:-ml-10 2xl:ml-4 pt-20 leading-tight">
                SPECIAL
                <br />
                OFFER
              </p>
              <img
                className={
                  "w-[390px] h-[160px] object-cover absolute mt-[130px] right-4 lg:right-8 xl:-right-12"
                }
                src={dotsImage}
              />
            </div>
          )}
          {filterInformations &&
            pathname.toString() === "/search-inventory/all-diamond" && (
              <div className="w-full flex flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4 p-2 mt-4">
                  <FilterShape
                    shapes={filterInformations.shapes || []}
                    selectedShape={selectedShape}
                    setSelectedShape={setSelectedShape}
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
                    min={filterInformations.min_carat || 0}
                    max={filterInformations.max_carat || 0}
                    title="Carat"
                    lable="Carat"
                    setMin={setMinCarat}
                    setMax={setMaxCarat}
                    range={null}
                    hintmin={minCarat}
                    hintmax={maxCarat}
                  />
                  <FilterDetails
                    max={cutlables.length - 1}
                    lables={cutlables}
                    title="Cut"
                    setMin={setMinCut}
                    setMax={setMaxCut}
                    range={cut}
                    hintmin={minCut}
                    hintmax={maxCut}
                  />
                  <FilterDetails
                    max={(colorsPriorityOrder.length || 1) - 1}
                    title="Color"
                    lables={colorsPriorityOrder || []}
                    setMin={setMinColor}
                    setMax={setMaxColor}
                    range={color}
                    hintmin={minColor}
                    hintmax={maxColor}
                  />
                  <FilterDetails
                    max={(clarityPriorityOrder.length || 1) - 1}
                    title="Clarity"
                    lables={clarityPriorityOrder || []}
                    setMin={setMinClarity}
                    setMax={setMaxClarity}
                    range={clarity}
                    hintmin={minClarity}
                    hintmax={maxClarity}
                  />
                </div>
                <div className="flex flex-row w-full justify-between mx-auto pb-4 px-4 -mt-4">
                  <FilterCertificate
                    certificateIncluded={certificateIncluded}
                    setCertificateIncluded={setCertificateIncluded}
                  />
                  {pathname.toString() !==
                    "/search-inventory/spicial-offer" && (
                    <button
                      onClick={() => {
                        if (isFilteredResult && pages === 1) {
                          getFilteredDiamonds();
                          navigate(
                            `?page=${pages}&carat=${minCarat};${maxCarat}&price=${minPrice};${maxPrice}&clarity=${minClarity};${maxClarity}&cut=${minCut};${maxCut}&certificate=${certificateIncluded}&color=${minColor};${maxColor}&shape=${selectedShape.join(
                              ","
                            )}`
                          );
                        } else {
                          setisFilteredResult(true);
                          setPages(1);
                        }
                      }}
                      className="text-[15px] font-medium text-white bg-[#201F41] w-[130px] h-[40px] rounded-lg border-[#204d74] border-[2px]"
                      style={{ fontFamily: '"Plain Light", sans-serif' }}
                    >
                      <p>Search</p>
                    </button>
                  )}
                </div>
              </div>
            )}
        </div>
        {isLoading ? (
          <div className="container h-screen">
            <Loading />
          </div>
        ) : responseData && responseData.length > 0 ? (
          <DiamondSubPages
            display={display}
            setDisplay={setDisplay}
            page={pages}
            setPage={setPages}
            totalPage={totalPages}
            data={responseData}
            sortList={sortList}
            sort={sort}
            setSort={setSort}
            pageSize={pageSize}
            setPageSize={setPageSize}
            setSearchQuery={setSearchQuery}
            getFilteredDiamonds={getFilteredDiamonds}
            specialOffers={specialOffers}
            offerPages={offerPages}
            setOfferPages={setOfferPages}
            totalOfferPages={totalOfferPages}
            isLoading={isLoading}
          />
        ) : (
          <NotDiamondFound />
        )}
      </div>
      <Contact />
    </div>
  );
};

export default React.memo(Filter);
