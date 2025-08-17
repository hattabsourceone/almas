/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortByModel } from "@components/models/SortByModel";
import DiamondCard from "@components/shared/DiamondCard/DiamondCard";
import DiamondCardList from "@components/shared/DiamondCard/DiamondCardList";
import NoResultFound from "@components/shared/NoResultFound/NoResultFound";
import Paginator from "@components/shared/Paginator/Paginator";
import React, { useEffect } from "react";
import { FaThList } from "react-icons/fa";
import { IoGrid, IoList } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { Tooltip } from "@material-tailwind/react";

export type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  sortList: SortByModel[];
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
  display: string;
  sort: string;
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
  pageSize: number;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  getFilteredDiamonds: () => void;
  compareCount: () => void;
};

const AllDiamomnds: React.FC<Props> = ({
  data,
  sortList,
  sort,
  setSort,
  setPageSize,
  page,
  setPage,
  totalPage,
  display,
  setDisplay,
  pageSize,
  setSearchQuery,
  compareCount,
}) => {
  const location = useLocation();
  useEffect(() => {
    document.title = "Diamonds";
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    if (query) {
      setSearchQuery(query);
    }
  }, [location]);

  return (
    <div className="flex flex-col w-full border">
      <div className="spacing flex flex-col lg:flex-row space-y-4 lg:space-y-0 p-1 mb-8 mt-1">
        <div className="flex flex-row space-x-[1px] col-lg-6 col-md-6 col-sm-12 pr-4">
          <Tooltip
            content={<p className="text-[11px] capitalize py-1">List</p>}
          >
            <button
              onClick={() => {
                setDisplay("list");
              }}
              className={`flex flex-row items-center bg-[#211F41] btn border px-2 space-x-1 h-8 text-[14px] ${
                display === "grid" ? "text-[#777]" : " text-[#333]"
              } `}
              style={{ textShadow: "0 1px 0 rgba(255, 255, 255, 0.5)" }}
            >
              <i className="fa fa-th-list" aria-hidden="true"></i>
              <p className="text-[12px]">List</p>
            </button>
          </Tooltip>
          <Tooltip
            content={<p className="text-[11px] capitalize py-1">Grid</p>}
          >
            <button
              onClick={() => {
                setDisplay("grid");
              }}
              className={`flex flex-row items-center btn bg-[#211F41] border px-2 space-x-1 h-8 text-[14px] ${
                display === "list" ? "text-[#777]" : " text-[#333]"
              } `}
              style={{ textShadow: "0 1px 0 rgba(255, 255, 255, 0.5)" }}
            >
              <i className="fa fa-th" aria-hidden="true"></i>
              <p className="text-[12px]">Visual</p>
            </button>
          </Tooltip>
          <div className="hidden lg:flex justify-content-start align-items-start w-full pl-20">
            <label
              className="border text-center justify-center items-center flex text-[12px] font-medium h-[30px] px-[10px] text-nowrap bg-[#eee] text-[#555] rounded-l-sm"
              htmlFor="sort"
            >
              Sort by:
            </label>
            <select
              className="no-spacing form-select  label-side capitalize h-[30px] text-[12px] text-[#555]"
              name="sort"
              id="sort"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
              }}
            >
              {sortList.map((s) => (
                <option className="capitalize" value={s.value} key={s.name}>
                  {s.name.replace("_", " ").replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex lg:hidden justify-content-start align-items-start w-full lg:w-[30%] ml-20">
          <label
            className="border text-center justify-center items-center flex text-[12px] font-medium h-[30px] px-[10px] text-nowrap bg-[#eee] text-[#555] rounded-l-sm"
            htmlFor="sort"
          >
            Sort by:
          </label>
          <select
            className="no-spacing form-select  label-side capitalize h-[30px] text-[12px] text-[#555]"
            name="sort"
            id="sort"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            {sortList.map((s) => (
              <option className="capitalize" value={s.value} key={s.name}>
                {s.name.replace("_", " ").replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden lg:flex justify-content-start align-items-start col-lg-3 col-md-6 col-sm-12 pr-6">
          <label
            className="border text-center justify-center items-center flex w-20 h-[30px] px-[10px] text-[12px] bg-[#eee] text-[#555] rounded-l-sm"
            htmlFor="show"
          >
            Show:
          </label>
          <select
            className="no-spacing form-select  label-side h-[30px] text-[12px] text-[#555]"
            name="show"
            id="show"
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value));
            }}
          >
            <option value={24}>24</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="flex lg:hidden justify-content-start align-items-start w-full">
          <label
            className="border text-center justify-center items-center flex w-20 h-[30px] px-[10px] text-[12px] bg-[#eee] text-[#555] rounded-l-sm"
            htmlFor="show"
          >
            Show:
          </label>
          <select
            className="no-spacing form-select  label-side h-[30px] text-[12px] text-[#555]"
            name="show"
            id="show"
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value));
            }}
          >
            <option value={24}>24</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      {data?.length === 0 ? (
        <NoResultFound />
      ) : (
        <>
          {display === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 w-full p-1">
              {data?.map((d: any) => (
                <DiamondCard
                  link={`/diamond-details/${d.id}`}
                  key={d.id}
                  data={d}
                  compareCount={compareCount}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col w-full -mt-5">
              <div className="w-full overflow-x-scoll md:overflow-x-auto pb-4">
                <table className="tables table-auto w-full">
                  <thead>
                    <tr className="capitalize text-center text-[14px] font-semibold">
                      <th>Compare</th>
                      <th className="mt-2 py-3">Shape</th>
                      <th>Carat</th>
                      <th>Color</th>
                      <th>Cut</th>
                      <th>Clarity</th>
                      <th>Symmetry</th>
                      <th>Polish</th>
                      <th>Fluorescence</th>
                      <th>Certificate</th>
                      <th>Price</th>
                      <th>Add</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((d: any) => (
                      <DiamondCardList
                        key={d.id}
                        data={d}
                        compareCount={compareCount}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <Paginator page={page} setPage={setPage} totalPage={totalPage} />
        </>
      )}
    </div>
  );
};

export default AllDiamomnds;
