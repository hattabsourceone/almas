import MultiRangeSlider, { Values } from "@components/shared/MultiRangeSlider";
import React, { useEffect, useRef, useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Excelent from "@assets/BuyingGuide/Cut/excelent.png";
import Good from "@assets/BuyingGuide/Cut/good.png";
import VeryGood from "@assets/BuyingGuide/Cut/very-good.png";
import D from "@assets/BuyingGuide/Color/D.png";
import E from "@assets/BuyingGuide/Color/E.png";
import F from "@assets/BuyingGuide/Color/F.png";
import G from "@assets/BuyingGuide/Color/G.png";
import H from "@assets/BuyingGuide/Color/H.png";
import J from "@assets/BuyingGuide/Color/J.png";
import K from "@assets/BuyingGuide/Color/K1.png";
import I from "@assets/BuyingGuide/Color/I.png";
import SI from "@assets/BuyingGuide/Clarity/si1.png";
import VS from "@assets/BuyingGuide/Clarity/vs1.png";
import VV from "@assets/BuyingGuide/Clarity/vvs1.png";
import FI from "@assets/BuyingGuide/Clarity/fl-1f.png";
type Props = {
  min?: number;
  max: number;
  hintmin?: number;
  hintmax?: number;
  step?: number;
  title: string;
  lable?: string;
  lables?: string[];
  setMin: React.Dispatch<React.SetStateAction<number>>;
  setMax: React.Dispatch<React.SetStateAction<number>>;
  disabled?: boolean;
  range: number | null;
};

const FilterDetails: React.FC<Props> = ({
  step,
  lable,
  lables,
  title,
  min,
  max,
  setMin,
  setMax,
  disabled,
  range,
  hintmin,
  hintmax,
}) => {
  const setValues = ({ min, max }: Values) => {
    setMax(max);
    setMin(min);
  };

  const [isVisible, setIsVisible] = useState(false);
  const [activeCut, setActiveCut] = useState<number>(0);
  const [selectedSection, setSelectedSection] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState("D");
  const [selectedClarity, setSelectedClarity] = useState("FL");
  const colors = [
    {
      label: "D",
      description:
        'Highest, absolutely "colorless" grade, appreciated best set in platinum or white gold. Exceptionally rare.',
    },
    {
      label: "E",
      description:
        "A 'colorless' grade appreciated best set in platinum or white gold. Traces of color difficult for even trained eye to detect.",
    },
    {
      label: "F",
      description: `A "colorless" grade appreciated best set in platinum or white gold. Faint color detectable by a trained gemologist.`,
    },
    {
      label: "G",
      description: `The highest "near-colorless" grade. Color may be detectable when compared to much higher "colorless" grades. Excellent value.`,
    },
    {
      label: "H",
      description: `A "near-colorless" grade, color is only noticeable when compared to much higher color grades. Excellent value.`,
    },
    {
      label: "I",
      description: `Color may be only slightly detectable upon close examination. Exceptional value.`,
    },
    {
      label: "J",
      description: `The last of the "near-colorless" grades, color may be slightly detectable to the unaided eye, particularly in fancy shapes or diamonds over 1-carat.`,
    },
    {
      label: "K",
      description: `The first of the "faint" color grades, meaning color may be detectable to the naked eye. K-color diamonds can offer great value.`,
    },
  ];
  const clarity = [
    {
      label: "FL",
      name: "Flawless",
      description: `No internal or external characteristics. May have external blemishes only.`,
    },
    {
      label: "IF",
      name: "Internally Flawless",
      description:
        "A 'colorless' grade appreciated best set in platinum or white gold. Traces of color difficult for even trained eye to detect.",
    },
    {
      label: "VVS1",
      name: "VVS1-VVS2",
      description: `A "colorless" grade appreciated best set in platinum or white gold. Faint color detectable by a trained gemologist.`,
    },
    {
      label: "VS1",
      name: "VS1-VS2",
      description: `The highest "near-colorless" grade. Color may be detectable when compared to much higher "colorless" grades. Excellent value.`,
    },
    {
      label: "VS2",
      name: "VS1-VS2",
      description: `The highest "near-colorless" grade. Color may be detectable when compared to much higher "colorless" grades. Excellent value.`,
    },
    {
      label: "SI1",
      name: "SI1-SI2",
      description: `Color may be only slightly detectable upon close examination. Exceptional value.`,
    },
    {
      label: "SI2",
      name: "SI1-SI2",
      description: `Color may be only slightly detectable upon close examination. Exceptional value.`,
    },
  ];

  const cutTypesList: string[] = ["Excellent", "Very Good", "Good"];

  const toggleMenu = () => {
    setSelectedSection(title);
    setIsVisible((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-[99%] lg:w-[92%] relative">
      <div className="flex flex-row pb-3 justify-between items-center">
        <h3 className="text-xl font-medium ">{title}</h3>
        {title !== "Price" ? (
          <div className="relative">
            <div
              className="flex flex-row items-center justify-center space-x-2 cursor-pointer"
              onClick={toggleMenu}
            >
              <BsInfoCircleFill className="text-[18px]" />
              <p className="text-[14px] font-bold text-[#201f41]" style={{fontFamily: '"Plain Light", sans-serif'}}>Learn</p>
            </div>
            {isVisible && selectedSection === "Carat" && (
              <div
                ref={menuRef}
                className="absolute -left-20 sm:left-1/2 transform -translate-x-1/2 -mt-48 w-80 p-3 bg-white border rounded-lg shadow-lg z-10"
              >
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-[#444] text-[14px]">
                    Carat(Ct.)
                  </p>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="text-white font-semibold text-[10px] bg-[#201f41] px-1"
                  >
                    X
                  </button>
                </div>
                <p
                  className="mt-2 text-[14px] pb-2 text-[#666]"
                  style={{
                    fontFamily: '"Plain Light", sans-serif',
                    letterSpacing: "1px",
                  }}
                >
                  The international unit of weight, used for measuring diamonds
                  and gemstones. 1 carat is equal to 200 milligrams, or 0.2
                  grams.
                </p>
                <Link
                  to="/buying-guide#4c?carat"
                  className="mt-2 text-[#211F41] font-semibold text-[14px]"
                  style={{
                    fontFamily: '"Plain Light", sans-serif',
                    letterSpacing: "1px",
                  }}
                >
                  Learn More
                </Link>
              </div>
            )}
            {isVisible && selectedSection === "Cut" && (
              <div
                ref={menuRef}
                className="absolute -left-20 sm:left-1/2 transform -translate-x-1/2 -mt-72 w-80 p-4 bg-white border rounded-lg shadow-lg z-10"
              >
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-[#444] text-[14px]">
                    Diamond Cut
                  </p>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="text-white font-semibold text-[10px] bg-[#201f41] px-1"
                  >
                    X
                  </button>
                </div>

                {activeCut === 0 ? (
                  <img className="pt-2" src={Excelent}></img>
                ) : (
                  <></>
                )}
                {activeCut === 1 ? (
                  <img className="pt-2" src={VeryGood}></img>
                ) : (
                  <></>
                )}
                {activeCut === 2 ? (
                  <img className="pt-2" src={Good}></img>
                ) : (
                  <></>
                )}
                <div className="flex space-x-1 py-2">
                  {cutTypesList.map((element, index) => (
                    <p
                      key={index}
                      onClick={() => setActiveCut(index)}
                      className={`text-[13px] border-[0.5px] border-gray-300 px-2 py-3 font-semibold cursor-pointer ${
                        index === activeCut
                          ? "text-white bg-[#201f41]"
                          : "text-[#201f41]"
                      }`}
                    >
                      {element}
                    </p>
                  ))}
                </div>

                {activeCut === 0 ? (
                  <p
                    className="mt-2 text-[14px] pb-2 text-[#666]"
                    style={{
                      fontFamily: '"Plain Light", sans-serif',
                      letterSpacing: "1px",
                    }}
                  >
                    <strong>Excellent Cut:</strong> Highest cut grade. Its
                    proportions produce a beautiful balance of fire and sparkle
                    in a diamond.
                  </p>
                ) : activeCut === 1 ? (
                  <p
                    className="mt-2 text-[14px] pb-2 text-[#666]"
                    style={{
                      fontFamily: '"Plain Light", sans-serif',
                      letterSpacing: "1px",
                    }}
                  >
                    <strong>Very Good cut:</strong> Very slightly less
                    measurable fire of sparkle than an excellent cut diamond, at
                    a more affordable price.
                  </p>
                ) : (
                  <p
                    className="mt-2 text-[14px] pb-2 text-[#666]"
                    style={{
                      fontFamily: '"Plain Light", sans-serif',
                      letterSpacing: "1px",
                    }}
                  >
                    <strong>Good cut:</strong> Quality at a lower price than a
                    very good cut, still producing a beautiful diamond for the
                    budget-minded.
                  </p>
                )}
                <Link
                  to="/buying-guide#4c?cut"
                  className="mt-2 text-[#211F41] font-semibold text-[14px]"
                  style={{
                    fontFamily: '"Plain Light", sans-serif',
                    letterSpacing: "1px",
                  }}
                >
                  Learn More
                </Link>
              </div>
            )}
            {isVisible && selectedSection === "Color" && (
              <div
                ref={menuRef}
                className="absolute -left-20 sm:left-1/2 transform -translate-x-1/2 -mt-80 w-72 p-3 bg-white border rounded-lg shadow-lg z-10"
              >
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-[#444] text-[14px]">
                    Diamond Color
                  </p>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="text-white font-semibold text-[10px] bg-[#201f41] px-1"
                  >
                    X
                  </button>
                </div>

                {selectedColor === "K" ? (
                  <img className="pt-2" src={K}></img>
                ) : (
                  <></>
                )}
                {selectedColor === "J" ? (
                  <img className="pt-2" src={J}></img>
                ) : (
                  <></>
                )}
                {selectedColor === "I" ? (
                  <img className="pt-2" src={I}></img>
                ) : (
                  <></>
                )}
                {selectedColor === "H" ? (
                  <img className="pt-2" src={H}></img>
                ) : (
                  <></>
                )}
                {selectedColor === "G" ? (
                  <img className="pt-2" src={G}></img>
                ) : (
                  <></>
                )}
                {selectedColor === "F" ? (
                  <img className="pt-2" src={F}></img>
                ) : (
                  <></>
                )}
                {selectedColor === "E" ? (
                  <img className="pt-2" src={E}></img>
                ) : (
                  <></>
                )}
                {selectedColor === "D" ? (
                  <img className="pt-2" src={D}></img>
                ) : (
                  <></>
                )}
                <div className="grid grid-cols-4 gap-0 mt-2 border-b">
                  {colors.map((color) => (
                    <button
                      key={color.label}
                      onClick={() => setSelectedColor(color.label)}
                      className={`h-[50px] w-[60px] text-center border-[1px] border-slate-300 text-[13px] font-semibold ${
                        selectedColor === color.label
                          ? "bg-[#211F41] text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {color.label}
                    </button>
                  ))}
                </div>

                <p
                  className="mt-2 text-[14px] pb-2 text-[#666]"
                  style={{
                    fontFamily: '"Plain Light", sans-serif',
                    letterSpacing: "1px",
                  }}
                >
                  <strong>{selectedColor} color:</strong>{" "}
                  {
                    colors.find((color) => color.label === selectedColor)!
                      .description
                  }
                </p>
                <Link
                  to="/buying-guide#4c?color"
                  className="mt-2 text-[#211F41] font-semibold text-[14px]"
                  style={{
                    fontFamily: '"Plain Light", sans-serif',
                    letterSpacing: "1px",
                  }}
                >
                  Learn More
                </Link>
              </div>
            )}
            {isVisible && selectedSection === "Clarity" && (
              <div
                ref={menuRef}
                className="absolute -left-20 sm:left-1/2 transform -translate-x-1/2 -mt-96 w-80 p-3 bg-white border rounded-lg shadow-lg z-10"
              >
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-[#444] text-[14px]">
                    Diamond Clarity
                  </p>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="text-white font-semibold text-[10px] bg-[#201f41] px-1"
                  >
                    X
                  </button>
                </div>
                {selectedClarity === "SI1" || selectedClarity === "SI2" ? (
                  <img className="pt-2" src={SI}></img>
                ) : (
                  <></>
                )}
                {selectedClarity === "VS1" || selectedClarity === "VS2" ? (
                  <img className="pt-2" src={VS}></img>
                ) : (
                  <></>
                )}
                {selectedClarity === "VVS1" ? (
                  <img className="pt-2" src={VV}></img>
                ) : (
                  <></>
                )}
                {selectedClarity === "IF" || selectedClarity === "FL" ? (
                  <img className="pt-2" src={FI}></img>
                ) : (
                  <></>
                )}
                <div className="grid grid-cols-4 gap-0 mt-2 border-b">
                  {clarity.map((clarity) => (
                    <button
                      key={clarity.label}
                      onClick={() => setSelectedClarity(clarity.label)}
                      className={`h-[50px] w-[60px] text-center border-[1px] border-slate-300 text-[13px] font-semibold ${
                        selectedClarity === clarity.label
                          ? "bg-[#211F41] text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {clarity.label}
                    </button>
                  ))}
                </div>
                <p
                  className="mt-2 text-[14px] pb-2 text-[#666] pt-1"
                  style={{
                    fontFamily: '"Plain Light", sans-serif',
                    letterSpacing: "1px",
                  }}
                >
                  <strong>
                    {clarity.find((e) => e.label === selectedClarity)?.name}:
                  </strong>
                  {
                    clarity.find(
                      (clarity) => clarity.label === selectedClarity
                    )!.description
                  }
                </p>
                <Link
                  to="/buying-guide#4c?clarity"
                  className="mt-2 text-[#211F41] font-semibold text-[14px]"
                  style={{
                    fontFamily: '"Plain Light", sans-serif',
                    letterSpacing: "1px",
                  }}
                >
                  Learn More
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <MultiRangeSlider
        lable={lable}
        lables={lables}
        min={min || 0}
        max={max}
        step={step || 1}
        onChange={setValues}
        disabled={disabled}
        defaultRange={range}
        title={title}
        hintmin={hintmin}
        hintmax={hintmax}
      />
    </div>
  );
};

export default FilterDetails;
