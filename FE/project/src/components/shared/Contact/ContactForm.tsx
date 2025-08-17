import CareLocation from "@components/routes/public/CustomerCare/CareLocation";
import React, { useEffect, useState } from "react";
import { countries } from "./data/Contries";
import CustomerCare from "./../../routes/public/CustomerCare/_CustomerCare";
import axios from "axios";
import { BASE_URL } from "@components/api/api";
import { toast } from "react-toastify";

interface ContactFormProps {
  setShowSuccess: (value: boolean) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ setShowSuccess }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email_address: "",
    country: "",
    message: "",
    mobile_number: "",
  });
  const [isValidate, setIsValidate] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validate form
  useEffect(() => {
    const { full_name, email_address, country, message } = formData;
    setIsValidate(
      full_name.trim().length > 0 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_address) &&
        country.trim().length > 0 &&
        message.trim().length > 0
    );
  }, [formData]);

  const postData = async () => {
    const requestBody = {
      full_name: formData.full_name,
      email_address: formData.email_address,
      mobile_number: formData.mobile_number,
      country: formData.country,
      message: formData.message,
    };

    try {
      const result = await axios.post(
        `${BASE_URL}/api/v1/send_contact_messages`,
        requestBody
      );
      if (result.status === 200) {
        console.log("Message sent successfully", result.data);
        setShowSuccess(true);
        setFormData({
          full_name: "",
          email_address: "",
          mobile_number: "",
          country: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.", {
        autoClose: 2500,
      });
      console.error("Submission failed", error);
    }
  };

  return (
    <div
      className="w-full flex flex-col sm:flex-col gap-[20px] xl:gap-0 md:flex-row md:justify-between  lg:px-[50px] xl:px-0 xl:pr-[20px] 2xl:pr-[150px]  2xl:pl-[10px]  "
      data-aos-duration="2000"
      data-aos="fade-up"
    >
      <form className="w-[100%] px-[15px] sm:w-[100%] sm:ml-auto ml-auto flex flex-col gap-[30px] md:w-[48%] md:ml-[10px] lg:w-[53%]  lg:ml-0 lg:mx-auto xl:w-[41%] xl:ml-[11%] 2xl:w-[50%] xl:px-0  2xl:ml-[5.5%]">
        <input
          type="text"
          className="form-control min-h-[50px] md:min-h-[60px]  bg-[#f9f9f9] rounded-sm"
          placeholder="Full Name"
          name="full_name"
          value={formData.full_name}
          onChange={(e) => {
            setFormData({ ...formData, full_name: e.target.value });
          }}
        />
        <input
          type="text"
          className="form-control min-h-[50px] md:min-h-[60px]  bg-[#f9f9f9] rounded-sm"
          placeholder="Email Address"
          name="email"
          value={formData.email_address}
          onChange={(e) => {
            setFormData({ ...formData, email_address: e.target.value });
          }}
        />
        <input
          name="mobile"
          type="text"
          className="form-control min-h-[50px] md:min-h-[60px]  bg-[#f9f9f9] rounded-sm"
          placeholder="Mobile Number"
          value={formData.mobile_number}
          onChange={(e) => {
            setFormData({ ...formData, mobile_number: e.target.value });
          }}
        />
        <select
          name="country"
          id="country-name"
          className="form-select form-control  min-h-[50px] md:min-h-[60px]  bg-[#f9f9f9] text-[16px] text-[#555] border-[#d7d7d7] select-custom  pr-10"
          value={formData.country}
          onChange={(e) => {
            setFormData({ ...formData, country: e.target.value });
          }}
        >
          <option>Country</option>
          {countries.map((country) => (
            <option
              value={country}
              key={country}
              className="text-[16px] text-[#555]"
            >
              {country}
            </option>
          ))}
        </select>

        <textarea
          className="form-control min-h-[60px]  bg-[#f9f9f9] text-base border-[#d7d7d7]"
          rows={10}
          placeholder="Message"
          value={formData.message}
          name="message"
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
          }}
        ></textarea>
        {isSuccess ? (
          <div className="alert alert-success mt-4 text-center" role="alert">
            Your message has been sent successfully
            <br />
            <strong
              className="cursor-pointer"
              onClick={() => {
                setIsSuccess(false);
              }}
            >
              Send another Message ?
            </strong>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (isValidate) {
                postData();
              }
            }}
            className="border-0 rounded-3xl md:w-[45%] lg:w-[35%] xl:w-[25%] bg-[#211f41] px-[40px] py-[12px] text-white text-lg sm:text-[15px] 2xl:text-[18px] 2xl:pl-[34px] inline-block max-[600px]:w-full"
            disabled={!isValidate}
          >
            Submit
          </button>
        )}
      </form>
      <div className="w-[80%] mx-auto md:w-[50%]  xl:mx-0 xl:w-[45%]  2xl:w-[44%]">
        <CareLocation small={true} />
      </div>
    </div>
  );
};

export default ContactForm;
