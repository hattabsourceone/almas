import Bubbel from "@components/shared/Bubbel/Bubbel";
import React from "react";

const SecureShipping: React.FC = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:w-[83%] xl:w-[81%] 2xl:w-[72%] mx-auto">
        <div className="w-11/12 lg:w-1/3 mx-auto text-justify flex flex-col items-center lg:items-start">
          <div
            className="relative bg-[#1f1f41] text-white rounded-full px-[30px] pt-[30px] w-[280px] h-[280px] xl:w-[320px] xl:h-[320px] 2xl:w-[400px] 2xl:h-[400px] xl:mt-64"
            style={{ fontFamily: "Plain Light,sans-serif" }}
          >
            <h2 className="text-[18px] mb-2 lg:mb-[10px] 2xl:text-[30px] text-center ms-0 pt-[15px] italic">
              <span className="block text-[#ffff] ">International</span>
              Shipments
            </h2>
            <p className=" text-[13px] lg:leading-[15px] 2xl:text-[14px] text-[#fff] leading-[21px] 2xl:leading-[22px] text-center">
              International customers will be responsible for any duties, VAT,
              taxes or surcharges levied or charged by their country, so please
              check with local authorities prior to placing your order to
              confirm taxes and duties
            </p>
          </div>
        </div>
        <div
          id="free-ship"
          className="w-11/12 lg:w-2/3 relative mx-auto 2xl:pl-6"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-duration="1000"
        >
          <h1 className="mb-[30px] sm:my-[20px]  leading-[59px] text-[#201f41] font-medium block">
            <span className="block sm:text-[46px]">FREE, SECURE</span>{" "}
            <span className="2xl:font-medium xl:text-[50px] 2xl:text-[60px] sm:text-[40px] lg:text-[46px] ">
              SHIPPING{" "}
            </span>
          </h1>
          <div className="slogan min-h-[150px] min-w-[150px] sm:min-h-[10px] xl:leading-[30px]  ">
            <h2 className="no-spacing italic text-[#88787e] text-[25px] mb-[20px] text-left md:text-left">
              We're committed
            </h2>
            <h6 className="text-[16px] text-[#53556b] italic xl:leading-[30px] lg:leading-[30px] mb-4 sm:mb-[0px] sm:leading-none text-left md:w-[310px] sm:w-full 2xl:w-[220px]">
              <span className="xl:leading-[30px]">
                to making your entire experience a{" "}
              </span>
              pleasant one, from shopping to shipping.
            </h6>
          </div>
          <p className="text-[#88787e] text-[15px] 2xl:text-[16px] mb-[30px] leading-5">
            Almas-Online can deliver globally through a secure delivery service
            option. Our products are fully insured and will arrive within 3 to 7
            days of leaving our office. FedEx, our trusted service partner, has
            shipped thousands of our quality products to every corner of the
            planet. Our delivery service is fully insured, trackable, and fast,
            giving our customers peace of mind as well as an excellent service.
            To ship an item, we require a full business or home address (no PO
            Boxes), mobile contact number for the receiver as well as a
            signature upon delivery. For more information about our global
            shipping service, please contact the customer service team at
            <span>
              &nbsp;
              <a
                className="text-[#30c1d3] font-bold"
                href="mailto:info@almas-online.com"
              >
                info@almas-online.com
              </a>
            </span>
          </p>

          <div
            className="lg:absolute mx-auto bg-[#1f1f41] text-[#fff] rounded-full w-[400px] h-[400px] lg:w-[360px] lg:h-[360px] xl:w-[400px] xl:h-[400px] 2xl:h-[455px] 2xl:w-[455px] flex flex-col items-center justify-center px-8 lg:top-48 lg:-right-20 2xl:right-0 transform lg:-translate-y-72 xl:-translate-y-72 2xl:-translate-y-96"
            //data-aos="zoom-in"
            //data-aos-duration="300"
            style={{ fontFamily: "Plain Light,sans-serif" }}
          >
            <h2 className="md:text-[20px] xl:mt-4 text-center ms-0 pt-10  italic mb-[20px] sm:text-[18px] sm:mb-[10px] xl:mb-[20px]  md:mb-text[20px] md:w-[280px] md:mb-[15px] 2xl:text-[30px]  lg:text-[px] ">
              30 days Moneyback Guarantee
            </h2>
            <div className="text-[14px] lg:leading-[20px] md:leading-[22px] mb-[25px] text-center ms-0 sm:leading-[15px] sm:mb-[10px]">
              <p className="xl:mb-[25px] sm:mb-[10px]">
                Our commitment to you does not end at delivery. Items may be
                returned or exchanged within 30 days from when they were
                shipped, free-of-charge and no questions asked.
              </p>
              <p className="xl:mb-[25px] xl:w-[310px] sm:w-p[240px] sm:mb-[10px] 2xl:w-full  ">
                Each item will arrive or presented in a branded Almas-Online
                temper-proof seal pack. View the shipping details tab at the
                bottom of each product page to see how your order will be
                presented.
              </p>
              <div className="xl:mb-[25px] sm:mb-[10px]  ">
                <p className="pb-1">For more information review Our</p>
                <a className="text-center font-bold" href="/international-return-policy">
                  Return Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecureShipping;
