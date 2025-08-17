import React, { useState ,useEffect} from "react";
import Contact from "@components/shared/Contact/Contact";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import SignupImage from "@assets/Auth/signup-1.jpg";
import axios from "axios";
import { BASE_URL } from "@components/api/api";
import { toast } from "react-toastify";
import "./Authentification.css";

interface ItemIFC {
  title: string;
  href: string;
}

const Item = (props: ItemIFC) => (
  <a
    href={props.href}
    className="h-[38px] mx-auto w-[99%] lg:w-[205px] xl:w-[255px] 2xl:w-[308px] bg-[#201f41] hover:bg-[#3995A5] text-[14px] text-white flex items-center pl-4 mb-[1px] capitalize"
  >
    {props.title}
  </a>
);

const ForgottenPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    document.title = "Forget your password?"
  } , [])
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      setError("");
      setLoading(true);

      const response = await axios.put(`${BASE_URL}/api/v1/reset_password`, {
        email,
      });

      console.log("pasword reset.", response.data);
      if (response.status === 200) {
        toast.success(
          "Password reset successful! We've sent an email containing your new password.",
          {
            autoClose: 2500,
          }
        );
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response.data.error);
      toast.error(err.response.data.error, {
        autoClose: 2500,
      });
      setLoading(false);
    }
  };

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
          Reset password
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
              title: "Reset password",
              link: "/authentification/reset-password",
              level: 1,
            },
          ]}
        />
      </div>
      <div className="flex flex-col space-y-10 lg:space-y-0 lg:flex-row pt-10 mx-auto w-[95%] lg:w-[93%] xl:w-[90%] 2xl:w-[80%] justify-between mb-8">
        <div className="flex flex-col items-start mx-auto w-[99%] lg:w-[74%] 2xl:w-[77%]">
          <h1 className="text-[#444] text-[33px] font-normal pb-[10px]">
            Account
          </h1>
          <p className="text-[12px] text-[#666] mb-3">
            Enter the e-mail address associated with your account. Click submit
            to have a password reset link e-mailed to you.
          </p>
          <div className="mb-[20px]">
            <legend className="text-[18px] text-[#333]">
              Your E-Mail Address
            </legend>
            <span className="block w-full h-[1px] bg-gray-300" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <fieldset>
              <div className="2xl:ml-[70px] flex gap-[10px] flex-col md:flex-row md:items-center justify-center space-x-4 pt-[5px]">
                <label
                  htmlFor="email"
                  className="flex gap-[5px] text-[12px] text-[#666] md:ml-[20px]"
                >
                  <span className="text-red-500 text-[13px] font-bold ">*</span>
                  E-mail Address{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  id="input-email"
                  placeholder="E-Mail Address"
                  className="form-control m-0 flex-1 max-w-full h-[34px] text-[12px] outline-none placeholder-gray-400"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
            </fieldset>
            <div className="flex justify-between mt-10">
              <a href="/authentification" className="back-btn">
                Back
              </a>
              <button type="submit" className="continue-btn" disabled={loading}>
                {loading ? "Sending..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
        <div className="rounded divide-y divide-gray-300">
          <Item title="Login" href="/authentification" />
          <Item title="Register" href="/authentification/register" />
          <Item
            title="Forgotten Password"
            href="/authentification/reset-password"
          />
          <Item title="My Account" href="/profile" />
          <Item title="Address Book" href="/account/address-book" />
          <Item title="Wish List" href="/profile" />
          <Item title="Order History" href="/profile/orders-history" />
          <Item title="Newsletter" href="/profile" />
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default ForgottenPassword;
