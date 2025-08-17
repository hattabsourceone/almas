import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import ContactForm from "@components/shared/Contact/ContactForm";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Questions from "./Questions";

const CustomerCare: React.FC = () => {
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const { pathname } = location;

  useEffect(() => {
    document.title = "Customer Care ";

    const element = document.getElementById(location.hash.substring(1));
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 50,
        behavior: "smooth",
      });
    }
  }, [location]);

  return (
    <>
      <section
        className=""
        style={{
          fontFamily: '"Plain Light", sans-serif',
        }}
      >
        <div
          className="flex items-center bg-[url('/src/assets/Contact/banner.jpg')] justify-center h-[149px] sm:h-[220px] md:h-[260px] lg:h-[360px] xl:h-[426px] 2xl:h-[490px] md:justify-start md:px-16 lg:px-16 xl:px-32 2xl:px-64 2xl:pt-10 "
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-white uppercase font-bold md:font-medium text-[20px] md:text-[50px] lg:text-[70px] md:leading-[80px] xl:text-[70px]">
            customer care
          </h1>
        </div>
        <div className="pt-3 sm:pt-6 md:pt-10 flex flex-col  md:gap-20  2xl:w-[1560px] 2xl:mx-auto">
          <div className="pr-24  sm:pr-72 md:pr-56 lg:pr-[17px] xl:pr-0 xl:!pl-[66px] 2xl:!pl-[0px] sm:mt-[20px]   2xl:!ml-[-70px]  ">
            <Breadcrumb
              menu={[
                {
                  title: "Customer Care",
                  link: pathname,
                  level: 1,
                },
              ]}
            />
          </div>
          {showSuccess && (
            <div className="flex flex-col mb-24 w-[89%] sm:w-[93%] md:w-[90%] lg:w-[86%] xl:w-[76%] 2xl:w-[88%] mx-auto mt-14 md:mt-0">
              <p className="text-[40px] text-[#201f41] mb-2">Customer Care</p>
              <p className="text-[#333] text-[14px] mb-2">
                Thank you so much for your interest in Almas! We've received
                your message and hope to get back to you soon.
              </p>
              <a
                href="/"
                className="text-[16px] md:text-[18px] lg:text-[24px] text-[#201f41] hover:text-[#201f41] italic text-end"
              >
                Continue
              </a>
            </div>
          )}
          {!showSuccess && (
            <div
              className="hidden xl:block xl:bg-bus-care-bg-dots bg-[right top] bg-no-repeat h-[230px]"
              style={{ backgroundPosition: "right -105px top 50px" }}
            ></div>
          )}
          {!showSuccess && (
            <div className="w-[100%] px-3 sm:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%] sm:pl-5 mx-auto flex flex-col my-5 sm:my-14 space-y-5 lg:space-y-0 lg:my-0 xl:my-0 md:pl-10 lg:pl-0 lg:pr-5 xl:!mt-[-152px] 2xl:!mt-[-200px]">
              <div className="xl:size-[160px] 2xl:size-[170px] xl:bg-slogan-bg xl:bg-no-repeat xl:bg-cover xl:ml-[140px] relative xl:mt-[-57px] xl:mb-[30px]">
                <h1 className=" sm:mb-[20px] sm:mt-0 md:mt-[15px] text-[30px] md:text-[40px] uppercase text-[#201f41]  font-medium  xl:text-[50px] 2xl:text-[60px] sm:ml-[10px] md:ml-[20px] lg:mt-[50px] lg:ml-[60px] xl:ml-[0px] xl:mb-[10px] xl:mt-[0px] 2xl:mt-[0px] 2xl:ml-[-65px] ">
                  inquire now
                </h1>
              </div>
              <div id="contact">
                <ContactForm setShowSuccess={setShowSuccess} />
              </div>

              <div id="faq" className="pt-20  2xl:ml-[40px]">
                <Questions />
              </div>
            </div>
          )}
        </div>
        <Contact />
      </section>
    </>
  );
};

export default CustomerCare;
