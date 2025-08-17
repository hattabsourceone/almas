import image from "@assets/privacy.png";
import Banner from "@components/shared/Banner/Banner";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import React, { useEffect } from "react";
import leftFlower from "@assets/SearchDiamond/left_flower.png";
import rightFlower from "@assets/SearchDiamond/right_flower.png";

const ShippingPolicy: React.FC = () => {
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
    document.title = "Shipping Policy";
  });
  return (
    <>
      <div className="w-full flex flex-col">
        <Banner title="Shipping Policy" img={image} />
        <div className="w-full mt-4 -ml-5 sm:-ml-9 md:-ml-10 lg:-ml-10 xl:-ml-8 2xl:ml-14">
          <Breadcrumb
            menu={[
              {
                title: "Shipping Policy",
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
              <p className="text-[18px] text-[#53556b] mb-4">
                We offer free delivery worldwide per our standard shipping
                method. All deliveries must be made to a physical address such
                as a home or business address, and not a P.O. Box. All orders
                are shipped by courier and are securely packaged and insured for
                their full value while in transit from Almas Online to your
                final address
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">
                Additional Info about International Shipping
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                International customers will be responsible for any duties, VAT,
                taxes or surcharges levied or charged by their country, so
                please check with local authorities prior to placing your order
                to confirm taxes and duties
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">Packaging</p>
              <p className="text-[18px] text-[#53556b] mb-4">
                All of our products comes neatly packaged in our beautiful
                branded boxes along with a copy of your invoice, diamond
                certificate and our lifetime warranty certificate.
              </p>
            </div>
          </div>
        </div>
        <Contact />
      </div>
    </>
  );
};

export default ShippingPolicy;
