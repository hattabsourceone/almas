import NoResultFound from "@components/shared/NoResultFound/NoResultFound";
import Paginator from "@components/shared/Paginator/Paginator";
import React from "react";
import { useLocation } from "react-router-dom";
import JewelleryCardList from "../JewelleryDetails/JewelleryCardList";

export type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  sortList: string[];
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
  display: string;
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
  pageSize: number;
  isEarring: boolean;
};

const SelectSettingSubpage: React.FC<Props> = ({
  data,
  page,
  setPage,
  totalPage,
  isEarring,
}) => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="w-full">
      {/* <div className="spacing col-row-reverse justify-content-start lg:mb-0">
        <div className="flex justify-content-start align-items-center min-w-300">
          <label className=" form-label font-weight-bold" htmlFor="sort">
            Sort
          </label>
          <select
            className="no-spacing form-select  label-side capitalize"
            name="sort"
            id="sort"
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            {sortList.map((s) => (
              <option className="capitalize" value={s} key={s}>
                {s.replace("_", " ").replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex justify-content-start align-items-center min-w-300">
          <label className="form-label font-weight-bold" htmlFor="show">
            Show
          </label>
          <select
            className="no-spacing form-select  label-side my-4"
            name="show"
            id="show"
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value));
            }}
          >
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={60}>60</option>
            <option value={99}>99</option>
          </select>
        </div>
      </div> */}
      {data?.length === 0 ? (
        <NoResultFound />
      ) : (
        <div className="mt-4 lg:mt-0 flex flex-col w-full">
          <div className="w-full overflow-x-scoll md:overflow-x-auto pb-4">
            <table className="tables table-auto w-full">
              <thead>
                <tr className="capitalize text-center text-[14px] font-semibold">
                  <th className="mt-2 py-3">Shapes</th>
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
                {data?.map((d: any, index: number) => {
                  let pairId: number[] = []
                  if (isEarring){
                    let indexTest = index + 1;
                    if (indexTest % 2 === 0) {
                      pairId.push(data[index-1].id);
                      pairId.push(d.id);
                    } else {
                      pairId.push(d.id);
                     if (data.length != (index+1)) {
                      pairId.push(data[index+1].id);
                     } 
                    }
                  }
                 return <JewelleryCardList key={d.id} data={d} index={index} isEarring={isEarring} pairId={pairId} />
                }
                )}
              </tbody>
            </table>
          </div>
          <Paginator page={page} setPage={setPage} totalPage={totalPage} />
        </div>
      )}
    </div>
  );
};

export default SelectSettingSubpage;
