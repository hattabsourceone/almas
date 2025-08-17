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
import shape37 from "@assets/SearchDiamond/shapes/shape37.png";
import shape38 from "@assets/SearchDiamond/shapes/shape38.png";
import cushion from "@assets/Jewellery/shapes/cushion.jpg";
import cushionModified from "@assets/SearchDiamond/shapes/cushion-modified.png";
import emerald from "@assets/Jewellery/shapes/emerald.jpg";
import heart from "@assets/Jewellery/shapes/heart.jpg";
import oval from "@assets/Jewellery/shapes/oval.jpg";
import pear from "@assets/Jewellery/shapes/pear.jpg";
import princess from "@assets/Jewellery/shapes/princess.jpg";
import round from "@assets/Jewellery/shapes/round.jpg";
import radiant from "@assets/Jewellery/shapes/radiant.jpg";
import marquize from "@assets/Jewellery/shapes/marquize.png";
import asscher from "@assets/Jewellery/shapes/asscher.png";
import { BASE_URL } from "@components/api/api";
import Cookies from "js-cookie";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import withAuth from "@components/shared/withAuth";
import { MdNoPhotography } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@components/context/cartProvider";
import useAuth from "@components/hooks/useAuth";
import shapeImages from "@assets/default/default_img";
import { FaCaretDown } from "react-icons/fa";
import { ShapeImages } from "../SearchDiamond/FilterShape";
import { toast } from "react-toastify";
import { Country, State } from "country-state-city";
import Register from "../checkout/CheckoutRegister";
import Login from "../Authentification/Login";
import { RegisterCoordinates } from "../checkout/CheckoutRegister";
import { LoginCoordinates } from "../Authentification/Login";
import Loading from "@components/shared/Loading/Loading";

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
  company?: string;
  billing_address_2?: string;
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
  company?: string;
  shipping_address_2?: string;
};

type RingSizeMap = { [key: number]: string };

