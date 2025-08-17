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

export type shippingAddressProps = {
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

const EditAddressShipping: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { toggleCart } = useCart();
  const { logout } = useAuth();
  const session_id = Cookies.get("session_id_token");
  const uid = Number(Cookies.get("uid"));
  const [notFound, setNotFound] = useState<boolean>(false);
  const [defaultShippingAddress, setDefaultShippingAddress] =
    useState<boolean>(true);
  const countriesList = Country.getAllCountries();
  const statesList = State.getAllStates();
  const [selectedCountryCode, setselectedCountryCode] = useState<string>("AF");

  const [shippingAddress, setShippingAddress] = useState<shippingAddressProps>({
    id: -1,
    full_name: "",
    mobile_w_country: "",
    address: "",
    address_2: "",
    city: "",
    post_code: "",
    country: "",
    state: "",
    is_default: defaultShippingAddress,
  });

  const handleShippingUpdate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const onCancel = () => {
    navigate("/profile/address-book");
  };

  const mapShippingAddresstoPref = (item: shippingAddressProps): any => {
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
      is_default: defaultShippingAddress,
    };
  };

  const [errors, setErrors] = React.useState({
    full_name: "",
    mobile_w_country: "",
    address: "",
    city: "",
    post_code: "",
  });

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
      full_name: shippingAddress.full_name ? "" : "Full Name is Required!",
      mobile_w_country: shippingAddress.mobile_w_country
        ? ""
        : "Mobile with Country Code is Required!",
      address: shippingAddress.address ? "" : "Address is Required!",
      city: shippingAddress.city ? "" : "City is Required!",
      post_code: shippingAddress.post_code ? "" : "Post Code is Required!",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const updateShippingAddresses = async () => {
    try {
      if (shippingAddress.id === -1) return;
      if (!validateForm()) {
        return;
      }
      const body = {
        session_id,
        uid,
        ...mapShippingAddresstoPref(shippingAddress),
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/update_shipping_address`,
        body
      );
      if (response.status === 200) {
        toast.success("Address have been updated successfully.", {
          autoClose: 2500,
        });
      }
    } catch (error) {
      console.log("updateShippingAddresses:", error);
    }
  };

  const getShippingAddresses = async () => {
    try {
      const body = {
        session_id,
        uid,
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/get_shipping_address`,
        body
      );

      if (response.status === 200) {
        const list: any[] = [...response.data.shipping_address];
        const result = list.find((element: any) => element.id == id);
        if (result) {
          setShippingAddress(result);
          setDefaultShippingAddress(result.is_default);
          if (result.country) {
            const countrycode = countriesList.find(
              (e) => e.name === result.country
            );
            setselectedCountryCode(countrycode?.isoCode || "AF");
          }
        } else {
          setNotFound(true);
        }
      }
    } catch (error) {
      console.log("getShippingAddresses:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getShippingAddresses();
    }
  }, []);

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
              title: "Edit Shipping Address",
              link: "/profile/address-book/edit-shipping-address",
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
              EDIT SHIPPING ADDRESS
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
                    value={shippingAddress.full_name}
                    onChange={handleShippingUpdate}
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
                  onChange={handleShippingUpdate}
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
                    onChange={handleShippingUpdate}
                    value={shippingAddress.mobile_w_country}
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
                    onChange={handleShippingUpdate}
                    value={shippingAddress.address}
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
                  onChange={handleShippingUpdate}
                  value={shippingAddress.address}
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
                    onChange={handleShippingUpdate}
                    value={shippingAddress.city}
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
                    onChange={handleShippingUpdate}
                    value={shippingAddress.post_code}
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
                  value={shippingAddress.country}
                  onChange={(e) => {
                    const selectedCountryName = e.target.value;
                    const selectedCountry = countriesList.find(
                      (country) => country.name === selectedCountryName
                    );
                    if (selectedCountry) {
                      setselectedCountryCode(selectedCountry.isoCode);
                    }
                    handleShippingUpdate(
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
                  onChange={(e) => {
                    handleShippingUpdate(
                      e as React.ChangeEvent<HTMLSelectElement>
                    );
                  }}
                >
                  {statesList
                    .filter((j) => j.countryCode === selectedCountryCode)
                    .map((e) => (
                      <option
                        key={e.name}
                        value={e.name}
                        selected={e.name === shippingAddress.city}
                      >
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
                      name="defaultShippingAddress"
                      value="yes"
                      className="text-[#333] text-[12px] lg:text-[14px] font-normal"
                      checked={defaultShippingAddress === true}
                      onChange={() => {
                        shippingAddress.is_default = true;
                        setDefaultShippingAddress(true);
                      }}
                    />
                    <span className="text-[#333] text-[12px] lg:text-[14px] font-normal">
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="defaultShippingAddress"
                      value="no"
                      className=""
                      checked={defaultShippingAddress === false}
                      onChange={() => {
                        shippingAddress.is_default = false;
                        setDefaultShippingAddress(false);
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
                  onClick={updateShippingAddresses}
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

export default EditAddressShipping;
