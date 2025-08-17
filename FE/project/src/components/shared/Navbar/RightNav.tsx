import React from "react";
import { Link, NavigateFunction } from "react-router-dom";

import { IoSearch } from "react-icons/io5";
import { BiDollar } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { PiArrowBendUpRightBold } from "react-icons/pi";
import { CartItem } from "../DiamondActions/DiamondActions";
import PopupImageCard from "./PopupImageCard";

interface RightNavProps {
  showCart: boolean;
  shoppingCartRef: React.RefObject<HTMLDivElement>;
  cart: CartItem[];
  getRingSizeName: (ringSizeValue: number | string) => string;
  removeFromCart: (itemId: string) => void;
  removeFromCartRequest: (itemId: string, type: string) => Promise<void>;
  total: number;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
  toggleButtonRef: React.RefObject<HTMLButtonElement>;
  handleToggleCart: (event: any) => void;
  isAuth: boolean | undefined;
  dropDownButtonRef: React.RefObject<HTMLButtonElement>;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  showDropdown: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  navigateToRoute: (route: string) => void;
  logout: () => void;
  searchRef: React.RefObject<HTMLDivElement>;
  handleSearch: () => void;
  showSearch: boolean;
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  SmallShapeImage: (shape: any) => JSX.Element;
}

