import React, { useEffect, useState, useCallback, useMemo } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import AllDiamomnds from "./AllDiamomnds";
import SpicialOffers from "./SpicialOffers";
import axios from "axios";
import { BASE_URL } from "@components/api/api";
import { SortByModel } from "@components/models/SortByModel";
import ComparePage from "./ComparePage";
import Loading from "@components/shared/Loading/Loading";

export type Props = {
  data?: any;
  specialOffers?: any;
  sortList: SortByModel[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
  offerPages: number;
  setOfferPages: React.Dispatch<React.SetStateAction<number>>;
  totalOfferPages: number;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  sort: string;
  display: string;
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  getFilteredDiamonds: () => Promise<void>;
  isLoading: boolean;
};

const DiamondSubPages: React.FC<Props> = ({
  page,
  setPage,
  totalPage,
  data,
  specialOffers,
  sortList,
  sort,
  setSort,
  setPageSize,
  display,
  setDisplay,
  pageSize,
  setSearchQuery,
  getFilteredDiamonds,
  offerPages,
  setOfferPages,
  totalOfferPages,
  isLoading,
}) => {
  const [compareCount, setCompareCount] = useState<number>(0);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const computeCompareCount = useCallback(() => {
    const result = localStorage.getItem("compareDiamonds");
    const newBasket: any[] = result ? JSON.parse(result) : [];
    setCompareCount(newBasket.length);
  }, []);

  useEffect(() => {
    scrollTo(0, 500);
    computeCompareCount();
  }, [computeCompareCount]);

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    // setIsLoading(true);
    // getFilteredDiamonds()
    //   .then(() => {})
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  }, [page]);

  const memoizedAllDiamonds = useMemo(
    () => (
      <AllDiamomnds
        display={display}
        setDisplay={setDisplay}
        page={page}
        setPage={setPage}
        totalPage={totalPage}
        data={data}
        sortList={sortList}
        sort={sort}
        setSort={setSort}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setSearchQuery={setSearchQuery}
        getFilteredDiamonds={getFilteredDiamonds}
        compareCount={computeCompareCount}
      />
    ),
    [
      display,
      setDisplay,
      page,
      setPage,
      totalPage,
      data,
      sortList,
      sort,
      setSort,
      pageSize,
      setPageSize,
      setSearchQuery,
      getFilteredDiamonds,
      computeCompareCount,
    ]
  );

  const memoizedSpicialOffers = useMemo(
    () => (
      <SpicialOffers
        totalPage={totalOfferPages}
        page={offerPages}
        setPage={setOfferPages}
        data={specialOffers}
        sortList={sortList}
        setSort={setSort}
        pageSize={pageSize}
        setPageSize={setPageSize}
        compareCount={computeCompareCount}
      />
    ),
    [
      totalOfferPages,
      offerPages,
      setOfferPages,
      specialOffers,
      sortList,
      setSort,
      pageSize,
      setPageSize,
      computeCompareCount,
    ]
  );

  return (
    <div className="flex flex-col w-[96%] md:w-[95%] lg:w-[93%] xl:w-[90%] 2xl:w-[68%] mx-auto">
      <div className="flex flex-row space-x-3 pl-4">
        <NavLink
          to={"/search-inventory/all-diamond"}
          className={`${
            pathname == "/search-inventory/all-diamond"
              ? " hover:text-white text-white bg-[#211F41]"
              : "bg-[#efefef] hover:text-[#211F41] text-[#211F41] border-[1px] border-slate-300 shadow-sm"
          } h-[45px] flex items-center px-3 rounded-t-[4px] text-[16px]`}
        >
          All Diamonds (
          {totalPage === 1 ? (data ? data.length : 0) : pageSize * totalPage})
        </NavLink>
        <NavLink
          to={"/search-inventory/spicial-offer"}
          className={`${
            pathname == "/search-inventory/spicial-offer"
              ? " hover:text-white text-white bg-[#211F41]"
              : "bg-[#efefef] hover:text-[#211F41] text-[#211F41] border-[1px] border-slate-300 shadow-sm"
          } h-[45px] flex items-center px-3 rounded-t-[4px] text-[16px]`}
        >
          Special Offer (
          {totalOfferPages === 1
            ? specialOffers
              ? specialOffers.length
              : 0
            : pageSize * totalOfferPages})
        </NavLink>
        <NavLink
          to={"/search-inventory/compare-products"}
          className={`${
            pathname == "/search-inventory/compare-products"
              ? " hover:text-white text-white bg-[#211F41]"
              : "bg-[#efefef] hover:text-[#211F41] text-[#211F41] border-[1px] border-slate-300 shadow-sm"
          } h-[45px] flex items-center px-3 rounded-t-[4px] text-[16px]`}
        >
          Compare ({compareCount})
        </NavLink>
      </div>
      <div id="page" className="page">
        {isLoading ? (
          <Loading />
        ) : (
          <Routes>
            <Route path="/all-diamond" element={memoizedAllDiamonds} />
            <Route path="/spicial-offer" element={memoizedSpicialOffers} />
            <Route
              path="/compare-products"
              element={<ComparePage compareCount={computeCompareCount} />}
            />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default React.memo(DiamondSubPages);
