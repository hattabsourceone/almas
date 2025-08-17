/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { MdNoPhotography } from "react-icons/md";
import planImages from "@assets/default/default_plans";
import { CartItem } from "../DiamondActions/DiamondActions";
import { useCart } from "@components/context/cartProvider";
import { RiDeleteBin6Fill } from "react-icons/ri";

export type Props = {
  data: any;
  removeFromWishlist: (id: string, wishlist_id: string) => void;
  addToCartRequest: (data: any) => void;
  removeFromCart: (id: any) => void;
};

const DiamondWishListTable: React.FC<Props> = ({
  data,
  removeFromWishlist,
  addToCartRequest,
  removeFromCart,
}) => {
  const { cart: providerCart } = useCart();
  let cart = localStorage.getItem("cart");
  let newCart: CartItem[] = cart ? JSON.parse(cart) : [];
  const [isInCart, setIsInCart] = useState<boolean>(
    newCart.some((item: any) => item.id === data.id)
  );
  const [imagHasError, setimagHasError] = useState<boolean>(false);
  const SmallPlanImage = (shape: any) => {
    const key = shape["shape"].includes("Cushion")
      ? "cushion"
      : shape["shape"].toLowerCase();
    const imageSrc = planImages[key];
    if (imageSrc) {
      return (
        <img
          className="max-h-[60px] max-w-[60px] md:max-h-[142px] md:max-w-[142px] bg-[#111] cursor-pointer"
          src={imageSrc}
          alt="diamond"
        />
      );
    } else {
      return (
        <MdNoPhotography className="max-h-[60px] max-w-[60px] md:max-h-[142px] md:max-w-[142px]" />
      );
    }
  };

  useEffect(() => {
    cart = localStorage.getItem("cart");
    newCart = cart ? JSON.parse(cart) : [];
    setIsInCart(newCart.some((item: any) => item.id === data.diamond.id));
  }, [providerCart]);

  console.log("wishlist data ------------", data);

  function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price || 0);
  }

  return (
    <div
      className="border rounded-sm p-4 flex flex-row items-start bg-white shadow-md space-x-3 md:space-x-4 lg:space-x-10 xl:space-x-20"
      style={{ fontFamily: '"Plain Light", sans-serif' }}
    >
      <div className="flex flex-col">
        <div className="border h-[62px] w-[62px] md:h-[145px] md:w-[145px] flex items-center justify-center">
          {data.diamond.image_file &&
          !imagHasError &&
          data.diamond.image_file.toString().trim().length > 10 ? (
            data.diamond.image_file.includes("http0") ? (
              <iframe
                className="max-h-[60px] max-w-[60px] md:max-h-[142px] md:max-w-[142px]"
                src={data.diamond.image_file.replace("http0", "https")}
                onError={() => setimagHasError(true)}
              />
            ) : (
              <img
                className="max-h-[60px] max-w-[60px] md:max-h-[142px] md:max-w-[142px]"
                src={data.diamond.image_file}
                alt="diamond"
                onError={() => setimagHasError(true)}
              />
            )
          ) : (
            <SmallPlanImage shape={data.diamond.shape.value_name} />
          )}
        </div>
        <button
          onClick={() => removeFromWishlist(data.diamond.id, data.wishlist_id)}
          className="mt-10 h-[35px] min-w-[75px] md:min-w-[90px] text-[11px] md:text-[15px] font-medium text-[#201f41] hover:bg-[#201f41] hover:text-white rounded-full border-[#201f41] border-[1px]"
        >
          x Remove
        </button>
      </div>
      <div className="flex flex-col">
        <p className="text-[15px] 2xl:text-[25px] font-bold text-[#333333] mb-2">
          {Number(data.diamond.diamond_size).toFixed(2) +
            " Caret " +
            data.diamond.shape.value_name}
        </p>
        <div
          className="flex flex-row space-x-8 md:space-x-10 lg:space-x-16 2xl:space-x-36"
          style={{ fontFamily: '"Plain Light", sans-serif' }}
        >
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="font-bold text-[12px] 2xl:text-[16px] text-[#333333]">
                Carat:
              </span>
            </div>
            <div className="mb-2">
              <span className="font-bold text-[12px] 2xl:text-[16px] text-[#333333]">
                Shape:
              </span>
            </div>
            <div className="mb-2">
              <span className="font-bold text-[12px] 2xl:text-[16px] text-[#333333]">
                Cut:
              </span>
            </div>
            <div className="mb-2">
              <span className="font-bold text-[12px] 2xl:text-[16px] text-[#333333]">
                Color:
              </span>
            </div>
            <div className="mb-2">
              <span className="font-bold text-[12px] 2xl:text-[16px] text-[#333333]">
                Clarity:
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {Number(data.diamond.diamond_size).toFixed(2) || "\u00A0"}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {data.diamond.shape.value_name || "\u00A0"}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {data.diamond.cut.value_name || "--"}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {data.diamond.color.value_name || "\u00A0"}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {data.diamond.clarity.value_name || "\u00A0"}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="font-bold text-[12px] 2xl:text-[16px] text-[#333333]">
                Polish:
              </span>
            </div>
            <div className="mb-2">
              <span className="font-bold text-[12px] 2xl:text-[16px] text-[#333333]">
                Symmetry:
              </span>
            </div>
            <div className="mb-2">
              <span className="font-bold text-[12px] 2xl:text-[16px] text-[#333333]">
                Fluorescence:
              </span>
            </div>
            <div className="mb-2">
              <span className="font-bold text-[12px] 2xl:text-[16px] text-[#333333]">
                Lab:
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {data.diamond.polish.value_name || "\u00A0"}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {data.diamond.symmetry.value_name || "\u00A0"}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {data.diamond.fluor_intensity.value_name || "\u00A0"}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-[#88787e] text-[12px] 2xl:text-[16px] font-medium">
                {data.diamond.lab || "\u00A0"}
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <p className="italic text-[24px] text-[#000]">price</p>
            <p className="text-[16px] md:text-[30px] text-[#88787e] italic">
              {formatPrice(data.diamond.total_sales_price)}
            </p>
            {isInCart ? (
              <button
                className="mt-10 h-[33px] md:h-[43px] px-3 text-[11px] md:text-[15px] font-medium bg-[#201f41] text-white rounded-full border-[#201f41] border-[1px]"
                onClick={() => {
                  removeFromCart(data.diamond.id);
                  setIsInCart(false);
                }}
              >
                Remove
              </button>
            ) : (
              <button
                onClick={() => addToCartRequest(data.diamond)}
                className="mt-10 h-[33px] md:h-[43px] px-3 text-[11px] md:text-[15px] font-medium bg-[#201f41] text-white rounded-full border-[#201f41] border-[1px]"
              >
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiamondWishListTable;
