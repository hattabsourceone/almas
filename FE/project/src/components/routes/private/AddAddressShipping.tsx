import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "@components/api/api";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import { toast } from "react-toastify";
import NotFound from "@components/shared/NotFond.tsx/NotFound";
import { Country, State } from "country-state-city";
import useAuth from "@components/hooks/useAuth";
import { useCart } from "@components/context/cartProvider";

export type billingAddressProps = {
  id: number;
  full_name: string;
  mobile_w_country: string;
  address: string;
  address_2: string;
  city: string;
  post_code: string;
  country: string;
  state: string;
  is_default: boolean;
};

const AddAddressShipping: React.FC = () => {
  const navigate = useNavigate();
  const session_id = Cookies.get("session_id_token");
  const uid = Number(Cookies.get("uid"));
  const { toggleCart } = useCart();
  const { logout } = useAuth();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [defaultBillingAddress, setDefaultBillingAddress] =
    useState<boolean>(true);
  const [billingAddress, setBillingAddress] = useState<billingAddressProps>({
    id: -1,
    full_name: "",
    mobile_w_country: "",
    address: "",
    address_2: "",
    city: "",
    post_code: "",
    country: "",
    state: "",
    is_default: defaultBillingAddress,
  });
  const countriesList = Country.getAllCountries();
  const statesList = State.getAllStates();
  const [selectedCountryCode, setselectedCountryCode] = useState<string>("AF");
  const handleBillingUpdate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBillingAddress({
      ...billingAddress,
      [e.target.name]: e.target.value,
    });
  };
  const [errors, setErrors] = React.useState({
    full_name: "",
    mobile_w_country: "",
    address: "",
    city: "",
    post_code: "",
  });

  const onCancel = () => {
    navigate("/profile/address-book");
  };

  const mapBillingAddresstoPref = (item: billingAddressProps): any => {
    return {
      id: item.id,
      shipping_full_name: item.full_name,
      shipping_mobile_w_country: item.mobile_w_country,
      shipping_address: item.address,
      shipping_address_2: item.address_2,
      shipping_city: item.city,
      shipping_post_code: item.post_code,
      shipping_country: item.country,
      shipping_state: item.state,
      is_default: defaultBillingAddress,
    };
  };

  const linksList = [
    {
      name: "my account",
      link: "/profile",
    },
    {
      name: "edit account",
      link: "/profile/personal-details",
    },
    {
      name: "password",
      link: "/profile/update-password",
    },
    {
      name: "address book",
      link: "/profile/address-book",
    },
    {
      name: "wish list",
      link: "/profile/wishlist",
    },
    {
      name: "order history",
      link: "/profile/orders-history",
    },
    /* {
      name: "downloads",
      link: "xxx",
    },
    {
      name: "recurring payments",
      link: "xxx",
    },
    {
      name: "reward points",
      link: "xxx",
    },
    {
      name: "returns",
      link: "xxx",
    },
    {
      name: "transactions",
      link: "xxx",
    },
    {
      name: "newsletter",
      link: "xxx",
    }, */
    {
      name: "logout",
      link: "xxx",
    },
  ];

  const validateForm = () => {
    const newErrors = {
      full_name: billingAddress.full_name ? "" : "Full Name is Required!",
      mobile_w_country: billingAddress.mobile_w_country
        ? ""
        : "Mobile with Country Code is Required!",
      address: billingAddress.address ? "" : "Address is Required!",
      city: billingAddress.city ? "" : "City is Required!",
      post_code: billingAddress.post_code ? "" : "Post Code is Required!",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  useEffect(() => {
    if (!billingAddress.country && countriesList.length > 0) {
      const defaultCountry = countriesList[0];
      const defaultStates = statesList.filter(
        (state) => state.countryCode === defaultCountry.isoCode
      );
      setselectedCountryCode(defaultCountry.isoCode);
      setBillingAddress({
        ...billingAddress,
        country: defaultCountry.name,
        state: defaultStates.length > 0 ? defaultStates[0].name : "",
      });
    } else {
      const defaultStates = statesList.filter(
        (state) => state.countryCode === selectedCountryCode
      );
      setBillingAddress({
        ...billingAddress,
        state: defaultStates.length > 0 ? defaultStates[0].name : "",
      });
    }
  }, [countriesList, statesList, billingAddress.country]);

  const createBillingAddress = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      const address = mapBillingAddresstoPref(billingAddress);
      const result = await axios.post(
        `${BASE_URL}/api/v1/add_shipping_address`,
        {
          ...address,
          session_id: session_id,
          uid: uid,
        }
      );
      if (result.status === 200) {
        toast.success("Address have been created successfully.", {
          autoClose: 2500,
        });
        setBillingAddress({
          id: -1,
          full_name: "",
          mobile_w_country: "",
          address: "",
          city: "",
          post_code: "",
          country: "",
          state: "",
          address_2: "",
          is_default: defaultBillingAddress,
        });
        setDefaultBillingAddress(true);
      }
    } catch (error) {
      console.log("error when createShippingAddress:", error);
      toast.error("Please, fill up all necessary fields and try again.", {
        autoClose: 2500,
      });
    }
  };

  return (
    <div className="w-full flex flex-col mt-4">
      <div className="md:-ml-8 lg:ml-0 xl:-ml-4 2xl:ml-28">
        <Breadcrumb
          menu={[
            {
              title: "Account",
              link: "/profile",
              level: 1,
            },
            {
              title: "Address Book",
              link: "/profile/address-book",
              level: 1,
            },
            {
              title: "Add Shipping Address",
              link: "/profile/address-book/add-shipping-address",
              level: 1,
            },
          ]}
        />
      </div>
      {notFound ? (
        <NotFound />
      ) : (
        <div className="w-[99%] md:w-[92%] lg:w-[90%] xl:w-[88%] 2xl:w-[70%] mx-auto mb-20 flex flex-col lg:flex-row md:space-x-8 lg:space-x-4">
          <div className="w-[95%] lg:w-[80%] xl:w-[80%] 2xl:w-[72%] flex flex-col">
            <p className="text-[#211F41] text-[30px] font-normal pt-12 pb-3">
              ADD SHIPPING ADDRESS
            </p>
            <div className="flex flex-col space-y-2 pb-10">
              <div className="flex flex-row w-full mt-4 items-start">
                <label className="w-[250px] flex justify-end items-center text-[12px] lg:text-[14px] pr-8 text-[#333] mt-2">
                  <span className="text-red-500 pr-1">*</span>Full Name
                </label>
                <div className="flex flex-col w-full mr-4">
                  <input
                    type="text"
                    name="full_name"
                    id="name"
                    placeholder="Full Name"
                    value={billingAddress.full_name}
                    onChange={handleBillingUpdate}
                    className="form-control text-[12px] text-[#666] p-2 rounded-none"
                  />
                  {errors.full_name && (
                    <span className="text-[#a94442] text-[12px] mt-2">
                      {errors.full_name}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-row w-full mt-4 items-start">
                <label className="w-[250px] flex justify-end items-center text-[12px] lg:text-[14px] pr-8 text-[#333] mt-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  placeholder="Company"
                  onChange={handleBillingUpdate}
                  className="form-control text-[12px] text-[#666] p-2 mr-4 rounded-none"
                />
              </div>
              <div className="flex flex-row w-full mt-4 items-start">
                <label className="w-[250px] flex flex-row justify-end items-center text-end text-[12px] lg:text-[14px] pr-8 text-[#333] mt-2 text-nowrap">
                  <span className="text-red-500 pr-1">*</span>Mobile with
                  Country code
                </label>
                <div className="flex flex-col w-full mr-4">
                  <input
                    type="text"
                    name="mobile_w_country"
                    id="mobile"
                    placeholder="Mobile with Country code"
                    onChange={handleBillingUpdate}
                    value={billingAddress.mobile_w_country}
                    className="form-control text-[12px] text-[#666] p-2 rounded-none"
                  />
                  {errors.mobile_w_country && (
                    <span className="text-[#a94442] text-[12px] mt-2">
                      {errors.mobile_w_country}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-row w-full mt-4 items-start">
                <label className="w-[250px] flex justify-end items-center text-[12px] lg:text-[14px] pr-8 text-[#333] mt-2">
                  <span className="text-red-500 pr-1">*</span>Address 1
                </label>
                <div className="flex flex-col w-full mr-4">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address 1"
                    onChange={handleBillingUpdate}
                    value={billingAddress.address}
                    className="form-control text-[12px] text-[#666] p-2 rounded-none"
                  />
                  {errors.address && (
                    <span className="text-[#a94442] text-[12px] mt-2">
                      {errors.address}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-row w-full mt-4 items-start">
                <label className="w-[250px] flex justify-end items-center text-[12px] lg:text-[14px] pr-8 text-[#333] mt-2">
                  Address 2
                </label>
                <input
                  type="text"
                  name="address_2"
                  placeholder="Address 2"
                  onChange={handleBillingUpdate}
                  value={billingAddress.address}
                  className="form-control text-[12px] text-[#666] p-2 mr-4 rounded-none"
                />
              </div>
              <div className="flex flex-row w-full mt-4 items-start">
                <label className="w-[250px] flex justify-end items-center text-[12px] lg:text-[14px] pr-8 text-[#333] mt-2">
                  <span className="text-red-500 pr-1">*</span>City
                </label>
                <div className="flex flex-col w-full mr-4">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    onChange={handleBillingUpdate}
                    value={billingAddress.city}
                    className="form-control text-[12px] text-[#666] p-2 rounded-none"
                  />
                  {errors.city && (
                    <span className="text-[#a94442] text-[12px] mt-2">
                      {errors.city}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-row w-full mt-4 items-start">
                <label className="w-[250px] flex justify-end items-center text-[12px] lg:text-[14px] pr-8 text-[#333] mt-2">
                  <span className="text-red-500 pr-1">*</span>Post Code
                </label>
                <div className="flex flex-col w-full mr-4">
                  <input
                    type="text"
                    name="post_code"
                    id="postcode"
                    placeholder="Post Code"
                    onChange={handleBillingUpdate}
                    value={billingAddress.post_code}
                    className="form-control text-[12px] text-[#666] p-2 rounded-none"
                  />
                  {errors.post_code && (
                    <span className="text-[#a94442] text-[12px] mt-2">
                      {errors.post_code}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-row w-full mt-4">
                <label className="w-[250px] flex justify-end items-center text-[12px] lg:text-[14px] pr-8 text-[#333]">
                  <span className="text-red-500 pr-1">*</span>Country
                </label>
                <select
                  name="country"
                  id="country"
                  className="text-[12px] text-[#666] form-control mr-4"
                  value={billingAddress.country}
                  onChange={(e) => {
                    const selectedCountryName = e.target.value;
                    const selectedCountry = countriesList.find(
                      (country) => country.name === selectedCountryName
                    );
                    if (selectedCountry) {
                      setselectedCountryCode(selectedCountry.isoCode);
                    }
                    handleBillingUpdate(
                      e as React.ChangeEvent<HTMLSelectElement>
                    );
                  }}
                >
                  {countriesList.map((e) => (
                    <option key={e.isoCode} value={e.name}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row w-full mt-4">
                <label className="w-[250px] flex justify-end items-center text-[12px] lg:text-[14px] pr-8 text-[#333]">
                  <span className="text-red-500 pr-1">*</span>Region / State
                </label>
                <select
                  name="state"
                  id="state"
                  className="text-[12px] text-[#666] form-control mr-4"
                  value={billingAddress.state}
                  onChange={(e) => {
                    handleBillingUpdate(
                      e as React.ChangeEvent<HTMLSelectElement>
                    );
                  }}
                >
                  {statesList
                    .filter((j) => j.countryCode === selectedCountryCode)
                    .map((e) => (
                      <option key={e.name} value={e.name}>
                        {e.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-row my-4 w-full">
                <p className="w-[250px] flex justify-end items-center text-[12px] lg:text-[14px] text-[#333] font-normal pr-8">
                  Default Address
                </p>
                <div className="flex space-x-3 mr-4 w-full">
                  <label className="flex items-center space-x-2 cursor-pointer text-[#333] text-[12px] lg:text-[14px] font-normal">
                    <input
                      type="radio"
                      name="defaultBillingAddress"
                      value="yes"
                      className="text-[#333] text-[12px] lg:text-[14px] font-normal"
                      checked={defaultBillingAddress === true}
                      onChange={() => {
                        billingAddress.is_default = true;
                        setDefaultBillingAddress(true);
                      }}
                    />
                    <span className="text-[#333] text-[12px] lg:text-[14px] font-normal">
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="defaultBillingAddress"
                      value="no"
                      className=""
                      checked={defaultBillingAddress === false}
                      onChange={() => {
                        billingAddress.is_default = false;
                        setDefaultBillingAddress(false);
                      }}
                    />
                    <span className="text-[#333] text-[12px] lg:text-[14px] font-normal">
                      No
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <button
                  onClick={onCancel}
                  className="text-[15px] font-medium text-white bg-[#201F41] hover:opacity-45 py-2 px-8 rounded-full"
                >
                  Back
                </button>
                <button
                  onClick={createBillingAddress}
                  className="text-[15px] font-medium text-white bg-[#201F41] hover:opacity-45 py-2 px-8 rounded-full"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:mt-4">
            {linksList.map((e: any, index: number) =>
              e.name === "logout" ? (
                <button
                  onClick={() => {
                    logout();
                    toggleCart();
                  }}
                  className={`h-[38px] mx-auto w-[95%] lg:w-[205px] xl:w-[255px] 2xl:w-[308px] bg-[#201f41] hover:bg-[#3995A5] text-[14px] text-white flex items-center pl-4 mb-[1px] capitalize ${
                    index === 0
                      ? "rounded-t-md"
                      : index === linksList.length - 1
                      ? "rounded-b-md"
                      : ""
                  }`}
                >
                  {e.name}
                </button>
              ) : (
                <a
                  href={e.link}
                  className={`h-[38px] mx-auto w-[95%] lg:w-[205px] xl:w-[255px] 2xl:w-[308px] bg-[#201f41] hover:bg-[#3995A5] text-[14px] text-white flex items-center pl-4 mb-[1px] capitalize ${
                    index === 0
                      ? "rounded-t-md"
                      : index === linksList.length - 1
                      ? "rounded-b-md"
                      : ""
                  }`}
                >
                  {e.name}
                </a>
              )
            )}
          </div>
        </div>
      )}
      <Contact />
    </div>
  );
};

export default AddAddressShipping;
