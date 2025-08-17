import bg from "@assets/Contact/contact.jpg";
import React from "react";
import { Link } from "react-router-dom";

const Contact: React.FC = () => {
  return (
    <div className="relative overflow-hidden w-full flex flex-col justify-center items-center h-[369px] md:h-[346px] xl:h-[413px] 2xl:h-[455px]">
      <img
        src={bg}
        className="big-image w-full h-full object-cover absolute z-1"
        alt=""
      />
      <div
        className="z-2 relative w-[90%] sm:w-[60%]"
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <h1 className="text-center text-[30px] md:text-[40px] xl:text-[50px] 2xl:text-[60px] font-medium  text-[#201F41]">
          {" "}
          ALWAYS
        </h1>
        <h1 className="text-center text-[30px] md:text-[40px] xl:text-[50px] 2xl:text-[60px] font-medium mb-4 text-[#201F41]">
          {" "}
          CONNECTED
        </h1>
        <p
          className="text-center text-[15px] xl:text-[16px] mb-4 text-[#010101]"
          style={{
            fontFamily: '"Montserrat", sans-serif',
          }}
        >
          Get in touch with us by simply filling in the enquiry form and we will
          get back to you soon
        </p>
        <div className="center">
          <Link to={"/contact"} className="py-3 bg-blue rounded-full hover:bg-[#201f41ad]">
            <p className="text-[15px] text-white font-medium  px-[40px]">
              Enquire Now
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
