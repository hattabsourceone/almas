import { BASE_URL } from "@components/api/api";
import SignupImage from "@assets/Auth/signup-1.jpg";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export type RegisterCoordinates = {
  name: string;
  email: string;
  login: string;
  password: string;
  retypePassword: string;
  subscribe: boolean;
};

interface LinkItem {
  href: string;
  label: string;
}

const RegisterForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [subscribe, setSubscribe] = useState<boolean>(true);

  const [registerCoordinates, setRegisterCoordinates] =
    React.useState<RegisterCoordinates>({
      name: "",
      email: "",
      login: "",
      password: "",
      retypePassword: "",
      subscribe: subscribe,
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

  useEffect(() => {
    setRegisterCoordinates((prev) => ({
      ...prev,
      subscribe,
    }));
  }, [subscribe]);

  const postData = async () => {
    try {
      const { name, email, password, retypePassword } = registerCoordinates;
      if (!name.trim()) {
        setError("Name cannot be empty!");
        return;
      }
      if (!email.trim()) {
        setError("Email cannot be empty!");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address!");
        return;
      }
      if (password !== retypePassword) {
        setError("Passwords do not match! Please retry again.");
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

  const links: LinkItem[] = [
    { href: "/authentification", label: "Login" },
    { href: "/authentification/register", label: "Register" },
    { href: "/authentification/reset-password", label: "Forgotten Password" },
    { href: "/profile", label: "My Account" },
    { href: "/account/address-book", label: "Address Book" },
    { href: "/profile", label: "Wish List" },
    { href: "/profile/orders-history", label: "Order History" },
    { href: "/profile", label: "Newsletter" },
  ];

  return (
    <div className="flex flex-col">
      <div
        className="flex items-center justify-center h-[200px] sm:h-[216px] md:h-[260px] lg:h-[349px] xl:h-[438px] 2xl:h-[660px] md:justify-start md:px-16 lg:px-16 xl:-mt-8 2xl:px-64 2xl:-mt-4"
        style={{
          background: `url(${SignupImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-white uppercase font-medium text-[40px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[65px]">
          Sign Up
        </h1>
      </div>
      <div className="mt-[70px] -ml-9 md:-ml-10 lg:-ml-11 xl:-ml-9 2xl:ml-0 mb-6">
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
        <div className="flex flex-col space-y-10 lg:space-y-0 lg:flex-row pt-10 mx-auto w-[95%] lg:w-[93%] xl:w-[90%] 2xl:w-[80%] justify-between">
          <div className="flex flex-col items-start mx-auto w-[99%] lg:w-[74%] 2xl:w-[77%]">
            <h1 className="text-[#201f41] text-[40px] font-normal pb-6">
              Account
            </h1>
            <p className="text-[14px]  text-[#333] text-start pb-6">
              Thank you so much for your interest in Almas! We've received your
              message and hope to get back to you soon.
            </p>
            <div className="w-full flex justify-end">
              <a
                href="/"
                className="text-[#201F41] hover:text-[#201F41] text-[24px] font-medium italic"
              >
                Continue
              </a>
            </div>
          </div>
          <div className="rounded divide-y divide-gray-300">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="h-[38px] mx-auto w-[99%] lg:w-[205px] xl:w-[255px] 2xl:w-[308px] bg-[#201f41] hover:bg-[#3995A5] text-[14px] text-white flex items-center pl-4 mb-[1px] capitalize"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col mx-auto w-[95%] lg:w-[93%] xl:w-[90%] 2xl:w-[80%]">
          <div className="flex flex-col pt-12 items-center space-y-11">
            <h1 className="text-[#201F41] text-6xl font-normal text-center px-[20px]">
              CREATE AN ACCOUNT
            </h1>
            <p
              style={{ fontFamily: '"Plain Light", sans-serif' }}
              className="italic text-[#53556b] font-semibold w-[90%] text-center pb-10 leading-7"
            >
              To access your whishlist, address book and contact preferences and
              to take advantage of our speedy <br /> checkout, create an account
              with us now.
            </p>
          </div>
          <div className="w-full mx-auto flex flex-col justify-center items-center mt-4">
            <form onSubmit={handleSubmit} className="space-y-2 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-[40px]">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[#53556b] text-[20px] font-medium pb-2"
                  >
                    Full Name{" "}
                    <span className="text-red-500 text-xl font-bold ">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    className="mt-1 block outline-none bg-gray-50 px-4 py-[30px]  h-10 w-full border-none rounded-none text-[12px]"
                    placeholder="Full Name"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[#53556b] text-[20px] font-medium pb-2"
                  >
                    Email Address{" "}
                    <span className="text-red-500 text-xl font-bold ">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    className="mt-1 block outline-none bg-gray-50 px-4 py-[30px]  h-10 w-full border-none rounded-none text-[12px]"
                    placeholder="E-Mail"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-[#53556b] text-[20px] font-medium pb-2"
                  >
                    Password{" "}
                    <span className="text-red-500 text-xl font-bold ">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    className="mt-1 block outline-none bg-gray-50 px-4 py-[30px]  h-10 w-full border-none rounded-none text-[12px]"
                    placeholder="Password"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="retypePassword"
                    className="block text-[#53556b] text-[20px] font-medium pb-2"
                  >
                    Re-type Password{" "}
                    <span className="text-red-500 text-xl font-bold ">*</span>
                  </label>
                  <input
                    type="password"
                    name="retypePassword"
                    id="retypePassword"
                    onChange={handleChange}
                    className="mt-1 block outline-none bg-gray-50 px-4 py-[30px]  h-10 w-full border-none rounded-none text-[12px]"
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
                  className="ml-2 block text-[20px] font-normal text-[#53556b]"
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
                  className="bg-[#201F41] h-[58px] text-white font-normal px-16 w-[220px] rounded-full text-[22px]"
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

export default RegisterForm;
