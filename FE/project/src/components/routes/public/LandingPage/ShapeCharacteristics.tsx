import React, { useState } from "react";
import tableImg from "@assets/LandingPage/ShapeCharacteristics/table.png";
import crownImg from "@assets/LandingPage/ShapeCharacteristics/crown.png";
import gridleImg from "@assets/LandingPage/ShapeCharacteristics/gridle.png";
import pavilionImg from "@assets/LandingPage/ShapeCharacteristics/pavilion.png";
import culetImg from "@assets/LandingPage/ShapeCharacteristics/culet.png";

const ShapeCharacteristics: React.FC = () => {
  const [selected, setSelected] = useState<string>(tableImg);

  return (
    <div className="shape-characteristics">
      <div className="image-container mb-20">
        <img
          src={selected}
          alt=""
          className={`${selected.includes("gridle") ? "mt-12" : null} ${
            selected.includes("culet") ? "mt-9 sm:mt-14 lg:mt-3" : null
          } ${selected.includes("pavilion") ? "mt-8 sm:mt-10 lg:mt-4" : null}
           ${selected.includes("crown") ? "mt-[17px] sm:mt-[1px] 2xl:mt-[1px]" : null}
          ${selected.includes("table") ? "sm:-mt-6 lg:-mt-4" : null}`}
        />
      </div>
      <ul>
        <li
          onClick={() => setSelected(tableImg)}
          className={
            selected === tableImg
              ? "active table-line before:w-[180px] cursor-pointer italic"
              : "cursor-pointer italic"
          }
        >
          <span>table</span>
        </li>
        <li
          onClick={() => setSelected(crownImg)}
          className={
            selected === crownImg
              ? "active crown-line cursor-pointer italic"
              : "cursor-pointer italic"
          }
        >
          <span>crown</span>
        </li>
        <li
          onClick={() => setSelected(gridleImg)}
          className={
            selected === gridleImg
              ? "active gridle-line cursor-pointer italic"
              : "cursor-pointer italic"
          }
        >
          <span>gridle</span>
        </li>
        <li
          onClick={() => {
            console.log("Selected Pavilion:", pavilionImg);
            setSelected(pavilionImg);
          }}
          className={
            selected === pavilionImg
              ? "active pavilion-line cursor-pointer italic"
              : "cursor-pointer italic"
          }
        >
          <span>pavilion</span>
        </li>
        <li
          onClick={() => {
            console.log("Selected Culet:", culetImg);
            setSelected(culetImg);
          }}
          className={
            selected === culetImg
              ? "active culet-line cursor-pointer italic"
              : "cursor-pointer italic"
          }
        >
          <span>culet</span>
        </li>
      </ul>
    </div>
  );
};

export default ShapeCharacteristics;
