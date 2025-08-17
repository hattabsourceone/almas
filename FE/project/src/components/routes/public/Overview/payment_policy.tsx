import image from "@assets/privacy.png";
import Banner from "@components/shared/Banner/Banner";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import React, { useEffect } from "react";
import leftFlower from "@assets/SearchDiamond/left_flower.png";
import rightFlower from "@assets/SearchDiamond/right_flower.png";

const PaymentPolicy: React.FC = () => {
  const linksList = [
    {
      name: "Privacy Policy",
      link: "/privacy",
    },
    {
      name: "Shipping Policy",
      link: "/shipping-policy",
    },
    {
      name: "Payment Policy",
      link: "/payment-policy",
    },
    {
      name: "International Return Policy",
      link: "/international-return-policy",
    },
    {
      name: "Terms & Conditions",
      link: "/terms",
    },
  ];
  useEffect(() => {
    document.title = "Payment Policy"; }
  , []);
  return (
    <>
      <div className="w-full flex flex-col">
        <Banner title="Payment Policy" img={image} />
        <div className="w-full mt-4 -ml-5 sm:-ml-9 md:-ml-10 lg:-ml-10 xl:-ml-8 2xl:ml-14">
          <Breadcrumb
            menu={[
              {
                title: "Payment Policy",
                link: "#",
                level: 1,
              },
            ]}
          />
        </div>
        <div className="flex flex-col w-full relative">
          <img
            src={leftFlower}
            alt=""
            className="hidden md:block absolute w-[30%] lg:w-[20%] left-0 pointer-events-none opacity-45 z-0"
          />
          <img
            src={rightFlower}
            alt=""
            className="hidden md:block absolute w-[30%] lg:w-[20%] right-0 pointer-events-none opacity-45 z-0"
          />
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-8 mb-20 w-[96%] lg:w-[93%] xl:w-[90%] 2xl:w-[74%] mx-auto mt-4 z-10">
            <div className="flex flex-col">
              {linksList.map((e: any, index: number) => (
                <a
                  href={e.link}
                  className={`h-[61px] mx-auto w-[95%] lg:w-[210px] xl:w-[260px] 2xl:w-[330px] bg-[#fff] hover:bg-[#201f41] text-[16px] text-[#88787e] hover:text-[#fff] flex items-center pl-6 capitalize border-[1px] border-[#e1e1e1] transition-colors duration-[0.3s] ${
                    index === 0
                      ? "rounded-t-sm border-b-0"
                      : index === linksList.length - 1
                      ? "rounded-b-sm border-b-[1px]"
                      : "border-b-0"
                  }`}
                >
                  {e.name}
                </a>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row space-x-1 mb-4">
                <p className="text-[#53556b] text-[18px] font-bold">
                  Last updated: March 18, 2019
                </p>
                <div className="border-b-[1px] mb-[12px] w-[100px] md:w-[304px] border-[#53556b]"></div>
              </div>
              <p className="text-[18px] text-[#53556b] mb-4">
                We accept various debit and credit cards for online payments. As
                per our company’s payment policy, Upfront payment is required
                upon placing an order.
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">
                Debit/Credit Card
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                We accept both Visa and MasterCard. Debit and credit card
                payments can be made on-site at Almas online through a secure
                online payment gateway. If you face any issue during processing
                your payment online, please contact our customer care and one of
                our staff will assist you.
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">Taxes</p>
              <p className="text-[18px] text-[#53556b] mb-4">
                Prices listed on our site are not inclusive of taxes and are
                subject to the standard 5% sales tax (VAT) for orders placed
                from inside the UAE. Products shipped internationally are
                exempted from the 5% VAT as customs, duties and taxes will be
                charged by the country of import. If you are a tourist
                collecting an item from us, you can get a tax refund upon
                departure from any Abu Dhabi, Dubai or Sharjah airport. More
                information can be found here
                https://www.planetpayment.ae/tourist
              </p>
            </div>
          </div>
        </div>
        <Contact />
      </div>
    </>
  );
};

export default PaymentPolicy;
