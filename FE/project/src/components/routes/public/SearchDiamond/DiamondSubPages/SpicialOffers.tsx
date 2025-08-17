/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortByModel } from "@components/models/SortByModel";
import DiamondCard from "@components/shared/DiamondCard/DiamondCard";
import DiamondCardList from "@components/shared/DiamondCard/DiamondCardList";
import DiamondSpecialOfferCard from "@components/shared/DiamondCard/DiamondSpecialOfferCard";
import NoResultFound from "@components/shared/NoResultFound/NoResultFound";
import Paginator from "@components/shared/Paginator/Paginator";
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type Props = {
  data?: any;
  sortList: SortByModel[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  pageSize: number;
  totalPage: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  compareCount: () => void;
};

const SpicialOffers: React.FC<Props> = ({
  data,
  compareCount,
}) => {
  const [display, setDisplay] = useState<string>("grid");
  const navigate = useNavigate();
  const navigateToRoute = (route: string) => {
    navigate(`/${route}`);
  };

  useEffect(()=>{
document.title = "Product Comparison";
  },[])
  return (
    <div className="flex flex-col w-full border mb-32">
      {data === null || data?.length === 0 ? (
        <div className="flex flex-col py-6">
          <p className="text-base pb-4">No Diamonds Selected.</p>
          <button
            onClick={() => navigateToRoute("")}
            className="px-10 py-2 w-min text-white text-base bg-[#211F41] rounded-full"
          >
            Continue
          </button>
        </div>
      ) : (
        <>
          <div className="pb-6"></div>

          <div className="flex flex-col w-full -mt-5 overflow-x-auto md:overflow-x-hidden">
            <div className="w-full pb-4">
              <table className="tables table-auto w-full">
                <thead>
                  <tr className="capitalize text-center text-[14px] font-semibold">
                    <th>Compare</th>
                    <th className="mt-2 py-3">Shape</th>
                    <th>Size/Carat</th>
                    <th>Color</th>
                    <th>Cut</th>
                    <th>Clarity</th>
                    <th>Symmetry</th>
                    <th>Polish</th>
                    <th>Fluorescence</th>
                    <th>Certificate</th>
                    <th>Price$</th>
                    <th>Add</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((d: any) => (
                    <DiamondSpecialOfferCard
                      key={d.id}
                      data={d}
                      compareCount={compareCount}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* {data?.length === 0 ? (
            <div></div>
          ) : (
            <Paginator page={page} setPage={setPage} totalPage={totalPage} />
          )} */}
        </>
      )}
    </div>
  );
};

export default SpicialOffers;
