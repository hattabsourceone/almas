import shapeImages from "@assets/default/default_img";
import { BASE_URL } from "@components/api/api";
import { useCart } from "@components/context/cartProvider";
import useAuth from "@components/hooks/useAuth";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdNoPhotography } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import circle from "@assets/LandingPage/Collections/circle.png";
import ShoppingCartImageCard from "./ShoppingCartImageCard";

type RingSizeMap = { [key: number]: string };

const ShoppingCartList: React.FC = () => {
  const { cart: providerCart, toggleCart, total } = useCart();
  const { currentTokenRef, currentUIDRef } = useAuth();
  const [shoppinglist, setShoppinglist] = useState<any[]>([...providerCart]);
  const navigate = useNavigate();
  const session_id = Cookies.get("session_id_token") || currentTokenRef.current;
  const uid: number =
    Number(Cookies.get("uid")) || Number(currentUIDRef.current);

  const getCartItemsRequest = async () => {
    try {
      const body = {
        session_id: session_id,
        uid: uid,
      };
      const response = await axios.post(`${BASE_URL}/api/v1/get_cart`, body);
      if (response.status === 200) {
        const diamondList = response.data.cart.diamond;
        console.log("resp,", [...diamondList, ...response.data.cart.jewellery]);
        setShoppinglist([...diamondList, ...response.data.cart.jewellery]);
        localStorage.setItem(
          "cart",
          JSON.stringify([...diamondList, ...response.data.cart.jewellery])
        );
        console.log("response.data --------------", response.data);
      }
    } catch (error) {
      console.log("getCartItemsRequest:", error);
    }
  };

  const ringSizeMap: RingSizeMap = {
    252: "US 3",
    253: "US 3.5",
    254: "US 4",
    255: "US 4.5",
    256: "US 5",
    257: "US 5.5",
    258: "US 6",
    259: "US 6.5",
    260: "US 7",
    261: "US 7.5",
    262: "US 8",
    263: "US 8.5",
    264: "US 9",
  };

  function getRingSizeName(ringSizeValue: number | string): string {
    const value =
      typeof ringSizeValue === "string"
        ? parseInt(ringSizeValue)
        : ringSizeValue;
    return ringSizeMap[value] || "Unknown size";
  }

  const removeFromCart = async (id: string, type: string) => {
    const cart = localStorage.getItem("cart");
    const newCart = cart ? JSON.parse(cart) : [];
    const index = newCart.findIndex((item: any) => item.id === id);
    if (index > -1) {
      newCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    setShoppinglist((prevShopCart) =>
      prevShopCart.filter((item) => item.id !== id)
    );
    toggleCart();
    try {
      const body = {
        session_id: session_id,
        uid: uid,
        product_type: type,
        product_id: id,
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/remove_from_cart`,
        body
      );
      if (response.status === 200) {
        // TODO add notification
      }
    } catch (error) {
      console.log("add to cart:", error);
    }
  };

  const SmallShapeImage = (shape: any) => {
    const key = shape["shape"].includes("Cushion")
      ? "cushion"
      : shape["shape"].toLowerCase();
    const imageSrc = shapeImages[key];
    if (imageSrc) {
      return (
        <img
          className="max-h-full max-w-full object-cover"
          src={imageSrc}
          alt="diamond"
        />
      );
    } else {
      return <MdNoPhotography className="max-h-full max-w-full object-cover" />;
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

  useEffect(() => {
    document.title = "Shopping Cart";
    getCartItemsRequest();
  }, []);

  return (
    <div className="flex flex-col mt-2">
      <div className="w-full -ml-7 md:-ml-4 lg:-ml-12 xl:-ml-10 2xl:ml-0">
        <Breadcrumb
          menu={[
            {
              title: "Account",
              link: "/profile",
              level: 1,
            },
            {
              title: "Shopping cart",
              link: "/profile/shopping-cart",
              level: 1,
            },
          ]}
        />
      </div>
      <div className="flex flex-col w-[95%] md:w-[90%] lg:w-[82%] xl:w-[80%] 2xl:w-[71%] mx-auto mb-10">
        <div className="flex flex-row justify-between w-full mx-auto mt-8">
          <div
            className="bg-no-repeat bg-contain py-8 bg-start md:bg-center"
            style={{
              backgroundImage: `url(${circle})`,
            }}
          >
            <p className="text-[#211F41] text-[28px] md:text-[40px] font-medium mb-12 md:mb-0 leading-[30px] md:leading-[45px]">
              SHOPPING <br /> CART
            </p>
          </div>
          <button
            onClick={() => {
              navigate("/search-inventory/all-diamond");
            }}
            className="flex flex-row mb-4 md:mb-0 items-center space-x-2 text-[#211F41] text-xl italic font-medium"
          >
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
            <p className="text-[16px] md:text-[24px] text-[#201f41] italic">
              Continue Shopping
            </p>
          </button>
        </div>
        {shoppinglist.length === 0 ? (
          <div className="flex flex-col w-full mx-auto items-start pb-10">
            <p className="text-base pb-4 text-[14px] text-[#333]">
              Your shopping cart is empty.
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:justify-between w-full h-auto mx-auto lg:space-x-4 justify-center items-center lg:items-start space-y-10 lg:space-y-0">
            <div className="flex flex-col w-[99%] lg:w-[67%] xl:w-[67%] 2xl:w-[67%] border rounded-md">
              <div className="bg-[#211F41] text-[24px] text-white text-center font-medium py-3 rounded-t-md">
                Cart Summary
              </div>
              <div className="p-2 xl:p-4 mx-1 pt-0">
                {shoppinglist.map((item: any, index: number) => (
                  <li
                    key={item.id}
                    className="flex flex-col pt-4 justify-between items-start w-full rounded-lg"
                  >
                    <div className="flex flex-row w-full justify-between items-start">
                      <div className="flex flex-wrap flex-row items-start">
                        <ShoppingCartImageCard
                          item={item}
                          SmallShapeImage={SmallShapeImage}
                        />
                        {item.name ? (
                          <div className="flex flex-row ml-3 xl:ml-14">
                            <div className="flex flex-col space-y-2 min-w-[120px] xl:min-w-[170px]">
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Product Name:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Metal:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Shape:
                              </h6>
                              {item.ring_size && (<h6 className="text-[13px] font-medium text-[#333333]">
                                {item?.category
                                  .toLowerCase()
                                  .includes("pendant")
                                  ? "Chain Length:"
                                  : "Ring Size:"}
                              </h6>)}
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                SKU:
                              </h6>
                            </div>
                            <div className="flex flex-col space-y-2 min-w-[120px] xl:min-w-[170px]">
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.name || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.metal[item.metal_id] ||
                                  item.metal.name ||
                                  "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.final_shape || item.shape || "\u00A0"}
                              </h6>
                              {item.ring_size && (<h6 className="text-[13px] font-medium text-[#888]">
                                {(item?.category
                                  .toLowerCase()
                                  .includes("pendant")
                                  ? `${item.ring_size} Inches`
                                  : item.ring_size) || "\u00A0"}
                              </h6>)}
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.sku || "\u00A0"}
                              </h6>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-row items-start ml-3 xl:ml-14">
                            <div className="flex flex-col space-y-2 min-w-[120px] xl:min-w-[170px]">
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Product Name:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Carat:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Shape:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Cut:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Color:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Clarity:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Polish:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Symmetry:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Fluorescence:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Lab:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                SKU:
                              </h6>
                            </div>
                            <div className="flex flex-col space-y-2 min-w-[120px] xl:min-w-[170px]">
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {Number(item.diamond_size).toFixed(2)} Caret{" "}
                                {item.shape.value_name}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {Number(item.diamond_size).toFixed(2) ||
                                  "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.shape.value_name || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.cut.value_name || "--"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.color.value_name || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.clarity.value_name || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.polish.value_name || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.symmetry.value_name || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.fluor_intensity.value_name || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.lab || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.diamond_id || "\u00A0"}
                              </h6>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2 items-end">
                        <h6 className="font-medium text-[13px] text-[#333333]">
                          Price:{" "}
                          <span className="text-[18px] text-[#000] font-medium">
                            {formatPrice(
                              item.final_price ||
                                item.total_sales_price ||
                                item.price
                            )}
                          </span>
                        </h6>
                        <button
                          onClick={() => {
                            removeFromCart(
                              item.id,
                              item.total_sales_price ? "diamond" : "jewellery"
                            );
                          }}
                          className="font-medium text-[14px] bg-[#211f41] text-white py-[2px] rounded-full flex flex-row items-center justify-center space-x-1 w-min px-[10px]"
                        >
                          <i className="fa fa-times" aria-hidden="true"></i>
                          <p>Remove</p>
                        </button>
                      </div>
                    </div>
                    {shoppinglist.length - 1 != index && (
                      <hr className="w-full border-white opacity-10 rounded-md border-2 mt-3" />
                    )}
                  </li>
                ))}
              </div>
            </div>
            <div className="flex flex-col w-[99%] lg:w-[30%] xl:w-[30%] 2xl:w-[31%]">
              <div className="flex flex-col border border-gray-300 h-min">
                <div className="text-right text-sm text-gray-600 font-semibold">
                  <div className="flex flex-row items-center justify-center border-b border-gray-300 p-2 h-[61px]">
                    <p className="text-[24px] text-[#88787e] font-medium">
                      Item Total
                    </p>
                  </div>
                  <div className="flex flex-row items-center border-b border-gray-100 p-2 h-[61px] w-full">
                    <p className="text-[13px] text-[#333333] font-normal w-[55%] text-start px-4">
                      Sub Total
                    </p>
                    <p className="text-[16px] text-[#88787e] font-normal">
                      {formatPrice(total)}
                    </p>
                  </div>
                  <div className="flex flex-row items-center border-b border-gray-100 p-2 h-[61px] w-full">
                    <p className="text-[13px] text-[#333333] font-normal w-[55%] text-start px-4">
                      VAT (5%)
                    </p>
                    <p className="text-[16px] text-[#88787e] font-normal">
                      {formatPrice((total * 5) / 100)}
                    </p>
                  </div>
                  <div className="flex flex-row items-center border-b border-gray-100 p-2 h-[61px]">
                    <p className="text-[13px] text-[#333333] font-normal w-[55%] text-start px-4">
                      Total
                    </p>
                    <p className="text-[16px] text-[#88787e] font-normal">
                      {formatPrice(total + (total * 5) / 100)}
                    </p>{" "}
                  </div>
                  <div className="flex flex-col items-center bg-[#efefef] p-2 py-3 relative">
                    <p className="text-base text-[#88787e] font-normal w-full text-start pl-2">
                      For Orders shipping within the United Arab Emirates, sales
                      tax will be added at checkout.
                    </p>
                    <p className="text-base text-[#88787e] font-normal w-full text-start pl-2 pt-2 pb-8">
                      VAT (sales tax) and duty charges that may apply to
                      international shipping are the responsibility of the
                      customer.
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  navigate("/checkout");
                }}
                className="rounded-full bg-[#211F41] text-white py-1 px-4 h-[60px] w-[230px] mx-auto -mt-[30px] z-10"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Contact />
    </div>
  );
};

export default ShoppingCartList;
