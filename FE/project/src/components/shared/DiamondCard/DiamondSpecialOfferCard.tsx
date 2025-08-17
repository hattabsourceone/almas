import { BASE_URL } from "@components/api/api";
import axios from "axios";
import React, { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { IoCart, IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "@components/context/cartProvider";
import useAuth from "@components/hooks/useAuth";
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
import cushionModified from "@assets/SearchDiamond/shapes/cushion-modified.png";
import shape37 from "@assets/SearchDiamond/shapes/shape37.png";
import shape38 from "@assets/SearchDiamond/shapes/shape38.png";
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
import { ShapeImages } from "@components/routes/public/SearchDiamond/FilterShape";
import { MdOutlineCheck } from "react-icons/md";

export type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  compareCount: () => void;
};

const DiamondSpecialOfferCard: React.FC<Props> = ({ data, compareCount }) => {
  const { toggleCart } = useCart();
  const { currentTokenRef, currentUIDRef } = useAuth();
  const cart = localStorage.getItem("cart");
  const basket = localStorage.getItem("compareDiamonds");
  let wishlistBasket = localStorage.getItem("wishList");
  let newWishlistBasket = wishlistBasket ? JSON.parse(wishlistBasket) : [];
  const newCart = cart ? JSON.parse(cart) : [];
  const newBasket = basket ? JSON.parse(basket) : [];
  const navigate = useNavigate();
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

  const addToCart = async () => {
    const cart = localStorage.getItem("cart");
    const newCart = cart ? JSON.parse(cart) : [];
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
      console.log("response here", response.data);

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
      const body = {
        session_id: session_id,
        uid: uid,
        diamond_id: data.id,
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/remove_from_wishlist`,
        body
      );
      setIsInWishlist(true);
      console.log("response here", response.data);

      if (response.status === 200) {
        // TODO add notification
      } else {
        // error there
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
      console.log(data.id);

      const response = await axios.post(
        `${BASE_URL}/api/v1/add_to_compare_diamonds`,
        {
          session_id,
          uid,
          diamond_id: data.id,
          added_date: new Date(),
        }
      );
      console.log("add to compare list:", response.data);

      if (response.status === 200) {
        // TODO
      } else {
        // test failed
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
      const response = await axios.post(
        `${BASE_URL}/api/v1/remove_from_compare_diamonds`,
        {
          session_id,
          uid,
          diamond_id: data.id,
        }
      );
      console.log("remove from compare list:", response.data);

      if (response.status === 200) {
        // TODO
      } else {
        // test failed
      }
    } catch (error) {
      console.log("add to compare:", error);
    }
  };

  const addToCartRequest = async () => {
    try {
      const body = {
        session_id: session_id,
        uid: uid,
        product_type: "diamond", // TODO update this to be dynamic
        product_id: data.id,
      };
      const response = await axios.post(`${BASE_URL}/api/v1/add_to_cart`, body);
      if (response.status === 200) {
        // TODO add notification
      } else {
        // error there
      }
    } catch (error) {
      console.log("add to wishlist:", error);
    }
  };

  const removeFromCartRequest = async () => {
    try {
      const body = {
        session_id: session_id,
        uid: uid,
        product_type: "diamond", // TODO update this to be dynamic
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
    } catch (error) {
      console.log("add to wishlist:", error);
    }
  };

  function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    }).format(price || 0);
  }
  console.log("recevied data:", data);

  return (
    <tr
      onClick={() => {
        navigate(`/diamond-details/${data?.id}`);
      }}
      className="text-[15px] text-[#000] border-[2px]  border-slate-800 cursor-pointer"
    >
      <td>
        {isInCompare ? (
          <span
            onClick={(event) => {
              event.preventDefault();
              if (isInCompare) {
                removeFromCompare();
                setIsInCompare(false);
              } else {
                addToCompare();
              }
              compareCount();
              event.stopPropagation();
            }}
            className="true mx-auto rounded-full"
          >
            <MdOutlineCheck className="w-10" size={20} />
          </span>
        ) : (
          <div
            onClick={(event) => {
              event.preventDefault();
              if (isInCompare) {
                removeFromCompare();
                setIsInCompare(false);
              } else {
                addToCompare();
              }
              compareCount();
              event.stopPropagation();
            }}
            className="checkmark-class-small mx-auto"
          ></div>
        )}
      </td>
      <div className="flex flex-row items-center justify-start my-2">
        <img
          src={
            shapesImages.find((item) => item.name === data?.shape.value_name)
              ?.value || ""
          }
          className="w-7 border-white-[1px] h-7 rounded-full"
        />
        <td>{data?.shape.value_name}</td>
      </div>
      <td>{data?.size_carat}</td>
      <td>{data?.color.value_name}</td>
      <td>{data?.cut?.value_name || "--"}</td>
      <td>{data?.clarity.value_name}</td>
      <td>{data?.symmetry.value_name}</td>
      <td>{data?.polish?.value_name}</td>
      <td>{data?.fluor_intensity?.value_name}</td>
      <td>{data?.certificate}</td>
      <td className="text-[14px] text-[#333]">
        {formatPrice(data?.new_price)}
      </td>
      <td className="flex items-center justify-center">
        <button
          onClick={(event) => {
            event.preventDefault();
            if (isInCart) {
              removeFromCart();
              setIsInCart(false);
            } else {
              addToCart();
              setIsInCart(true);
            }
            event.stopPropagation();
          }}
          className="bg-[#211f41] rounded-lg"
        >
          <IoCart
            className={`mx-2 my-1 text-[16px] ${
              isInCart ? "fill-red-500" : "fill-[#666]"
            }`}
          />
        </button>
        {/* <button
          onClick={(event) => {
            event.preventDefault();
            if (isInCompare) {
              removeFromCompare();
              setIsInCompare(false);
            } else {
              addToCompare();
            }
            compareCount();
            event.stopPropagation();
          }}
          className="btn"
        >
          <FaExchangeAlt
            className={`ml-1 ${isInCompare ? "fill-red-500" : null}`}
          />
        </button> */}
      </td>
    </tr>
  );
};

export default DiamondSpecialOfferCard;