const RightNav: React.FC<RightNavProps> = ({
  showCart,
  shoppingCartRef,
  cart,
  removeFromCart,
  removeFromCartRequest,
  total,
  setShowCart,
  navigate,
  toggleButtonRef,
  handleToggleCart,
  isAuth,
  dropDownButtonRef,
  setShowDropdown,
  showDropdown,
  dropdownRef,
  navigateToRoute,
  logout,
  searchRef,
  handleSearch,
  showSearch,
  searchKeyword,
  setSearchKeyword,
  handleKeyDown,
  SmallShapeImage,
}) => {
  function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price || 0);
  }

  console.log("cart --------------", cart);

  return (
    <div className="bg-transparent md:bg-white w-[99%] md:mx-0 md:w-1/3 flex justify-between md:justify-end items-center">
      <ul className="flex flex-row justify-between w-[99%] md:w-min space-x-1 items-center">
        {showCart && (
          <div
            ref={shoppingCartRef}
            className={`absolute z-100 right-1 sm:right-8 md:right-24 bg-slate-100 shadow-lg p-2 min-w-[370px] sm:min-w-[440px] md:min-w-[455px] mt-24 overflow-y-auto z-50 border-[#201F41] border-8 ${
              cart.length > 0 ? "max-h-[60vh] min-h-[4rem]" : "h-auto"
            }`}
          >
            <ul className="flex flex-col space-y-3">
              {cart.length > 0 ? (
                <div className="flex flex-col space-y-3">
                  {cart.map((item: any, index: number) => (
                    <li
                      key={item.id}
                      className="flex flex-col justify-between items-start w-full rounded-lg"
                    >
                      <div className="flex flex-row w-full justify-between items-start">
                        <div className="flex flex-row items-start">
                          <PopupImageCard
                            item={item}
                            SmallShapeImage={SmallShapeImage}
                          />
                          {item.name ? (
                            <div className="ml-4 flex flex-col space-y-1">
                              <h6 className="text-[12px] font-medium text-[#201F41]">
                                {item.name || "\u00A0"}
                              </h6>
                              <h6 className="text-[10px] font-medium text-[#666]">
                                Metal:-{" "}
                                {item.metal[item.metal_id] ||
                                  item.metal.name ||
                                  "\u00A0"}
                              </h6>
                              <h6 className="text-[10px] font-medium text-[#666]">
                                Shape:-{" "}
                                {item.final_shape || item.shape || "\u00A0"}
                              </h6>
                              {item.ring_size && (
                                <h6 className="text-[10px] font-medium text-[#666]">
                                  {item?.category
                                    .toLowerCase()
                                    .includes("pendant")
                                    ? "Chain Length:"
                                    : "Ring Size:"}
                                  -{" "}
                                  {(item?.category
                                    .toLowerCase()
                                    .includes("pendant")
                                    ? `${item.ring_size} Inches`
                                    : item.ring_size || "\u00A0") || "\u00A0"}
                                </h6>
                              )}
                              <h6 className="text-[10px] font-medium text-[#666]">
                                SKU:- {item.sku || "\u00A0"}
                              </h6>
                            </div>
                          ) : (
                            <div className="ml-4 flex flex-col space-y-1">
                              <h6 className="text-[12px] font-medium text-[#201F41]">
                                {item.diamond_size} Caret{" "}
                                {item.shape.value_name}
                              </h6>
                              <h6 className="text-[10px] font-medium text-[#666]">
                                Cut:- {item.cut.value_name || "--"}
                              </h6>
                              <h6 className="text-[10px] font-medium text-[#666]">
                                Color:- {item.color.value_name || ""}
                              </h6>
                              <h6 className="text-[10px] font-medium text-[#666]">
                                Clarity:- {item.clarity.value_name || ""}
                              </h6>
                              <h6 className="text-[10px] font-medium text-[#666]">
                                Lab:- {item.lab || ""}
                              </h6>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-row space-x-2 items-center">
                          <h6 className="text-bold text-[12px] text-[#666]">
                            {formatPrice(
                              item.total_sales_price ||
                                item.final_price ||
                                item.price
                            )}
                          </h6>
                          <button
                            onClick={() => {
                              removeFromCart(item.id);
                              removeFromCartRequest(
                                item.id,
                                item.total_sales_price ? "diamond" : "jewellery"
                              );
                            }}
                            className="bg-[#1f1f41] ml-4 w-[31px] h-[30px] flex items-center justify-center rounded-lg"
                          >
                            <i className="fa fa-times text-white"></i>
                          </button>
                        </div>
                      </div>
                      {index != cart.length - 1 && (
                        <hr className="w-full border-white opacity-10 rounded-md border-2 mt-2" />
                      )}
                    </li>
                  ))}
                  <hr className="w-full border-white opacity-10 rounded-md border-2 mb-0" />
                  <div className="inline-block bg-slate-100 border border-gray-300">
                    <div className="text-right text-[12px] text-[#666] font-semibold">
                      <div className="flex justify-between border-b border-gray-300 p-2">
                        <div className="w-[60%] flex flex-row justify-end">
                          <p>Sub-Total</p>
                          <div className="border border-gray-600 mx-2"></div>
                        </div>
                        <p className="font-medium">{formatPrice(total)}</p>
                      </div>
                      <div className="flex justify-between border-b border-gray-300 p-2">
                        <div className="w-[60%] flex flex-row justify-end">
                          <p>VAT (5%)</p>
                          <div className="border border-gray-600 mx-2"></div>
                        </div>
                        <p className="font-medium">
                          {formatPrice((total * 5) / 100)}
                        </p>
                      </div>
                      <div className="flex justify-between p-2">
                        <div className="w-[60%] flex flex-row justify-end">
                          <p>Total</p>
                          <div className="border border-gray-600 mx-2"></div>
                        </div>
                        <p className="font-medium">
                          {formatPrice(total + (total * 5) / 100)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row w-full mx-auto justify-end space-x-2 mt-3 mb-1">
                    <button
                      onClick={() => {
                        setShowCart(false);
                        navigate("/profile/shopping-cart");
                      }}
                      className="flex flex-row items-center space-x-2 bg-white py-1 px-4"
                    >
                      <i
                        className="fa fa-shopping-cart text-[#1f1f41]"
                        aria-hidden="true"
                      ></i>
                      <p className="text-[12px] font-semibold text-[#211F41]">
                        VIEW CART
                      </p>
                    </button>
                    <button
                      onClick={() => {
                        setShowCart(false);
                        navigate("/checkout");
                      }}
                      className="flex flex-row items-center space-x-2 bg-white py-1 px-4"
                    >
                      <i className="fa fa-share text-[#1f1f41]"></i>
                      <p className="text-[12px] font-semibold text-[#211F41]">
                        CHECKOUT
                      </p>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col justify-content-center align-items-center">
                  <h6 className="text-sm font-medium">
                    Your shopping cart is empty!
                  </h6>
                </div>
              )}
            </ul>
          </div>
        )}
        <div className="flex flex-row w-full m-2 space-x-6 items-center justify-between md:justify-center">
          <button
            ref={toggleButtonRef}
            onClick={handleToggleCart}
            className="flex items-center"
          >
            <li className=" text cursor-pointer">
              <div className="relative py-0 btn btn-outline-none flex flex-row items-center space-x-2 px-0">
                <i className="fa fa-shopping-cart text-[14px]"></i>
                <p
                  className="text-[16px] 2xl:text-[18px] 2xl:font-medium"
                  style={{ fontFamily: '"Plain Light", sans-serif' }}
                >
                  {cart.length}
                </p>
              </div>
            </li>
            <p className="text-[16px] 2xl:text-[18px] pl-1 2xl:font-medium">
              {formatPrice(total)}
            </p>
          </button>
          {isAuth ? (
            <div className="relative">
              <button
                ref={dropDownButtonRef}
                className="space-x-1 flex flex-row cursor-pointer items-center"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <i className="fa fa-user text-[14px] text-[#333333] font-medium"></i>{" "}
                <p className="hidden lg:block uppercase text-[12px] text-[#333333] font-normal text-nowrap">
                  my account
                </p>
                <IoMdArrowDropdown className="navbar-icons-small" />
              </button>
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-4 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-100"
                >
                  <ul>
                    <li
                      onClick={() => navigateToRoute("profile")}
                      className="px-4 py-1 text-xs hover:bg-[#201f41] cursor-pointer hover:text-white"
                    >
                      MY ACCOUNT
                    </li>
                    <li
                      onClick={() => navigateToRoute("profile/orders-history")}
                      className="px-4 py-1 text-xs hover:bg-[#201f41] cursor-pointer hover:text-white"
                    >
                      ORDER HISTORY
                    </li>
                    <li
                      onClick={logout}
                      className="px-4 py-1 text-xs hover:bg-[#201f41] cursor-pointer hover:text-white"
                    >
                      LOGOUT
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/authentification" className="text-xs">
              LOGIN
            </Link>
          )}
          <div className="relative" ref={searchRef}>
            {/* <button onClick={() => handleSearch()}>
              <i className="fa fa-search text-xl text-[#1f1f41] font-medium"></i>
            </button> */}
            {showSearch && (
              <div className="absolute flex flex-row w-60 top-full -mt-4 -ml-64 bg-[#211F41] p-2 rounded shadow-lg">
                <input
                  type="text"
                  placeholder="Search"
                  className="p-2 text-black rounded w-full"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleSearch}
                  className="ml-2 px-3 py-1 text-white  rounded"
                >
                  Go
                </button>
              </div>
            )}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default RightNav;
