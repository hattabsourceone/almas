import React from "react";

import shape7 from "@assets/SearchDiamond/shapes/shap7.png";
import shape11 from "@assets/SearchDiamond/shapes/shape11.png";
import shape12 from "@assets/SearchDiamond/shapes/shape12.png";
import shape13 from "@assets/SearchDiamond/shapes/shape13.png";
import shape14 from "@assets/SearchDiamond/shapes/shape14.png";
import shape15 from "@assets/SearchDiamond/shapes/shape15.png";
import shape16 from "@assets/SearchDiamond/shapes/shape16.png";
import shape17 from "@assets/SearchDiamond/shapes/shape17.png";
import shape18 from "@assets/SearchDiamond/shapes/shape18.png";
import shape19 from "@assets/SearchDiamond/shapes/shape19.png";
import shape20 from "@assets/SearchDiamond/shapes/shape20.png";
import shape21 from "@assets/SearchDiamond/shapes/shape21.png";
import shape22 from "@assets/SearchDiamond/shapes/shape22.png";
import shape23 from "@assets/SearchDiamond/shapes/shape23.png";
import shape24 from "@assets/SearchDiamond/shapes/shape24.png";
import shape25 from "@assets/SearchDiamond/shapes/shape25.png";
import shape26 from "@assets/SearchDiamond/shapes/shape26.png";
import shape27 from "@assets/SearchDiamond/shapes/shape27.png";
import shape28 from "@assets/SearchDiamond/shapes/shape28.png";
import shape29 from "@assets/SearchDiamond/shapes/shape29.png";
import shape30 from "@assets/SearchDiamond/shapes/shape30.png";
import shape31 from "@assets/SearchDiamond/shapes/shape31.png";
import shape32 from "@assets/SearchDiamond/shapes/shape32.png";
import shape33 from "@assets/SearchDiamond/shapes/shape33.png";
import shape34 from "@assets/SearchDiamond/shapes/shape34.png";
import shape35 from "@assets/SearchDiamond/shapes/shape35.png";
import shape36 from "@assets/SearchDiamond/shapes/shape36.png";
import shape37 from "@assets/SearchDiamond/shapes/shape37.png";
import shape38 from "@assets/SearchDiamond/shapes/shape38.png";
import cushionModified from "@assets/SearchDiamond/shapes/cushion-modified.png";
import cushion from "@assets/Jewellery/shapes/cushion.jpg";
import emerald from "@assets/Jewellery/shapes/emerald.jpg";
import heart from "@assets/Jewellery/shapes/heart.jpg";
import oval from "@assets/Jewellery/shapes/oval.jpg";
import pear from "@assets/Jewellery/shapes/pear.jpg";
import princess from "@assets/Jewellery/shapes/princess.jpg";
import round from "@assets/Jewellery/shapes/round.jpg";
import radiant from "@assets/Jewellery/shapes/radiant.jpg";
import marquize from "@assets/Jewellery/shapes/marquize.png";
import asscher from "@assets/Jewellery/shapes/asscher.png";

type Props = {
  shapes: string[];
  selectedShape: string[];
  setSelectedShape: (shape: string[]) => void;
};
export type ShapeImages = {
  name: string;
  value: string;
};
const FilterShape: React.FC<Props> = ({
  selectedShape,
  setSelectedShape,
  shapes,
}) => {
  const toggle = (shape: string) => {
    if (selectedShape.includes(shape)) {
      setSelectedShape(selectedShape.filter((s) => s !== shape));
    } else {
      setSelectedShape([...selectedShape, shape]);
    }
  };

  const shapesImages: ShapeImages[] = [
    { name: "Round", value: round },
    { name: "Princess", value: princess },
    { name: "Emerald", value: emerald },
    { name: "Asscher", value: asscher },
    { name: "Cushion", value: cushion },
    { name: "Cushion Modified", value: cushionModified },
    { name: "Marquise", value: marquize },
    { name: "Radiant", value: radiant },
    { name: "Oval", value: oval },
    { name: "Pear", value: pear },
    { name: "Heart", value: heart },
    { name: "Sq. Emerald", value: shape11 },
    { name: "Asscher & Sq. Emerald", value: shape12 },
    { name: "Square Radiant", value: shape7 },
    { name: "Cushion (All)", value: shape13 },
    { name: "Cushion Brilliant", value: shape14 },
    { name: "Baguette", value: shape15 },
    { name: "European Cut", value: shape16 },
    { name: "Old Miner", value: shape17 },
    { name: "Briolette", value: shape18 },
    { name: "Bullets", value: shape19 },
    { name: "Calf", value: shape20 },
    { name: "Circular Brilliant", value: shape21 },
    { name: "Epaulette", value: shape22 },
    { name: "Flanders", value: shape23 },
    { name: "Half Moon", value: shape24 },
    { name: "Hexagonal", value: shape25 },
    { name: "Kite", value: shape26 },
    { name: "Lozenge", value: shape27 },
    { name: "Octagonal", value: shape28 },
    { name: "Pentagonal", value: shape29 },
    { name: "Rose", value: shape30 },
    { name: "Shield", value: shape31 },
    { name: "Square", value: shape32 },
    { name: "Star", value: shape33 },
    { name: "Tapered Baguette", value: shape34 },
    { name: "Tapered Bullet", value: shape35 },
    { name: "Trapezoid", value: shape36 },
    { name: "Triangular", value: shape37 },
    { name: "Triallant", value: shape38 },
  ];

  return (
    <div className="min-w-[96%] relative pr-4">
      <h3 className="text-xl font-medium lg:pl-4">Shape</h3>
      <div className="shape-filter-container mt-4">
        {shapes.map((shape, index) => (
          <div
            key={index}
            onClick={() => {
              toggle(shape);
            }}
            className={`col-center mb-3`}
          >
            <img
              className={`shape-filter ${
                selectedShape.includes(shape) ? "selected" : "p-2"
              }`}
              src={
                shapesImages.find((item) => item.name === shape)?.value || ""
              }
              alt={
                shapesImages.find((item) => item.name === shape)?.value || ""
              }
            />
            <h6 className="text-[10px] pt-2 font-semibold text-[#666]">{shape}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterShape;
