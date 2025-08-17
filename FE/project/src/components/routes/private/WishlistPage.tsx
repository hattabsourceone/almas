import { BASE_URL } from "@components/api/api";
import useAuth from "@components/hooks/useAuth";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import DiamondWishListCard from "@components/shared/DiamondCard/DiamondWishListCard";
import withAuth from "@components/shared/withAuth";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import circle from "@assets/LandingPage/Collections/circle.png";
import DiamondWishListTable from "@components/shared/DiamondCard/DiamondWishListTable";
import { useCart } from "@components/context/cartProvider";

const WishlistPage: React.FC = () => {
  const { currentTokenRef, currentUIDRef } = useAuth();
  const { toggleCart } = useCart();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const navigate = useNavigate();
  const session_id = Cookies.get("session_id_token") || currentTokenRef.current;
  const uid: number =
    Number(Cookies.get("uid")) || Number(currentUIDRef.current);

  const removeFromWishlist = async (id: string, wishlist_id: string) => {
    try {
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.wishlist_id !== wishlist_id)
      );
      const body = {
        session_id,
        uid,
        diamond_id: id,
      };

      const response = await axios.post(
        `${BASE_URL}/api/v1/remove_from_wishlist`,
        body
      );
      if (response.status === 200) {
        console.log("resp:", response.data);
      } else {
        // error there
      }
    } catch (error) {
      console.log("remove wishlist:", error);
    }
  };

  const getWishlist = async () => {
    try {
      const body = {
        session_id,
        uid,
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/get_wishlist`,
        body
      );
      if (response.status === 200) {
        setWishlist(response.data.data);
        localStorage.setItem("wishList", JSON.stringify(response.data.data));
        console.log("data from get :", response.data.data);
      } else {
        // error there
      }
    } catch (error) {
      console.log("get wishlist:", error);
    }
  };

  const addToCartRequest = async (data: any) => {
    try {
      if (session_id && session_id != "guest") {
        const body = {
          session_id: session_id,
          uid: uid,
          product_type: "diamond",
          product_id: data.id,
        };
        await axios.post(`${BASE_URL}/api/v1/add_to_cart`, body);
        let cart = localStorage.getItem("cart");
        let newCart = cart ? JSON.parse(cart) : [];
        localStorage.setItem("cart", JSON.stringify([...newCart, data]));
        toggleCart();
      }
    } catch (error) {
      console.log("add to cart:", error);
    }
  };

  const removeFromCart = async (id: any) => {
    const cart = localStorage.getItem("cart");
    const newCart = cart ? JSON.parse(cart) : [];
    const index = newCart.findIndex((item: any) => item.id === id);
    if (index > -1) {
      newCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    toggleCart();
    await removeFromCartRequest(id);
  };

  const removeFromCartRequest = async (id: any) => {
    try {
      if (session_id && session_id != "guest") {
        const body = {
          session_id: session_id,
          uid: uid,
          product_type: "diamond",
          product_id: id,
        };
        const response = await axios.post(
          `${BASE_URL}/api/v1/remove_from_cart`,
          body
        );
        console.log("remove from cart:", response.data);
      }
    } catch (error) {
      console.log("add to wishlist:", error);
    }
  };

  useEffect(() => {
    document.title = "My Wish List";
    getWishlist();
  }, []);

  return (
    <div className="w-full flex flex-col mt-4">
      <div className="w-full -ml-4 md:-ml-6 lg:-ml-7 xl:-ml-4 2xl:ml-[108px]">
        <Breadcrumb
          menu={[
            {
              title: "Account",
              link: "/profile",
              level: 1,
            },
            {
              title: "My Wish List",
              link: "/profile/wishlist",
              level: 1,
            },
          ]}
        />
      </div>
      <div className="flex flex-col w-[91%] md:w-[92%] lg:w-[91%] xl:w-[88%] 2xl:w-[69%] mx-auto items-start justify-center mt-8">
        <div
          className="bg-no-repeat bg-contain pt-[40px] md:bg-center"
          style={{
            backgroundImage: `url(${circle})`,
            backgroundPosition: "left 70px top 0px",
            maxWidth: 240,
            minHeight: 170,
            width: 240,
          }}
        >
          <p className="text-[#211F41] text-[40px] mr-20 font-medium mb-12 md:mb-0 leading-[45px]">
            WISHLIST
          </p>
        </div>
        {wishlist.length === 0 ? (
          <p
            className="text-[14px] text-[#333] mb-20 mt-2"
            style={{ fontFamily: '"Plain Light", sans-serif' }}
          >
            Your wishlist is empty.
          </p>
        ) : (
          <div className="w-full flex flex-col">
            <div className="bg-[#201f41] w-full h-[73px] text-[30px] text-white items-center justify-center flex">
              Wishlist
            </div>
            {wishlist.map((element: any) => (
              <div key={element.id}>
                <DiamondWishListTable
                  data={element}
                  removeFromWishlist={removeFromWishlist}
                  addToCartRequest={addToCartRequest}
                  removeFromCart={removeFromCart}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Contact />
    </div>
  );
};

export default withAuth(WishlistPage);
