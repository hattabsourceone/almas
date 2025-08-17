import { BASE_URL } from "@components/api/api";
import Loading from "@components/shared/Loading/Loading";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

import Cookies from "js-cookie";
import Gif from "@assets/Jewellery/gif.png";
import Emulator from "@assets/Jewellery/emulator.png";
import shape4 from "@assets/SearchDiamond/shapes/shap4.png";
import shape6 from "@assets/SearchDiamond/shapes/shap6.png";
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
import { ShapeImages } from "../../SearchDiamond/FilterShape";
import { _selectedJewellery } from "@components/context/SelectedDiamondContext";
import useSelectedProps from "@components/hooks/useSelectedProps";
import Contact from "@components/shared/Contact/Contact";
import JewelleryProductsDetails from "./JewelleryProductDetails";
import HeaderJewelleryDetails from "./HeaderJewelleryDetails";
import { Tooltip } from "@material-tailwind/react";
import { IoHeart } from "react-icons/io5";
import { CartItem } from "@components/shared/DiamondActions/DiamondActions";
import { useCart } from "@components/context/cartProvider";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import RingStylerPlayer from "./RingStylerPlayer";
import { FaCircleInfo } from "react-icons/fa6";
import { toast } from "react-toastify";

type ImageLines = {
  id: number;
  image_type_name: string;
  images_urls: string[];
  shape_value: string;
  metal_value: string;
  video_file?: string;
};
type AttributeValues = {
  id: number;
  value_name: string;
};
type Rules = {
  id: number;
  attribute_name: string;
  attribute_values: AttributeValues[];
};
type addedValues = {
  id: number;
  name: string;
  value: string;
  price: number;
  new_price?: number;
};
type JewelleryDetailsProps = {
  id: number;
  name: string;
  category: string;
  type: string;
  image: string;
  price: number;
  sku: string;
  metal: string[];
  image_lines: ImageLines[];
  rules: Rules[];
  discount_price?: number;
  added_values: addedValues[];
  desc?: string;
};

