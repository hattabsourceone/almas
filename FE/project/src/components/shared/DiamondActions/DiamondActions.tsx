/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { IoCart, IoHeart } from "react-icons/io5";
import Cookies from "js-cookie";
import { BASE_URL } from "@components/api/api";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useCart } from "@components/context/cartProvider";
import { Tooltip } from "@material-tailwind/react";
import useAuth from "@components/hooks/useAuth";

type Props = { data: any; compareCount: () => void; isDetails?: boolean };

export interface CartItem {
  id: string;
  total_sales_price: number;
}

const DiamondActions: React.FC<Props> = ({ data, compareCount, isDetails }) => {
  const { cart: providerCart, toggleCart } = useCart();
  const { currentTokenRef, currentUIDRef } = useAuth();
  let cart = localStorage.getItem("cart");
  const basket = localStorage.getItem("compareDiamonds");
  let newCart: CartItem[] = cart ? JSON.parse(cart) : [];
  const newBasket = basket ? JSON.parse(basket) : [];
  let wishlistBasket = localStorage.getItem("wishList");
  let newWishlistBasket = wishlistBasket ? JSON.parse(wishlistBasket) : [];
  const uid: number = Number(Cookies.get("uid") || currentUIDRef.current);
  const session_id = Cookies.get("session_id_token") || currentTokenRef.current;
  const [isInCart, setIsInCart] = useState<boolean>(
    newCart.some((item: any) => item.id === data.id)
  );
  const [isInCompare, setIsInCompare] = useState<boolean>(
    newBasket.some((item: any) => item.id === data.id)
  );
  const [isInWishlist, setIsInWishlist] = useState<boolean>(
    newWishlistBasket.some((item: any) => item.id === data.id)
  );

  useEffect(() => {
    cart = localStorage.getItem("cart");
    newCart = cart ? JSON.parse(cart) : [];
    setIsInCart(newCart.some((item: any) => item.id === data.id));
  }, [providerCart]);

  const addToCart = async () => {
    cart = localStorage.getItem("cart");
    newCart = cart ? JSON.parse(cart) : [];
    localStorage.setItem("cart", JSON.stringify([...newCart, data]));
    toggleCart();
    await addToCartRequest();
  };

  const removeFromCart = async () => {
    const cart = localStorage.getItem("cart");
    const newCart = cart ? JSON.parse(cart) : [];
    const index = newCart.findIndex((item: any) => item.id === data.id);
    if (index > -1) {
      newCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    toggleCart();
    await removeFromCartRequest();
  };

  const addToWishlist = async () => {
    try {
      wishlistBasket = localStorage.getItem("wishList");
      newWishlistBasket = wishlistBasket ? JSON.parse(wishlistBasket) : [];
      localStorage.setItem(
        "wishList",
        JSON.stringify([...newWishlistBasket, data])
      );
      const body = {
        session_id: session_id,
        uid: uid,
        diamond_id: data.id,
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/add_to_wishlist`,
        body
      );
      setIsInWishlist(true);
      console.log("addToWishlist response here", response.data);

      if (response.status === 200) {
        // TODO add notification
      } else {
        // error there
      }
    } catch (error) {
      console.log("add to wishlist:", error);
    }
  };

  const removeFromWishlist = async () => {
    try {
      wishlistBasket = localStorage.getItem("wishList");
      newWishlistBasket = wishlistBasket ? JSON.parse(wishlistBasket) : [];
      const index = newWishlistBasket.findIndex(
        (item: any) => item.id === data.id
      );
      if (index > -1) {
        newWishlistBasket.splice(index, 1);
        localStorage.setItem("wishList", JSON.stringify(newWishlistBasket));
      }
      setIsInWishlist(true);
      const body = {
        session_id: session_id,
        uid: uid,
        diamond_id: data.id,
      };
      if (session_id && session_id != "guest") {
        const response = await axios.post(
          `${BASE_URL}/api/v1/remove_from_wishlist`,
          body
        );
        console.log("removeFromWishlist response here", response.data);

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

  const addToCompare = async () => {
    try {
      const compareBasket = localStorage.getItem("compareDiamonds");
      const newBasket: any[] = compareBasket ? JSON.parse(compareBasket) : [];
      if (newBasket.length > 4) {
        toast.warning(
          "You can add a maximum of 4 products to the comparison bag.",
          {
            autoClose: 2500,
          }
        );
        return;
      }
      localStorage.setItem(
        "compareDiamonds",
        JSON.stringify([...newBasket, data])
      );
      setIsInCompare(true);
      console.log("send id", data.id);
      if (session_id && session_id != "guest") {
        const response = await axios.post(
          `${BASE_URL}/api/v1/add_to_compare_diamonds`,
          {
            session_id,
            uid,
            diamond_id: data.id,
          }
        );
        console.log("add to compare list:", response.data);

        if (response.status === 200) {
          // TODO
        } else {
          // test failed
        }
      }
    } catch (error) {
      console.log("add to compare:", error);
    }
  };

  const removeFromCompare = async () => {
    try {
      const compareBasket = localStorage.getItem("compareDiamonds");
      const newBasket = compareBasket ? JSON.parse(compareBasket) : [];
      const index = newBasket.findIndex((item: any) => item.id === data.id);
      if (index > -1) {
        newBasket.splice(index, 1);
        localStorage.setItem("compareDiamonds", JSON.stringify(newBasket));
      }
      console.log("remove send id", data.id);
      setIsInCompare(false);
      const body = {
        session_id,
        uid,
        diamond_id: data.id,
      };
      console.log("removebody:", body);
      if (session_id && session_id != "guest") {
        const response = await axios.post(
          `${BASE_URL}/api/v1/remove_from_compare_diamonds`,
          body
        );
        console.log("remove from compare list:", response.data);
        if (response.status === 200) {
          // TODO
        } else {
          // test failed
        }
      }
    } catch (error) {
      console.log("add to compare:", error);
    }
  };

  const addToCartRequest = async () => {
    try {
      if (session_id && session_id != "guest") {
        const body = {
          session_id: session_id,
          uid: uid,
          product_type: "diamond",
          product_id: data.id,
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
      console.log("add to cart:", error);
    }
  };

  const removeFromCartRequest = async () => {
    try {
      if (session_id && session_id != "guest") {
        const body = {
          session_id: session_id,
          uid: uid,
          product_type: "diamond",
          product_id: data.id,
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
      }
    } catch (error) {
      console.log("add to wishlist:", error);
    }
  };
  return isDetails ? (
    <div className="flex flex-row space-x-1 items-center w-full">
      {isInCart ? (
        <button
          className="bg-[#1f1f3c] text-white rounded-full w-[240px] h-14 lg:flex-2"
          onClick={(event) => {
            event.preventDefault();
            removeFromCart();
            setIsInCart(false);
            event.stopPropagation();
          }}
        >
          <div className="flex flex-col space-y-2 items-center justify-center">
            <RiDeleteBin6Fill />
          </div>
        </button>
      ) : (
        <button
          className="bg-[#1f1f3c] text-white rounded-full w-[210px] 2xl:w-[240px] h-14"
          onClick={(event) => {
            event.preventDefault();
            addToCart();
            setIsInCart(true);
            event.stopPropagation();
          }}
        >
          <div className="flex flex-row items-center justify-center">
            <p className="capitalize text-[16px] font-normal text-nowrap">
              add to cart
            </p>
          </div>
        </button>
      )}
      {isInCompare ? (
        <Tooltip
          content={
            <p className="text-sm capitalize py-1">remove from compare</p>
          }
        >
          <button
            onClick={(event) => {
              event.preventDefault();
              removeFromCompare();
              compareCount();
              event.stopPropagation();
            }}
            className="bg-[#333] text-white rounded-md w-10 py-2  relative group"
          >
            <RiDeleteBin6Fill className="mx-auto text-[#777] hover:text-[#333]" />
          </button>
        </Tooltip>
      ) : (
        <Tooltip
          content={<p className="text-sm capitalize py-1">Add to compare</p>}
        >
          <button
            onClick={(event) => {
              event.preventDefault();
              addToCompare();
              compareCount();
              event.stopPropagation();
            }}
            className="bg-[#1f1f3c] text-white rounded-md w-10 py-2  relative group"
          >
            <FaExchangeAlt className="mx-auto text-[#777] hover:text-[#333]" />
          </button>
        </Tooltip>
      )}
      {isInWishlist ? (
        <Tooltip
          content={
            <p className="text-sm capitalize py-1">remove from wish list</p>
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
            className="bg-[#333] text-white rounded-md w-10 py-2 relative group"
          >
            <IoHeart className="mx-auto text-[#777] hover:text-[#333]" />
          </button>
        </Tooltip>
      ) : (
        <Tooltip
          content={<p className="text-sm capitalize py-1">add to wish list</p>}
        >
          <button
            onClick={(event) => {
              event.preventDefault();
              addToWishlist();
              setIsInWishlist(true);
              event.stopPropagation();
            }}
            type="button"
            className="bg-[#1f1f3c] text-white rounded-md w-10 py-2 relative group"
            data-tooltip-target="wishlist-tooltip-default"
          >
            <IoHeart className="mx-auto text-[#777] hover:text-[#333]" />
            <div
              id="wishlist-tooltip-default"
              role="tooltip"
              className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700"
            >
              Add to Wishlist
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </button>
        </Tooltip>
      )}
    </div>
  ) : (
    <div className="card-btn-sub-menu flex flex-row space-x-[1px] 2xl:space-x-[1px] border-[1px] border-slate-300  p-0 w-full relative">
      {isInCart ? (
        <button
          className="bg-[#333] text-white rounded-lg px-4 h-[40px] w-1/3 xl:w-4/6"
          onClick={(event) => {
            event.preventDefault();
            removeFromCart();
            setIsInCart(false);
            event.stopPropagation();
          }}
        >
          <div className="flex flex-col space-y-2 items-center justify-center">
            <IoCart />
          </div>
        </button>
      ) : (
        <button
          className="bg-[#1f1f3c] text-white rounded-lg px-4 h-[40px] w-1/3 xl:w-4/6"
          onClick={(event) => {
            event.preventDefault();
            addToCart();
            setIsInCart(true);
            event.stopPropagation();
          }}
        >
          <div className="flex flex-row hover:text-[#333] items-center justify-center">
            <IoCart />
            <p className="hidden xl:block uppercase text-[12px] font-semibold text-nowrap">
              add to cart
            </p>
          </div>
        </button>
      )}
      {isInWishlist ? (
        <Tooltip
          content={
            <p className="text-sm capitalize py-1">remove from wish list</p>
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
            className="bg-[#333] text-white rounded-lg flex items-center h-[40px] w-1/3 xl:w-[20%] relative group"
          >
            <IoHeart className="mx-auto hover:text-[#333]" />
          </button>
        </Tooltip>
      ) : (
        <Tooltip
          content={<p className="text-sm capitalize py-1">add to wish list</p>}
        >
          <button
            onClick={(event) => {
              event.preventDefault();
              addToWishlist();
              setIsInWishlist(true);
              event.stopPropagation();
            }}
            type="button"
            className="bg-[#1f1f3c] text-white rounded-lg flex items-center h-[40px] w-1/3 xl:w-[20%] relative group"
          >
            <IoHeart className="mx-auto hover:text-[#333]" />
          </button>
        </Tooltip>
      )}
      {isInCompare ? (
        <Tooltip
          content={
            <p className="text-sm capitalize py-1">remove from compare</p>
          }
        >
          <button
            onClick={(event) => {
              event.preventDefault();
              removeFromCompare();
              compareCount();
              event.stopPropagation();
            }}
            className="bg-[#333] text-white rounded-lg flex items-center h-[40px] w-1/3 xl:w-[20%] relative group"
          >
            <RiDeleteBin6Fill className="mx-auto text-[#777] hover:text-[#333]" />
          </button>
        </Tooltip>
      ) : (
        <Tooltip
          content={<p className="text-sm capitalize py-1">Add to compare</p>}
        >
          <button
            onClick={(event) => {
              event.preventDefault();
              addToCompare();
              compareCount();
              event.stopPropagation();
            }}
            className="bg-[#1f1f3c] text-white rounded-lg flex items-center h-[40px] w-1/3 xl:w-[20%] relative group"
          >
            <FaExchangeAlt className="mx-auto hover:text-[#333]" />
            <div
              id="compare-tooltip-default"
              role="tooltip"
              className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700"
            >
              Add to Compare
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </button>
        </Tooltip>
      )}
    </div>
  );
};

export default DiamondActions;