const CheckoutPage: React.FC = () => {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const {
    setAuth,
    setCurrentToken,
    setCurrentUID,
    currentToken,
    currentTokenRef,
    currentUIDRef,
  } = useAuth();
  const { clearCart, total, toggleCart } = useCart();
  let cart = localStorage.getItem("cart");
  const [newCart, setNewCart] = useState<[]>(cart ? JSON.parse(cart) : []);
  const session_id = Cookies.get("session_id_token") || currentTokenRef.current;
  const uid = Number(Cookies.get("uid")) || Number(currentUIDRef.current);
  const navigate = useNavigate();
  const [billingAddresses, setbillingAddresses] = useState<
    billingAddressProps[]
  >([]);
  const [shippingAddresses, setshippingAddresses] = useState<
    billingAddressProps[]
  >([]);
  const [useownadress, setuseownadress] = useState<boolean>(false);
  const [useownshipadress, setuseownshipadress] = useState<boolean>(false);
  const countriesList = Country.getAllCountries();
  const statesList = State.getAllStates();
  const [selectedCountryCode, setselectedCountryCode] = useState<string>("AF");
  const [step1, setstep1] = useState<boolean>(true);
  const [step2, setstep2] = useState<boolean>(false);
  const [step3, setstep3] = useState<boolean>(false);
  const [step4, setstep4] = useState<boolean>(false);
  const [step5, setstep5] = useState<boolean>(false);
  const [step6, setstep6] = useState<boolean>(false);
  const [currentStep, setcurrentStep] = useState<number>(2);
  const [usercomment, setusercomment] = useState<string>("");
  const [billingAddress, setBillingAddress] = useState<billingAddressProps>({
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
  const [shippingAddress, setShippingAddress] = useState<billingAddressProps>({
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

  const mapShippingAddressToPref = (item: shippingAddressProps): any => {
    return {
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

  const mapBillingAddresstoPref = (item: billingAddressProps): any => {
    return {
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

  const handleBillingWriting = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBillingAddress({
      ...billingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleShippingWriting = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target.value);
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

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
  const [selectedBillingAddress, setSelectedBillingAddress] =
    useState<string>("0");

  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<string>("0");

  const [newcustomer, setNewCustomer] = useState(false);

  const [acceptPP, setAcceptPP] = useState<boolean>(false);
  const [bdAddress, setBDAddress] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [subscribe, setSubscribe] = useState<boolean>(true);
  const [registerCoordinates, setRegisterCoordinates] =
    React.useState<RegisterCoordinates>({
      email: "",
      login: "",
      password: "",
      retypePassword: "",
      subscribe: subscribe,
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "", // added state
      postCode: "",
      country: "",
      // region: "",
      mobile: "",
      bdAddress: false,
      acceptPP: false,
    });
  const [loginCoordinates, setLoginCoordinates] = useState<LoginCoordinates>({
    login: "",
    password: "",
    db: "odoo17",
  });
  let isAuthed = false;

  useEffect(() => {
    document.title = "Checkout";
    setRegisterCoordinates((prev) => ({
      ...prev,
      subscribe,
    }));
  }, [subscribe]);

  const createShippingAddress = async (credentials?: any, addr?: any) => {
    try {
      const address = mapShippingAddressToPref(addr || shippingAddress);
      const result = await axios.post(
        `${BASE_URL}/api/v1/add_shipping_address`,
        {
          ...address,
          session_id: session_id,
          uid: uid,
          ...credentials,
        }
      );
      if (result.status === 200) {
        if (addr) localStorage.removeItem("updated_addr");
        toast.success("Address have been created successfully.", {
          autoClose: 2500,
        });
        await getShippingAddresses(credentials);
        setShippingAddress({
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
        setcurrentStep(4);
        setstep3(false);
        setstep4(true);
      }
    } catch (error) {
      console.log("error when createShippingAddress:", error);
      toast.error("Please, fill up all necessary fields and try again.", {
        autoClose: 2500,
      });
    }
  };

  const getShippingAddresses = async (credentials?: any) => {
    try {
      const body = {
        session_id,
        uid,
        ...credentials,
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/get_shipping_address`,
        body
      );
      if (response.status === 200) {
        setshippingAddresses(response.data.shipping_address);
        if (response.data.shipping_address.length === 0) {
          setuseownshipadress(false);
        } else {
          let defaultId =
            response.data.shipping_address.find((e: any) => e.is_default).id ||
            response.data.shipping_address[0].id;
          setSelectedShippingAddress(defaultId);
          setuseownshipadress(true);
        }
      }
    } catch (error) {
      console.log("getShippingAddresses:", error);
    }
  };

  const getBillingAddresses = async (credentials?: any) => {
    try {
      const body = {
        session_id,
        uid,
        ...credentials,
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/get_billing_address`,
        body
      );
      if (response.status === 200) {
        const updatedBillingAddress = [...response.data.billing_address];
        setbillingAddresses(updatedBillingAddress);
        if (updatedBillingAddress.length === 0) {
          setuseownadress(false);
        } else {
          let defaultId =
            response.data.billing_address.find((e: any) => e.is_default).id ||
            response.data.billing_address[0].id;
          setSelectedBillingAddress(defaultId);
          setuseownadress(true);
        }
      }
    } catch (error) {
      console.log("getBillingAddresses:", error);
    }
  };

  const SmallShapeImage = (shape: any) => {
    const key = shape["shape"].includes("Cushion")
      ? "cushion"
      : shape["shape"].toLowerCase();
    const imageSrc = shapeImages[key];
    if (imageSrc) {
      return <img className="h-20 w-20" src={imageSrc} alt="diamond" />;
    } else {
      return <MdNoPhotography className="h-20 w-20" />;
    }
  };

  const createBillingAddress = async (credentials?: any, addr?: any) => {
    try {
      const address = mapBillingAddresstoPref(addr || billingAddress);
      const result = await axios.post(
        `${BASE_URL}/api/v1/add_billing_address`,
        {
          ...address,
          session_id: session_id,
          uid: uid,
          ...credentials,
        }
      );
      if (result.status === 200) {
        if (addr) localStorage.removeItem("updated_addr");
        toast.success("Address have been created successfully.", {
          autoClose: 2500,
        });
        await getBillingAddresses(credentials);
        setBillingAddress({
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
        setcurrentStep(3);
        setstep2(false);
        setstep3(true);
      }
    } catch (error) {
      console.log("error when createBillingAddress:", error);
      toast.error("Please, fill up all necessary fields and try again.", {
        autoClose: 2500,
      });
    }
  };

  const checkoutOrder = async () => {
    try {
      const body = {
        customer: uid,
        shipping_address: selectedShippingAddress,
        billing_address: selectedBillingAddress,
        notes: usercomment,
      };
      const result = await axios.post(`${BASE_URL}/api/v1/get_checkout_link`, {
        session_id: session_id,
        uid: uid,
        data: body,
      });
      if (result.status === 200) {
        window.location.href = result.data.url;
      }
    } catch (error: any) {
      console.log("checkoutOrder error:", error.response.data.error);
      if (error.response.data.error === "User not verified.") {
        toast.error(
          "Your account is not yet verified. Please contact the admin to complete the verification process.",
          {
            autoClose: 2500,
          }
        );
      } else {
        toast.error("There is something wrong. Please try again later.", {
          autoClose: 2500,
        });
      }
    }
  };

  const handleNewCustomer = () => {
    setNewCustomer(true);
    setstep1(!step1);
    setstep2(!step2);
  };

  // When the user already logged in and open the checkout page,
  // we need to fetch their data immediately to initialize the checkout process.
  const fetchLoginData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000)); //need to wait more than 1 second or will get unauthorized
      await getShippingAddresses();
      await getBillingAddresses();
      setstep2(true);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
    setIsPageLoading(false);
  };

  /* useEffect(() => {
    if (isNaN(uid) || String(uid) == "guest") {
      Cookies.set("routedFrom", "checkout-page");
    } else {
      Cookies.remove("routedFrom");
    }
    if (newCart.length === 0) {
      navigate("/profile/shopping-cart");
    }
    if (!isNaN(uid) || session_id != "guest") {
      setstep1(!step1);
      setstep2(!step2);

      // Once it redirect to checkout page, the following fetch works correctly.
      fetchLoginData();
    }
  }, [session_id, uid]); */

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

  console.log("new customer", newcustomer);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(e.target.name);
    console.log(e.target.value);

    if (e.target.name === "loginEmail" || e.target.name === "loginPassword") {
      let key: "login" | "password" =
        e.target.name === "loginEmail" ? "login" : "password";
      setLoginCoordinates({
        ...loginCoordinates,
        [key]: e.target.value,
        db: "odoo17",
      });
    } else {
      setRegisterCoordinates((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        name: `${prev.firstName} ${prev.lastName}`,
      }));
      if (e.target.name == "email" || e.target.name == "login")
        setRegisterCoordinates({
          ...registerCoordinates,
          email: e.target.value as "",
          login: e.target.value as "",
        });
    }
  };

  useEffect(() => {
    if (!registerCoordinates.country && countriesList.length > 0) {
      const defaultCountry = countriesList[0];
      const defaultStates = statesList.filter(
        (state) => state.countryCode === defaultCountry.isoCode
      );
      setselectedCountryCode(defaultCountry.isoCode);
      setRegisterCoordinates({
        ...registerCoordinates,
        country: defaultCountry.name,
        state: defaultStates.length > 0 ? defaultStates[0].name : "",
      });
      setShippingAddress({
        ...shippingAddress,
        country: defaultCountry.name,
        state: defaultStates.length > 0 ? defaultStates[0].name : "",
      });
      setBillingAddress({
        ...billingAddress,
        country: defaultCountry.name,
        state: defaultStates.length > 0 ? defaultStates[0].name : "",
      });
    } else {
      const defaultStates = statesList.filter(
        (state) => state.countryCode === selectedCountryCode
      );
      setRegisterCoordinates({
        ...registerCoordinates,
        state: defaultStates.length > 0 ? defaultStates[0].name : "",
      });
      setBillingAddress({
        ...billingAddress,
        state: defaultStates.length > 0 ? defaultStates[0].name : "",
      });
      setShippingAddress({
        ...shippingAddress,
        state: defaultStates.length > 0 ? defaultStates[0].name : "",
      });
    }
  }, [
    countriesList,
    statesList,
    registerCoordinates.country,
    billingAddress.country,
    shippingAddress.country,
  ]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    await register();
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    await login();
  };

  const register = async () => {
    try {
      if (registerCoordinates.retypePassword != registerCoordinates.password) {
        setError("Passwords do not match! please retry again");
        return;
      }
      setLoading(true);
      setError(null);
      console.log("went to register ---------------");
      const response = await axios.post(
        `${BASE_URL}/api/v1/create_user`,
        registerCoordinates
      );
      if (response.status === 200) {
        localStorage.setItem(
          "updated_addr",
          JSON.stringify({
            id: -1,
            full_name: `${registerCoordinates.firstName} ${registerCoordinates.lastName}`,
            mobile_w_country: registerCoordinates.mobile,
            address: registerCoordinates.address1,
            city: registerCoordinates.city,
            post_code: registerCoordinates.postCode,
            country: registerCoordinates.country,
            state: registerCoordinates.state,
            is_default: true, //force new addr
            isSameAddress: bdAddress,
          })
        );
        // login after register
        setLoginCoordinates({
          login: registerCoordinates.login,
          password: registerCoordinates.password,
          db: "odoo17",
        });
        await login(true, {
          login: registerCoordinates.login,
          password: registerCoordinates.password,
          db: "odoo17",
        });
        setNewCustomer(false);
        //setSuccess("Account created successfully");
      } else {
        setError("Something went wrong! Please try again.");
      }
    } catch (error) {
      setError("Something went wrong! Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const login = async (fromRegister?: boolean, loginData?: any) => {
    if (loading && !fromRegister) return;
    if (!fromRegister) {
      setLoading(true);
      setError(null);
    }
    console.log("went to login ---------------");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/authenticate`,
        loginData || loginCoordinates,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        Cookies.set("session_id_token", response.data.session_id);
        Cookies.set("uid", response.data.uid);
        setCurrentToken(response.data.session_id);
        setCurrentUID(response.data.uid);
        console.log("cookies:", Cookies.get("session_id_token"));
        console.log("dev:", currentToken);
        // navigate("/profile");
        // update cart items to the server
        let credentials = {
          session_id: response.data.session_id,
          uid: response.data.uid,
        };
        await new Promise((resolve) => setTimeout(resolve, 1000)); //need to wait more than 1 second or will get unauthorized
        console.log(credentials);
        while (!isAuthed) {
          console.log("add to cart while loop");
          await new Promise((resolve) => setTimeout(resolve, 500));
          await addToCartRequest(newCart, credentials);
        }
        await getCartItemsRequest(credentials);
        toggleCart();
        if (
          (shippingAddresses && shippingAddresses.length > 0) ||
          (billingAddresses && billingAddresses.length > 0)
        ) {
          localStorage.removeItem("updated_addr");
        } else {
          //check if address exists
          const updated_addr =
            JSON.parse(localStorage.getItem("updated_addr")!) || null;
          if (updated_addr) {
            await new Promise((resolve) => setTimeout(resolve, 3000)); //need to wait more than 1 second or will get unauthorized
            await createBillingAddress(credentials, updated_addr);
            if (bdAddress) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              await createShippingAddress(credentials, updated_addr);
            }
          }
          localStorage.removeItem("updated_addr");
        }
        if (!fromRegister) {
          await getShippingAddresses(credentials);
          await getBillingAddresses(credentials);
          setstep2(true);
        }
        setAuth(true);
      } else {
        setError("Invalid Credentials");
      }
    } catch (error: any) {
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }

  const getCartItemsRequest = async (credentials?: any) => {
    try {
      const body = {
        session_id: session_id,
        uid: uid,
        ...credentials,
      };
      const response = await axios.post(`${BASE_URL}/api/v1/get_cart`, body);
      console.log("getCartItemsRequest ---------------", response.data.cart);

      if (response.status === 200) {
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...response.data.cart.diamond,
            ...response.data.cart.jewellery,
          ])
        );
      } else {
        // error there
      }
    } catch (error) {
      console.log("getCartItemsRequest:", error);
    }
  };
  const addToCartRequest = async (cart: any[], credentials?: any) => {
    if ((session_id && session_id != "guest") || credentials) {
      console.log(session_id);
      console.log(session_id);
      console.log(credentials);
      
      cart.map(async (itemToAdd) => {
        try {
          const body = itemToAdd.is_jewellery
            ? {
                session_id:
                  session_id && session_id !== "guest"
                    ? session_id
                    : credentials?.session_id,
                uid: uid && uid !== -1 ? uid : credentials?.uid,
                // ...credentials,
                product_type: "jewellery",
                product_id: itemToAdd.id,
                ring_size: itemToAdd.ring_size,
                total_carat: itemToAdd.total_carat,
                metal_id: itemToAdd.metal_id,
                shape: itemToAdd.final_shape,
              }
            : {
                session_id:
                  session_id && session_id !== "guest"
                    ? session_id
                    : credentials?.session_id,
                uid: uid && uid !== -1 ? uid : credentials?.uid,
                product_type: "diamond",
                product_id: itemToAdd.id,
              };
          const response = await axios.post(
            `${BASE_URL}/api/v1/add_to_cart`,
            body
          );
          console.log("add to cart response:", response);

          if (response.status === 200) {
            // TODO add notification
            isAuthed = true;
          } else if (
            response.status === 401 &&
            response.data.error === "Unauthorized."
          ) {
            // error there
            isAuthed = false;
          } else if (response.status == 409 || response.status == 404) {
            isAuthed = true;
          }
        } catch (error: any) {
          if (error.response.status === 409 || error.response.status === 404) {
            isAuthed = true;
          }
          console.log("addToCartRequest ---------------", error);
        }
      });
    }
  };
  console.log("succes: ", success);

  useEffect(() => {
    setIsPageLoading(true);
    const session_id =
      Cookies.get("session_id_token") || currentTokenRef.current;
    const uid = Number(Cookies.get("uid")) || Number(currentUIDRef.current);
    //check if user is Logged
    if (session_id && uid) {
      fetchLoginData();
    } else {
      setIsPageLoading(false);
    }
  }, []);
  return (
    <>
      {isPageLoading || loading ? (
        <div className="container h-screen">
          <Loading />
        </div>
      ) : (
        <>
          {" "}
          <div className="flex flex-col w-full justify-center mt-4">
            <div className="w-full mx-auto md:pl-0 lg:pl-0 xl:pl-8 2xl:pl-44">
              <Breadcrumb
                menu={[
                  {
                    title: "Shopping Cart",
                    link: "/profile/shopping-cart",
                    level: 1,
                  },
                  {
                    title: "Checkout",
                    link: "/checkout",
                    level: 1,
                  },
                ]}
              />
            </div>
            <div className="flex flex-col w-[89%] md:w-[86%] lg:w-[85%] xl:w-[80%] 2xl:w-[64%] items-start mx-auto mb-20">
              <h1 className="text-[40px] text-[#201f41] font-medium mt-4">
                Checkout
              </h1>
              <div
                onClick={() => setstep1(!step1)}
                className="flex flex-row items-center text-white bg-[#1f1f41] text-[16px] font-medium pl-4 w-full mt-3 h-[48px]"
              >
                <p>Step 1: Checkout Options</p>
                {session_id != "guest" ? null : (
                  <>
                    <FaCaretDown />
                    {currentStep >= 1 && (
                      <FaCaretDown className="w-6 h-6 text-[#333] ml-auto mr-4" />
                    )}
                  </>
                )}
              </div>
              {step1 && session_id == "guest" ? (
                <div className="border-1 border-[#1f1f41] w-full p-2">
                  {success != null && (
                    <h4 className="text-lg text-green-500">{success}</h4>
                  )}
                  <div className="flex flex-col md:flex-row justify-between mt-4 mb-2">
                    <div
                      className="w-[95%] 2xl:w-[70%] md:mx-2"
                      style={{ fontFamily: '"Plain Light", sans-serif' }}
                    >
                      <h2 className="text-[30px] font-medium text-[#201f41] pb-8 uppercase">
                        New Customer
                      </h2>
                      <p className="text-[14px] font-normal text-[#333] pb-3 text-justify">
                        By creating an account you will be able to shop faster,
                        be up to date on an order's status, and keep track of
                        the orders you have previously made.
                      </p>
                      <button
                        onClick={handleNewCustomer}
                        className="text-[15px] font-medium text-white bg-[#201F41] py-2 px-4 rounded-full hover:opacity-45"
                      >
                        Register
                      </button>
                    </div>
                    <div
                      className="w-[95%] 2xl:w-[70%] md:mx-2"
                      style={{ fontFamily: '"Plain Light", sans-serif' }}
                    >
                      <h2 className="text-[30px] font-medium text-[#201f41] pb-8 uppercase">
                        Returning Customer
                      </h2>
                      <form onSubmit={handleLogin}>
                        <div className="form-group">
                          <p className="text-[14px] text-[#333]">
                            I am a returning customer
                          </p>
                          <label
                            htmlFor="exampleInputEmail1"
                            className="text-[14px] text-[#333] mt-2"
                          >
                            E-Mail
                          </label>
                          <input
                            type="email"
                            className="form-control my-2 text-[12px] placeholder-gray-400"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="E-Mail Address"
                            name="loginEmail"
                            onChange={handleChange}
                            required
                            disabled={loading}
                          />
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="text-[14px] text-[#333]"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control my-2 text-[12px] placeholder-gray-400"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            name="loginPassword"
                            onChange={handleChange}
                            required
                            disabled={loading}
                          />
                        </div>
                        <div className="mb-4 pt-1">
                          <Link
                            to="/authentification/reset-password"
                            className="block w-fit mx-0 px-0 mb-[5px] text-[12px] text-[#201f41]"
                          >
                            Forgotten Password
                          </Link>
                        </div>
                        <button
                          className="text-[15px] font-medium text-white bg-[#201F41] py-2 px-4 rounded-full hover:opacity-45"
                          disabled={loading}
                        >
                          {loading ? "Loading..." : "Login"}
                        </button>
                        {error && (
                          <div className="alert alert-danger mt-2">{error}</div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              ) : null}
              <div
                onClick={() => {
                  setstep2(!step2);
                }}
                className="flex flex-row text-white bg-[#1f1f41] text-[16px] font-medium pl-4 h-[48px] w-full mt-2 items-center cursor-pointer"
              >
                <p>Step 2: {newcustomer ? "Account" : "Billing Details"}</p>
                <FaCaretDown />
                {currentStep >= 2 && (
                  <FaCaretDown className="w-6 h-6 text-[#333] ml-auto mr-4" />
                )}
              </div>
              {step2 && (
                <>
                  {newcustomer ? (
                    <div className=" w-full flex flex-col md:flex-row md:justify-between transition-all duration-500 ease-in-out transform opacity-0 scale-y-0 origin-top animate-slide-down bg-white border-[1px] border-[#201f41]">
                      <div className=" w-full md:w-[44%]">
                        <form
                          onSubmit={handleRegister}
                          className=" w-full p-[15px]"
                          style={{
                            fontFamily: '"Open Sans", sans-serif',
                            lineHeight: "20px",
                            color: "#333",
                          }}
                        >
                          <div className="grid md:grid-cols-2  mx-[-15px]">
                            <div className="px-[15px]">
                              {/* personal information */}
                              <h4
                                style={{
                                  fontFamily: '"Plain Light", sans-serif',
                                }}
                                className="text-lg border-b border-gray-300 text-[#333] py-[7px] leading-[20px]  mb-[20px]"
                              >
                                Your Personal Details
                              </h4>

                              {/* first name  */}
                              <div className="mb-[15px]">
                                <label
                                  style={{
                                    fontFamily: '"Plain Light", sans-serif',
                                  }}
                                  htmlFor="firstName"
                                  className="before:content-['*_'] before:font-[700] before:text-[#F00] before:text-[10px] block text-[14px] mb-[5px] leading-[20px]"
                                >
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  name="firstName"
                                  id="firstName"
                                  onChange={handleChange}
                                  className="form-control border-solid border-[#ddd] border-1 rounded-none text-[12px] text-[#666] py-[6px] px-[12px] mb-[10px]"
                                  placeholder="First Name"
                                  required
                                />
                              </div>
                              {/* last name  */}
                              <div className="mb-[15px]">
                                <label
                                  style={{
                                    fontFamily: '"Plain Light", sans-serif',
                                  }}
                                  htmlFor="lastName"
                                  className="before:content-['*_'] before:font-[700] before:text-[#F00] before:text-[10px] block text-[14px] mb-[5px] leading-[20px]"
                                >
                                  Last Name
                                </label>
                                <input
                                  type="text"
                                  name="lastName"
                                  id="lastName"
                                  onChange={handleChange}
                                  className="form-control border-solid border-[#ddd] border-1 rounded-none text-[12px] text-[#666] py-[6px] px-[12px] mb-[10px]"
                                  placeholder="Last Name"
                                  required
                                />
                              </div>
                              {/* email  */}
                              <div className="mb-[15px]">
                                <label
                                  style={{
                                    fontFamily: '"Plain Light", sans-serif',
                                  }}
                                  htmlFor="email"
                                  className="before:content-['*_'] before:font-[700] before:text-[#F00] before:text-[10px] block text-[14px] mb-[5px] leading-[20px]"
                                >
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  onChange={handleChange}
                                  className="form-control border-solid border-[#ddd] border-1 rounded-none text-[12px] text-[#666] py-[6px] px-[12px] mb-[10px]"
                                  placeholder="E-Mail"
                                  required
                                />
                              </div>
                              {/* Telephone */}
                              <div className="mb-[15px]">
                                <label
                                  style={{
                                    fontFamily: '"Plain Light", sans-serif',
                                  }}
                                  htmlFor="telephone"
                                  className="before:content-['*_'] before:font-[700] before:text-[#F00] before:text-[10px] block text-[14px] mb-[5px] leading-[20px]"
                                >
                                  Telephone
                                </label>
                                <input
                                  type="text"
                                  name="telephone"
                                  id="telephone"
                                  onChange={handleChange}
                                  className="form-control border-solid border-[#ddd] border-1 rounded-none text-[12px] text-[#666] py-[6px] px-[12px] mb-[10px]"
                                  placeholder="Telephone"
                                />
                              </div>

                              {/* Password */}
                              <h4
                                style={{
                                  fontFamily: '"Plain Light", sans-serif',
                                }}
                                className="text-lg border-b border-gray-300 text-[#333] py-[7px] leading-[20px]  mb-[20px]"
                              >
                                Your Password
                              </h4>

                              {/* Password */}
                              <div className="mb-[15px]">
                                <label
                                  style={{
                                    fontFamily: '"Plain Light", sans-serif',
                                  }}
                                  htmlFor="password"
                                  className="before:content-['*_'] before:font-[700] before:text-[#F00] before:text-[10px] block text-[14px] mb-[5px] leading-[20px]"
                                >
                                  Password
                                </label>
                                <input
                                  type="password"
                                  name="password"
                                  id="password"
                                  onChange={handleChange}
                                  className="form-control border-solid border-[#ddd] border-1 rounded-none text-[12px] text-[#666] py-[6px] px-[12px] mb-[10px]"
                                  placeholder="Password"
                                />
                              </div>

                              {/* Confirm Password */}
                              <div className="mb-[15px]">
                                <label
                                  style={{
                                    fontFamily: '"Plain Light", sans-serif',
                                  }}
                                  htmlFor="retypePassword"
                                  className="before:content-['*_'] before:font-[700] before:text-[#F00] before:text-[10px] block text-[14px] mb-[5px] leading-[20px]"
                                >
                                  Password Confirm
                                </label>
                                <input
                                  type="password"
                                  name="retypePassword"
                                  id="retypePassword"
                                  onChange={handleChange}
                                  className="form-control border-solid border-[#ddd] border-1 rounded-none text-[12px] text-[#666] py-[6px] px-[12px] mb-[10px]"
                                  placeholder="Password Confirm"
                                />
                              </div>
                            </div>

                            {/* your Address */}
                            <div className="px-[15px]">
                              <h4
                                style={{
                                  fontFamily: '"Plain Light", sans-serif',
                                }}
                                className="text-lg border-b border-gray-300 text-[#333] py-[7px] leading-[20px]  mb-[20px]"
                              >
                                Your Address
                              </h4>
                              {/* company */}
                              <div className="mb-[15px]">
                                <label
                                  style={{
                                    fontFamily: '"Plain Light", sans-serif',
                                  }}
                                  htmlFor="company"
                                  className=" block text-[14px] mb-[5px] leading-[20px]"
                                >
                                  Company
                                </label>
                                <input
                                  type="text"
                                  name="company"
                                  id="company"
                                  onChange={handleChange}
                                  className="form-control border-solid border-[#ddd] border-1 rounded-none text-[12px] text-[#666] py-[6px] px-[12px] mb-[10px]"
                                  placeholder="Company"
                                />
                              </div>
                              {/* Mobile with country code */}
                              <div className="mb-[15px]">
                                <label
                                  style={{
                                    fontFamily: '"Plain Light", sans-serif',
                                  }}
                                  htmlFor="mobile"
                                  className="before:content-['*_'] before:font-[700] before:text-[#F00] before:text-[10px] block text-[14px] mb-[5px] leading-[20px]"
                                >
                                  Mobile with Country Code
                                </label>
                                <input
                                  type="text"
                                  name="mobile"
                                  id="mobile"
                                  onChange={handleChange}
                                  className="form-control border-solid border-[#ddd] border-1 rounded-none text-[12px] text-[#666] py-[6px] px-[12px] mb-[10px]"
                                  placeholder="Mobile"
                                />
                              </div>
                              {/* Address 1 */}
                              <div className="mb-[15px]">
                                <label
                                  style={{
                                    fontFamily: '"Plain Light", sans-serif',
                                  }}
                                  htmlFor="address1"
                                  className="before:content-['*_'] before:font-[700] before:text-[#F00] before:text-[10px] block text-[14px] mb-[5px] leading-[20px]"
                                >
                                  Address 1
                                </label>
                                <input
                                  type="text"
                                  name="address1"
                                  id="address1"
                                  required
                                  onChange={handleChange}
                                  className="form-control border-solid border-[#ddd] border-1 rounded-none text-[12px] text-[#666] py-[6px] px-[12px] mb-[10px]"
                                  placeholder="Address 1"
                                />
                              </div>
                              {/* Address 2 */}
                              <div className="mb-[15px]">
                                <label
                                  style={{
                                    fontFamily: '"Plain Light", sans-serif',
                                  }}
                                  htmlFor="address2"
                                  className=" block text-[14px] mb-[5px] leading-[20px]"
                                >
                                  Address 2
                                </label>
                                <input
                                  type="text"
                                  name="address2"
                                  id="address2"
                                  onChange={handleChange}
                                  className="form-control border-solid border-[#ddd] border-1 rounded-none text-[12px] text-[#666] py-[6px] px-[12px] mb-[10px]"
                                  placeholder="Address 2"
                                />
                              </div>
                              {/* City */}
                              <div className="mb-[15px]">
                                <label
                                  style={{
                                    fontFamily: '"Plain Light", sans-serif',
                                  }}
                                  htmlFor="city"
                                  className="before:content-['*_'] before:font-[700] before:text-[#F00] before:text-[10px] block text-[14px] mb-[5px] leading-[20px]"
                                >
                                  City
                                </label>
                                <input
                                  type="text"
                                  name="city"
                                  id="city"
                                  required
                                  onChange={handleChange}
                                  className="form-control border-solid border-[#ddd] border-1 rounded-none text-[12px] text-[#666] py-[6px] px-[12px] mb-[10px]"
                                  placeholder="City"
                                />
                              </div>
                              {/* Post Code */}
                              <div className="mb-[15px]">
                                <label
                                  style={{
                                    fontFamily: '"Plain Light", sans-serif',
                                  }}
                                  htmlFor="postCode"
                                  className="before:content-['*_'] before:font-[700] before:text-[#F00] before:text-[10px] block text-[14px] mb-[5px] leading-[20px]"
                                >
                                  Post Code
                                </label>
                                <input
                                  type="text"
                                  name="postCode"
                                  id="postCode"
                                  onChange={handleChange}
                                  className="form-control border-solid border-[#ddd] border-1 rounded-none text-[12px] text-[#666] py-[6px] px-[12px] mb-[10px]"
                                  placeholder="Post Code"
                                />
                              </div>
                              {/* Country */}
                              <div className="mb-[15px]">
                                <label
                                  style={{
                                    fontFamily: '"Plain Light", sans-serif',
                                  }}
                                  htmlFor="country-x"
                                  className="before:content-['*_'] before:font-[700] before:text-[#F00] before:text-[10px] block text-[14px] mb-[5px] leading-[20px]"
                                >
                                  Country
                                </label>
                                <select
                                  name="country"
                                  id="country-x"
                                  className="form-control border-solid border-[#ddd] border-1 rounded-none text-[12px] text-[#666] py-[6px] px-[12px] mb-[10px]"
                                  required
                                  onChange={(e) => {
                                    const selectedCountryName = e.target.value;
                                    const selectedCountry = countriesList.find(
                                      (country) =>
                                        country.name === selectedCountryName
                                    );
                                    if (selectedCountry) {
                                      setRegisterCoordinates((prev) => ({
                                        ...prev,
                                        country: selectedCountry.isoCode,
                                      }));
                                      setselectedCountryCode(
                                        selectedCountry.isoCode
                                      );
                                    }
                                  }}
                                >
                                  {countriesList.map((e) => (
                                    <option key={e.isoCode} value={e.name}>
                                      {e.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              {/* Region */}
                              <div className="mb-[15px]">
                                <label
                                  style={{
                                    fontFamily: '"Plain Light", sans-serif',
                                  }}
                                  htmlFor="state"
                                  className="before:content-['*_'] before:font-[700] before:text-[#F00] before:text-[10px] block text-[14px] mb-[5px] leading-[20px]"
                                >
                                  Region / State
                                </label>
                                <select
                                  name="state"
                                  id="state"
                                  className="form-control border-solid border-[#ddd] border-1 rounded-none text-[12px] text-[#666] py-[6px] px-[12px] mb-[10px]"
                                  required
                                  // onChange={(e) => {
                                  //   handleShippingWriting(
                                  //     e as React.ChangeEvent<HTMLSelectElement>
                                  //   );
                                  // }}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                >
                                  {statesList
                                    .filter(
                                      (j) =>
                                        j.countryCode === selectedCountryCode
                                    )
                                    .map((e) => (
                                      <option key={e.name} value={e.name}>
                                        {e.name}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* checkboxes */}

                          <div className="relative block my-[10px]">
                            <label
                              style={{ fontFamily: '""Open Sans", sans-serif' }}
                              htmlFor="newsletter"
                              className=" inline-block text-[14px] font-[400] pl-[20px] min-h-[20px] leading-[20px] cursor-pointer"
                              onClick={() => {
                                setSubscribe(!subscribe);
                              }}
                            >
                              <input
                                type="checkbox"
                                name="subscribe"
                                id="subscribe"
                                checked={subscribe}
                                onChange={() => {
                                  setSubscribe(!subscribe);
                                }}
                                className=" !size-[13px] absolute mt-[4px] ml-[-20px] h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                              />
                              I wish to subscribe to the Almas Online
                              newsletter.
                            </label>
                          </div>
                          <div className="relative block my-[10px]">
                            <label
                              style={{ fontFamily: '"Open Sans", sans-serif' }}
                              htmlFor="newsletter"
                              className=" inline-block text-[14px] font-[400] pl-[20px] min-h-[20px] leading-[20px] cursor-pointer "
                              onClick={() => {
                                setBDAddress(!bdAddress);
                              }}
                            >
                              <input
                                type="checkbox"
                                name="bdAddress"
                                id="bdAddress"
                                checked={bdAddress}
                                onChange={() => {
                                  setBDAddress(!bdAddress);
                                }}
                                className=" !size-[13px] absolute mt-[4px] ml-[-20px] h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                              />
                              My delivery and billing addresses are the same.
                            </label>
                          </div>
                          {/* <div className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        name="acceptPP"
                        id="acceptPP"
                        checked={acceptPP}
                        required
                        onChange={() => {
                          setAcceptPP(!acceptPP);
                        }}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="acceptPP"
                        className="ml-2  block text-sm  text-gray-500"
                      >
                        I have read and agree to the{" "}
                        <span className="font-bold text-gray-700">
                          Privacy Policy{" "}
                        </span>
                      </label>
                    </div> */}

                          {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                          )}
                          <div className="flex justify-end my-[1em] mx-0">
                            <div className="relative block my-[10px] pr-1">
                              <label
                                style={{
                                  fontFamily: '"Open Sans", sans-serif',
                                }}
                                htmlFor="newsletter"
                                className=" inline-block text-[12px] text-[#666] font-[400] pl-[20px] min-h-[20px] leading-[20px] cursor-pointer "
                                onClick={() => {
                                  setAcceptPP(!acceptPP);
                                }}
                              >
                                <input
                                  type="checkbox"
                                  name="acceptPP"
                                  id="acceptPP"
                                  checked={acceptPP}
                                  required
                                  onChange={() => {
                                    setAcceptPP(!acceptPP);
                                  }}
                                  className=" !size-[13px] absolute mt-[4px] ml-[-20px] h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                I have read and agree to to the{" "}
                                <Link
                                  to="/privacy"
                                  className="font-bold ! !no-underline text-[#201f41] hover:text-[#23527c] focus:text-[#f5deb3]"
                                >
                                  Privacy Policy{" "}
                                </Link>
                              </label>
                            </div>
                            <button
                              type="submit"
                              disabled={loading}
                              className="bg-[#201F41] text-white font-semibold px-16 py-2 rounded-full text-lg"
                            >
                              {loading ? "Loading..." : "Continue"}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="transition-all duration-500 ease-in-out transform opacity-0 scale-y-0 origin-top animate-slide-down bg-white w-full p-2 border-[1px] border-[#201f41]">
                        <label className="text-[14px] flex flex-row">
                          <input
                            type="radio"
                            name="billing_payment_address"
                            value="existing"
                            checked={useownadress}
                            onChange={() => {
                              if (billingAddresses.length === 0) return;
                              setuseownadress(true);
                            }}
                          />
                          <p className="pl-2">
                            I want to use an existing address
                          </p>
                        </label>
                        {useownadress && (
                          <select
                            name="address_id"
                            className="form-control text-[12px] pl-4 border-[#ddd]"
                            value={selectedBillingAddress}
                            onChange={(e) => {
                              setSelectedBillingAddress(e.target.value);
                            }}
                          >
                            {billingAddresses.length != 0 &&
                              billingAddresses.map((address) => (
                                <option key={address.id} value={address.id}>
                                  {address.full_name}, xxx, xxxx,{" "}
                                  {address.country}
                                </option>
                              ))}
                          </select>
                        )}
                        <label className="text-[14px] flex flex-row pt-4">
                          <input
                            type="radio"
                            name="add_address"
                            value="newaddress"
                            checked={!useownadress}
                            onChange={() => {
                              setuseownadress(false);
                            }}
                          />
                          <p className="pl-2">I want to use a new address</p>
                        </label>
                        {!useownadress && (
                          <div className="flex flex-col">
                            <div className="flex flex-col w-full mt-4">
                              <label className="w-full flex justify-start items-center text-[14px] pr-4">
                                <span className="text-red-500 pr-1">*</span>Full
                                Name
                              </label>
                              <input
                                type="text"
                                name="full_name"
                                id="name"
                                placeholder="Full Name"
                                onChange={handleBillingWriting}
                                className="form-control text-[12px] text-[#666] p-2 mr-4"
                              />
                            </div>
                            <div className="flex flex-col w-full mt-4">
                              <label className="w-full flex justify-start items-center text-[14px] pr-4">
                                Company
                              </label>
                              <input
                                type="text"
                                name="company"
                                id="company"
                                placeholder="Company"
                                onChange={handleBillingWriting}
                                className="form-control text-[12px] text-[#666] p-2 mr-4"
                              />
                            </div>
                            <div className="flex flex-col w-full mt-4">
                              <label className="w-full flex justify-start items-center text-[14px] pr-4">
                                <span className="text-red-500 pr-1">*</span>
                                Mobile with Country code
                              </label>
                              <input
                                type="text"
                                name="mobile_w_country"
                                id="mobile"
                                placeholder="Mobile with Country code"
                                onChange={handleBillingWriting}
                                className="form-control text-[12px] text-[#666] p-2 mr-4"
                              />
                            </div>
                            <div className="flex flex-col w-full mt-4">
                              <label className="w-full flex justify-start items-center text-[14px] pr-4">
                                <span className="text-red-500 pr-1">*</span>
                                Address 1
                              </label>
                              <input
                                type="text"
                                name="address"
                                id="address"
                                placeholder="Address 1"
                                onChange={handleBillingWriting}
                                className="form-control text-[12px] text-[#666] p-2 mr-4"
                              />
                            </div>
                            <div className="flex flex-col w-full mt-4">
                              <label className="w-full flex justify-start items-center text-[14px] pr-4">
                                Address 2
                              </label>
                              <input
                                type="text"
                                name="billing_address_2"
                                placeholder="Address 2"
                                onChange={handleBillingWriting}
                                className="form-control text-[12px] text-[#666] p-2 mr-4"
                              />
                            </div>
                            <div className="flex flex-col w-full mt-4">
                              <label className="w-full flex justify-start items-center text-[14px] pr-4">
                                <span className="text-red-500 pr-1">*</span>City
                              </label>
                              <input
                                type="text"
                                name="city"
                                id="city"
                                placeholder="City"
                                onChange={handleBillingWriting}
                                className="form-control text-[12px] text-[#666] p-2 mr-4"
                              />
                            </div>
                            <div className="flex flex-col w-full mt-4">
                              <label className="w-full flex justify-start items-center text-[14px] pr-4">
                                <span className="text-red-500 pr-1">*</span>Post
                                Code
                              </label>
                              <input
                                type="text"
                                name="post_code"
                                id="postcode"
                                placeholder="Post Code"
                                onChange={handleBillingWriting}
                                className="form-control text-[12px] text-[#666] p-2 mr-4"
                              />
                            </div>
                            <div className="flex flex-col w-full mt-4">
                              <label className="w-full flex justify-start items-center text-[14px] pr-4">
                                <span className="text-red-500 pr-1">*</span>
                                Country
                              </label>
                              <select
                                name="country"
                                id="country"
                                className="text-[12px] text-[#666] form-control"
                                onChange={(e) => {
                                  const selectedCountryName = e.target.value;
                                  const selectedCountry = countriesList.find(
                                    (country) =>
                                      country.name === selectedCountryName
                                  );
                                  if (selectedCountry) {
                                    setselectedCountryCode(
                                      selectedCountry.isoCode
                                    );
                                  }
                                  handleBillingWriting(
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
                            <div className="flex flex-col w-full mt-4">
                              <label className="w-full flex justify-start items-center text-[14px] pr-4">
                                <span className="text-red-500 pr-1">*</span>
                                Region / State
                              </label>
                              <select
                                name="state"
                                id="state"
                                className="text-[12px] text-[#666] form-control"
                                onChange={(e) => {
                                  handleBillingWriting(
                                    e as React.ChangeEvent<HTMLSelectElement>
                                  );
                                }}
                              >
                                {statesList
                                  .filter(
                                    (j) => j.countryCode === selectedCountryCode
                                  )
                                  .map((e) => (
                                    <option key={e.name} value={e.name}>
                                      {e.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        )}
                        <div className="flex justify-end pt-4">
                          <button
                            onClick={async () => {
                              if (!useownadress) {
                                await createBillingAddress();
                              } else {
                                setcurrentStep(3);
                                setstep2(false);
                                setstep3(true);
                              }
                            }}
                            className="rounded-full text-white text-[15px] bg-[#1f1f41] px-4 py-2 mr-4"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
              <div
                onClick={() => {
                  if (!(currentStep >= 3)) return;
                  setstep3(!step3);
                }}
                className="flex flex-row text-white bg-[#1f1f41] text-[16px] font-medium pl-4 h-[48px] w-full mt-2 items-center cursor-pointer"
              >
                <p>Step 3: Delivery Details</p>
                <FaCaretDown />
                {currentStep >= 3 && (
                  <FaCaretDown className="w-6 h-6 text-[#333] ml-auto mr-4" />
                )}
              </div>
              {step3 && (
                <div className="transition-all duration-500 ease-in-out transform opacity-0 scale-y-0 origin-top animate-slide-down bg-white w-full pl-4 pt-4 pb-4 border-[1px] border-[#201f41]">
                  <label className="text-[14px] flex flex-row">
                    <input
                      type="radio"
                      name="payment_address"
                      value="existing"
                      checked={useownshipadress}
                      onChange={() => {
                        if (shippingAddresses.length === 0) return;
                        setuseownshipadress(true);
                      }}
                    />
                    <p className="pl-2">I want to use an existing address</p>
                  </label>
                  {useownshipadress && (
                    <select
                      name="address_id"
                      className="form-control text-[12px] pl-4 border-[#ddd]"
                      value={selectedShippingAddress}
                      onChange={(e) => {
                        setSelectedShippingAddress(e.target.value);
                      }}
                    >
                      {shippingAddresses.length != 0 &&
                        shippingAddresses.map((address) => (
                          <option key={address.id} value={address.id}>
                            {address.full_name}, xxx, xxxx, {address.country}
                          </option>
                        ))}
                    </select>
                  )}
                  <label className="text-[14px] flex flex-row pt-4">
                    <input
                      type="radio"
                      name="add_address"
                      value="newaddress"
                      checked={!useownshipadress}
                      onChange={() => {
                        setuseownshipadress(false);
                      }}
                    />
                    <p className="pl-2">I want to use a new address</p>
                  </label>
                  {!useownshipadress && (
                    <div className="flex flex-col">
                      <div className="flex flex-row w-full mt-4">
                        <label className="w-[20%] flex justify-end items-center text-[14px] pr-4">
                          <span className="text-red-500 pr-1">*</span>Full Name
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          id="name"
                          placeholder="Full Name"
                          onChange={handleShippingWriting}
                          className="form-control text-[12px] text-[#666] p-2 mr-4"
                        />
                      </div>
                      <div className="flex flex-row w-full mt-4">
                        <label className="w-[20%] flex justify-end items-center text-[14px] pr-4">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          id="company"
                          placeholder="Company"
                          onChange={handleShippingWriting}
                          className="form-control text-[12px] text-[#666] p-2 mr-4"
                        />
                      </div>
                      <div className="flex flex-row w-full mt-4">
                        <label className="w-[20%] flex justify-end items-center text-[14px] pr-4">
                          <span className="text-red-500 pr-1">*</span>Mobile
                          with Country code
                        </label>
                        <input
                          type="text"
                          name="mobile_w_country"
                          id="mobile"
                          placeholder="Mobile with Country code"
                          onChange={handleShippingWriting}
                          className="form-control text-[12px] text-[#666] p-2 mr-4"
                        />
                      </div>
                      <div className="flex flex-row w-full mt-4">
                        <label className="w-[20%] flex justify-end items-center text-[14px] pr-4">
                          <span className="text-red-500 pr-1">*</span>Address 1
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          placeholder="Address 1"
                          onChange={handleShippingWriting}
                          className="form-control text-[12px] text-[#666] p-2 mr-4"
                        />
                      </div>
                      <div className="flex flex-row w-full mt-4">
                        <label className="w-[20%] flex justify-end items-center text-[14px] pr-4">
                          Address 2
                        </label>
                        <input
                          type="text"
                          name="shipping_address_2"
                          placeholder="Address 2"
                          onChange={handleShippingWriting}
                          className="form-control text-[12px] text-[#666] p-2 mr-4"
                        />
                      </div>
                      <div className="flex flex-row w-full mt-4">
                        <label className="w-[20%] flex justify-end items-center text-[14px] pr-4">
                          <span className="text-red-500 pr-1">*</span>City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          placeholder="City"
                          onChange={handleShippingWriting}
                          className="form-control text-[12px] text-[#666] p-2 mr-4"
                        />
                      </div>
                      <div className="flex flex-row w-full mt-4">
                        <label className="w-[20%] flex justify-end items-center text-[14px] pr-4">
                          <span className="text-red-500 pr-1">*</span>Post Code
                        </label>
                        <input
                          type="text"
                          name="post_code"
                          id="postcode"
                          placeholder="Post Code"
                          onChange={handleShippingWriting}
                          className="form-control text-[12px] text-[#666] p-2 mr-4"
                        />
                      </div>
                      <div className="flex flex-row w-full mt-4">
                        <label className="w-[20%] flex justify-end items-center text-[14px] pr-4">
                          <span className="text-red-500 pr-1">*</span>Country
                        </label>
                        <select
                          name="country"
                          id="country"
                          className="text-[12px] text-[#666] form-control"
                          onChange={(e) => {
                            const selectedCountryName = e.target.value;
                            const selectedCountry = countriesList.find(
                              (country) => country.name === selectedCountryName
                            );
                            if (selectedCountry) {
                              setselectedCountryCode(selectedCountry.isoCode);
                            }
                            handleShippingWriting(
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
                        <label className="w-[20%] flex justify-end items-center text-[14px] pr-4">
                          <span className="text-red-500 pr-1">*</span>Region /
                          State
                        </label>
                        <select
                          name="state"
                          id="state"
                          className="text-[12px] text-[#666] form-control"
                          onChange={(e) => {
                            handleShippingWriting(
                              e as React.ChangeEvent<HTMLSelectElement>
                            );
                          }}
                        >
                          {statesList
                            .filter(
                              (j) => j.countryCode === selectedCountryCode
                            )
                            .map((e) => (
                              <option key={e.name} value={e.name}>
                                {e.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={async () => {
                        if (!useownshipadress) {
                          await createShippingAddress();
                        } else {
                          setcurrentStep(4);
                          setstep3(false);
                          setstep4(true);
                        }
                      }}
                      className="rounded-full text-white text-[15px] bg-[#1f1f41] px-4 py-2 mr-4"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
              <div
                onClick={() => {
                  if (!(currentStep >= 4)) return;
                  setstep4(!step4);
                }}
                className="flex flex-row text-white bg-[#1f1f41] text-[16px] font-medium pl-4 h-[48px] w-full mt-2 items-center cursor-pointer"
              >
                <p>Step 4: Delivery Method</p>
                <FaCaretDown />
                {currentStep >= 4 && (
                  <FaCaretDown className="w-6 h-6 text-[#333] ml-auto mr-4" />
                )}
              </div>
              {step4 && (
                <div className="transition-all duration-500 ease-in-out transform opacity-0 scale-y-0 origin-top animate-slide-down bg-white w-full pl-4 pt-4 pb-4 border-[1px] border-[#201f41]">
                  <p className="text-[14px] text-[#333]">
                    Please select the preferred shipping method to use on this
                    order.
                  </p>
                  <p className="my-2 text-[14px] text-[#333] font-bold">
                    Free Shipping
                  </p>
                  <label className="text-[14px] flex flex-row">
                    <input
                      type="radio"
                      name="shipping_fees_btn"
                      value="existing"
                      checked={true}
                      onChange={() => {}}
                    />
                    <p className="pl-2">Free Shipping - $0</p>
                  </label>
                  <p className="my-2 text-[14px] text-[#333] font-bold pb-2">
                    Add Comments About Your Order
                  </p>
                  <textarea
                    name="comment"
                    rows={8}
                    className="form-control w-[98%]"
                    value={usercomment}
                    onChange={(e) => setusercomment(e.target.value)}
                  ></textarea>
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => {
                        setcurrentStep(5);
                        setstep4(false);
                        setstep5(true);
                      }}
                      className="rounded-full text-white text-[15px] bg-[#1f1f41] px-4 py-2 mr-4"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
              <div
                onClick={() => {
                  if (!(currentStep >= 5)) return;
                  setstep5(!step5);
                }}
                className="flex flex-row text-white bg-[#1f1f41] text-[16px] font-medium pl-4 h-[48px] w-full mt-2 items-center cursor-pointer"
              >
                <p>Step 5: Payment Method</p>
                <FaCaretDown />
                {currentStep >= 5 && (
                  <FaCaretDown className="w-6 h-6 text-[#333] ml-auto mr-4" />
                )}
              </div>
              {step5 && (
                <div className="transition-all duration-500 ease-in-out transform opacity-0 scale-y-0 origin-top animate-slide-down bg-white w-full pl-4 pt-4 pb-4 border-[1px] border-[#201f41]">
                  <label className="text-[14px] flex flex-row">
                    <input
                      type="radio"
                      name="cc_btn"
                      value="existing"
                      checked={true}
                      onChange={() => {}}
                    />
                    <p className="pl-2">Pay by Credit Card or Debit Card</p>
                  </label>
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => {
                        setcurrentStep(6);
                        setstep5(false);
                        setstep6(true);
                      }}
                      className="rounded-full text-white text-[15px] bg-[#1f1f41] px-4 py-2 mr-4"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
              <div
                onClick={() => {
                  if (!(currentStep >= 6)) return;
                  setstep6(!step6);
                }}
                className="flex flex-row text-white bg-[#1f1f41] text-[16px] font-medium pl-4 h-[48px] w-full mt-2 items-center cursor-pointer"
              >
                <p>Step 6: Confirm Order</p>
                <FaCaretDown />
                {currentStep >= 6 && (
                  <FaCaretDown className="w-6 h-6 text-[#333] ml-auto mr-4" />
                )}
              </div>
              {step6 && (
                <div className="transition-all overflow-x-auto duration-500 ease-in-out transform opacity-0 scale-y-0 origin-top animate-slide-down bg-white w-full p-2 border-[1px] border-[#201f41]">
                  <table className="min-w-full border-collapse border border-[#201f41]">
                    <thead
                      className="bg-[#201f41] text-white text-left border-b border-[#201f41] text-[14px] font-medium"
                      style={{ fontFamily: "'Plain Light', sans-serif" }}
                    >
                      <tr>
                        <th className="p-2 border-r border-white font-normal">
                          Product Name
                        </th>
                        <th className="p-2 border-r border-white font-normal">
                          Sku
                        </th>
                        <th className="p-2 border-r border-white font-normal text-right">
                          Quantity
                        </th>
                        <th className="p-2 border-r border-white font-normal text-right">
                          Unit Price
                        </th>
                        <th className="p-2 font-normal text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newCart.map((e: any) => (
                        <tr
                          key={e.id}
                          className="border-b-[1px] border-r-[1px] bg-white border-[#ddd]"
                        >
                          {e.shape && e.lab ? (
                            <td className="p-2 font-bold border-r-[1px] border-[#ddd] py-4 text-[#201f41] text-[15px]">
                              {e.diamond_size} Caret {e.shape.value_name}
                            </td>
                          ) : (
                            <td className="p-2 flex flex-col font-bold border-r-[1px] border-[#ddd] py-4">
                              <p className="text-[#201f41] text-[15px] pb-1">
                                {e.name}
                              </p>
                              <p className="pl-3 pb-1 text-[#1f1f41] font-semibold text-[13px]">
                                -Metal: ${e.metal[e.metal_id] || e.image_lines[0]?.metal_value}
                              </p>
                              <p className="pl-3 pb-1 text-[#1f1f41] font-semibold text-[13px]">
                                -Shape: {e.final_shape || e.image_lines[0]?.shape_value}
                              </p>
                              <p className="pl-3 pb-1 text-[#1f1f41] font-semibold text-[13px]">
                                -Total Carat: {e.total_carat || ""}
                              </p>
                              <p className="pl-3 text-[#1f1f41] font-semibold text-[13px]">
                                -{" "}
                                {e?.category.toLowerCase().includes("pendant")
                                  ? "Chain Length:"
                                  : "Ring Size:"}{" "}
                                {(e?.category.toLowerCase().includes("pendant")
                                  ? `${e.ring_size} Inches`
                                  : e.ring_size ) || "\u00A0"}
                              </p>
                            </td>
                          )}
                          {e.shape && e.lab ? (
                            <td className="flex flex-col md:flex-row h-20 items-center space-x-2 p-2 text-[15px] font-semibold text-[#666] ml-3">
                              <img
                                src={
                                  shapesImages.find(
                                    (item) => item.name === e.shape.value_name
                                  )?.value || ""
                                }
                              />
                              <p>
                                {e.shape.value_name} ( N0{e.id} )
                              </p>
                            </td>
                          ) : (
                            <td className="h-20 items-center space-x-2 p-2 text-[15px] font-semibold text-[#666] ml-3">
                              <p className="pl-4">( {e.sku} )</p>
                            </td>
                          )}
                          <td className="p-2 border-r border-[1px] border-[#ddd] text-right text-[15px] font-semibold text-[#666]">
                            1
                          </td>
                          {e.total_sales_price ? (
                            <td className="p-2 border-r-[1px] border-[#ddd] text-right text-[15px] font-semibold text-[#666]">
                              {formatPrice(e.total_sales_price)}
                            </td>
                          ) : (
                            <td className="p-2 border-r-[1px] border-[#ddd] text-right text-[15px] font-semibold text-[#666]">
                              {formatPrice(e.price)}
                            </td>
                          )}
                          {e.total_sales_price ? (
                            <td className="p-2 text-right text-[15px] font-semibold text-[#666]">
                              {formatPrice(e.total_sales_price)}
                            </td>
                          ) : (
                            <td className="p-2 text-right text-[15px] font-semibold text-[#666]">
                              {formatPrice(e.price)}
                            </td>
                          )}
                        </tr>
                      ))}
                      <tr className="border-b border-[#201f41] bg-white">
                        <td
                          colSpan={4}
                          className="p-2 text-right text-[15px] font-semibold text-[#666]"
                        >
                          Sub-Total:
                        </td>
                        <td className="p-2 text-right text-[14px] font-medium text-[#666] border">
                          {formatPrice(total)}
                        </td>
                      </tr>
                      <tr className="border-b border-[#201f41] bg-white">
                        <td
                          colSpan={4}
                          className="p-2 text-right text-[15px] font-semibold text-[#666] border-[1px] border-[#ddd]"
                        >
                          Free Shipping:
                        </td>
                        <td className="p-2 text-right text-[14px] font-medium text-[#666] border-[1px] border-[#ddd]">
                          $0
                        </td>
                      </tr>
                      <tr className="border-b border-[#201f41] bg-white">
                        <td
                          colSpan={4}
                          className="p-2 text-right text-[15px] font-semibold text-[#666] border-[1px] border-[#ddd]"
                        >
                          VAT (5%):
                        </td>
                        <td className="p-2 text-right text-[14px] font-medium text-[#666] border-[1px] border-[#ddd]">
                        {formatPrice((total * 5) / 100)}
                        </td>
                      </tr>
                      <tr className="border-b border-[#201f41] bg-white">
                        <td
                          colSpan={4}
                          className="p-2 text-right text-[15px] font-semibold text-[#666] border-[1px] border-[#ddd]"
                        >
                          Total:
                        </td>
                        <td className="p-2 text-right text-[14px] font-medium text-[#666] border">
                          {formatPrice(total + (total * 5) / 100)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-4 text-center text-[13px] text-[#666]">
                    <label>
                      I agree to pay all taxes and duties on my purchase,
                      pursuant to the international Shipping Agreement.
                    </label>
                    <input
                      type="checkbox"
                      id="agreement"
                      checked={true}
                      className="ml-1"
                      onChange={() => {}}
                    />
                  </div>

                  <p className="mt-1 text-start ml-10 text-[12px] font-bold text-[#666]">
                    Please proceed to "Confirm". Then you will be redirected to
                    the Stripe Online Payment Gateway.
                  </p>
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => checkoutOrder()}
                      className="rounded-full text-white text-[15px] bg-[#1f1f41] px-4 py-2 mr-4"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="h-10"></div>
            <Contact />
          </div>
        </>
      )}
    </>
  );
};

export default CheckoutPage;
