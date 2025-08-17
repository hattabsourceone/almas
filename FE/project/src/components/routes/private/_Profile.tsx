/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useUser from "@components/hooks/useUser";
import useAuth from "@components/hooks/useAuth";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import { BASE_URL } from "@components/api/api";
import axios from "axios";
import DisplayShippingAddress from "./DisplayShippingAddress";
import DisplayBillingAddress from "./DisplayBillingAddress";
import withAuth from "@components/shared/withAuth";
import DiamondWishListCard from "@components/shared/DiamondCard/DiamondWishListCard";
import DiamondCompareCard from "@components/shared/DiamondCard/DiamondCompareCard";
import { toast } from "react-toastify";
import DiamondShoppingListCard from "@components/shared/DiamondCard/DiamondShoppingListCard";
import { useCart } from "@components/context/cartProvider";
import { CartItem } from "@components/shared/DiamondActions/DiamondActions";
import circle from "@assets/LandingPage/Collections/circle.png";

export type billingAddressProps = {
  id: number;
  billing_full_name: string;
  billing_mobile_w_country: string;
  billing_address: string;
  billing_city: string;
  billing_post_code: string;
  billing_country: string;
  billing_state: string;
  is_default: boolean;
};

export type billingAddressItem = {
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

export type shippingAddressItem = {
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
  id: number;
  shipping_full_name: string;
  shipping_mobile_w_country: string;
  shipping_address: string;
  shipping_city: string;
  shipping_post_code: string;
  shipping_country: string;
  shipping_state: string;
  is_default: boolean;
};

export type orderProps = {
  id: string;
  purchase_date: string;
  diamond_ids: [{ id: any; diamond_id: any }];
  status: string;
  amount: string;
};

const Profile: React.FC = () => {
  const { currentTokenRef, currentUIDRef } = useAuth();
  const { user, setUser } = useUser();
  const { cart: shoppinglist, toggleCart } = useCart();
  const navigate = useNavigate();
  const session_id = Cookies.get("session_id_token") || currentTokenRef.current;
  const uid: number =
    Number(Cookies.get("uid")) || Number(currentUIDRef.current);
  let wishlistBasket = localStorage.getItem("wishList");
  let newWishlistBasket = wishlistBasket ? JSON.parse(wishlistBasket) : [];

  const [newBasket, setNewBasket] = useState<any[]>([]);

  const [newlistData, setNewlistData] = useState<boolean>(
    user?.newsletter || false
  );
  const [billingAddressData, setBillingAddressData] =
    useState<billingAddressItem>({
      id: -1,
      full_name: "",
      mobile_w_country: "",
      address: "",
      city: "",
      post_code: "",
      country: "",
      state: "",
      is_default: false,
    });
  const [shippingAddressData, setShippingAddressData] =
    useState<shippingAddressItem>({
      id: -1,
      full_name: "",
      mobile_w_country: "",
      address: "",
      city: "",
      post_code: "",
      country: "",
      state: "",
      is_default: false,
    });
  const [useSameAddresses, setUseSameAddresses] = useState<boolean>(false);
  const [editNewList, setEditNewList] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [orders, setOrders] = useState<orderProps[]>([]);

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingAddressData({
      ...billingAddressData,
      [e.target.name]: e.target.value,
    });
    /* if (useSameAddresses) {
      copyBillingToShipping();
    } */
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddressData({
      ...shippingAddressData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    document.title = "My Account";

    if (Cookies.get("routedFrom") === "checkout-page") {
      navigate("/checkout");
    }
    setNewlistData(user?.newsletter || false);
    // add user data here
  }, [user]);

  const updateNewlistData = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/api/v1/toggle_newsletter`, {
        session_id,
        uid,
        state: newlistData,
      }); // TODO add notify
      if (result.status === 200) {
        toast.success("Changes have been saved successfully.", {
          autoClose: 2500,
        });
      } else {
        toast.error("There is an error! please try again.", {
          autoClose: 2500,
        });
      }
    } catch (error) {
      console.log("error when toggle newslatter subs:", error);
      toast.error("There is an error! please try again.", {
        autoClose: 2500,
      });
    }
  };

  const getBillingAddress = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/api/v1/get_billing_address`,
        { session_id: session_id, uid: uid }
      );
      if (result.status === 200) {
        const list: any[] = result.data.billing_address;
        const address = list.find((item: any) => item.is_default);
        if (address) setBillingAddressData(address);
        console.log("ddd", address);
      } else {
        setBillingAddressData({
          id: -1,
          full_name: "",
          mobile_w_country: "",
          address: "",
          city: "",
          post_code: "",
          country: "",
          state: "",
          is_default: false,
        });
      }
    } catch (error) {
      console.log("error when getBillingAddress:", error);
    }
  };

  const getShippingAddress = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/api/v1/get_shipping_address`,
        { session_id: session_id, uid: uid }
      );
      if (result.status === 200) {
        const list: any[] = result.data.shipping_address;
        const address = list.find((item: any) => item.is_default);
        if (address) {
          setShippingAddressData(address);
        } else {
          setShippingAddressData({
            id: -1,
            full_name: "",
            mobile_w_country: "",
            address: "",
            city: "",
            post_code: "",
            country: "",
            state: "",
            is_default: false,
          });
        }
      }
    } catch (error) {
      console.log("error when getShippingAddress:", error);
    }
  };

  const updateBillingAddress = async () => {
    try {
      if (billingAddressData.id === -1) return;
      const data = mapBillingAddressItemToProps(billingAddressData);
      const result = await axios.post(
        `${BASE_URL}/api/v1/update_billing_address`,
        { ...data, session_id: session_id, uid: uid }
      );
      if (result.status === 200) {
        toast.success("Changes have been saved successfully.", {
          autoClose: 2500,
        });
      } else {
        toast.error("Please, fill up all necessary fields and try again.", {
          autoClose: 2500,
        });
      }
    } catch (error) {
      console.log("error when updateBillingAddress:", error);
      toast.error("Please, fill up all necessary fields and try again.", {
        autoClose: 2500,
      });
    }
  };

  const updateShippingAddress = async () => {
    try {
      if (shippingAddressData.id === -1) return;
      const data = mapShippingAddressItemToProps(shippingAddressData);
      const result = await axios.post(
        `${BASE_URL}/api/v1/update_shipping_address`,
        { ...data, session_id: session_id, uid: uid }
      ); // TODO add notify
      if (result.status === 200) {
        toast.success("Changes have been saved successfully.", {
          autoClose: 2500,
        });
      } else {
        toast.error("Please, fill up all necessary fields and try again.", {
          autoClose: 2500,
        });
      }
    } catch (error) {
      console.log("error when updateShippingAddress:", error);
      toast.error("Please, fill up all necessary fields and try again.", {
        autoClose: 2500,
      });
    }
  };

  const mapBillingAddressItemToProps = (
    item: billingAddressItem
  ): billingAddressProps => {
    return {
      id: item.id,
      billing_full_name: item.full_name,
      billing_mobile_w_country: item.mobile_w_country,
      billing_address: item.address,
      billing_city: item.city,
      billing_post_code: item.post_code,
      billing_country: item.country,
      billing_state: item.state,
      is_default: item.is_default,
    };
  };

  const mapShippingAddressItemToProps = (
    item: shippingAddressItem
  ): shippingAddressProps => {
    return {
      id: item.id,
      shipping_full_name: item.full_name,
      shipping_mobile_w_country: item.mobile_w_country,
      shipping_address: item.address,
      shipping_city: item.city,
      shipping_post_code: item.post_code,
      shipping_country: item.country,
      shipping_state: item.state,
      is_default: item.is_default,
    };
  };

  const getOrders = async () => {
    try {
      const body = {
        session_id: session_id,
        uid: uid,
      };
      const response = await axios.post(`${BASE_URL}/api/v1/get_orders`, body);
      if (response.status === 200) {
        console.log("example here ", response.data.orders);

        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log("add to cart:", error);
    }
  };

  useEffect(() => {
    const useSameAddresses = Cookies.get("useSameAddresses") === "true";
    setUseSameAddresses(useSameAddresses);
    setIsInitialized(true);
    getWishlist();
    const basket = localStorage.getItem("compareDiamonds");
    setNewBasket(basket ? JSON.parse(basket) : []);
    getBillingAddress();
    getShippingAddress();
    getCartItemsRequest();
    getOrders();
  }, []);

  useEffect(() => {
    if (isInitialized) {
      Cookies.set("useSameAddresses", useSameAddresses.toString());
    }
  }, [useSameAddresses]);

  console.log("orders: ", orders);

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
        console.log("getWishlist -----------", response);
        setWishlist(response.data.data);
        localStorage.setItem("wishList", JSON.stringify(response.data.data));
      } else {
        // error there
      }
    } catch (error) {
      console.log("get wishlist:", error);
    }
  };

  const removeFromWishlist = async (
    diamond_id: string,
    wishlist_id: string
  ) => {
    try {
      const body = {
        session_id,
        uid,
        diamond_id,
      };
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.wishlist_id !== wishlist_id)
      );
      console.log("from whish", body);

      const response = await axios.post(
        `${BASE_URL}/api/v1/remove_from_wishlist`,
        body
      );
      if (response.status === 200) {
        console.log("resp:", response.data);
        toast.success("Changes have been saved successfully.", {
          autoClose: 2500,
        });
      }
    } catch (error) {
      console.log("remove wishlist:", error);
      toast.error("There is an error! please try again.", {
        autoClose: 2500,
      });
    }
  };

  const removeFromCompare = async (diamond_id: string) => {
    try {
      const compareBasket = localStorage.getItem("compareDiamonds");
      const newBasket = compareBasket ? JSON.parse(compareBasket) : [];
      const index = newBasket.findIndex((item: any) => item.id === diamond_id);
      if (index > -1) {
        newBasket.splice(index, 1);
        localStorage.setItem("compareDiamonds", JSON.stringify(newBasket));
      }
      setNewBasket(newBasket);
      const response = await axios.post(
        `${BASE_URL}/api/v1/remove_from_compare_diamonds`,
        {
          session_id,
          uid,
          diamond_id,
        }
      );
      console.log("remove from compare list:", response.data);

      if (response.status === 200) {
        toast.success("Changes have been saved successfully.", {
          autoClose: 2500,
        });
      } else {
        toast.error("There is an error! please try again.", {
          autoClose: 2500,
        });
      }
    } catch (error) {
      console.log("add to compare:", error);
      toast.error("There is an error! please try again.", {
        autoClose: 2500,
      });
    }
  };

  const getCartItemsRequest = async () => {
    try {
      const body = {
        session_id: session_id,
        uid: uid,
      };
      const response = await axios.post(`${BASE_URL}/api/v1/get_cart`, body);
      if (response.status === 200) {
        const shoppingCart = response.data.cart.diamond;
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...response.data.cart.diamond,
            ...response.data.cart.jewellery,
          ])
        );
        toggleCart();
      }
    } catch (error) {
      console.log("getCartItemsRequest:", error);
    }
  };

  const removeFromCart = async (id: string) => {
    const cart = localStorage.getItem("cart");
    const newCart = cart ? JSON.parse(cart) : [];
    const index = newCart.findIndex((item: any) => item.id === id);
    if (index > -1) {
      newCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    toggleCart();
    try {
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
      if (response.status === 200) {
        // TODO add notification
      }
    } catch (error) {
      console.log("add to cart:", error);
    }
  };

  return (
    <div className="flex flex-col mt-4 w-full">
      <div className="w-full -ml-4 md:-ml-6 lg:-ml-6 xl:-ml-2 2xl:pl-32">
        <Breadcrumb
          menu={[
            {
              title: "Account",
              link: "/profile",
              level: 1,
            },
          ]}
        />
      </div>
      <div className="flex flex-col w-[90%] md:w-[92%] lg:w-[90%] xl:w-[87%] 2xl:w-[68%] mx-auto items-start justify-center mt-8">
        <div
          className="bg-no-repeat bg-contain py-8 bg-start md:bg-center"
          style={{
            backgroundImage: `url(${circle})`,
          }}
        >
          <p className="text-[#211F41] text-[40px] mr-20 font-medium mb-12 md:mb-0 leading-[45px]">
            MY <br /> ACCOUNT
          </p>
        </div>
        <h3 className="text-[#201f41] text-[30px] font-medium pt-10 pb-6">
          ACCOUNT INFORMATION
        </h3>
        <div className="p-4 bg-[#F7F7F7] rounded-none border-[1px] border-[#e1e1e1] w-full flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
          <div className="w-[95%] md:w-[48%] flex flex-col">
            <div className="flex flex-row justify-between">
              <h5 className="text-[#444] text-[18px] font-bold">
                Contact Information
              </h5>
              <a
                href="/profile/personal-details"
                className="font-medium text-[18px] text-[#201f41]"
              >
                Edit
              </a>
            </div>
            <div
              className="capitalize text-[16px] text-[#666] pt-2"
              style={{
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: "500",
              }}
            >
              {user?.name}
            </div>
            <div
              className="capitalize text-[16px] text-[#666] py-2"
              style={{
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: "500",
              }}
            >
              {user?.login}
            </div>
            <a
              href="/profile/update-password"
              className="font-medium text-[16px] text-[#201f41] border-b-[2.5px] border-[#201f41] pb-1 w-min text-nowrap pt-2"
            >
              Change the password
            </a>
          </div>
          <div className="w-[95%] md:w-[48%] flex flex-col">
            <div className="flex flex-row justify-between">
              <h5 className="text-[#444] text-[18px] font-bold">Newsletters</h5>
              <a
                onClick={updateNewlistData}
                className="font-medium text-[18px] text-[#201f41]"
              >
                Save
              </a>
            </div>
            {newlistData ? (
              <div className="d-flex align-items-center pt-2">
                <input
                  className="me-2 text-[#666]"
                  type="checkbox"
                  checked={newlistData}
                  onChange={() => {
                    setNewlistData(!newlistData);
                  }}
                />
                <p className="m-0 text-[14px] text-[#333]">
                  Subscribe to special Offers
                </p>
              </div>
            ) : (
              <div className="d-flex align-items-center pt-2">
                <input
                  className="me-2 text-[#666]"
                  type="checkbox"
                  checked={newlistData}
                  onChange={() => {
                    setNewlistData(!newlistData);
                  }}
                />
                <p className="m-0 text-[14px] text-[#333]">
                  Subscribe to special Offers
                </p>
              </div>
            )}
            {newlistData ? (
              <p className="text-[14px] font-normal text-[#bcbdc7] pt-2">
                You are currently subscribed to our newsletter.
              </p>
            ) : (
              <p className="text-[14px] font-normal text-[#bcbdc7] pt-2">
                You are currently not subscribed to our newsletter.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between w-full items-end pt-10 pb-6">
          <h3 className="text-[#201f41] text-[30px] font-medium">
            ADDRESS BOOK
          </h3>
          <p
            onClick={() => {
              navigate("/profile/address-book");
            }}
            className="text-[18px] cursor-pointer font-medium text-[#201f41] capitalize"
          >
            view all
          </p>
        </div>
        <div className="p-4 bg-[#F7F7F7] rounded-none border-[1px] border-[#e1e1e1] w-full flex flex-col md:flex-row space-y-4 md:space-y-0 items-start md:justify-between">
          <div className="w-[95%] md:w-[48%] md:mr-6">
            <div className="flex flex-row justify-between items-center">
              <h4 className="text-[18px] font-medium text-[#444444]">
                Billing Address
              </h4>
              <a
                className="text-[18px] text-[#201f41] font-medium"
                href={
                  billingAddressData.id !== -1
                    ? `/profile/address-book/edit-billing-address?id=${billingAddressData.id}`
                    : "#"
                }
              >
                Edit
              </a>
            </div>
            <div className="d-flex items-center pt-2">
              <DisplayBillingAddress
                address={billingAddressData!}
                handleBillingUpdate={handleBillingChange}
              />
            </div>
          </div>
          <div className="w-[95%] md:w-[48%]">
            <div className="d-flex justify-between items-center">
              <h4 className="text-[18px] font-medium text-[#444444]">
                Shipping Address
              </h4>
              <a
                className="text-[18px] text-[#201f41] font-medium"
                href={
                  shippingAddressData.id !== -1
                    ? `/profile/address-book/edit-shipping-address?id=${shippingAddressData.id}`
                    : "#"
                }
              >
                Edit
              </a>
            </div>
            <div className="d-flex items-center pt-2">
              {
                <DisplayShippingAddress
                  address={shippingAddressData!}
                  handleShippingUpdate={handleShippingChange}
                />
              }
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between w-full items-end pt-10 pb-6">
          <h3 className="text-[#201f41] text-[30px] font-medium">
            MY WISHLIST
          </h3>
          <p
            onClick={() => {
              navigate("/profile/wishlist");
            }}
            className="text-[18px] cursor-pointer font-medium text-[#201f41] capitalize"
          >
            view all
          </p>
        </div>
        <div className="p-4 bg-[#F7F7F7] rounded-none border-[1px] border-[#e1e1e1] w-full">
          {wishlist.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {wishlist.map((element: any) => (
                <div key={element.wishlist_id}>
                  <DiamondWishListCard
                    data={element}
                    removeFromWishlist={removeFromWishlist}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* <div className="flex flex-row justify-between w-full items-end pt-10 pb-6">
          <h3 className="text-[#211F41] text-3xl font-medium ">
            SHOPPING CART
          </h3>
          <p
            onClick={() => {
              if (shoppinglist.length === 0) return;
              navigate("/profile/shopping-cart");
            }}
            className="text-lg cursor-pointer font-semibold text-[#211F41]  "
          >
            view all
          </p>
        </div>
        <div className="p-4 bg-very-lite-blue rounded w-full">
          {shoppinglist.length === 0 ? (
            <p>Your shopping cart is empty.</p>
          ) : (
            <>
            <p>{shoppinglist.length}</p>
            <div className="grid grid-cols-3 gap-3">
              {shoppinglist.map((element: any) => (
                <div key={element.id}>
                  <DiamondShoppingListCard
                    data={element}
                    removeFromShoppinglist={removeFromCart}
                    />
                </div>
              ))}
            </div>
              </>
          )}
        </div> */}
        <div className="flex flex-row justify-between w-full items-end pt-10 pb-6">
          <h3 className="text-[#201f41] text-[30px] font-medium">
            COMPARE DIAMONDS
          </h3>
          <p
            onClick={() => {
              navigate("/search-inventory/compare-products");
            }}
            className="text-[18px] cursor-pointer font-medium text-[#201f41] capitalize"
          >
            view all
          </p>
        </div>
        <div className="p-4 bg-[#F7F7F7] rounded-none border-[1px] border-[#e1e1e1] w-full mb-20">
          {newBasket.length === 0 ? (
            <p>No Diamonds Selected.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {newBasket.map((element: any) => (
                <DiamondCompareCard
                  key={element.id}
                  data={element}
                  removeFromCompare={removeFromCompare}
                />
              ))}
            </div>
          )}
        </div>
        {/* <div className="flex flex-row justify-between w-full items-end pt-10 pb-6">
          <h3 className="text-[#201f41] text-[30px] font-medium">MY ORDERS</h3>
          <p
            onClick={() => navigate("/profile/orders-history")}
            className="text-[18px] cursor-pointer font-medium text-[#201f41] capitalize"
          >
            view all
          </p>
        </div>
        <div className="w-full overflow-x-scroll lg:overflow-x-hidden mb-20">
          <div className="w-[100%]">
            <table className="min-w-full table-fixed text-left text-base text-gray-500 border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr className="text-[20px] font-normal">
                  <th className="w-[100px] px-4 py-3">
                    Order No
                  </th>
                  <th className="pl-4 w-1/5 h-[60px]">
                    Order Date
                  </th>
                  <th className="pl-4 w-1/5 h-[60px]">
                    Items
                  </th>
                  <th className="pl-4 w-1/5 h-[60px]">
                    Status
                  </th>
                  <th className="pl-4 w-1/5 h-[60px]">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <></>
                  </tr>
                ) : (
                  orders?.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b bg-white hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">{order.id}</td>
                      <td className="px-4 py-3">{order.purchase_date}</td>
                      <td className="px-4 py-3">
                        {order.diamond_ids?.length ? (
                          <ul className="list-disc list-inside">
                            {order.diamond_ids.map((diamond) => (
                              <li key={diamond.id}>{diamond.diamond_id}</li>
                            ))}
                          </ul>
                        ) : (
                          "No diamonds"
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <span className="font-medium">
                          {order.status === "PD" ? "Paid" : "Not paid"}
                        </span>
                      </td>
                      <td className="px-4 py-3">${order.amount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default withAuth(Profile);
