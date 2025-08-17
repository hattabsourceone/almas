import React, { useEffect, useState } from "react";
import CharacteristicsBuyingGuide from "./CharacteristicsBuyingGuide";
import Fair from "@assets/BuyingGuide/Cut/fair.png";
import Excelent from "@assets/BuyingGuide/Cut/excelent.png";
import Good from "@assets/BuyingGuide/Cut/good.png";
import VeryGood from "@assets/BuyingGuide/Cut/very-good.png";
import Carat from "@assets/BuyingGuide/Carat/carat_img.png";
import LZ from "@assets/BuyingGuide/Color/L-Z.png";
import D from "@assets/BuyingGuide/Color/D.png";
import E from "@assets/BuyingGuide/Color/E.png";
import F from "@assets/BuyingGuide/Color/F.png";
import G from "@assets/BuyingGuide/Color/G.png";
import H from "@assets/BuyingGuide/Color/H.png";
import J from "@assets/BuyingGuide/Color/J.png";
import K1 from "@assets/BuyingGuide/Color/K1.png";
import I2 from "@assets/BuyingGuide/Clarity/i2-i3.png";
import I1 from "@assets/BuyingGuide/Clarity/i1.png";
import SI from "@assets/BuyingGuide/Clarity/si1.png";
import VS from "@assets/BuyingGuide/Clarity/vs1.png";
import VV from "@assets/BuyingGuide/Clarity/vvs1.png";
import FI from "@assets/BuyingGuide/Clarity/fl-1f.png";
import SingleRangeSlider from "@components/shared/SingleRangeSlider";
import { Link, useLocation } from "react-router-dom";

