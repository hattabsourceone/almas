import { BASE_URL } from "@components/api/api";
import Cookies from "js-cookie";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import withAuth from "@components/shared/withAuth";
import useUser from "@components/hooks/useUser";
import { toast } from "react-toastify";
import { useCart } from "@components/context/cartProvider";
import useAuth from "@components/hooks/useAuth";

export type PersonalDataCoordinates = {
  name: string;
  email: string;
  phone: string;
};

const EditPersonalDetails: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { toggleCart } = useCart();
  const { logout } = useAuth();
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const session_id = Cookies.get("session_id_token");
  const uid = Number(Cookies.get("uid"));
  const { user, setUser } = useUser();

  const [PersonalCoordinates, setPersonalCoordinates] =
    useState<PersonalDataCoordinates>({
      name: "",
      email: "",
      phone: "",
    });
  const [errors, setErrors] = React.useState({
    name: "",
    telephone: "",
    email: "",
  });
  const navigate = useNavigate();

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

  useEffect(() => {
    if (user) {
      setPersonalCoordinates({
        name: user?.name || "",
        email: user?.login || "",
        phone: user?.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalCoordinates({
      ...PersonalCoordinates,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: PersonalCoordinates.name ? "" : "Full Name is Required!",
      telephone: PersonalCoordinates.phone ? "" : "Telephone is Required!",
      email: PersonalCoordinates.email ? "" : "Email is Required!",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const updatePersonalData = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    setError(null);
    await axios
      .put(`${BASE_URL}/api/v1/update_user_info`, {
        session_id,
        uid,
        ...PersonalCoordinates,
      })
      .then((response) => {
        if (response.status === 200) {
          setSuccess("information updated successfully");
          toast.success("Information have been updated successfully.", {
            autoClose: 2500,
          });
        } else {
          toast.success("Something went wrong! Please try again.", {
            autoClose: 2500,
          });
        }
        setLoading(false);
      })
      .catch((_) => {
        toast.success("Something went wrong! Please try again.", {
          autoClose: 2500,
        });
        setLoading(false);
      });
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
              title: "Edit Information",
              link: "/profile/personal-details",
              level: 1,
            },
          ]}
        />
      </div>
      <div className="w-[99%] md:w-[92%] lg:w-[90%] xl:w-[88%] 2xl:w-[70%] mx-auto mb-20 flex flex-col lg:flex-row md:space-x-8 lg:space-x-4">
        <div className="w-[95%] lg:w-[80%] xl:w-[80%] 2xl:w-[72%] flex flex-col">
          <p className="text-[#211F41] text-[30px] font-normal pt-12 pb-3">
            My Account Information
          </p>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row w-full mt-4 items-start">
              <label className="w-[250px] flex justify-end items-center text-[12px] lg:text-[14px] pr-8 text-[#333] mt-2">
                <span className="text-red-500 pr-1">*</span>Full Name
              </label>
              <div className="flex flex-col w-full mr-4">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={PersonalCoordinates.name}
                  className="form-control text-[12px] text-[#666] p-2 rounded-none"
                  placeholder="Full Name"
                  onChange={handleChange}
                />
                {errors.name && (
                  <span className="text-[#a94442] text-[12px] mt-2">
                    {errors.name}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-row w-full mt-4 items-start">
              <label className="w-[250px] flex justify-end items-center text-[12px] lg:text-[14px] pr-8 text-[#333] mt-2">
                <span className="text-red-500 pr-1">*</span>Email
              </label>
              <div className="flex flex-col w-full mr-4">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={PersonalCoordinates.email}
                  className="form-control text-[12px] text-[#666] p-2 rounded-none"
                  placeholder="E-Mail"
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="text-[#a94442] text-[12px] mt-2">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-row w-full mt-4 items-start">
              <label className="w-[250px] flex justify-end items-center text-[12px] lg:text-[14px] pr-8 text-[#333] mt-2">
                <span className="text-red-500 pr-1">*</span>Telephone
              </label>
              <div className="flex flex-col w-full mr-4">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={PersonalCoordinates.phone}
                  className="form-control text-[12px] text-[#666] p-2 rounded-none"
                  placeholder="Telephone"
                  onChange={handleChange}
                />
                {errors.telephone && (
                  <span className="text-[#a94442] text-[12px] mt-2">
                    {errors.telephone}
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
                  updatePersonalData();
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

export default withAuth(EditPersonalDetails);
