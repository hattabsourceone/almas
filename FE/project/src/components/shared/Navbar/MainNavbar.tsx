import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Cookies from "js-cookie";
import LoadLogo from "../LoadLogo/LoadLogo";
import { BiDollar } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import SocialMediaLinks from "./SocialMediaLinks";
import { Link, useNavigate } from "react-router-dom";
import useUser from "@components/hooks/useUser";
import useAuth from "@components/hooks/useAuth";
import { BASE_URL } from "@components/api/api";
import axios from "axios";
import { MdNoPhotography, MdShoppingCart } from "react-icons/md";
import { useCart } from "@components/context/cartProvider";
import { PiArrowBendUpRightBold } from "react-icons/pi";
import shapeImages from "@assets/default/default_img";
import RightNav from "./RightNav";

type RingSizeMap = { [key: number]: string };

const MainNavbar: React.FC = () => {
  const { user, setUser } = useUser();
  const { currentTokenRef, currentUIDRef, setCurrentToken, setCurrentUID } =
    useAuth();
  const { cart, total, removeFromCart, toggleCart } = useCart();
  const { setAuth } = useAuth();
  const { isAuth } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState<boolean>(false);
  const showCartRef = useRef<boolean>();
  const showDropDownRef = useRef<boolean>();
  const shoppingCartRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const dropDownButtonRef = useRef<HTMLButtonElement>(null);
  const session_id = Cookies.get("session_id_token") || currentTokenRef.current;
  const uid: number = Number(Cookies.get("uid") || currentUIDRef.current);

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const removeFromCartRequest = async (itemId: string, type: string) => {
    try {
      const body = {
        session_id: session_id,
        uid: uid,
        product_type: type,
        product_id: itemId,
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/remove_from_cart`,
        body
      );
      if (response.status === 200) {
        // TODO add notification
      }
    } catch (error) {
      console.log("add to wishlist:", error);
    }
  };

  const handleToggleCart = (event: any) => {
    event.preventDefault();
    setShowCart(!showCart);
    event.stopPropagation();
  };

  const handleClickOutside = (event: any) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearch(false);
    }

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      dropDownButtonRef.current &&
      !dropDownButtonRef.current.contains(event.target) &&
      showDropDownRef.current
    ) {
      setShowDropdown(false);
    }

    if (
      shoppingCartRef.current &&
      !shoppingCartRef.current.contains(event.target) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(event.target) &&
      showCartRef.current
    ) {
      setShowCart(false);
    }
  };

  useEffect(() => {
    toggleCart();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  useEffect(() => {
    showCartRef.current = showCart;
  }, [showCart]);

  useEffect(() => {
    showDropDownRef.current = showDropdown;
  }, [showDropdown]);

  const handleSearch = () => {
    navigate(`/search-inventory/all-diamond`);
    /* if (searchKeyword.trim() !== "") {
      navigate(`/search-inventory/all-diamond?query=${encodeURIComponent(searchKeyword)}`);
      setShowSearch(false);
    } */
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("session_id_token");
    Cookies.remove("uid");
    Cookies.set("session_id_token", "guest",);
    Cookies.set("uid", "guest",);
    setCurrentToken(undefined);
    setCurrentUID(undefined);
    localStorage.removeItem("cart");
    localStorage.removeItem("compareDiamonds");
    localStorage.removeItem("wishList");
    toggleCart();
    setAuth(false);
    setShowDropdown(false);
    navigate("/");
  };

  const navigateToRoute = (route: string) => {
    navigate(`/${route}`);
    setShowDropdown(false);
  };

  const SmallShapeImage = (shape: any) => {
    const key = shape["shape"].includes("Cushion")
      ? "cushion"
      : shape["shape"].toLowerCase();
    const imageSrc = shapeImages[key];
    if (imageSrc) {
      return <img className="max-h-full max-w-full" src={imageSrc} alt="diamond" />;
    } else {
      return <MdNoPhotography className="max-h-full max-w-full" />;
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleScreenChange = () => {
      setIsLargeScreen(mediaQuery.matches);
    };

    handleScreenChange();

    mediaQuery.addEventListener("change", handleScreenChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  return (
    <>
      <div>
        {isLargeScreen ? (
          <div className="hidden md:block w-full mx-auto bg-[#F5F5F5]">
            <div className="hidden md:flex md:w-[90%] lg:w-[87%] xl:w-[95%] 2xl:w-[79%] mx-auto bg-[#F5F5F5] justify-around items-center flex-row h-14 md:h-14">
              <div className="w-1/3 flex justify-start">
                <SocialMediaLinks />
              </div>
              <div className="w-1/3 flex justify-center">
                <LoadLogo />
              </div>
              <RightNav
                showCart={showCart}
                shoppingCartRef={shoppingCartRef}
                cart={cart}
                getRingSizeName={getRingSizeName}
                removeFromCart={removeFromCart}
                removeFromCartRequest={removeFromCartRequest}
                total={total}
                setShowCart={setShowCart}
                navigate={navigate}
                toggleButtonRef={toggleButtonRef}
                handleToggleCart={handleToggleCart}
                isAuth={isAuth}
                dropDownButtonRef={dropDownButtonRef}
                setShowDropdown={setShowDropdown}
                showDropdown={showDropdown}
                dropdownRef={dropdownRef}
                navigateToRoute={navigateToRoute}
                logout={logout}
                searchRef={searchRef}
                handleSearch={handleSearch}
                showSearch={showSearch}
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                handleKeyDown={handleKeyDown}
                SmallShapeImage={SmallShapeImage}
              />
            </div>
          </div>
        ) : (
          <div className="py-2 bg-[#F5F5F5] flex flex-row justify-between px-2">
            <RightNav
              showCart={showCart}
              shoppingCartRef={shoppingCartRef}
              cart={cart}
              getRingSizeName={getRingSizeName}
              removeFromCart={removeFromCart}
              removeFromCartRequest={removeFromCartRequest}
              total={total}
              setShowCart={setShowCart}
              navigate={navigate}
              toggleButtonRef={toggleButtonRef}
              handleToggleCart={handleToggleCart}
              isAuth={isAuth}
              dropDownButtonRef={dropDownButtonRef}
              setShowDropdown={setShowDropdown}
              showDropdown={showDropdown}
              dropdownRef={dropdownRef}
              navigateToRoute={navigateToRoute}
              logout={logout}
              searchRef={searchRef}
              handleSearch={handleSearch}
              showSearch={showSearch}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              handleKeyDown={handleKeyDown}
              SmallShapeImage={SmallShapeImage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MainNavbar;
