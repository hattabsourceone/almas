import Facture from "./Order/Facture";
import HeaderJewelleryDetails from "../JewelleryDetails/HeaderJewelleryDetails";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@components/api/api";
import useSelectedProps from "@components/hooks/useSelectedProps";
import Contact from "@components/shared/Contact/Contact";
import { CartItem } from "@components/shared/DiamondActions/DiamondActions";
import { useCart } from "@components/context/cartProvider";
import { useNavigate } from "react-router-dom";
import Loading from "@components/shared/Loading/Loading";
import Ring from "@assets/Jewellery/ring.png";
import Earring from "@assets/Jewellery/earring.png";
import Bracelet from "@assets/Jewellery/bracelet.png";
import Pendant from "@assets/Jewellery/pendant.png";
import Tick from "@assets/Jewellery/tick.png";
import Stone from "@assets/Jewellery/stone.png";
import { FaFilePdf } from "react-icons/fa";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Emulator from "@assets/Jewellery/emulator.png";
import RingStylerPlayer from "../JewelleryDetails/RingStylerPlayer";
import Hoops from "@assets/Jewellery/hoops.png";
import { toast } from "react-toastify";

const MakeOrder: React.FC = () => {
  const {
    selectedJewellery,
    selectedDiamond,
    secondselectedDiamond,
    setSelectedJewellery,
  } = useSelectedProps();
  const [dataDiamond, setDataDiamond] = useState<any>();
  const [seconddataDiamond, secondsetDataDiamond] = useState<any>();
  const navigate = useNavigate();
  const { toggleCart } = useCart();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSecondModal, setShowSecondModal] = useState<boolean>(false);
  const [dataJewellery, setDataJeweller] = useState<any>();
  let cart = localStorage.getItem("cart");
  let newCart: CartItem[] = cart ? JSON.parse(cart) : [];
  const uid: number = Number(Cookies.get("uid"));
  const session_id = Cookies.get("session_id_token");
  const [isPageAvailable, setIsPageAvailable] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [selectedShape, setSelectedShape] = useState<string>(
    selectedJewellery.shape
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    selectedJewellery.color
  );
  const [selectedCaret, setSelectedCaret] = useState<number>(
    selectedJewellery.caret
  );
  const [selectedRingSize, setSelectedRingSize] = useState<string>("");
  const [showSizeRequired, setshowSizeRequired] = useState<boolean>(false);
  const [showVitrualStyler, setshowVitrualStyler] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const handleOpenPdf = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenSecondPdf = () => {
    setShowSecondModal(true);
  };

  const handleCloseSecondModal = () => {
    setShowSecondModal(false);
  };

  const getCartItemsRequest = async () => {
    try {
      const body = {
        session_id: session_id,
        uid: uid,
      };
      const response = await axios.post(`${BASE_URL}/api/v1/get_cart`, body);
      if (response.status === 200) {
        const shoppingCart = response.data.cart.diamond;
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...response.data.cart.diamond,
            ...response.data.cart.jewellery,
          ])
        );
        toggleCart();
      }
    } catch (error) {
      console.log("getCartItemsRequest:", error);
    }
  };

  const checkPdf = async () => {
    try {
      const response = await axios.get(
        `https://www.diamondselections.com/GetCertificate.aspx?diamondid=${dataDiamond.diamond_id}`,
        {
          responseType: "text",
        }
      );
      if (
        !response.data.includes("src=") ||
        response.data.trim().length === 0
      ) {
        setIsPageAvailable(false);
      } else {
        setIsPageAvailable(true);
        handleOpenPdf();
      }
    } catch (error) {
      console.error("Error fetching PDF:", error);
      setIsPageAvailable(false);
    }
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      let response = await axios.post(`${BASE_URL}/api/v1/get_diamond_by_id`, {
        model_id: selectedDiamond.diamond_id,
      });
      setDataDiamond(response.data.data);
      if (
        secondselectedDiamond.diamond_id &&
        secondselectedDiamond.diamond_id != 0
      ) {
        response = await axios.post(`${BASE_URL}/api/v1/get_diamond_by_id`, {
          model_id: secondselectedDiamond.diamond_id,
        });
        secondsetDataDiamond(response.data.data);
      }
      response = await axios.post(`${BASE_URL}/api/v1/get_id_jewellery`, {
        id: selectedJewellery.jewellery_id,
      });
      setDataJeweller(response.data.data[0]);
      setSelectedImage(
        response.data.data[0].image_lines.find(
          (e: any) =>
            `${selectedShape} - ${selectedColor}` === e.image_type_name
        ).images_urls[0]
      );
    } catch (error) {
      console.log("getData:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      // check if already in cart
      if (newCart.find((e) => e.id === dataDiamond.id) || newCart.find((e) => e.id === dataJewellery.id)) {
        toast.warning("Product is already in the cart!", {
          autoClose: 2500,
        });
        return;
      }
      if (
        secondselectedDiamond.diamond_id != null &&
        secondselectedDiamond.diamond_id == 0
      ) {
        if (newCart.find((e) => e.id === dataDiamond.id) || newCart.find((e) => e.id === dataJewellery.id) || newCart.find((e) => e.id === seconddataDiamond.id)) {
          toast.warning("Product is already in the cart!", {
            autoClose: 2500,
          });
          return;
        }
        if (!selectedRingSize) {
          setshowSizeRequired(true);
          return;
        } else {
          setshowSizeRequired(false);
        }
      }
      const sampleImage = dataJewellery.image_lines.find(
        (e: any) => `${selectedShape} - ${selectedColor}` === e.image_type_name
      )?.images_urls[0];
      const tempJewellery = {
        ...dataJewellery,
        total_carat: selectedJewellery.caret,
        ring_size: selectedRingSize,
        metal_id: selectedJewellery.external_metal_id,
        final_price: selectedJewellery.price,
        final_shape: selectedJewellery.shape,
        sampleImage: sampleImage,
      };
      delete tempJewellery["image_lines"];
      tempJewellery["is_jewellery"] = true;
      cart = localStorage.getItem("cart");
      newCart = cart ? JSON.parse(cart) : [];
      if (
        secondselectedDiamond.diamond_id &&
        secondselectedDiamond.diamond_id != 0
      ) {
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...newCart,
            dataDiamond,
            seconddataDiamond,
            tempJewellery,
          ])
        );
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([...newCart, dataDiamond, tempJewellery])
        );
      }
      toggleCart();
      if (session_id && session_id != "guest") {
        let body = {
          session_id: session_id,
          uid: uid,
          product_type: "diamond",
          product_id: dataDiamond.id,
        };
        await axios.post(`${BASE_URL}/api/v1/add_to_cart`, body);
        let jwbody = {
          session_id: session_id,
          uid: uid,
          product_type: "jewellery",
          product_id: tempJewellery.id,
          ring_size: selectedRingSize,
          total_carat: tempJewellery.total_carat,
          metal_id: tempJewellery.metal_id,
          shape: selectedJewellery.shape,
        };
        console.log("jwbody", jwbody);

        await axios.post(`${BASE_URL}/api/v1/add_to_cart`, jwbody);
        await getCartItemsRequest();
      }
      navigate("/profile/shopping-cart");
    } catch (error) {
      console.log("add to cart:", error);
    }
  };

  function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }

  console.log("jewlery ------------", dataJewellery);
  console.log("diamond ------------", dataDiamond);

  return (
    <div className="flex flex-col pt-4 relative">
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white flex flex-col p-4 rounded-lg shadow-lg w-full max-w-4xl relative">
            <div className="flex flex-row w-full justify-between pb-2 border-b-slate-300 border-b-[1px] mb-3">
              <p className="text-[15px] text-[#444] px-4">CERTIFICATE</p>
              <button
                onClick={handleCloseModal}
                className="font-bold text-[21px] bg-[#000] opacity-20 text-[#000] btn px-0 rounded-t-full rounded-b-full py-0 mx-4"
                style={{ textShadow: "0 1px 0 #fff" }}
              >
                <p>x</p>
              </button>
            </div>
            <iframe
              src={`https://www.diamondselections.com/GetCertificate.aspx?diamondid=${dataDiamond.diamond_id}`}
              title="PDF Viewer"
              className="w-full h-[80vh] border-none"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}
      {showSecondModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white flex flex-col p-4 rounded-lg shadow-lg w-full max-w-4xl relative">
            <div className="flex flex-row w-full justify-between pb-2 border-b-slate-300 border-b-[1px] mb-3">
              <p className="text-[15px] text-[#444] px-4">CERTIFICATE</p>
              <button
                onClick={handleCloseSecondModal}
                className="font-bold text-[21px] bg-[#000] opacity-20 text-[#000] btn px-0 rounded-t-full rounded-b-full py-0 mx-4"
                style={{ textShadow: "0 1px 0 #fff" }}
              >
                <p>x</p>
              </button>
            </div>
            <iframe
              src={`https://www.diamondselections.com/GetCertificate.aspx?diamondid=${dataDiamond.diamond_id}`}
              title="PDF Viewer"
              className="w-full h-[80vh] border-none"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="w-full -ml-9 md:-ml-10 lg:-ml-10 xl:-ml-8 2xl:ml-0">
          <Breadcrumb
            menu={[
              {
                title: selectedJewellery.category || " ",
                link: `/jewellery/${selectedJewellery.category}`,
                level: 1,
              },
              {
                title: selectedJewellery.type || " ",
                link: `/jewellery/${selectedJewellery.category}/${selectedJewellery.type}`,
                level: 2,
              },
              {
                title: selectedJewellery.name || " ",
                link: "", // TODO here
                level: 3,
              },
            ]}
          />
        </div>
      )}
      <div className="flex flex-col mx-auto w-[96%] md:w-[95%] lg:w-[93%] xl:w-[90%] 2xl:w-[80%] mt-3">
        {!isLoading && (
          <HeaderJewelleryDetails
            category_name={dataJewellery.category}
            route={3}
            price={0}
            data={dataDiamond}
          />
        )}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[500px]">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row w-full mt-4 lg:space-x-10">
            <div className="w-[90%] lg:w-[40%] mx-auto ">
              <div className="flex flex-col items-center justify-center w-full h-[450px] lg:h-[380px] xl:h-[420px] 2xl:h-[470px] mb-3">
                <div className="border w-full h-full">
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      className="max-w-full max-h-[90%] flex items-center justify-center"
                      alt={dataJewellery.name}
                    />
                  )}
                </div>
                <h6 className="sub-color text-center mt-4">
                  Sample image Shown with a 1.00 ct Diamond
                </h6>
              </div>
              <div className="max-w-[100%] flex flex-row justify-start flex-wrap mt-3">
                {dataJewellery.image_lines.map((line: any) => {
                  if (
                    `${selectedShape} - ${selectedColor}` ==
                    line.image_type_name
                  ) {
                    return (
                      <div key={line.id}>
                        <div className="flex flex-row flex-wrap">
                          {line.images_urls &&
                            line.images_urls.map((image: any, i: any) => (
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
                {dataJewellery?.category
                  .toLocaleLowerCase()
                  .includes("rings") &&
                  !dataJewellery?.category
                    .toLocaleLowerCase()
                    .includes("earr") &&
                  !dataJewellery.type.toLocaleLowerCase().includes("band") && (
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
            <div className="w-[90%] mx-auto lg:w-[50%] xl:w-[53%] mb-4">
              <Facture
                data={[
                  {
                    data: dataDiamond,
                    type: "Diamond",
                  },
                  {
                    data: {
                      ...dataJewellery,
                      ttlprice: selectedJewellery.price,
                    },
                    type: "Jewellery",
                  },
                ]}
                setRingSize={setSelectedRingSize}
                showSizeRequired={showSizeRequired}
                seconddataDiamond={seconddataDiamond}
                isEarring={
                  secondselectedDiamond.diamond_id != undefined &&
                  secondselectedDiamond.diamond_id != 0
                }
              />
              <p className="text-[20px] text-[#000] font-semibold pb-2">
                {secondselectedDiamond.diamond_id != undefined &&
                secondselectedDiamond.diamond_id != 0
                  ? "Total (ex VAT) :"
                  : "Subtotal Price (ex VAT) :"}
                <span className="text-[30px] italic text-[#88787e] font-normal">
                  {secondselectedDiamond.diamond_id != undefined &&
                  secondselectedDiamond.diamond_id != 0
                    ? formatPrice(
                        selectedJewellery.price +
                          dataDiamond.total_sales_price +
                          seconddataDiamond.total_sales_price
                      )
                    : formatPrice(
                        selectedJewellery.price + dataDiamond.total_sales_price
                      )}
                </span>
              </p>
              <button
                onClick={addToCart}
                className="text-[16px] font-normal text-white bg-[#201F41] py-3 px-14 rounded-full capitalize"
              >
                add to cart
              </button>
            </div>
          </div>
        )}
      </div>
      {!isLoading && (
        <div className="w-[96%] md:w-[95%] lg:w-[93%] xl:w-[90%] 2xl:w-[80%] mx-auto flex flex-col lg:flex-row justify-between border-t border-gray-300 pb-4 mb-10 pt-10">
          <div className="w-full lg:w-1/2 pr-8 flex flex-col">
            <div className="flex flex-row">
              <span className="mr-2">
                <img
                  className="w-8 h-8"
                  src={
                    dataJewellery.category
                      ?.toLocaleLowerCase()
                      .includes("earring")
                      ? dataJewellery.type.toLowerCase().includes("hoops")
                        ? Hoops
                        : Earring
                      : dataJewellery.category
                          .toLocaleLowerCase()
                          .includes("pendant")
                      ? Pendant
                      : dataJewellery.category === "Rings"
                      ? Ring
                      : Bracelet
                  }
                />
              </span>
              <div className="flex flex-col space-y-1">
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <p className="text-[18px] text-[#201F41] font-medium underline decoration-4 underline-offset-8">
                    {dataJewellery.category} Information
                  </p>
                </h2>
                <div className="flex flex-row space-x-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-[12px] font-semibold text-[#333]">
                      SKU:
                    </p>
                    <p className="text-[12px] font-semibold text-[#333]">
                      Metal:
                    </p>
                    <p className="text-[12px] font-semibold text-[#333]">
                      Setting Type:
                    </p>
                    <p className="text-[12px] font-semibold text-[#333]">
                      Average Band Width:
                    </p>
                    <p className="text-[12px] font-semibold text-[#333]">
                      Rhodium Plated:
                    </p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-[12px] font-medium text-[#333]">
                      {dataJewellery.sku}
                    </p>
                    <p className="text-[12px] font-medium text-[#333]">
                      {dataJewellery.metal}
                    </p>
                    <p className="text-[12px] font-medium text-[#333]">
                      Prong Setting
                    </p>
                    <p className="text-[12px] font-medium text-[#333]">None</p>
                    <p className="text-[12px] font-medium text-[#333]">Yes</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 pt-10 lg:pt-20">
              <div className="flex flex-row items-start">
                <span className="mr-2">
                  <img className="w-8" src={Tick} />
                </span>
                <div className="flex flex-col space-y-3">
                  <h2 className="text-lg font-semibold mb-2 flex items-center">
                    <p className="text-[18px] text-[#201F41] font-medium underline decoration-4 underline-offset-8">
                      Included In Your Order{" "}
                    </p>
                  </h2>
                  <p className="text-[16px] font-medium">
                    Free Secure Shipping
                  </p>
                  <p className="text-[16px] font-medium">
                    Diamond Grading Report
                  </p>
                  <p className="text-[16px] font-medium">
                    Free Lifetime Warranty
                  </p>
                  <p className="text-[16px] font-medium">
                    30 Days Money Back Guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 pt-10 lg:pt-0">
            <div className="flex flex-row">
              <span className="mr-2">
                <img className="w-8 h-8" src={Stone} />
              </span>
              <div className="flex flex-col space-y-1">
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <p className="text-[18px] text-[#201F41] font-medium underline decoration-4 underline-offset-8">
                    Diamond Information
                  </p>
                </h2>
                <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row justify-between lg:space-x-32">
                  <div className="flex flex-col">
                    {seconddataDiamond && (
                      <div className="border-[#5555] border-[1px] px-1 max-w-min mb-2">
                        <p
                          className="text-[#211f41] text-[20px] text-nowrap"
                          style={{
                            fontFamily: '"Plain Light", sans-serif',
                          }}
                        >
                          Diamond 1
                        </p>
                      </div>
                    )}
                    <div className="flex flex-row space-x-2 items-start">
                      <div className="flex flex-col space-y-1">
                        <p className="text-[12px] font-bold text-[#666]">
                          Type:
                        </p>
                        <p className="text-[12px] font-bold text-[#666]">
                          Number of Stones:
                        </p>
                        <p className="text-[12px] font-bold text-[#666]">
                          SKU:
                        </p>
                        <p className="text-[12px] font-bold text-[#666]">
                          Carat:
                        </p>
                        <p className="text-[12px] font-bold text-[#666]">
                          Shape:
                        </p>
                        <p className="text-[12px] font-bold text-[#666]">
                          Cut:
                        </p>
                        <p className="text-[12px] font-bold text-[#666]">
                          Color:
                        </p>
                        <p className="text-[12px] font-bold text-[#666]">
                          Clarity:
                        </p>
                        <p className="text-[12px] font-bold text-[#666]">
                          Polish:
                        </p>
                        <p className="text-[12px] font-bold text-[#666]">
                          Symmetry:
                        </p>
                        <p className="text-[12px] font-bold text-[#666]">
                          Fluorescence:
                        </p>
                        <p className="text-[12px] font-bold text-[#666]">
                          Lab:
                        </p>
                        <p className="text-[12px] font-bold text-[#666]">
                          Dimentions:
                        </p>
                        <p className="text-[12px] font-bold text-[#666]">
                          Culet:
                        </p>
                        <p className="text-[12px] font-bold text-[#666]">
                          Table:
                        </p>
                        <p className="text-[12px] font-bold text-[#666]">
                          Depth:
                        </p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <p className="text-[12px] font-medium text-[#666]">
                          Center stone
                        </p>
                        <p className="text-[12px] font-medium text-[#666]">1</p>
                        <p className="text-[12px] font-medium text-[#666]">
                          {dataDiamond.sku || "\u00A0"}
                        </p>
                        <p className="text-[12px] font-medium text-[#666]">
                          {dataDiamond.diamond_size || "\u00A0"}
                        </p>
                        <p className="text-[12px] font-medium text-[#666]">
                          {dataDiamond.shape?.value_name || "\u00A0"}
                        </p>
                        <p className="text-[12px] font-medium text-[#666]">
                          {dataDiamond.cut?.value_name || "--"}
                        </p>
                        <p className="text-[12px] font-medium text-[#666]">
                          {dataDiamond.color?.value_name || "\u00A0"}
                        </p>
                        <p className="text-[12px] font-medium text-[#666]">
                          {dataDiamond.clarity?.value_name || "\u00A0"}
                        </p>
                        <p className="text-[12px] font-medium text-[#666]">
                          {dataDiamond.polish?.value_name || "\u00A0"}
                        </p>
                        <p className="text-[12px] font-medium text-[#666]">
                          {dataDiamond.symmetry?.value_name || "\u00A0"}
                        </p>
                        <p className="text-[12px] font-medium text-[#666]">
                          {dataDiamond.fluor_intensity?.value_name || "\u00A0"}
                        </p>
                        <p className="text-[12px] font-medium text-[#666]">
                          {dataDiamond.lab || "\u00A0"}
                        </p>
                        <p className="text-[12px] font-medium text-[#666]">
                          {dataDiamond?.meas_depth || "\u00A0"}*
                          {dataDiamond?.meas_length || "\u00A0"}*
                          {dataDiamond?.meas_width || "\u00A0"}mm
                        </p>
                        <p className="text-[12px] font-medium text-[#666]">N</p>
                        <p className="text-[12px] font-medium text-[#666]">
                          {dataDiamond?.table || "\u00A0"}%
                        </p>
                        <p className="text-[12px] font-medium text-[#666]">
                          {dataDiamond?.depth || "\u00A0"}%
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleOpenPdf}
                      className="btn px-3 flex flex-row items-center space-x-1 mx-auto rounded-full text-[16px] bg-[#201f41] text-white mt-2 text-nowrap"
                    >
                      <FaFilePdf />
                      <p>View Grading Report</p>
                    </button>
                    {selectedJewellery?.type
                      .toLocaleLowerCase()
                      .includes("three") && (
                      <div className="flex flex-col space-y-1 mt-4">
                        <h2 className="text-lg font-semibold mb-3 flex items-center">
                          <p className="text-[18px] text-[#201F41] font-medium underline decoration-[3px] underline-offset-8">
                            Side Stone
                          </p>
                        </h2>
                        <div className="flex flex-row space-x-2">
                          <div className="flex flex-col space-y-1">
                            <p className="text-[12px] font-semibold text-[#666]">
                              Number of Stones:
                            </p>
                            <p className="text-[12px] font-semibold text-[#666]">
                              Shape:
                            </p>
                            <p className="text-[12px] font-semibold text-[#666]">
                              Minimum Total Carat:
                            </p>
                            <p className="text-[12px] font-semibold text-[#666]">
                              Average Cut:
                            </p>
                            <p className="text-[12px] font-semibold text-[#666]">
                              Clarity:
                            </p>
                            <p className="text-[12px] font-semibold text-[#666]">
                              Average Color:
                            </p>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <p className="text-[12px] font-medium text-[#666]">
                              {selectedJewellery.addedValues
                                ?.number_of_stones || "\u00A0"}
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              {selectedJewellery.addedValues?.shape ||
                                selectedShape ||
                                "\u00A0"}
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              {selectedJewellery.addedValues?.carat || "\u00A0"}
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              {selectedJewellery.addedValues?.cut || "--"}
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              {selectedJewellery.addedValues?.clarity ||
                                "\u00A0"}
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              {selectedJewellery.addedValues?.color || "\u00A0"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {seconddataDiamond && (
                    <div className="flex flex-col">
                      <div className="border-[#5555] border-[1px] px-1 max-w-min mb-2">
                        <p
                          className="text-[#211f41] text-[20px] text-nowrap"
                          style={{
                            fontFamily: '"Plain Light", sans-serif',
                          }}
                        >
                          Diamond 2
                        </p>
                      </div>
                      <div className="flex flex-row space-x-2 items-start">
                        <div className="flex flex-col space-y-1">
                          <p className="text-[12px] font-bold text-[#666]">
                            Type:
                          </p>
                          <p className="text-[12px] font-bold text-[#666]">
                            Number of Stones:
                          </p>
                          <p className="text-[12px] font-bold text-[#666]">
                            SKU:
                          </p>
                          <p className="text-[12px] font-bold text-[#666]">
                            Carat:
                          </p>
                          <p className="text-[12px] font-bold text-[#666]">
                            Shape:
                          </p>
                          <p className="text-[12px] font-bold text-[#666]">
                            Cut:
                          </p>
                          <p className="text-[12px] font-bold text-[#666]">
                            Color:
                          </p>
                          <p className="text-[12px] font-bold text-[#666]">
                            Clarity:
                          </p>
                          <p className="text-[12px] font-bold text-[#666]">
                            Polish:
                          </p>
                          <p className="text-[12px] font-bold text-[#666]">
                            Symmetry:
                          </p>
                          <p className="text-[12px] font-bold text-[#666]">
                            Fluorescence:
                          </p>
                          <p className="text-[12px] font-bold text-[#666]">
                            Lab:
                          </p>
                          <p className="text-[12px] font-bold text-[#666]">
                            Dimentions:
                          </p>
                          <p className="text-[12px] font-bold text-[#666]">
                            Culet:
                          </p>
                          <p className="text-[12px] font-bold text-[#666]">
                            Table:
                          </p>
                          <p className="text-[12px] font-bold text-[#666]">
                            Depth:
                          </p>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <p className="text-[12px] font-medium text-[#666]">
                            Center stone
                          </p>
                          <p className="text-[12px] font-medium text-[#666]">
                            1
                          </p>
                          <p className="text-[12px] font-medium text-[#666]">
                            {seconddataDiamond.sku || "\u00A0"}
                          </p>
                          <p className="text-[12px] font-medium text-[#666]">
                            {seconddataDiamond.diamond_size || "\u00A0"}
                          </p>
                          <p className="text-[12px] font-medium text-[#666]">
                            {seconddataDiamond.shape?.value_name || "\u00A0"}
                          </p>
                          <p className="text-[12px] font-medium text-[#666]">
                            {seconddataDiamond.cut?.value_name || "--"}
                          </p>
                          <p className="text-[12px] font-medium text-[#666]">
                            {seconddataDiamond.color?.value_name || "\u00A0"}
                          </p>
                          <p className="text-[12px] font-medium text-[#666]">
                            {seconddataDiamond.clarity?.value_name || "\u00A0"}
                          </p>
                          <p className="text-[12px] font-medium text-[#666]">
                            {seconddataDiamond.polish?.value_name || "\u00A0"}
                          </p>
                          <p className="text-[12px] font-medium text-[#666]">
                            {seconddataDiamond.symmetry?.value_name || "\u00A0"}
                          </p>
                          <p className="text-[12px] font-medium text-[#666]">
                            {seconddataDiamond.fluor_intensity?.value_name ||
                              "\u00A0"}
                          </p>
                          <p className="text-[12px] font-medium text-[#666]">
                            {seconddataDiamond.lab || "\u00A0"}
                          </p>
                          <p className="text-[12px] font-medium text-[#666]">
                            {seconddataDiamond?.meas_depth || "\u00A0"}*
                            {seconddataDiamond?.meas_length || "\u00A0"}*
                            {seconddataDiamond?.meas_width || "\u00A0"}mm
                          </p>
                          <p className="text-[12px] font-medium text-[#666]">
                            N
                          </p>
                          <p className="text-[12px] font-medium text-[#666]">
                            {seconddataDiamond?.table || "\u00A0"}%
                          </p>
                          <p className="text-[12px] font-medium text-[#666]">
                            {seconddataDiamond?.depth || "\u00A0"}%
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleOpenSecondPdf}
                        className="btn px-3 flex flex-row items-center space-x-1 mx-auto rounded-full text-[16px] bg-[#201f41] text-white mt-2 text-nowrap"
                      >
                        <FaFilePdf />
                        <p>View Grading Report</p>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Contact />
      <RingStylerPlayer
        showVitrualStyler={showVitrualStyler}
        setshowVitrualStyler={setshowVitrualStyler}
      />
    </div>
  );
};

export default MakeOrder;
