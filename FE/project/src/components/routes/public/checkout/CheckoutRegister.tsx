import { BASE_URL } from "@components/api/api";
import SignupImage from "@assets/Auth/signup-1.jpg";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export type RegisterCoordinates = {
  email: string;
  login: string;
  password: string;
  retypePassword: string;
  subscribe: boolean;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string; //added state
  postCode: string;
  country: string;
  region?: string;
  mobile?: string;
  bdAddress: boolean;
  acceptPP: boolean;
};

const CheckoutRegisterForm: React.FC = () => {
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
      subscribe: false,
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setRegisterCoordinates({
        ...registerCoordinates,
        ["email"]: e.target.value,
        ["login"]: e.target.value,
      });
    } else
      setRegisterCoordinates({
        ...registerCoordinates,
        [e.target.name]: e.target.value,
      });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    postData();
  };

  const postData = async () => {
    try {
      if (registerCoordinates.retypePassword != registerCoordinates.password) {
        setError("Passwords do not match! please retry again");
        return;
      }
      setLoading(true);
      setError(null);
      const response = await axios.post(
        `${BASE_URL}/api/v1/create_user`,
        registerCoordinates
      );
      if (response.status === 200) {
        setSuccess("Account created successfully");
      } else {
        setError("Something went wrong! Please try again.");
      }
      setLoading(false);
    } catch (error) {
      setError("Something went wrong! Please try again.");
      setLoading(false);
    }
  };
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    setRegisterCoordinates({
      ...registerCoordinates,
      ["subscribe"]: subscribe,
    });
  }, [subscribe]);

  return (
    <div className="flex flex-col">
      <div className="image relative">
        <img
          className="w-full max-h-[calc(100vh-270px)]"
          src={SignupImage}
          alt="search"
        />
        <span
          className="uppercase absolute text-[40px] sm:text-[65px] !top-[33%] left-[15%] text-white"
          style={{ fontFamily: '"Plain Light", sans-serif' }}
        >
          Sign Up
        </span>
      </div>
      <div className="mx-auto w-[96%] lg:w-[80%] 2xl:w-[95%] mt-[70px] mb-6">
        <Breadcrumb
          menu={[
            {
              title: "Account",
              link: "/profile",
              level: 1,
            },
            {
              title: "Register",
              link: pathname,
              level: 1,
            },
          ]}
        />
      </div>

      {success ? (
        <div className="flex flex-row pt-10 px-20 justify-between">
          <div className="flex flex-col items-start">
            <h1 className="text-[#201F41] text-6xl font-normal pb-6">
              ACCOUNT
            </h1>
            <p className="text-sm  text-slate-700 text-center pb-6">
              Thank you so much for your interest in Almas! We've received your
              message and hope to get back to you soon.
            </p>
            <div className="w-full flex justify-end">
              <h1 className="text-[#201F41] text-xl font-semibold italic">
                Continue
              </h1>
            </div>
          </div>
          <aside className="w-[24%]">
            <div className="border border-gray-300 rounded divide-y divide-gray-300">
              <a
                href="/authentification"
                className="block px-4 py-2 hover:bg-gray-100 text-sm text-slate-500 hover:text-slate-500"
              >
                Login
              </a>
              <a
                href="/authentification/register"
                className="block px-4 py-2 hover:bg-gray-100 text-sm text-slate-500 hover:text-slate-500"
              >
                Register
              </a>
              <a
                href="/authentification/reset-password"
                className="block px-4 py-2 hover:bg-gray-100 text-sm text-slate-500 hover:text-slate-500"
              >
                Forgotten Password
              </a>
              <a
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100 text-sm text-slate-500 hover:text-slate-500"
              >
                My Account
              </a>
              <a
                href="/account/address-book"
                className="block px-4 py-2 hover:bg-gray-100 text-sm text-slate-500 hover:text-slate-500"
              >
                Address Book
              </a>
              <a
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100 text-sm text-slate-500 hover:text-slate-500"
              >
                Wish List
              </a>
              <a
                href="/profile/orders-history"
                className="block px-4 py-2 hover:bg-gray-100 text-sm text-slate-500 hover:text-slate-500"
              >
                Order History
              </a>
              <a
                href="/profile/orders-history"
                className="block px-4 py-2 hover:bg-gray-100 text-sm text-slate-500 hover:text-slate-500"
              >
                Recurring Payments
              </a>
              <a
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100 text-sm text-slate-500 hover:text-slate-500"
              >
                Newsletter
              </a>
            </div>
          </aside>
        </div>
      ) : (
        <div className=" flex flex-col mx-auto w-[98%] 2xl:w-[80%] ">
          <div className="flex flex-col pt-12 items-center space-y-10">
            <h1 className="text-[#201F41] text-6xl font-normal text-center px-[20px]">
              CREATE AN ACCOUNT
            </h1>
            <p
              style={{ fontFamily: '"Plain Light", sans-serif' }}
              className="italic text-[#53556b] font-semibold w-[90%] text-center pb-10"
            >
              To access your whishlist, address book and contact preferences and
              to take advantage of our speedy <br /> checkout, create an account
              with us now.
            </p>
          </div>
          <div className="my-2 w-full mx-auto px-4 flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit} className="space-y-2 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-[40px]">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-xl font-medium pb-2"
                  >
                    Full Name{" "}
                    <span className="text-red-500 text-xl font-bold ">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    className="mt-1 block outline-none bg-gray-50 px-4 py-[30px]  h-10 w-full border-none rounded-md text-[12px]"
                    placeholder="Full Name"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-xl font-medium pb-2"
                  >
                    Email Address{" "}
                    <span className="text-red-500 text-xl font-bold ">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    className="mt-1 block outline-none bg-gray-50 px-4 py-[30px]  h-10 w-full border-none rounded-md text-[12px]"
                    placeholder="E-Mail"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-xl font-medium pb-2"
                  >
                    Password{" "}
                    <span className="text-red-500 text-xl font-bold ">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    className="mt-1 block outline-none bg-gray-50 px-4 py-[30px]  h-10 w-full border-none rounded-md text-[12px]"
                    placeholder="Password"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="retypePassword"
                    className="block text-gray-700 text-xl font-medium pb-2"
                  >
                    Re-type Password{" "}
                    <span className="text-red-500 text-xl font-bold ">*</span>
                  </label>
                  <input
                    type="password"
                    name="retypePassword"
                    id="retypePassword"
                    onChange={handleChange}
                    className="mt-1 block outline-none bg-gray-50 px-4 py-[30px]  h-10 w-full border-none rounded-md text-[12px]"
                    placeholder="Password Confirm"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  />
                </div>
              </div>

              <div className="flex items-center !mt-[20px]">
                <input
                  type="checkbox"
                  name="subscribe"
                  id="subscribe"
                  checked={subscribe}
                  onChange={() => {
                    setSubscribe(!subscribe);
                  }}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="subscribe"
                  className="ml-2 block text-[22px] font-semibold text-[#53556b]"
                  style={{ fontFamily: '"Plain Light", sans-serif' }}
                >
                  Subscribe to special Offers {subscribe}
                </label>
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="flex justify-center pt-10">
                <button
                  type="submit"
                  disabled={loading}
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                  className="bg-[#201F41] h-[55px] text-white font-medium px-16 py-2 rounded-full text-[22px]"
                >
                  {loading ? "Loading..." : "SIGN UP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="h-10"></div>
      <Contact />
    </div>
  );
};

export default CheckoutRegisterForm;
