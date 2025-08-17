import { SortByModel } from "@components/models/SortByModel";
import React, { Dispatch } from "react";
import { SortByJw } from "./TypesJewellery";

type Props = {
  setSort: Dispatch<React.SetStateAction<string>>;
  setMetal: Dispatch<React.SetStateAction<number>>;
  setPrice: Dispatch<React.SetStateAction<string>>;
  sortByPrice: SortByModel[];
  sortByMetal: SortByJw[];
  sortByStyle: SortByJw[];
  defaultSortValue: number;
};

const FilterTypes: React.FC<Props> = ({
  setSort,
  setMetal,
  setPrice,
  sortByPrice,
  sortByMetal,
  sortByStyle,
  defaultSortValue,
}) => {
  return (
    <div
      className="text-[#555] w-full flex flex-col xl:flex-row"
      style={{
        fontFamily: "Montserrat",
      }}
    >
      <div className="d-flex justify-content-start align-items-center mb-4 col-xl-3 col-md-12 col-sm-12 w-[99%] xl:w-[25%] xl:pr-6">
        <label
          className="text-[11px] form-label h-8 flex items-center text-nowrap text-[#555] border-[#ccc] border-[1px] w-[125px] md:w-[140px] xl:w-[170px] 2xl:w-[190px]"
          htmlFor="sort"
          style={{ backgroundColor: "#eee", fontWeight: 400 }}
        >
          <p className="pl-2">Sort By Style:</p>
        </label>
        <select
          className="no-spacing h-8 form-select label-side capitalize text-[12px] text-[#666] rounded-none border-[#ccc] border-[1px] "
          style={{ fontFamily: '"Open Sans", sans-serif', fontWeight: 400 }}
          name="sort"
          id="sort"
          value={defaultSortValue}
          onChange={(e) => {
            const selectedName = sortByStyle.find(
              (s) => s.value === parseInt(e.target.value)
            )?.name;
            if (selectedName) {
              setSort(selectedName);
            }
          }}
        >
          {sortByStyle.map((s) => (
            <option
              className="capitalize text-[12px]"
              value={s.value}
              key={s.name}
            >
              {s.displayName.replace("_", " ").replace("_", " ")}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex justify-content-start align-items-center mb-4 col-xl-3 col-md-12 col-sm-12 w-[99%] xl:w-[25%] xl:pl-2 xl:pr-4">
        <label
          className="text-[11px] form-label h-8 flex items-center text-nowrap text-[#555] border-[#ccc] border-[1px] w-[125px] md:w-[140px] xl:w-[170px] 2xl:w-[190px]"
          htmlFor="sort"
          style={{ backgroundColor: "#eee", fontWeight: 400 }}
        >
          <p className="pl-2">Sort By Metal:</p>
        </label>
        <select
          className="no-spacing h-8 form-select label-side capitalize text-[12px] text-[#666] rounded-none border-[#ccc] border-[1px]"
          style={{ fontFamily: '"Open Sans", sans-serif', fontWeight: 400 }}
          name="sort"
          id="sort"
          onChange={(e) => {
            setMetal(Number(e.target.value));
          }}
        >
          {sortByMetal.map((s) => (
            <option className="capitalize" value={s.value} key={s.name}>
              {s.displayName.replace("_", " ").replace("_", " ")}
            </option>
          ))}{" "}
        </select>
      </div>
      <div className="d-flex justify-content-start align-items-center mb-4 col-xl-3 col-md-12 col-sm-12 w-[99%] xl:w-[25%] xl:pl-4 xl:pr-2">
        <label
          className="text-[11px] form-label h-8 flex items-center text-nowrap text-[#555] border-[#ccc] border-[1px] w-[125px] md:w-[140px] xl:w-[170px] 2xl:w-[190px]"
          htmlFor="sort"
          style={{ backgroundColor: "#eee", fontWeight: 400 }}
        >
          <p className="pl-2">Sort By Price:</p>
        </label>
        <select
          className="no-spacing h-8 form-select label-side capitalize text-[12px] text-[#666] rounded-none border-[#ccc] border-[1px]"
          style={{ fontFamily: '"Open Sans", sans-serif', fontWeight: 400 }}
          name="sort"
          id="sort"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        >
          {sortByPrice.map((s) => (
            <option className="capitalize" value={s.value} key={s.name}>
              {s.name.replace("_", " ").replace("_", " ")}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterTypes;
