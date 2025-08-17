import React, { useState } from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { IoIosMail, IoMdArrowDropright } from "react-icons/io";
import Ring from "@assets/Jewellery/ring.png";
import Earring from "@assets/Jewellery/earring.png";
import Hoops from "@assets/Jewellery/hoops.png";
import Bracelet from "@assets/Jewellery/bracelet.png";
import Pendant from "@assets/Jewellery/pendant.png";
import Tick from "@assets/Jewellery/tick.png";
import Stone from "@assets/Jewellery/stone.png";
import axios from "axios";
import { BASE_URL } from "@components/api/api";
import { toast } from "react-toastify";
type JewelleryProductsDetailsPrps = {
  data: any;
  selectedMetal?: string;
  selectedShape?: string;
  selectedCarat?: number;
  addedValueMap?: any;
};

const JewelleryProductsDetails: React.FC<JewelleryProductsDetailsPrps> = ({
  data,
  selectedMetal,
  selectedShape,
  selectedCarat,
  addedValueMap,
}) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    setEmail(e.target.value);
  };
  console.log("JewelleryProductDetails------------------------", data);

  const subscribeNews = async () => {
    if (loading) return;
    if (!email || email.trim().length === 0) {
      toast.error("Email is required.", { autoClose: 2500, theme: "colored" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", {
        autoClose: 2500,
        theme: "colored",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/add_email`,
        {
          email: email,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response);

      if (
        response.status === 200 &&
        response.data.results.message === "Record Added"
      ) {
        setEmail("");
        toast.success("Subscription successful! Thank you for subscribing.", {
          autoClose: 2500,
        });
      } else {
        toast.error("Subscription failed!", {
          autoClose: 2500,
        });
      }
    } catch (error: any) {
      toast.error("An error occurred. Please try again.", {
        autoClose: 2500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col mb-20">
      <div className="relative flex justify-center w-full h-4">
        <div className="absolute w-full h-[0.3px] opacity-30 bg-[#201F41] mt-3"></div>
        <p className="absolute bg-white px-2 text-[18px] text-[#201F41] font-medium">
          Product Details
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between border-b border-gray-400 pb-8 mb-8 pt-10">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex flex-row">
            <span className="mr-2 mt-1">
              <img
                className="w-8"
                src={
                  data.category.toLocaleLowerCase().includes("earring")
                    ? data.type.toLowerCase().includes("hoops")
                      ? Hoops
                      : Earring
                    : data.category.toLocaleLowerCase().includes("pendant")
                    ? Pendant
                    : data.category === "Rings"
                    ? Ring
                    : Bracelet
                }
              />
            </span>
            <div className="flex flex-col space-y-1">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <p className="text-[18px] text-[#201F41] font-medium underline decoration-[3px] underline-offset-8">
                  {data.category} Information
                </p>
              </h2>
              {data.category.toLowerCase().includes("bracelet") ? (
                <div className="flex flex-row space-x-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-[12px] font-semibold text-[#666]">
                      SKU:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Metal:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Setting Type:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Rhodium Plated:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Length:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Average Width:
                    </p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-[12px] font-medium text-[#666]">
                      {data.sku || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {selectedMetal ?? data.metal[0]}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.setting_type || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.rodium_plated || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.length || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.width || "\u00A0"}
                    </p>
                  </div>
                </div>
              ) : data.category.toLowerCase().includes("pendant") ? (
                <div className="flex flex-row space-x-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-[12px] font-semibold text-[#666]">
                      SKU:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Metal:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Setting Type:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Clasp:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Chain Type:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Rhodium Plated:
                    </p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-[12px] font-medium text-[#666]">
                      {data.sku || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {selectedMetal ?? data.metal[0]}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.setting_type || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.clasp || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.chain_type || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.rodium_plated || "\u00A0"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row space-x-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-[12px] font-semibold text-[#666]">
                      SKU:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Metal:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Setting Type:
                    </p>
                    {data.width &&
                      !data.type.toLowerCase().includes("hoops") && (
                        <p className="text-[12px] font-semibold text-[#666]">
                          Average Band Width:
                        </p>
                      )}
                    <p className="text-[12px] font-semibold text-[#666]">
                      Rhodium Plated:
                    </p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-[12px] font-medium text-[#666]">
                      {data.sku}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {selectedMetal ?? data.metal[0]}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.setting_type || "\u00A0"}
                    </p>
                    {data.width &&
                      !data.type.toLowerCase().includes("hoops") && (
                        <p className="text-[12px] font-medium text-[#666]">
                          {addedValueMap?.width || "None"}
                        </p>
                      )}
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.rodium_plated || "\u00A0"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {data.type.toLowerCase().includes("hoops") ||
          data.category.toLowerCase().includes("bracelet") ||
          data.type.toLocaleLowerCase().includes("band") ? (
            <div className="w-full md:w-1/2 mt-10 md:mt-20">
              <div className="flex flex-row items-start">
                <span className="mr-2 mt-1">
                  <img className="w-8" src={Tick} />
                </span>
                <div className="flex flex-col space-y-3">
                  <h2 className="text-lg font-semibold flex items-center">
                    <p className="text-[18px] text-[#201F41] font-medium underline decoration-[3px] underline-offset-8">
                      Included In Your Order{" "}
                    </p>
                  </h2>
                  <p className="text-[16px] font-medium text-[#000]">
                    Free Secure Shipping
                  </p>
                  <p className="text-[16px] font-medium text-[#000]">
                    Diamond Grading Report
                  </p>
                  <p className="text-[16px] font-medium text-[#000]">
                    Free Lifetime Warranty
                  </p>
                  <p className="text-[16px] font-medium text-[#000]">
                    30 Days Money Back Guarantee
                  </p>
                  {(data.category.toLowerCase().includes("bracelet") ||
                    data.type.toLocaleLowerCase().includes("band") ||
                    data.type.toLocaleLowerCase().includes("hoops")) && (
                    <p className="text-[16px] font-medium text-[#000]">
                      Free Resizing within 30 Days
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : data.category.includes("Pendant") &&
            (data.type.toLowerCase().includes("muse") ||
              data.type.toLowerCase().includes("halo")) ? (
            <div className="flex flex-row mt-20">
              <span className="mr-1 mt-1 w-8 h-8"></span>
              <div className="flex flex-col space-y-1">
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <p className="text-[18px] text-[#201F41] font-medium underline decoration-[3px] underline-offset-8">
                    Side Stone
                  </p>
                </h2>
                <div className="flex flex-row space-x-2">
                  <div className="flex flex-col space-y-1">
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
                      Average Clarity:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Average Color:
                    </p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.shape || selectedShape || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.carat || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.cut || "--"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.clarity || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.color || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : !data.type.toLowerCase().includes("solitaire") &&
            !data.type.toLowerCase().includes("band") &&
            data.category === "Rings" ? (
            <div className="flex flex-row mt-20">
              <span className="mr-2 mt-1 w-8 h-8"></span>
              <div className="flex flex-col space-y-1">
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
                      {addedValueMap?.number_of_stones || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.shape || selectedShape || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.carat || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.cut || "--"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.clarity || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.color || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            data.type.toLowerCase().includes("halo") && (
              <div className="flex flex-row mt-20">
                <span className="mr-2 mt-1">
                  <img className="w-8 h-8" src={Stone} />
                </span>
                <div className="flex flex-col space-y-1">
                  <h2 className="text-lg font-semibold mb-3 flex items-center">
                    <p className="text-[18px] text-[#201F41] font-medium underline decoration-[3px] underline-offset-8">
                      Side Stone Information
                    </p>
                  </h2>
                  <div className="flex flex-row space-x-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-[12px] font-semibold text-[#666]">
                        Side Stones shape:
                      </p>
                      <p className="text-[12px] font-semibold text-[#666]">
                        Average Carat:
                      </p>
                      <p className="text-[12px] font-semibold text-[#666]">
                        Average Cut:
                      </p>
                      <p className="text-[12px] font-semibold text-[#666]">
                        Average Clarity:
                      </p>
                      <p className="text-[12px] font-semibold text-[#666]">
                        Average Color:
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="text-[12px] font-medium text-[#666]">
                        {addedValueMap?.shape || selectedShape || "\u00A0"}
                      </p>
                      <p className="text-[12px] font-medium text-[#666]">
                        {addedValueMap?.carat || "\u00A0"}
                      </p>
                      <p className="text-[12px] font-medium text-[#666]">
                        {addedValueMap?.cut || "--"}
                      </p>
                      <p className="text-[12px] font-medium text-[#666]">
                        {addedValueMap?.clarity || "\u00A0"}
                      </p>
                      <p className="text-[12px] font-medium text-[#666]">
                        {addedValueMap?.color || "\u00A0"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <div className="w-full md:w-1/2 pt-10 md:pt-0">
          {!data.type.toLowerCase().includes("hoops") &&
          !data.type.toLocaleLowerCase().includes("band") &&
          !data.category.toLowerCase().includes("bracelet") ? (
            <div className="flex flex-row items-start">
              <span className="mr-2 mt-1">
                <img className="w-8" src={Tick} />
              </span>
              <div className="flex flex-col space-y-3">
                <h2 className="text-lg font-semibold flex items-center">
                  <p className="text-[18px] text-[#201F41] font-medium underline decoration-[3px] underline-offset-8">
                    Included In Your Order{" "}
                  </p>
                </h2>
                <p className="text-[16px] font-medium text-[#000]">
                  Free Secure Shipping
                </p>
                <p className="text-[16px] font-medium text-[#000]">
                  Diamond Grading Report
                </p>
                <p className="text-[16px] font-medium text-[#000]">
                  Free Lifetime Warranty
                </p>
                <p className="text-[16px] font-medium text-[#000]">
                  30 Days Money Back Guarantee
                </p>
              </div>
            </div>
          ) : data.category.toLowerCase().includes("bracelet") ||
            data.type.toLocaleLowerCase().includes("band") ? (
            <div className="flex flex-row">
              <span className="mr-2 mt-1">
                <img className="w-8 h-8" src={Stone} />
              </span>
              <div className="flex flex-col space-y-1">
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <p className="text-[18px] text-[#201F41] font-medium underline decoration-[3px] underline-offset-8">
                    Diamond Information
                  </p>
                </h2>
                <div className="flex flex-row space-x-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-[12px] font-semibold text-[#666]">
                      Diamond shape:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Min. Carat:
                    </p>
                    {!data.type.toLocaleLowerCase().includes("band") && (
                      <p className="text-[12px] font-semibold text-[#666]">
                        Average no of stones:
                      </p>
                    )}
                    <p className="text-[12px] font-semibold text-[#666]">
                      Average Cut:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Average Clarity:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Average Color:
                    </p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.shape || selectedShape || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.carat || selectedCarat
                        ? Number(selectedCarat).toFixed(2) + " ct"
                        : "\u00A0"}
                    </p>
                    {!data.type.toLocaleLowerCase().includes("band") && (
                      <p className="text-[12px] font-medium text-[#666]">
                        {addedValueMap?.number_of_stones || "\u00A0"}
                      </p>
                    )}
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.cut || "--"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.clarity || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.color || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-row">
              <span className="mr-2 mt-1">
                <img className="w-8 h-8" src={Stone} />
              </span>
              <div className="flex flex-col space-y-1">
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <p className="text-[18px] text-[#201F41] font-medium underline decoration-[3px] underline-offset-8">
                    Side Stone Information
                  </p>
                </h2>
                <div className="flex flex-row space-x-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-[12px] font-semibold text-[#666]">
                      Side Stones shape:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Width:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Average Carat:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Average Cut:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Average Clarity:
                    </p>
                    <p className="text-[12px] font-semibold text-[#666]">
                      Average Color:
                    </p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.shape || selectedShape || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.width || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.carat || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.cut || "--"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.clarity || "\u00A0"}
                    </p>
                    <p className="text-[12px] font-medium text-[#666]">
                      {addedValueMap?.color || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between space-y-3 lg:space-y-0">
        <div className="w-full md:w-1/2">
          <h3 className="text-lg text-[#201F41] font-medium mb-4 underline underline-offset-8 decoration-[3px]">
            Need Help Completing Your Order?
          </h3>
          <p className="mb-2 text-[#444]">
            Please contact our diamond specialists
          </p>
          <a
            href="tel:+971%2058%20903%204451"
            className="cursor-pointer flex flex-row items-center space-x-2 pb-2"
          >
            <FaPhoneAlt className="w-4 h-4" />
            <p className="text-base font-normal">+971 58 903 4451</p>
          </a>
          <a
            href="mailto:ayman@manjamonline.com"
            className="cursor-pointer flex flex-row items-center space-x-2 pb-2"
          >
            <IoIosMail className="w-5 h-5" />
            <p className="text-base font-normal">Send Us an Email</p>
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=971589034451"
            className="cursor-pointer flex flex-row items-center space-x-2 pb-2"
          >
            <FaWhatsapp className="fill-green-600 w-5 h-5" />
            <p className="text-base font-normal">Whatsapp</p>
          </a>
        </div>
        <div className="w-full md:w-1/2 flex flex-col mt-10 md:mt-0">
          <h3 className="text-lg font-medium text-[#201F41] mb-4 underline underline-offset-8 decoration-[3px]">
            Sign up for our Email List
          </h3>
          <p className="mb-2 text-[16px] text-[#444]">
            Send me Almas Online news updates and offers
          </p>
          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            className="max-w-[340px] py-2 pl-1 border-[0.5px] border-slate-700 text-[12px] placeholder:text-[#666] rounded mb-2"
            style={{ fontFamily: '"Open Sans", sans-serif' }}
            onChange={handleInputChange}
          />
          <button
            onClick={subscribeNews}
            className="font-normal max-w-[140px] py-[10px] px-4 text-white text-[12px] bg-[#201F41] rounded-lg"
            style={{ fontFamily: '"Open Sans", sans-serif' }}
          >
            <p className="inline-block">Subscribe</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JewelleryProductsDetails;
