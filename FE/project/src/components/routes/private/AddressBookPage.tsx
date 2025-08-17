import { BASE_URL } from "@components/api/api";
import useAuth from "@components/hooks/useAuth";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import withAuth from "@components/shared/withAuth";
import { MdOutlineEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DisplayBillingAddress from "./DisplayBillingAddress";
import DisplayShippingAddress from "./DisplayShippingAddress";
import { useNavigate } from "react-router-dom";
import image from "@assets/Auth/signup-1.jpg";
import { useCart } from "@components/context/cartProvider";

export type billingAddressProps = {
  id: number;
  full_name: string;
  mobile_w_country: string;
  address: string;
  city: string;
  post_code: string;
  country: string;
  state: string;
  is_default: boolean;
};

export type shippingAddressProps = {
  id?: number;
  full_name: string;
  mobile_w_country: string;
  address: string;
  city: string;
  post_code: string;
  country: string;
  state: string;
  is_default: boolean;
};

const AddressBookPage: React.FC = () => {
  const { currentTokenRef, currentUIDRef, logout } = useAuth();
  const navigate = useNavigate();
  const [useSameAddresses, setUseSameAddresses] = useState<boolean>(false);
  const { toggleCart } = useCart();
  const [defaultBillingAddress, setDefaultBillingAddress] =
    useState<boolean>(true);
  const [defaultShippingAddress, setDefaultShippingAddress] =
    useState<boolean>(true);
  const session_id = Cookies.get("session_id_token") || currentTokenRef.current;
  const uid: number =
    Number(Cookies.get("uid")) || Number(currentUIDRef.current);
  const [billingAddressList, setBillingAddressList] = useState<
    billingAddressProps[]
  >([]);
  const [shippingAddressList, setShippingAddressList] = useState<
    shippingAddressProps[]
  >([]);
  const [billingAddress, setBillingAddress] = useState<billingAddressProps>({
    id: -1,
    full_name: "",
    mobile_w_country: "",
    address: "",
    city: "",
    post_code: "",
    country: "",
    state: "",
    is_default: defaultBillingAddress,
  });
  const [shippingAddress, setShippingAddress] = useState<shippingAddressProps>({
    id: -1,
    full_name: "",
    mobile_w_country: "",
    address: "",
    city: "",
    post_code: "",
    country: "",
    state: "",
    is_default: defaultShippingAddress,
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

  const getBillingAddresses = async () => {
    try {
      const body = {
        session_id,
        uid,
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/get_billing_address`,
        body
      );
      console.log("addresses: ", response.data.billing_address);

      if (response.status === 200) {
        const updatedBillingAddress = [...response.data.billing_address];
        setBillingAddressList(updatedBillingAddress);
      }
    } catch (error) {
      console.log("getBillingAddresses:", error);
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
        setShippingAddressList(response.data.shipping_address);
      }
    } catch (error) {
      console.log("getShippingAddresses:", error);
    }
  };

  const deleteBillingAddresses = async (id: number) => {
    try {
      const body = {
        session_id,
        uid,
        id,
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/delete_billing_address`,
        body
      );
      if (response.status === 200) {
        const index = billingAddressList.findIndex(
          (Pref: any) => Pref.id === id
        );
        if (index > -1) {
          const updatedBillingAddress = [
            ...billingAddressList.slice(0, index),
            ...billingAddressList.slice(index + 1),
          ];
          setBillingAddressList(updatedBillingAddress);
        }
      }
    } catch (error) {
      console.log("deleteBillingAddresses:", error);
    }
  };

  const deleteShippingAddresses = async (id: number) => {
    try {
      const body = {
        session_id,
        uid,
        id,
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/delete_shipping_address`,
        body
      );
      if (response.status === 200) {
        const index = shippingAddressList.findIndex(
          (Pref: any) => Pref.id === id
        );
        if (index > -1) {
          const updatedShippingAddress = [
            ...shippingAddressList.slice(0, index),
            ...shippingAddressList.slice(index + 1),
          ];
          setShippingAddressList(updatedShippingAddress);
        }
      }
    } catch (error) {
      console.log("deleteShippingAddresses:", error);
    }
  };

  const copyBillingToShipping = () => {
    setShippingAddress({
      full_name: billingAddress.full_name,
      mobile_w_country: billingAddress.mobile_w_country,
      address: billingAddress.address,
      city: billingAddress.city,
      post_code: billingAddress.post_code,
      country: billingAddress.country,
      state: billingAddress.state,
      is_default: defaultShippingAddress,
    });
  };

  useEffect(() => {
    document.title="Address Book";
    getBillingAddresses();
    getShippingAddresses();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <div className="relative flex items-center justify-center w-full h-auto md:justify-start xl:-mt-12 2xl:-mt-12">
          <img src={image} className="w-full h-auto" />
          <h1 className="text-white uppercase font-medium text-[40px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[65px] absolute mt-40 ml-20">
            Diamonds
          </h1>
        </div>
      </div>
      <div className="lg:-ml-6 xl:-ml-4 2xl:ml-24 mt-4">
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
          ]}
        />
      </div>
      <div className="w-[99%] md:w-[92%] lg:w-[90%] xl:w-[88%] 2xl:w-[70%] mx-auto mb-20 flex flex-col md:flex-row md:space-x-8 lg:space-x-10">
        <div className="w-[95%] md:w-[77%] lg:w-[80%] xl:w-[75%] 2xl:w-[80%] mx-auto">
          <p className="text-[#211F41] text-[30px] font-medium py-12">
            ADDRESS BOOK ENTRIES
          </p>
          <div className="flex flex-row justify-between items-center pb-3">
            <p className="text-[#211F41] text-[20px] font-medium">
              Billing Adresses
            </p>
            <button
              onClick={() =>
                navigate("/profile/address-book/add-billing-address")
              }
              className="h-[35px] px-3 text-[15px] font-bold hover:opacity-40 bg-[#201f41] text-white rounded-full border-[#201f41] border-[1px]"
            >
              New Address
            </button>
          </div>
          <div
            className={`bg-white ${
              billingAddressList.length === 0 ? "" : "border-[1px]"
            } border-collapse border-[#666] border-opacity-45`}
          >
            {billingAddressList.length === 0 ? (
              <p className="text-[#333] text-[14px]">
                Your billing address book is empty.
              </p>
            ) : (
              billingAddressList?.map((address: any, index: number) => (
                <div
                  key={index}
                  className="bg-white capitalize text-center text-[14px] font-semibold border-b border-[#888] border-opacity-45 flex flex-row w-full"
                >
                  <div className="flex flex-col items-start space-y-1 text-[15px] text-[#1f1f41] text-nowrap border-r border-[#888] border-opacity-45 p-3 w-1/2">
                    <p>
                      {address.full_name}, {address.mobile_w_country}
                    </p>
                    <p>{address.address}</p>
                    <p>
                      {address.city} {address.post_code}
                    </p>
                    <p>{address.state}</p>
                    <p>{address.country}</p>
                    {address.is_default && (
                      <p className="text-[15px] font-semibold text-[#1f1f41] pt-2">
                        Default Address
                      </p>
                    )}
                  </div>
                  <div className="flex flex-row items-center justify-end space-x-2 p-3 w-1/2">
                    <button
                      onClick={() =>
                        navigate(
                          `/profile/address-book/edit-billing-address?id=${address.id}`
                        )
                      }
                      className="h-[35px] px-3 text-[15px] font-bold text-[#201f41] hover:bg-[#201f41] hover:text-white rounded-full border-[#201f41] border-[1px]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBillingAddresses(address.id)}
                      className="h-[35px] px-4 min-w-[90px] text-[15px] font-bold text-[#201f41] hover:bg-[#201f41] hover:text-white rounded-full border-[#201f41] border-[1px]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex flex-row justify-between items-center pb-3 pt-12">
            <p className="text-[#211F41] text-[20px] font-medium">
              Shipping Adresses
            </p>
            <button
              onClick={() =>
                navigate("/profile/address-book/add-shipping-address")
              }
              className="h-[35px] px-3 text-[15px] hover:opacity-40 font-bold bg-[#201f41] text-white rounded-full border-[#201f41] border-[1px]"
            >
              New Address
            </button>
          </div>
          <div
            className={`bg-white ${
              shippingAddressList.length === 0 ? "" : "border-[1px]"
            } border-collapse border-[#666] border-opacity-45`}
          >
            {shippingAddressList.length === 0 ? (
              <p className="text-[#333] text-[14px]">
                Your shipping address book is empty.
              </p>
            ) : (
              shippingAddressList?.map((address: any, index: number) => (
                <div
                  key={index}
                  className="bg-white capitalize text-center text-[14px] font-semibold border-b border-[#888] border-opacity-45 flex flex-row w-full"
                >
                  <div className="flex flex-col items-start space-y-1 text-[15px] text-[#1f1f41] text-nowrap border-r border-[#888] border-opacity-45 p-3 w-1/2">
                    <p>
                      {address.full_name}, {address.mobile_w_country}
                    </p>
                    <p>{address.address}</p>
                    <p>
                      {address.city} {address.post_code}
                    </p>
                    <p>{address.state}</p>
                    <p>{address.country}</p>
                    {address.is_default && (
                      <p className="text-[15px] font-semibold text-[#1f1f41] pt-2">
                        Default Address
                      </p>
                    )}
                  </div>
                  <div className="flex flex-row items-center justify-end space-x-2 p-3 w-1/2">
                    <button
                      onClick={() =>
                        navigate(
                          `/profile/address-book/edit-shipping-address?id=${address.id}`
                        )
                      }
                      className="h-[35px] px-3 text-[15px] font-bold text-[#201f41] hover:bg-[#201f41] hover:text-white rounded-full border-[#201f41] border-[1px]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteShippingAddresses(address.id)}
                      className="h-[35px] px-4 min-w-[90px] text-[15px] font-bold text-[#201f41] hover:bg-[#201f41] hover:text-white rounded-full border-[#201f41] border-[1px]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex flex-col mt-4">
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
                className={`h-[38px] mx-auto w-[95%] md:w-[150px] lg:w-[205px] xl:w-[255px] 2xl:w-[308px] bg-[#201f41] hover:bg-[#3995A5] text-[14px] text-white flex items-center pl-4 mb-[1px] capitalize ${
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
      <Contact />
    </div>
  );
};

export default withAuth(AddressBookPage);
