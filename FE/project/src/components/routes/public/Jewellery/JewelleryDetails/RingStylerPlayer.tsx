import React, { useRef, useState } from "react";
import RingPart from "@assets/Jewellery/ring-part.png";
import FullHand from "@assets/Jewellery/full-hand.png";
import Round from "@assets/Jewellery/round.png";
import Princess from "@assets/Jewellery/princess.png";
import Emerald from "@assets/Jewellery/emerald.png";
import Radiant from "@assets/Jewellery/radiant.png";
import Oval from "@assets/Jewellery/oval.png";
import Cushion from "@assets/Jewellery/cushion.png";
import diamondData from "@components/shared/ringSizes";
type props = {
  showVitrualStyler: boolean;
  setshowVitrualStyler: React.Dispatch<React.SetStateAction<boolean>>;
};

const RingStylerPlayer: React.FC<props> = ({
  showVitrualStyler,
  setshowVitrualStyler,
}) => {
  const [caratSize, setCaratSize] = useState(0.18);
  const [ringSize, setRingSize] = useState(39.16);
  const [newSize, setnewSize] = useState(3.65);
  const diamondShape = useRef("Round");
  const [diamondImage, setDiamondImage] = useState(Round);
  const [showShapes, setshowShapes] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const maxMm = useRef(9.32);
  const leftMarging = useRef(38);

  const vals = diamondData.map((item) => item.caratWeight);

  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement> | undefined
  ) => {
    let newSize: number;
    if (e != undefined) {
      newSize = vals[Number(parseFloat(e.target.value))];
      setCaratSize(newSize);
      leftMarging.current =
        38 + Number(Number(parseFloat(e.target.value)) * 7.9);
    }
    const mmSize =
      diamondData.find((item) => item.caratWeight === (newSize ?? caratSize))
        ?.shapes[diamondShape.current] || 0;
    const scaledRingSize = (mmSize / maxMm.current) * 100;
    setnewSize(mmSize);
    setRingSize(scaledRingSize);
  };

  const handleShapeChange = (shape: string) => {
    diamondShape.current = shape;
    if (shape === "Round") {
      maxMm.current = 9.32;
      setDiamondImage(Round);
    } else if (shape === "Princess") {
      maxMm.current = 7.98;
      setDiamondImage(Princess);
    } else if (shape === "Emerald") {
      maxMm.current = 6.69;
      setDiamondImage(Emerald);
    } else if (shape === "Radiant") {
      maxMm.current = 7.54;
      setDiamondImage(Radiant);
    } else if (shape === "Oval") {
      maxMm.current = 7.94;
      setDiamondImage(Oval);
    } else {
      maxMm.current = 7.58;
      setDiamondImage(Cushion);
    }
    handleSliderChange(undefined);
  };

  function getShapeFraction() {
    if (diamondShape.current === "Round") {
      return 2.87;
    } else if (diamondShape.current === "Princess") {
      return 3.44;
    } else if (diamondShape.current === "Emerald") {
      return 4.13;
    } else if (diamondShape.current === "Radiant") {
      return 3.62;
    } else if (diamondShape.current === "Oval") {
      return 3.5;
    } else {
      return 3.7;
    }
  }

  return (
    showVitrualStyler && (
      <div
        className="flex flex-col items-start justify-center p-4 bg-black bg-opacity-50 h-full w-full fixed inset-0 z-50"
        style={{ fontFamily: '"Open Sans", sans-serif' }}
      >
        <div className="flex flex-col my-auto ml-4 lg:ml-40 mt-48 items-center p-2 bg-white w-[90%] sm:w-[95%] md:w-[90%] lg:w-[70%] xl:w-[55%] 2xl:w-[40%] rounded-md shadow-lg overflow-y-auto">
          <div className="flex flex-row items-center justify-between w-full mb-3">
            <button
              type="button"
              className="opacity-0 bg-[#666] rounded-lg items-center justify-center"
            ></button>
            <h1
              className="text-[25px] text-[#201f41] font-bold text-center"
              style={{ fontFamily: '"Open Sans"' }}
            >
              Virtual Ring Styler
            </h1>
            <button
              type="button"
              onClick={() => {
                setCaratSize(0.18);
                setshowVitrualStyler(false);
              }}
              className="bg-[#211f41] opacity-20 rounded-lg flex items-center justify-center py-0 h-8 px-[5px]"
            >
              <p
                aria-hidden="true"
                className="text-[34px] text-white font-bold"
                style={{ fontFamily: '"Plain Light", sans-serif' }}
              >
                x
              </p>
            </button>
          </div>
          <div className="border-b border-slate-300 w-full my-4"></div>
          <div className="flex flex-col lg:flex-row w-full space-x-0 lg:space-x-8">
            <div className="flex flex-col w-full lg:max-w-[23%] items-end">
              <div className="flex flex-col items-start w-[95%] lg:w-[70%]">
                <div className="border-t border-slate-300 w-full pt-2 mb-1"></div>
                <div
                  onClick={() => setshowShapes(!showShapes)}
                  className="text-[14px] font-normal mb-3 cursor-pointer text-[#000]"
                >
                  Diamond shape
                </div>
                {showShapes && (
                  <ul className="smart-collapse-in flex flex-col items-start w-[60%]">
                    <li onClick={() => handleShapeChange("Round")}>
                      <a>Round</a>
                    </li>
                    <li onClick={() => handleShapeChange("Princess")}>
                      <a>Princess</a>
                    </li>
                    <li onClick={() => handleShapeChange("Emerald")}>
                      <a>Emerald</a>
                    </li>
                    <li onClick={() => handleShapeChange("Radiant")}>
                      <a>Radiant</a>
                    </li>
                    <li onClick={() => handleShapeChange("Oval")}>
                      <a>Oval</a>
                    </li>
                    <li onClick={() => handleShapeChange("Cushion")}>
                      <a>Cushion</a>
                    </li>
                  </ul>
                )}
                <div className="border-t border-slate-300 w-full pt-2 mb-1"></div>
                <div className="text-[14px] font-medium mb-3">Carat Sizer</div>
                <div className="border-t border-slate-300 w-full pt-2 mb-1"></div>
                <div className="flex flex-col relative">
                  <div className="flex flex-row justify-between text-[8px] absolute w-full pt-3">
                    <p>0</p>
                    <p>10</p>
                    <p>20</p>
                  </div>
                  <div className="ruler -small relative" style={{ zoom: 1.05 }}>
                    <div
                      className="flex justify-start items-start border-r-[1px] border-b-[1px] border-l-[1px] border-black border-opacity-55 pt-2 h-[75px]"
                      style={{
                        position: "relative",
                        display: "inline-block",
                        top: "30%",
                        fontSize: "12px",
                        letterSpacing: "0.3px",
                        width: `${newSize * 3.98}px`
                      }}
                    >
                      <img
                        src={diamondImage}
                        id="dimandimgchngeside"
                        alt="Round"
                        className="my-[12px]"
                      />
                    </div>
                  </div>
                  <span
                    className="text-[14px] text-[#666] mt-2"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {newSize.toFixed(2)} MM
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[95%] lg:w-[80%] flex flex-col items-center">
              <div className="relative w-full">
                <div className="absolute w-full bg-black h-full opacity-10"></div>
                <img
                  src={FullHand}
                  alt="Hand Style"
                  className="w-full h-auto"
                />
                <div className="absolute flex items-center justify-center -rotate-[33deg] mt-[60%] left-[22.5%] w-[15.5%] sm:w-[15.6%] h-8 md:w-[15.5%] lg:w-[15.8%] xl:w-[15.9%] 2xl:w-[15.7%] md:h-10">
                  <img
                    src={RingPart}
                    alt="Ring part"
                    className="absolute w-full h-full"
                  />
                  <img
                    src={diamondImage}
                    className={`z-10 ${
                      ["Round", "Cushion", "Princess"].includes(
                        diamondShape.current
                      )
                        ? "mt-1"
                        : "Radiant" === diamondShape.current
                        ? "mt-1"
                        : "mt-1"
                    }`}
                    style={{
                      /* transform: `scale(${ringSize / 210})`, */
                      width: `${ringSize / getShapeFraction()}px`,
                    }}
                  />
                </div>
              </div>
              <div
                className="mt-6 w-full flex items-center text-sm relative"
                style={{ fontFamily: '"Plain Light", sans-serif' }}
              >
                {isEditing && (
                  <p
                    style={{ marginLeft: `${leftMarging.current}px` }}
                    className={`p-[5px] px-2 rounded-lg text-[13px] bg-[#201f41] text-white absolute transform -translate-y-10`}
                  >
                    {caratSize?.toFixed(2)}
                  </p>
                )}
                <div className="flex flex-row items-center">
                  <p className="text-[13px] text-[#333333] font-bold">0.18ct</p>
                </div>
                <div className="relative w-full flex flex-row items-center">
                  <input
                    type="range"
                    min="0"
                    max="51"
                    step={1}
                    list="tickmarks"
                    //value={caratSize}
                    defaultValue={0}
                    onMouseDown={() => setIsEditing(true)}
                    onMouseUp={() => setIsEditing(false)}
                    onTouchStart={() => setIsEditing(true)}
                    onTouchEnd={() => setIsEditing(false)}
                    onChange={handleSliderChange}
                    className="w-full mx-2 appearance-none h-[10px] bg-[#d0d0d0] rounded-lg"
                  />
                  <div className="absolute top-0 left-1 w-[94%] h-full flex pointer-events-none">
                    {[0.25, 0.3, 0.5, 0.76, 1.0, 1.3, 1.55, 1.8, 2.1].map(
                      (value, index, array) => {
                        const totalSpacing = array.length - 1;
                        const adjustedLeft =
                          ((index + 1) / (totalSpacing + 2)) * 100;
                        return (
                          <div
                            key={index}
                            className="h-full w-[2px] bg-slate-400 absolute"
                            style={{
                              left: `${adjustedLeft}%`,
                            }}
                          >
                            <span className="w-1 mt-6">
                              <p className="text-[13px] text-[#333333] font-bold">
                                {Number(value).toFixed(2)}
                              </p>
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <style>{`
                  input[type="range"]::-webkit-slider-thumb {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #201f41;
                    cursor: pointer;
                    z-index: 9999;
                    position: relative; 
                  }
                  input[type="range"]::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    border: 2px solid #201f41;
                  }
                `}</style>

                <div className="flex flex-row items-center">
                  <p className="text-[13px] text-[#333333] font-semibold">
                    3.00ct
                  </p>
                </div>
              </div>

              <div
                className="mt-14 text-[12px] w-[60%] text-[#888] font-medium text-center"
                style={{ fontFamily: "Nunito Sans" }}
              >
                Shown with a sample Delicacy White Gold ring, <br />
                set with a{" "}
                <span className="text-sm text-black">
                  {" '"}
                  {caratSize?.toFixed(2)}
                  {"' "}
                </span>
                ct {diamondShape.current} diamond.
              </div>
              <div className="w-full">
                {/* <StylerSingleSlider lables={['0.25', '0.30', '0.50', '0.70', '1.00', '1.25', '1.50', '1.75', '2.00']} min={0.18} max={3.00} step={0.01} onChange={function (index: number): void {
              } } /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default RingStylerPlayer;
