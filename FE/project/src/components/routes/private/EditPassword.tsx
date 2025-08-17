import { BASE_URL } from "@components/api/api";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Cookies from "js-cookie";
import Contact from "@components/shared/Contact/Contact";
import axios from "axios";
import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import withAuth from "@components/shared/withAuth";
import { toast } from "react-toastify";
import useAuth from "@components/hooks/useAuth";
import { useCart } from "@components/context/cartProvider";

export type PasswordDataCoordinates = {
  currentPassword: string;
  newPassword: string;
  confirPass: string;
};


const EditPassword: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toggleCart } = useCart();
  const { logout } = useAuth();
  const session_id = Cookies.get("session_id_token");
  const uid = Number(Cookies.get("uid"));
  const [PersonalCoordinates, setPersonalCoordinates] =
    useState<PasswordDataCoordinates>({
      currentPassword: "",
      newPassword: "",
      confirPass: "",
    });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalCoordinates({
      ...PersonalCoordinates,
      [e.target.name]: e.target.value,
    });
  };

  const [errors, setErrors] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirPass: "",
  });

  const validateForm = () => {
    const newErrors = {
      currentPassword: PersonalCoordinates.currentPassword
        ? ""
        : "Current Password is Required!",
      newPassword: PersonalCoordinates.newPassword
        ? ""
        : "New Password is Required!",
      confirPass: PersonalCoordinates.confirPass
        ? ""
        : "Confirm Password is Required!",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const updatePassword = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      if (PersonalCoordinates.confirPass != PersonalCoordinates.newPassword) {
        toast.error("Passwords do not match! please retry again", {
          autoClose: 2500,
        });
        return;
      }
      setLoading(true);
      const body = {
        session_id,
        uid,
        old_password: PersonalCoordinates.currentPassword,
        password: PersonalCoordinates.newPassword,
      };
      const response = await axios.put(
        `${BASE_URL}/api/v1/change_password`,
        body
      );
      if (response.status === 200) {
        toast.success("Password has been updated successfully!", {
          autoClose: 2500,
        });
        setLoading(false);
      }
    } catch (error: any) {
      console.log("updatePassword:", error);
      toast.error(error.response.data.error, {
        autoClose: 2500,
      });
      setLoading(false);
    }
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

  useEffect(()=>{
    document.title = "Change Password";
  },[])

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
              title: "Update Password",
              link: "/profile/update-password",
              level: 1,
            },
          ]}
        />
      </div>

      <div className="w-[99%] md:w-[92%] lg:w-[90%] xl:w-[88%] 2xl:w-[70%] mx-auto mb-20 flex flex-col lg:flex-row md:space-x-8 lg:space-x-4">
        <div className="w-[95%] lg:w-[80%] xl:w-[80%] 2xl:w-[72%] flex flex-col">
          <p className="text-[#211F41] text-[30px] font-normal pt-12 pb-3">
            Update Password
          </p>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row w-full mt-4 items-start">
              <label className="w-[250px] flex justify-end items-center text-[12px] lg:text-[14px] pr-8 text-[#333] mt-2">
                <span className="text-red-500 pr-1">*</span>Current Password
              </label>
              <div className="flex flex-col w-full mr-4">
                <input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  className="form-control text-[12px] text-[#666] p-2 rounded-none"
                  placeholder="Current Password"
                  onChange={handleChange}
                />
                {errors.currentPassword && (
                  <span className="text-[#a94442] text-[12px] mt-2">
                    {errors.currentPassword}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-row w-full mt-4 items-start">
              <label className="w-[250px] flex justify-end items-center text-[12px] lg:text-[14px] pr-8 text-[#333] mt-2">
                <span className="text-red-500 pr-1">*</span>New Password
              </label>
              <div className="flex flex-col w-full mr-4">
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="form-control text-[12px] text-[#666] p-2 rounded-none"
                  placeholder="New Password"
                  onChange={handleChange}
                />
                {errors.newPassword && (
                  <span className="text-[#a94442] text-[12px] mt-2">
                    {errors.newPassword}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-row w-full mt-4 items-start">
              <label className="w-[250px] flex justify-end items-center text-[12px] lg:text-[14px] pr-8 text-[#333] mt-2">
                <span className="text-red-500 pr-1">*</span>Confirm Password
              </label>
              <div className="flex flex-col w-full mr-4">
                <input
                  type="password"
                  name="confirPass"
                  id="confirPass"
                  className="form-control text-[12px] text-[#666] p-2 rounded-none"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
                {errors.confirPass && (
                  <span className="text-[#a94442] text-[12px] mt-2">
                    {errors.confirPass}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-4 px-3">
              <button
                disabled={loading}
                onClick={() => {
                  navigate("/profile");
                }}
                className="text-[15px] font-medium text-white bg-[#201F41] hover:opacity-45 py-2 px-8 rounded-full"
              >
                back
              </button>
              <button
                type="submit"
                disabled={loading}
                onClick={() => {
                  updatePassword();
                }}
                className="text-[15px] font-medium text-white bg-[#201F41] hover:opacity-45 py-2 px-8 rounded-full"
              >
                {loading ? "Loading..." : "save"}
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
      <div className="h-10"></div>
      <Contact />
    </div>
  );
};

export default withAuth(EditPassword);