const MakeJewellerySettingStep: React.FC = () => {
  const { selectedJewellery, setSelectedJewellery } = useSelectedProps();
  const { cart: providerCart, toggleCart } = useCart();
  const { model_id } = useParams<{ model_id: string }>();
  const [data, setData] = useState<JewelleryDetailsProps | null>(null);
  const [addedValueMap, setaddedValueMap] = useState<addedValues | null>(null);
  const [selectedShape, setSelectedShape] = useState<string>(
    selectedJewellery.shape
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    selectedJewellery.color
  );
  const [selectedMetalId, setSelectedMetalId] = useState<number>(
    data != null
      ? data?.metal.findIndex((e) => e === selectedJewellery.color)
      : 0
  );
  const [selectedExternalMetalId, setSelectedExternalMetalId] =
    useState<number>(0);
  const [selectedCaret, setSelectedCaret] = useState<number>(
    selectedJewellery.caret
  );
  const [selectedRingSize, setSelectedRingSize] = useState<string>("");
  const [showSizeRequired, setshowSizeRequired] = useState<boolean>(false);
  const [showVitrualStyler, setshowVitrualStyler] = useState<boolean>(false);
  const [metals, setMetals] = useState<any>([]);
  const [uniqueShapes, setuniqueShapes] = useState<any>([]);
  const seenPrefixes = new Set();
  let cart = localStorage.getItem("cart");
  let newCart: CartItem[] = cart ? JSON.parse(cart) : [];
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<_selectedJewellery>({
    shape: selectedShape,
    color: selectedColor,
    caret: selectedCaret,
    price: 0,
    metal_id: selectedMetalId,
    name: data != null ? data?.name : "",
  } as _selectedJewellery);
  const uid: number = Number(Cookies.get("uid"));
  const session_id = Cookies.get("session_id_token");
  let wishlistBasket = localStorage.getItem("wishList");
  let newWishlistBasket = wishlistBasket ? JSON.parse(wishlistBasket) : [];
  const [isInWishlist, setIsInWishlist] = useState<boolean>(
    newWishlistBasket.some((item: any) => item.id === data?.id)
  );

  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { width, height } = (
      target as HTMLImageElement
    ).getBoundingClientRect();
    const x = (offsetX / width) * 100;
    const y = (offsetY / height) * 100;
    setZoomPosition({ x, y });
  };

  const removeFromCart = async () => {
    const cart = localStorage.getItem("cart");
    const newCart = cart ? JSON.parse(cart) : [];
    const index = newCart.findIndex((item: any) => item.id === data!.id);
    if (index > -1) {
      newCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    toggleCart();
    await removeFromCartRequest();
  };

  const removeFromCartRequest = async () => {
    try {
      const body = {
        session_id: session_id,
        uid: uid,
        product_type: "jewellery",
        product_id: data!.id,
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/remove_from_cart`,
        body
      );
      console.log("remove from cart:", response.data);
      if (response.status === 200) {
        // TODO add notification
      } else {
        // error there
      }
    } catch (error) {
      console.log("add to wishlist:", error);
    }
  };

  const addToCart = async () => {
    cart = localStorage.getItem("cart");
    newCart = cart ? JSON.parse(cart) : [];
    if (newCart.find((e) => e.id === model_id)) {
      toast.warning("Product is already in the cart!", {
        autoClose: 2500,
      });
      return;
    }
    const sampleImage = data?.image_lines.find(
      (e: any) => `${selectedShape} - ${selectedColor}` === e.image_type_name
    )?.images_urls[0];
    const ppr =
      addedValueMap?.new_price && addedValueMap.new_price > 0
        ? addedValueMap.new_price
        : addedValueMap?.price;
    const tempJewellery: any = {
      ...data,
      total_carat: selectedJewellery.caret,
      ring_size: selectedRingSize,
      metal_id: selectedJewellery.metal_id,
      final_price: ppr || 0,
      final_shape: selectedShape,
      sampleImage: sampleImage,
    };

    delete tempJewellery["image_lines"];
    tempJewellery["is_jewellery"] = true;
    localStorage.setItem("cart", JSON.stringify([...newCart, tempJewellery]));
    toggleCart();
    await addToCartRequest();
  };

  const addToCartRequest = async () => {
    try {
      if (session_id && session_id != "guest") {
        const body = {
          session_id: session_id,
          uid: uid,
          product_type: "jewellery",
          product_id: data!.id,
          ring_size: selectedRingSize,
          total_carat: selectedCaret,
          metal_id: selectedMetalId,
          shape: selectedJewellery.shape || selectedShape,
        };
        const response = await axios.post(
          `${BASE_URL}/api/v1/add_to_cart`,
          body
        );
        if (response.status === 200) {
          // TODO add notification
        } else {
          // error there
        }
      }
    } catch (error) {
      console.log("add to wishlist:", error);
    }
  };

  const toggleZoomWidget = (val: boolean) => {
    setShowZoom(val);
  };

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/get_id_jewellery`, {
        id: model_id,
      });
      const jewelleryData = response.data.data[0];
      console.log("jewelleryData", jewelleryData);
      const filteredAddedValues = jewelleryData.added_values.filter(
        (value: any) => value && value.value
      );
      jewelleryData.added_values = filteredAddedValues;
      setData(jewelleryData);
      setIsInCart(newCart.some((item: any) => item.id === jewelleryData.id));
      if (jewelleryData.image_lines.length > 0) {
        const whiteIndex = jewelleryData.metal.findIndex(
          (item: string) => item.toLocaleLowerCase() === "18k white"
        );
        setSelectedColor(
          jewelleryData.metal[whiteIndex !== -1 ? whiteIndex : 0]
        );
        setSelectedMetalId(whiteIndex !== -1 ? whiteIndex : 0);
        const firstRecord = jewelleryData.added_values[0].value;
        setSelectedShape(firstRecord.split("-")[0].trim());
        setSelectedCaret(Number(firstRecord.split("-")[1].trim()));
        setaddedValueMap(jewelleryData.added_values[0]);
        const imageName = `${selectedShape} - ${
          jewelleryData.metal[whiteIndex !== -1 ? whiteIndex : 0]
        }`;
        const imageData = jewelleryData.image_lines.filter(
          (e: any) =>
            e.image_type_name?.toLowerCase() === imageName.toLowerCase()
        )[0];
        const imageUrl = imageData.video_file
          ? imageData.video_file
          : imageData.images_urls[0];
        setSelectedImage(imageUrl);
        setSelectedJewellery((prev) => {
          const newJewellery = {
            ...prev,
            price:
              jewelleryData.added_values[0]?.new_price &&
              jewelleryData.added_values[0]?.new_price != 0
                ? jewelleryData.added_values[0]?.new_price
                : jewelleryData.added_values[0]?.price || 0,
            jewellery_id: jewelleryData.id,
            category: jewelleryData.category,
            type: jewelleryData.type,
            shape: firstRecord.split("-")[0].trim(),
          };
          return newJewellery;
        });
      }
      const responseMetal = await axios.get(`${BASE_URL}/api/v1/get_all_metal`);
      if (response.status === 200) {
        setMetals(responseMetal.data.metals);
        setSelectedExternalMetalId(
          responseMetal.data.metals.find((e: any) => e.name === selectedColor)
            ?.id
        );
      }
      console.log(response.data);
    } catch (error) {
      console.log("getData:", error);
    }
  };

  const getDescriptionText = (data: any) => {
    const type = data.type.toLowerCase();
    const category = data.category.toLowerCase();

    if (type.includes("solitaire")) {
      return "Experience elegant simplicity with our classic 4-prong solitaire ring that will add delicacy and brilliance to your ring collection";
    } else if (type.includes("side")) {
      return "A sophisticated classic Side-Stone diamond ring featuring pave set with eighteen round-shaped diamonds to accentuate your choice of center diamond";
    } else if (type.includes("three")) {
      return "Classic and romantic three-stone diamond ring with a center stone wrapped in two round brilliant cut diamonds";
    } else if (type.includes("halo stud")) {
      return "Gently cradled within a four-claw setting, the center gems you select will receive added brilliance from a sparkling double halo of diamonds.";
    } else if (category.includes("ring") && type.includes("halo")) {
      return "Elegant Halo Diamond Ring with a dazzling set of side-stone diamonds for a luxurious expression of love";
    } else if (type.includes("band")) {
      return "This diamond band features round brilliant diamonds perfectly set in an elegant pave setting";
    } else if (type.includes("hoop")) {
      return "From Double row of round brilliant diamonds in a Pave setting hoops with comfortable hinged backs that is perfect for every occasion.";
    } else if (type.includes("stud")) {
      return "From Accentuate your stud's diamond with a 4 wire-claw setting that adds a sense of dreamy romance and classic elegance to your earring collection";
    } else if (type.includes("bezel")) {
      return "In this modern interpretation of the classic tennis bracelet, diamonds are set within bezels, offering a contemporary aesthetic.";
    } else if (type.includes("tennis")) {
      return "Luxurious simplicity at its finest. A collection of round diamonds delicately encircle this tennis bracelet, forming a radiant band of light that will grace your every movement.";
    } else if (type.includes("channel")) {
      return "This Channel-Set bangle is a shimmering masterpiece. Crafted with sustainable diamonds and a Channel setting, it's bound to bring a smile to your face.";
    } else if (type.includes("pave")) {
      return "This Pavé-friendly bangle is a dazzling masterpiece. Featuring sustainable diamonds and a Pavé setting, this bangle is guaranteed to bring a smile to your face.";
    } else if (type.includes("solit") && category.includes("pendant")) {
      return "This elegant diamond pendant, placed in a delicate four-claw setting that lets light pass through for a most sparkling effect for the diamond you chosen.";
    } else if (type.includes("halo pendant")) {
      return "This elegant diamond pendant offers a glittering vision of elegance and finesse. A diamond halo will accentuate a center diamond and provide mesmerizing contrast to any diamond you choose.";
    } else if (type.includes("muse pendant")) {
      return "This elegant pendant has a gorgeous center diamond surrounded by pavé-set diamond accents set with two rows of round brilliant diamonds, giving the appearance of a larger center diamond.";
    } else if (type.includes("cascata pendant")) {
      return "A bezel setting accentuates the center diamond in this pendant with a round diamond placed for a symmetrical look. a piece that can be worn everyday.";
    } else {
      return "A sophisticated classic Side-Stone diamond ring featuring pave set with eighteen round-shaped diamonds to accentuate your choice of center diamond";
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedValues({
      shape: selectedShape,
      color: selectedColor,
      caret: selectedCaret || 0.5,
      price:
        addedValueMap?.new_price && addedValueMap?.new_price != 0
          ? addedValueMap?.new_price
          : addedValueMap?.price || 0,
      jewellery_id: selectedJewellery.jewellery_id || 0,
      type: selectedJewellery.type,
      category: selectedJewellery.category,
      metal_id: selectedMetalId || 0,
      external_metal_id: selectedExternalMetalId || 0,
    });
  }, [selectedShape, selectedColor, selectedCaret]);

  useEffect(() => {
    setSelectedImage(
      data?.image_lines.find(
        (line) => `${selectedShape} - ${selectedColor}` === line.image_type_name
      )?.images_urls[0]
    );
  }, [selectedShape, selectedColor]);

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

  function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }

  useEffect(() => {
    if (data && data.added_values) {
      const tempUniqueShapes: any = [];
      const seenPrefixes = new Set();

      data.added_values.forEach((shape) => {
        const prefix = shape.value.split(" - ")[0];
        if (!seenPrefixes.has(prefix)) {
          tempUniqueShapes.push(shape);
          seenPrefixes.add(prefix);
        }
      });

      setuniqueShapes(tempUniqueShapes); // Update state with unique shapes
    }
  }, [data]);

  const formatCarat = (value: number) => {
    const [integerPart, decimalPart] = value.toFixed(2).split(".");

    if (decimalPart === "00") {
      return `${integerPart}.0`;
    } else if (decimalPart[1] === "0") {
      return `${integerPart}.${decimalPart[0]}`;
    } else {
      return `${integerPart}.${decimalPart}`;
    }
  };

  return (
    <div className="w-full relative flex flex-col items-start pt-4">
      {data ? (
        <>
          <div className="w-full -ml-5 sm:-ml-9 md:-ml-10 lg:-ml-10 xl:-ml-8 2xl:ml-0">
            <Breadcrumb
              menu={[
                {
                  title: data?.category! || ".",
                  link: `/jewellery/${data?.category!}`,
                  level: 1,
                },
                {
                  title: data?.type! || ".",
                  link: `/jewellery/${data?.category!}/${data?.type}`,
                  level: 2,
                },
                {
                  title: data?.name! || ".",
                  link: "", // TODO here
                  level: 3,
                },
              ]}
            />
          </div>
          <div className="w-[98%] lg:w-[80%] xl:w-[70%] 2xl:w-[80%] my-2 pl-2 mx-auto"></div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col mx-auto w-[96%] md:w-[95%] lg:w-[93%] xl:w-[90%] 2xl:w-[80%]">
              {!data.type.toLocaleLowerCase().includes("hoop") &&
                !data.type.toLocaleLowerCase().includes("band") &&
                !data.type.toLocaleLowerCase().includes("tennis") &&
                !data.type.toLocaleLowerCase().includes("channel") && (
                  <HeaderJewelleryDetails
                    category_name={data.category}
                    price={
                      addedValueMap?.new_price && addedValueMap.new_price > 0
                        ? addedValueMap.new_price
                        : addedValueMap?.price || 0
                    }
                    route={1}
                    data={data}
                  />
                )}
              <div className="flex flex-col w-full md:flex-row md:space-x-2 lg:space-x-4 xl:space-x-6 justify-center sm:p-3 mx-auto">
                <div className="w-[96%] sm:w-[95%] md:w-[50%] sm:pr-4 pt-1">
                  <div className="flex flex-col">
                    <div className="border-slate-300 border-[1px] w-[103%] h-[420px] sm:h-[420px] md:h-[250px] lg:h-[330px] xl:h-[410px] 2xl:h-[550px] flex items-center justify-center">
                      {selectedImage && (
                        <img
                          src={selectedImage}
                          className="max-w-full max-h-full"
                          alt={data.name}
                          onMouseMove={handleMouseMove}
                          onMouseLeave={() => {
                            toggleZoomWidget(false);
                          }}
                          onMouseEnter={() => {
                            toggleZoomWidget(true);
                          }}
                          style={{ cursor: "zoom-in" }}
                        />
                      )}
                    </div>
                    {!data.type.toLocaleLowerCase().includes("band") &&
                    !data.type.toLocaleLowerCase().includes("hoop") &&
                    !data.category.toLocaleLowerCase().includes("bracelet") ? (
                      <h6 className="sub-color text-center my-4">
                        Sample image Shown with a 1.00 ct Diamond
                      </h6>
                    ) : (
                      <div className="my-4"></div>
                    )}
                  </div>
                  <div className="flex flex-row flex-wrap justify-start">
                    {data.image_lines.map((line) => {
                      if (
                        `${selectedShape} - ${selectedColor}` ==
                        line.image_type_name
                      ) {
                        return (
                          <div key={line.id}>
                            <div className="flex flex-row">
                              {line.video_file && (
                                <div
                                  onClick={() => {
                                    setSelectedImage(line.video_file);
                                  }}
                                  className="cursor-pointer mb-4 mr-4 border-slate-300 border-[1px] w-[70px] h-[70px] flex items-center justify-center p-1"
                                >
                                  <img className="w-full h-auto" src={Gif} />
                                </div>
                              )}
                              {line.images_urls &&
                                line.images_urls.map((image, i) => (
                                  <div
                                    key={i}
                                    onClick={() => {
                                      setSelectedImage(image);
                                    }}
                                    className="cursor-pointer mb-4 mr-4 border-slate-300 border-[1px] w-[70px] h-[70px] flex items-center justify-center p-1"
                                  >
                                    <img
                                      className="w-full h-auto"
                                      src={image}
                                      alt={line.shape_value}
                                    />
                                  </div>
                                ))}
                            </div>
                          </div>
                        );
                      }
                    })}
                    {data?.category.toLocaleLowerCase().includes("rings") &&
                      !data?.category.toLocaleLowerCase().includes("earr") &&
                      !data.type.toLocaleLowerCase().includes("band") && (
                        <div
                          onClick={() => {
                            setshowVitrualStyler(true);
                          }}
                          className="cursor-pointer mb-4 mr-4 border-slate-300 border-[1px] w-[70px] h-[70px] flex items-center justify-center"
                        >
                          <img className="w-full h-auto" src={Emulator} />
                        </div>
                      )}
                  </div>
                </div>
                {/* --------------------------------------------------- */}
                <div className="w-full md:max-w-[50%] relative pt-1 md:pt-0">
                  <div className="border-b-[1px] border-slate-400 p-2 flex flex-col">
                    <h3 className="text-[#201F41] text-[20px] font-medium">
                      {data.name}
                    </h3>
                    <h6 className="text-[11px] text-[#000] py-2">
                      SKU : {data.sku}
                    </h6>
                    <p className="text-[14px] break-words">
                      {data.desc || "" /* getDescriptionText(data) */}
                    </p>
                    {/* <p className="text-[16px] text-[#88787e] py-2">
                      Ex Tax:{" "}
                      {addedValueMap?.new_price && addedValueMap.new_price > 0
                        ? formatPrice(addedValueMap.new_price)
                        : formatPrice(addedValueMap?.price ?? 0)}
                    </p> */}
                  </div>
                  <div className="p-2 pt-3">
                    <h6
                      className="text-[14px] font-bold text-[#666]"
                      style={{ fontFamily: '"Open Sans"' }}
                    >
                      Metal:{" "}
                      <span className="text-[14px] font-normal text-slate-600">
                        {selectedColor}
                      </span>
                    </h6>
                    <div className="flex flex-row pt-3 space-x-4">
                      {data.metal.map((rule, index) => (
                        <div
                          onClick={() => {
                            setSelectedColor(rule);
                            setSelectedMetalId(index);
                            setSelectedExternalMetalId(
                              metals.find((e: any) => e.name === rule)?.id
                            );
                          }}
                          key={rule}
                          className={`${
                            selectedColor == rule ? " filter-active" : " border"
                          } p-2  rounded-circle icon1x1  d-flex cursor-pointer`}
                          style={{
                            background: rule.includes("Yellow")
                              ? "linear-gradient(30deg,#dbb666 0,#fcf1d5 55%,#fcf1d5 60%,#dbb666 100%)"
                              : "linear-gradient(30deg, #bfbfbf 0, #f7f7f7 55%, #f7f7f7 60%, #bfbfbf 100%)",
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  {!data.type.toLocaleLowerCase().includes("tennis") &&
                    !data.type.toLocaleLowerCase().includes("channel") && (
                      <div className="p-2">
                        <p
                          className="text-[14px] font-bold text-[#666]"
                          style={{ fontFamily: '"Open Sans"' }}
                        >
                          Shape:{" "}
                          <span className="text-[14px] font-normal text-slate-600">
                            {selectedShape}
                          </span>
                        </p>
                        <div className="flex flex-row flex-wrap">
                          {uniqueShapes.map((shape: any) => (
                            <div
                              key={shape.id}
                              className="flex flex-col items-start pr-3 pt-3"
                            >
                              <div
                                onClick={() => {
                                  const result = data.added_values.find(
                                    (e: any) =>
                                      e.value ===
                                      `${shape.value
                                        .split("-")[0]
                                        .trim()} - ${formatCarat(
                                        selectedCaret
                                      )}`
                                  );
                                  setaddedValueMap(result!);
                                  setSelectedShape(
                                    shape.value.split("-")[0].trim()
                                  );
                                }}
                                className={`${
                                  selectedShape ===
                                  shape.value.split("-")[0].trim()
                                    ? "filter-active"
                                    : "border"
                                } cursor-pointer rounded-circle d-flex justify-content-center align-items-center w-[60px] h-[60px] overflow-hidden`}
                              >
                                <img
                                  className="w-full h-full object-cover p-[1px]"
                                  src={
                                    shapesImages.find(
                                      (item) =>
                                        item.name ===
                                        shape.value.split("-")[0].trim()
                                    )?.value || ""
                                  }
                                  alt="shape1"
                                />
                              </div>
                              {selectedJewellery.category
                                .toLocaleLowerCase()
                                .includes("earring") &&
                                selectedJewellery.type
                                  .toLocaleLowerCase()
                                  .includes("stud") && (
                                  <p
                                    className="text-[#333333] text-[16px]"
                                    style={{
                                      fontFamily: '"Plain Light", sans-serif',
                                      fontWeight: 600,
                                    }}
                                  >
                                    {shape.value.split("-")[0].trim()}
                                  </p>
                                )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  {data.type.toLocaleLowerCase().includes("band") && (
                    <div className="flex flex-row required pb-3 space-x-6 items-center pt-3">
                      <label className="control-label text-[16px] font-semibold text-nowrap text-[#333333]">
                        <span className="text-red-600">*</span> Ring Size
                      </label>
                      <select
                        name="option[286]"
                        id="input-option286"
                        className="option form-select text-[12px] py-2 max-w-[250px] text-[#555] border-[1px] border-[#ddd]"
                        style={{ fontFamily: '"Open Sans", sans-serif' }}
                        onChange={(event) => {
                          setSelectedRingSize(event.target.value);
                        }}
                        required
                      >
                        <option className="" value="">
                          Select Your Size
                        </option>
                        <option data-option-id='data-price=""' value="US 3">
                          US 3
                        </option>
                        <option data-option-id='data-price=""' value="US 3.5">
                          US 3.5
                        </option>
                        <option data-option-id='data-price=""' value="US 4">
                          US 4
                        </option>
                        <option data-option-id='data-price=""' value="US 4.5">
                          US 4.5
                        </option>
                        <option data-option-id='data-price=""' value="US 5">
                          US 5
                        </option>
                        <option data-option-id='data-price=""' value="US 5.5">
                          US 5.5
                        </option>
                        <option data-option-id='data-price=""' value="US 6">
                          US 6
                        </option>
                        <option data-option-id='data-price=""' value="US 6.5">
                          US 6.5
                        </option>
                        <option data-option-id='data-price=""' value="US 7">
                          US 7
                        </option>
                        <option data-option-id='data-price=""' value="US 7.5">
                          US 7.5
                        </option>
                        <option data-option-id='data-price=""' value="US 8">
                          US 8
                        </option>
                        <option data-option-id='data-price=""' value="US 8.5">
                          US 8.5
                        </option>
                        <option data-option-id='data-price=""' value="US 9">
                          US 9
                        </option>
                      </select>
                    </div>
                  )}
                  {showSizeRequired && (
                    <p className="text-[12px] capitalize pb-1 text-[#a94442]">
                      Ring Size required!
                    </p>
                  )}
                  {!data.type.toLocaleLowerCase().includes("band") && (
                    <div className="p-2">
                      <h6
                        className="text-[14px] font-bold text-[#666]"
                        style={{ fontFamily: '"Open Sans"' }}
                      >
                        Total Carat:{" "}
                        <span className="text-[14px] font-normal">
                          {Number(selectedCaret).toFixed(2)} ct
                        </span>
                      </h6>
                      <div className="flex flex-row flex-wrap">
                        {data.added_values
                          .filter(
                            (item) =>
                              item.value.split("-")[0].trim() === selectedShape
                          )
                          .sort(
                            (a, b) =>
                              Number(a.value.split("-")[1].trim()) -
                              Number(b.value.split("-")[1].trim())
                          )
                          .map((carat) => (
                            <div
                              onClick={() => {
                                setaddedValueMap(carat);
                                setSelectedCaret(
                                  Number(carat.value.split("-")[1].trim())
                                );
                              }}
                              key={carat.id}
                              className={`${
                                selectedCaret ==
                                Number(carat.value.split("-")[1].trim())
                                  ? " filter-active"
                                  : " border"
                              }  rounded-circle icon1x1 mr-3 mt-3 d-flex justify-content-center align-items-center cursor-pointer text-[16px] font-semibold`}
                            >
                              <h6>
                                {Number(
                                  carat.value.split("-")[1].trim()
                                ).toFixed(2)}
                              </h6>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  {data.type.toLocaleLowerCase().includes("band") && (
                    <div className="flex flex-row items-center space-x-1 pb-2">
                      <FaCircleInfo />
                      <p className="text-[12px] font-normal text-[#201f41]">
                        Need Help with your Ring Size go to our{" "}
                        <span className="underline">Ring Size Guide</span>
                      </p>
                    </div>
                  )}
                  {addedValueMap?.new_price && addedValueMap.new_price > 0 ? (
                    <h3 className="text-[19px] text-[#666] line-through font-normal py-3 pl-2">
                      {formatPrice(addedValueMap.price)}
                    </h3>
                  ) : (
                    <></>
                  )}
                  <div className="p-2 d-flex align-items-end border-b-[1px] border-slate-400 pb-3 space-x-1 text-[#000]">
                    <h3
                      className="text-[25px] font-medium"
                      style={{ fontFamily: '"Open Sans", sans-serif' }}
                    >
                      Price :
                      {addedValueMap?.new_price && addedValueMap.new_price > 0
                        ? formatPrice(addedValueMap.new_price)
                        : formatPrice(addedValueMap?.price ?? 0)}
                    </h3>
                    <span className="text-[11px]">
                      {data.type.toLocaleLowerCase().includes("hoops") ||
                      data.category.toLocaleLowerCase().includes("bracelet") ||
                      data.type.toLocaleLowerCase().includes("band")
                        ? "ex (VAT)"
                        : "(Setting Price, ex VAT)"}
                    </span>
                  </div>
                  <div className="mt-3 p-2">
                    {data.type.toLocaleLowerCase().includes("hoops") ||
                    data.category.toLocaleLowerCase().includes("bracelet") ||
                    data.type.toLocaleLowerCase().includes("band") ? (
                      <div className="flex flex-row justify-start items-center space-x-3">
                        {isInCart ? (
                          <button
                            className="bg-[#1f1f3c] text-white rounded-full px-20 py-3"
                            onClick={(event) => {
                              event.preventDefault();
                              removeFromCart();
                              setIsInCart(false);
                              event.stopPropagation();
                            }}
                          >
                            <div className="flex flex-row hover:text-[#333] items-center justify-center">
                              <p className="capitalize text-[16px] font-medium">
                                remove from cart
                              </p>
                            </div>
                          </button>
                        ) : (
                          <button
                            className="bg-[#1f1f3c] text-white rounded-full px-20 py-3"
                            onClick={(event) => {
                              event.preventDefault();
                              if (
                                data.type
                                  .toLocaleLowerCase()
                                  .includes("band") &&
                                !selectedRingSize
                              ) {
                                setshowSizeRequired(true);
                                return;
                              }
                              if (showSizeRequired) {
                                setshowSizeRequired(false);
                              }
                              addToCart();
                              setIsInCart(true);
                              event.stopPropagation();
                            }}
                          >
                            <div className="flex flex-row hover:text-[#333] items-center justify-center">
                              <p className="capitalize text-[16px] font-medium">
                                add to cart
                              </p>
                            </div>
                          </button>
                        )}
                        {/* {isInWishlist ? (
                          <Tooltip
                            content={
                              <p className="text-sm capitalize py-1">
                                remove from wish list
                              </p>
                            }
                          >
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                removeFromWishlist();
                                setIsInWishlist(false);
                                event.stopPropagation();
                              }}
                              type="button"
                              className="bg-[#333] text-white rounded-md px-3 py-2 relative group"
                            >
                              <IoHeart className="mx-auto hover:text-[#333]" />
                            </button>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            content={
                              <p className="text-sm capitalize py-1">
                                add to wish list
                              </p>
                            }
                          >
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                addToWishlist();
                                setIsInWishlist(true);
                                event.stopPropagation();
                              }}
                              type="button"
                              className="bg-[#1f1f3c] text-white rounded-md px-3 py-2 relative group"
                            >
                              <IoHeart className="mx-auto hover:text-[#333]" />
                            </button>
                          </Tooltip>
                        )} */}
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedJewellery({
                            ...selectedValues,
                            name: data?.name,
                            jewellery_id: data?.id,
                            category: data?.category,
                            type: data?.type,
                            addedValues: addedValueMap,
                            metal_id: selectedMetalId,
                            external_metal_id: selectedExternalMetalId,
                            price:
                              addedValueMap?.new_price &&
                              addedValueMap?.new_price != 0
                                ? addedValueMap?.new_price
                                : addedValueMap?.price || 0,
                          });
                          navigate(
                            `/jewellery-details/${model_id}/selected_setting`
                          );
                        }}
                        className="text-[16px] font-normal text-white bg-[#201F41] py-3 px-12 rounded-full"
                      >
                        Select This Setting
                      </button>
                    )}
                  </div>
                  {/* Zoomed-in image */}
                  {showZoom && (
                    <div
                      className="zoom-box absolute left-0 w-[98%] h-[530px]"
                      style={{
                        top: 0,
                        backgroundImage: `url(${selectedImage})`,
                        backgroundSize: "150%",
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }}
                    ></div>
                  )}
                </div>
              </div>
              <JewelleryProductsDetails
                data={data}
                selectedMetal={selectedColor}
                selectedShape={selectedShape}
                selectedCarat={selectedCaret}
                addedValueMap={addedValueMap}
              />
            </div>
            <Contact />
          </div>
        </>
      ) : (
        <Loading />
      )}
      <RingStylerPlayer
        showVitrualStyler={showVitrualStyler}
        setshowVitrualStyler={setshowVitrualStyler}
      />
    </div>
  );
};

export default MakeJewellerySettingStep;