const The4: React.FC = () => {
  const [selected, setSelected] = React.useState("Cut");
  const cutlables = ["Fair Cut", "Good Cut", "Very Good Cut", "Excellent Cut"];
  const colors = ["L-Z", "K", "J", "I", "H", "G", "F", "E", "D"];
  const clarity = ["I2-I3", "I1", "SI1-2", "VS1-2", "VVS1-2", "IF-FL"];
  const [minCut, setMinCut] = useState<number>(0);
  const [maxCut, setMaxCut] = useState<number>(3);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [firstParagraph, setFirstParagraph] = useState("");
  const location = useLocation();
  const { hash } = location;

  useEffect(() => {
    const [section, key] = hash.substring(1).split("?");

    if (section) {
      const [section, key] = hash.substring(1).split("?");
      if (key) {
        if (key.toLowerCase() === "cut") {
          setSelected("Cut");
          setSelectedIndex(3);
        } else if (key.toLowerCase() === "color") {
          setSelected("Color");
          setSelectedIndex(8);
        } else if (key.toLowerCase() === "clarity") {
          setSelected("Clarity");
          setSelectedIndex(5);
        } else if (key.toLowerCase() === "carat") {
          setSelected("Carat");
        }
      }
    }
  }, [hash]);

  const splitParagraph = firstParagraph.split("\n");

  useEffect(() => {
    if (selected === "Cut") {
      setSelectedIndex(3);
    } else if (selected === "Color") {
      setSelectedIndex(8);
    } else if (selected === "Clarity") {
      setSelectedIndex(5);
    }

    // New functionality to update the first paragraph
    switch (selected) {
      case "Cut":
        setFirstParagraph(
          "The cut of a diamond not only refers to the diamond’s shape, it also refers to how effectively the diamond returns light back to the viewer’s eye. A well-cut diamond will appear very brilliant and fiery, while a poorly cut diamond can appear dark and lifeless, regardless of its color or clarity.\n Not only do well-cut diamonds appear more brilliant, they also tend to appear larger than other diamonds of the same carat weight. An 'ideal' diamond has both increased brilliance and diameter relative to more deeply-cut diamonds.\n Understanding Brilliance, Dispersion & Scintillation\n A well-cut diamond exhibits three different properties: brilliance, dispersion, and scintillation. As light strikes a diamond's surface, it will either reflect off the table of a polished stone or enter the diamond. The light that is reflected off the diamond is known as the diamond's brilliance. As light travels through a diamond, some of the light rays are separated into flashes of color. This is known as dispersion. The result of dispersion—the separation of white light into its spectral colors— is known as fire. Scintillation is flashes of color that are viewable as an observer moves a diamond back and forth."
        );
        break;
      case "Carat":
        setFirstParagraph(
          "Diamond Size and Carat Weight: The size of a diamond is proportional to its carat weight. When rough diamonds are cut and polished into finished diamonds, up to 65% of the total carat weight may be lost.\n Since larger rough gems of high quality are found less frequently than smaller rough gems of high quality, a single two carat diamond will be more expensive than two one-carat diamonds of the same quality.\n Diamond carat is often misunderstood and refers to a diamond's weight, not necessarily its size.\n When comparing diamond carat sizes, take a diamond's cut into consideration as well:\n a high-carat diamond with a poor cut grade may look smaller, often cut deeper, than a diamond with smaller carat weight and a better cut.\n Use our buying tips, diamond carat size chart, and expert tips to help you choose the best diamond carat weight for you. Which Carat Weight Is Right For You? It is a choice that depends on personal preference and budget.\n When looking at a diamond engagement ring, what is most visible is the size of the surface area on the top of the diamond.\n It is difficult to measure a diamond’s carat weight simply by looking at it.\n Although carat weight influences cost quite a bit, it is advisable to focus on diamond cut and diameter."
        );
        break;
      case "Clarity":
        setFirstParagraph(
          "Diamond clarity is the assessment of small imperfections on the surface and internally.\nThe surface flaws are called blemishes, and internal defects are known as inclusions.\nThese tiny, natural blemishes and inclusions are microscopic and do not affect a diamond’s beauty in any way.\nDiamonds with the least and smallest inclusions receive the highest clarity grades.\nClarity is one of the 4Cs of diamond grading and quality.\nDiamond clarity is the least important factor when choosing to buy a diamond because most diamonds have blemishes and small inclusions that are microscopic, unable to be seen with an untrained or unaided eye.\nIt is also a good idea to balance the clarity grade of your diamond with the color.\nYou may compromise a little on the clarity in exchange for choosing a better color grade."
        );

        break;
      case "Color":
        setFirstParagraph(
          "Diamond color is graded on a scale from D-Z and is divided into five broad categories (colorless, near colorless, faint, very light, and light).\nDiamonds come in all colors of the spectrum.\nThe predominant color you see in a diamond is yellow, which is caused by the trace element nitrogen.\nAs you can see from the Grading Scale images below, when diamonds are in the face-up position it is almost impossible to see any color.\nWhen viewing the diamond from the side profile, you may start to detect some color; however, diamonds are admired for their beauty from the face-up position and not the side."
        );

        break;
      default:
        setFirstParagraph("");
    }
  }, [selected]);

  return (
    <div className="w-[96%] md:w-[95%] lg:w-[93%] xl:w-[90%] 2xl:w-[81%] mx-auto mb-12">
      <div className="flex flex-col items-start justify-center mx-auto  md:py-[40px] 2xl:pb-[0px]  ">
        <div>
          {" "}
          <h2 className=" text-[45px] font-plain-light text-[#201f41] leading-[1.1] mb-[40px] txt-transform text-left lg:mr-4 md">
            The 4Cs: Color, Clarity, Cut and Carat Weight
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row justify-between space-x-2 space-y-8 lg:space-y-0">
          <div className="w-full lg:w-[50%] mx-auto px-[15px] 2xl:w-[50%]">
            <h2 className="text-start text-[47px] font-plain-light uppercase mb-[40px] sm:mb-[15px] md:mb-[40px] text-[#201f41]">
              {selected}
            </h2>
            <p
              style={{ textShadow: "0px 0px 0px #000" }}
              className="relative 2xl-w-[555px] z-[11] text-left text-[#53556b] text-shadow-default font-semibold sm:font-light text-[16px]  mb-[10px] lg:mb-[20px]  whitespace-pre-line line-spacing"
            >
              {splitParagraph.map((line, index) => (
                <p
                  key={index}
                  className="mb-[10px]  md:mb-[20px] 2xl:mb-[10px] leading-[25px] md:leading-[30px]"
                >
                  {line}
                </p>
              ))}
            </p>
            <CharacteristicsBuyingGuide
              selected={selected}
              setSelected={setSelected}
            />
          </div>
          <div className="w-full lg:w-[50%] mx-auto px-[15px] 2xl:w-[50%] lg:pt-[60px]">
            {selected === "Cut" ? (
              <div className="w-full lg:w-[50%] mx-auto px-[15px] 2xl:w-[30%] lg:pt-[60px] 2xl:pt-[30px]">
                <h1 className="text-start uppercase  sm:text-[18px] md:text-[30px] font-plain-light pb-2 text-[#201F41]">
                  Grading Scale
                </h1>
                <p className="text-justify text-base font-normal">
                  Use the slider to see cut grade details or view the Cut Grade
                  Chart below.
                </p>
                {selectedIndex === 0 ? (
                  <img className="pt-10" src={Fair}></img>
                ) : (
                  <></>
                )}
                {selectedIndex === 1 ? (
                  <img className="pt-10" src={Good}></img>
                ) : (
                  <></>
                )}
                {selectedIndex === 2 ? (
                  <img className="pt-10" src={VeryGood}></img>
                ) : (
                  <></>
                )}
                {selectedIndex === 3 ? (
                  <img className="pt-10" src={Excelent}></img>
                ) : (
                  <></>
                )}
                <SingleRangeSlider
                  lables={cutlables}
                  min={0}
                  max={3}
                  step={1}
                  onChange={setSelectedIndex}
                />
                {selectedIndex === 0 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      Fair Cut
                    </h1>
                    <p className="text-justify text-[#53556b] pb-[10px]">
                      Represents roughly 35% of diamond cut quality. These
                      diamonds tend to appear dull or glassy.
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                {selectedIndex === 1 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      Good Cut
                    </h1>
                    <p className="text-justify text-[#53556b] pb-[10px]">
                      This cut represents roughly the top 25% of diamond cut
                      quality. It reflects most light that enters, but not as
                      much as a Very Good cut grade.
                    </p>
                    <Link
                      to={"/search-inventory/all-diamond??page=1&carat=0.3;3&price=480;35140&clarity=0;7&cut=0;0&certificate=false&color=0;7&shape="}
                      className="text-justify sm:text-[14px] text-[#201F41] hover:text-[#273c79bd]  font-bold  sm:tracking-[1px]"
                    >
                      Shop Good Cut Diamonds &gt;
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
                {selectedIndex === 2 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      Very Good Cut
                    </h1>
                    <p className="text-justify text-[#53556b] pb-[10px]">
                      This cut represents roughly the top 15% of diamond cut
                      quality. It reflects nearly as much light as the ideal
                      cut, but for a lower price.
                    </p>
                    <Link
                      to={"/search-inventory/all-diamond??page=1&carat=0.3;3&price=480;35140&clarity=0;7&cut=1;1&certificate=false&color=0;7&shape="}
                      className="text-justify sm:text-[14px] text-[#201F41] hover:text-[#273c79bd]  font-bold  sm:tracking-[1px]"
                    >
                      Shop Very Good Cut Diamonds &gt;
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
                {selectedIndex === 3 ? (
                  <div className="flex flex-col">
                    <h3 className="text-start uppercase  text-2xl font-medium mt-5 mb-[10px] text-[#201F41]">
                      Excellent Cut
                    </h3>
                    <p className="text-justify text-[16px] leading-[30px] mb-[20px] text-[#53556b] pb-[10px] ">
                      This rare cut represents roughly the top 3% of diamond cut
                      quality. It reflects most light that enters the diamond.
                    </p>
                    <Link
                      to={"/search-inventory/all-diamond??page=1&carat=0.3;3&price=480;35140&clarity=0;7&cut=2;2&certificate=false&color=0;7&shape="}
                      className="text-justify sm:text-[14px] text-[#201F41] hover:text-[#273c79bd]  font-bold  sm:tracking-[1px]"
                    >
                      Shop Excelent Cut Diamonds &gt;
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : selected === "Color" ? (
              <div className="w-full lg:w-[46%] mx-auto p-2">
                <h1 className="text-start uppercase sm:text-[20px] font-medium pb-2 text-[#201F41]">
                  Grading Scale
                </h1>
                <p className="text-justify">
                  Use the slider to view color grade details.
                </p>
                {selectedIndex === 0 ? (
                  <img className="pt-10" src={LZ}></img>
                ) : (
                  <></>
                )}
                {selectedIndex === 1 ? (
                  <img className="pt-10" src={K1}></img>
                ) : (
                  <></>
                )}
                {selectedIndex === 2 ? (
                  <img className="pt-10" src={J}></img>
                ) : (
                  <></>
                )}
                {selectedIndex === 3 ? (
                  <img className="pt-10" src={J}></img>
                ) : (
                  <></>
                )}
                {selectedIndex === 4 ? (
                  <img className="pt-10" src={H}></img>
                ) : (
                  <></>
                )}
                {selectedIndex === 5 ? (
                  <img className="pt-10" src={G}></img>
                ) : (
                  <></>
                )}
                {selectedIndex === 6 ? (
                  <img className="pt-10" src={F}></img>
                ) : (
                  <></>
                )}
                {selectedIndex === 7 ? (
                  <img className="pt-10" src={E}></img>
                ) : (
                  <></>
                )}
                {selectedIndex === 8 ? (
                  <img className="pt-10" src={D}></img>
                ) : (
                  <></>
                )}
                <SingleRangeSlider
                  lables={colors}
                  min={0}
                  max={8}
                  step={1}
                  onChange={setSelectedIndex}
                />
                {selectedIndex === 0 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      L-Z Colour Diamonds (Faint to Light Colour
                    </h1>
                    <p className="text-justify text-[16px] leading-[30px] mb-[20px] text-[#53556b] pb-[10px] ">
                      From L colour diamonds on, a warm tint is visible to the
                      naked eye. L colour diamonds are usually half the price of
                      G colour diamonds. Blue Nile does not carry L-Z colour
                      diamonds.
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                {selectedIndex === 1 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      K Colour Diamond (Faint)
                    </h1>
                    <p className="text-justify text-[16px] leading-[30px] mb-[20px] text-[#53556b] pb-[10px] ">
                      A great value, K colour diamonds provide a great value as
                      you look into larger carat weights. Their faint colour is
                      hard to differentiate even compared side by side to J
                      colour diamonds.
                    </p>
                    <Link
                      to={"/search-inventory/all-diamond??page=1&carat=0.3;3&price=480;35140&clarity=0;7&cut=0;2&certificate=false&color=0;0&shape="}
                      className="text-justify sm:text-[14px] text-[#201F41] hover:text-[#273c79bd]  font-bold  sm:tracking-[1px]"
                    >
                      See K Graded Diamonds &gt;
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
                {selectedIndex === 2 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      J Colour Diamond (Near Colourless)
                    </h1>
                    <p className="text-justify text-[16px] leading-[30px] mb-[20px] text-[#53556b] pb-[10px] ">
                      A good value, the naked eye can’t easily detect the light
                      yellow tone unless compared side-by-side with diamonds of
                      I grades or higher. J colour grade diamonds pair well with
                      yellow gold ring settings. Eight percent of customers
                      choose a J colour diamond.
                    </p>
                    <Link
                      to={"/search-inventory/all-diamond??page=1&carat=0.3;3&price=480;35140&clarity=0;7&cut=0;2&certificate=false&color=1;1&shape="}
                      className="text-justify sm:text-[14px] text-[#201F41] hover:text-[#273c79bd]  font-bold  sm:tracking-[1px]"
                    >
                      See J Graded Diamonds &gt;
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
                {selectedIndex === 3 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      I Colour Diamond (Near Colourless)
                    </h1>
                    <p className="text-justify text-[16px] leading-[30px] mb-[20px] text-[#53556b] pb-[10px] ">
                      Still a great value, the slight yellow tint of I colour
                      diamonds are only detected when compared side-by-side with
                      diamonds of H grades or higher. This colour grade also
                      pairs well with yellow gold. Fifteen percent of customers
                      choose an I colour diamond.
                    </p>
                    <Link
                      to={"/search-inventory/all-diamond??page=1&carat=0.3;3&price=480;35140&clarity=0;7&cut=0;2&certificate=false&color=2;2&shape="}
                      className="text-justify sm:text-[14px] text-[#201F41] hover:text-[#273c79bd]  font-bold  sm:tracking-[1px]"
                    >
                      See I Graded Diamonds &gt;
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
                {selectedIndex === 4 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      H Colour Diamond (Near Colourless)
                    </h1>
                    <p className="text-justify text-[16px] leading-[30px] mb-[20px] text-[#53556b] pb-[10px] ">
                      H colour diamonds are an excellent value with a faint
                      yellow hue that is difficult to detect unless compared
                      side by side with other diamonds of a higher colour grade.
                      Typically, only a trained eye can see the difference
                      between H and G colour grades. Fifteen percent of
                      customers choose an H colour diamond.
                    </p>
                    <Link
                      to={"/search-inventory/all-diamond??page=1&carat=0.3;3&price=480;35140&clarity=0;7&cut=0;2&certificate=false&color=3;3&shape="}
                      className="text-justify sm:text-[14px] text-[#201F41] hover:text-[#273c79bd]  font-bold  sm:tracking-[1px]"
                    >
                      See H Graded Diamonds &gt;
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
                {selectedIndex === 5 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      G Colour Diamond (Near Colourless)
                    </h1>
                    <p className="text-justify text-[16px] leading-[30px] mb-[20px] text-[#53556b] pb-[10px] ">
                      G colour diamonds have a very slight warmth to their tone
                      that is difficult to detect unless compared side by side
                      with diamonds of better grades. G will face up bright and
                      white. Eighteen percent of customers choose a G colour
                      diamond.
                    </p>
                    <Link
                      to={"/search-inventory/all-diamond??page=1&carat=0.3;3&price=480;35140&clarity=0;7&cut=0;2&certificate=false&color=4;4&shape="}
                      className="text-justify sm:text-[14px] text-[#201F41] hover:text-[#273c79bd]  font-bold  sm:tracking-[1px]"
                    >
                      See G Graded Diamonds &gt;
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
                {selectedIndex === 6 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      F Colour Diamond (Colourless)
                    </h1>
                    <p className="text-justify text-[16px] leading-[30px] mb-[20px] text-[#53556b] pb-[10px] ">
                      Only a gemmologist can detect the minute colour
                      differences between E, F, and D colour diamonds. F colour
                      diamonds are comparable to D or E colour diamonds. The
                      whitest of white diamonds, D-F colour diamonds, pair well
                      with white gold or platinum settings. Twenty percent of
                      customers choose an F colour diamond.
                    </p>
                    <Link
                      to={"/search-inventory/all-diamond??page=1&carat=0.3;3&price=480;35140&clarity=0;7&cut=0;2&certificate=false&color=5;5&shape="}
                      className="text-justify sm:text-[14px] text-[#201F41] hover:text-[#273c79bd]  font-bold  sm:tracking-[1px]"
                    >
                      See F Graded Diamonds &gt;
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
                {selectedIndex === 7 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      E Colour Diamond (Colourless)
                    </h1>
                    <p className="text-justify text-[16px] leading-[30px] mb-[20px] text-[#53556b] pb-[10px] ">
                      Like D colour diamonds, E colour diamonds are quite rare.
                      The minute variance between E colour and D colour is
                      virtually undetectable to an untrained eye. And even then,
                      the difference can only be seen with a side-by-side
                      comparison of loose stones. Sixteen percent of customers
                      choose an E colour diamond.
                    </p>
                    <Link
                      to={"/search-inventory/all-diamond??page=1&carat=0.3;3&price=480;35140&clarity=0;7&cut=0;2&certificate=false&color=6;6&shape="}
                      className="text-justify sm:text-[14px] text-[#201F41] hover:text-[#273c79bd]  font-bold  sm:tracking-[1px]"
                    >
                      See E Graded Diamonds &gt;
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
                {selectedIndex === 8 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      D Colour Diamonds (Absolutely Colourless)
                    </h1>
                    <p className="text-justify text-[16px] leading-[30px] mb-[20px] text-[#53556b] pb-[10px] ">
                      D colour diamond is the highest grade and is extremely
                      rare—the highest colour grade that money can buy. Eight
                      percent of customers choose a D colour diamond.
                    </p>
                    <Link
                      to={"/search-inventory/all-diamond??page=1&carat=0.3;3&price=480;35140&clarity=0;7&cut=0;2&certificate=false&color=7;7&shape="}
                      className="text-justify sm:text-[14px] text-[#201F41] hover:text-[#273c79bd]  font-bold  sm:tracking-[1px]"
                    >
                      See D Graded Diamonds &gt;
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : selected === "Carat" ? (
              <div className="w-full lg:w-[46%] mx-auto p-2">
                <img className="pt-10" src={Carat} />
                <p className="text-justify text-[16px] leading-[30px] text-[#53556b] pb-2">
                  Keep in mind, diamond prices increase exponentially with carat
                  weight because the larger the carat, the more rare the
                  diamond.
                </p>
                <Link
                  to="/search-inventory/all-diamond"
                  className="text-justify sm:text-[14px] text-[#201F41] hover:text-[#273c79bd]  font-bold  sm:tracking-[1px]"
                >
                  Shop Diamonds &gt;
                </Link>
              </div>
            ) : (
              <div className="w-full lg:w-[46%] mx-auto p-2">
                <h1 className="text-start uppercase md:text-[30px] font-medium py-4 text-[#201F41]">
                  Grading Scale
                </h1>
                <p className="text-justify">
                  Use the slider to see cut grade details or view the Cut Grade
                  Chart below.
                </p>
                {selectedIndex === 0 ? (
                  <img className="pt-10" src={I2}></img>
                ) : (
                  <></>
                )}
                {selectedIndex === 1 ? (
                  <img className="pt-10" src={I1}></img>
                ) : (
                  <></>
                )}
                {selectedIndex === 2 ? (
                  <img className="pt-10" src={SI}></img>
                ) : (
                  <></>
                )}
                {selectedIndex === 3 ? (
                  <img className="pt-10" src={VS}></img>
                ) : (
                  <></>
                )}
                {selectedIndex === 4 ? (
                  <img className="pt-10" src={VV}></img>
                ) : (
                  <></>
                )}
                {selectedIndex === 5 ? (
                  <img className="pt-10" src={FI}></img>
                ) : (
                  <></>
                )}
                <SingleRangeSlider
                  lables={clarity}
                  min={0}
                  max={5}
                  step={1}
                  onChange={setSelectedIndex}
                />
                {selectedIndex === 0 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      I2, I3 Heavily Included Diamonds
                    </h1>
                    <p className="text-justify text-[16px] leading-[30px] mb-[20px] text-[#53556b] pb-[10px] ">
                      I2 and I3 diamonds may have more obvious inclusions at 10x
                      and may be visible to the naked eye. Almas-Online does not
                      carry I2 or I3 diamonds.
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                {selectedIndex === 1 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      I1 Included Diamonds
                    </h1>
                    <p className="text-justify text-[16px] leading-[30px] mb-[20px] text-[#53556b] pb-[10px] ">
                      I1 diamonds have minor inclusions that may be visible to
                      the naked eye. Almas-Online offers a limited selection of
                      I1 diamonds.
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                {selectedIndex === 2 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      Slightly Included (SI) Diamonds
                    </h1>
                    <p className="text-justify text-[16px] leading-[30px] mb-[20px] text-[#53556b] pb-[10px] ">
                      Inclusions are noticeable at 10x magnification with SI
                      diamonds, the best value diamonds. With SI1 diamonds,
                      inclusions are sometimes visible to the keen eye without
                      magnification. SI2 clarity grade diamond inclusions are
                      usually visible from the pavilion, or cone-shaped lower
                      portion, and from the top. 35% of all diamond customers
                      buy SI diamonds.
                    </p>
                    <Link
                      to={"/search-inventory/all-diamond??page=1&carat=0.3;3&price=480;35140&clarity=0;1&cut=0;2&certificate=false&color=0;7&shape="}
                      className="text-justify sm:text-[14px] text-[#201F41] hover:text-[#273c79bd]  font-bold  sm:tracking-[1px]"
                    >
                      Shop SI1-SI2 Diamonds &gt;
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
                {selectedIndex === 3 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      Very Slightly Included (VS) Diamonds
                    </h1>
                    <p className="text-justify text-[16px] leading-[30px] mb-[20px] text-[#53556b] pb-[10px] ">
                      VS diamonds have minor inclusions that cannot be seen
                      without 10x magnification. VS1 is a higher clarity grade
                      than VS2, which may have some visible inclusions. A VS
                      grade diamond is less expensive than a VVS diamond. 45% of
                      customers buy VS diamonds.
                    </p>
                    <Link
                      to={"/search-inventory/all-diamond??page=1&carat=0.3;3&price=480;35140&clarity=2;3&cut=0;2&certificate=false&color=0;7&shape="}
                      className="text-justify text-base text-[#201F41] pt-4 font-semibold"
                    >
                      Shop VS1 and VS2 Diamonds &gt;
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
                {selectedIndex === 4 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      Very Very Slightly Included (VVS) Diamonds
                    </h1>
                    <p className="text-justify text-[16px] leading-[30px] mb-[20px] text-[#53556b] pb-[10px] ">
                      VVS diamonds have miniscule inclusions that are difficult
                      even for trained eyes to see under 10x magnification. VVS2
                      clarity diamonds have slightly more inclusions than the
                      VVS1 grade. A VVS diamond is an excellent quality diamond
                      and clarity grade. 22% of customers buy VVS diamonds.
                    </p>
                    <Link
                      to={"/search-inventory/all-diamond??page=1&carat=0.3;3&price=480;35140&clarity=0;7&cut=4;4&certificate=false&color=0;7&shape="}
                      className="text-justify sm:text-[14px] text-[#201F41] hover:text-[#273c79bd]  font-bold  sm:tracking-[1px]"
                    >
                      Shop VVS1 and VVS2 Diamonds &gt;
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
                {selectedIndex === 5 ? (
                  <div className="flex flex-col">
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      Flawless (FL) Diamonds
                    </h1>
                    <p className="text-justify text-[16px] leading-[30px] mb-[20px] text-[#53556b] pb-[10px] ">
                      Inclusions and blemishes aren’t visible on flawless
                      diamonds, even under 10x magnification. Less than 1% of
                      all diamonds are FL clarity. A flawless diamond is
                      incredibly rare because it's nearly impossible to find a
                      diamond 100% free of inclusions. 6% of customers buy FL
                      diamonds.
                    </p>
                    <h1 className="text-start uppercase text-2xl font-medium py-4 text-[#201F41]">
                      Internally Flawless (IF) Diamonds
                    </h1>
                    <p className="text-justify text-[16px] leading-[30px] mb-[20px] text-[#53556b] pb-[10px] ">
                      Inclusions aren’t visible in internally flawless diamonds
                      under 10x magnification. Some small surface blemishes may
                      be visible on IF diamonds. 10% of customers buy IF
                      diamonds.
                    </p>
                    <Link
                      to={"/search-inventory/all-diamond??page=1&carat=0.3;3&price=480;35140&clarity=6;7&cut=0;2&certificate=false&color=0;7&shape="}
                      className="text-justify sm:text-[14px] text-[#201F41] hover:text-[#273c79bd]  font-bold  sm:tracking-[1px]"
                    >
                      Shop FL and IF Diamonds &gt;
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default The4;
