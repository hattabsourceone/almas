import image from "@assets/privacy.png";
import Banner from "@components/shared/Banner/Banner";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import React, { useEffect } from "react";
import leftFlower from "@assets/SearchDiamond/left_flower.png";
import rightFlower from "@assets/SearchDiamond/right_flower.png";

const Privacy: React.FC = () => {
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
        document.title = "Privacy Policy";
      }, []);
  return (
    <>
      <div className="w-full flex flex-col">
        <Banner title="Privacy Policy" img={image} />
        <div className="w-full mt-4 -ml-5 sm:-ml-9 md:-ml-10 lg:-ml-10 xl:-ml-8 2xl:ml-14">
          <Breadcrumb
            menu={[
              {
                title: "Privacy Policy",
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
                This Privacy Policy is designed to inform you of what
                information
                <span className="font-semibold">
                  {" "}
                  Manjam Precious Stones DMCC
                </span>
                (“Almas-online”, “we”, “us” or “our”) collects, why we collect
                such information, and how we use the information we collect.
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                By using this website you agree to our{" "}
                <a href="/terms" className="text-[#201f41]">
                  {" "}
                  Terms & Conditions{" "}
                </a>
                and the terms of this Privacy Policy. Almas-online will
                occasionally update this Privacy Policy and recommends that you
                periodically review it for updates.
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">
                Collection of Information
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                We collect and store all personal information that you provide
                to us through our website, email, telephone and social media
                channels. The information we collect includes your full name,
                email address, country of residence and telephone number. We
                also collect the content that you send or write about us,
                including your messages and reviews. When you make a purchase,
                your credit card information will be collected directly by the
                credit card payment processor which is one of the
                internationally leading and high-secure payment providers; we do
                not store your credit card information.
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                Additionally, to enhance the performance of our website and
                continuously improve our business, we automatically collect
                statistical information from you. The information we gather is
                mainly your usage of our website, IP address, location and the
                type of device you use to access our Site.
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">
                Use of Information
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                We use your information for our legitimate interests, including
              </p>
              <div className="ml-10 flex flex-col space-y-3 mb-4">
                <div className="flex flex-row">
                  <p className="text-[#1f1f41] text-[18px] pr-2">1</p>
                  <p className="text-[18px] text-[#53556b]">
                    facilitate your purchase and provide the services you
                    request,
                  </p>
                </div>
                <div className="flex flex-row">
                  <p className="text-[#1f1f41] text-[18px] pr-2">2</p>
                  <p className="text-[18px] text-[#53556b]">
                    confirm, process, track and fulfil your order,{" "}
                  </p>
                </div>
                <div className="flex flex-row">
                  <p className="text-[#1f1f41] text-[18px] pr-2">3</p>
                  <p className="text-[18px] text-[#53556b]">
                    respond to your comments, questions and requests,
                  </p>
                </div>
                <div className="flex flex-row">
                  <p className="text-[#1f1f41] text-[18px] pr-2">4</p>
                  <p className="text-[18px] text-[#53556b]">
                    prevent and take legal action against any illegal activity,
                    including fraud,
                  </p>
                </div>
                <div className="flex flex-row">
                  <p className="text-[#1f1f41] text-[18px] pr-2">5</p>
                  <p className="text-[18px] text-[#53556b]">
                    improve overall customer experience.
                  </p>
                </div>
              </div>
              <p className="text-[45px] text-[#1f1f41] mb-1">
                Sharing of Information
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                We value your information and will never sell it to any third
                party. In certain circumstances, we may share your information,
                including personal information, as follows:
              </p>
              <div className="ml-10 flex flex-col space-y-3 mb-4">
                <div className="flex flex-row">
                  <p className="text-[#1f1f41] text-[18px] pr-2">1</p>
                  <p className="text-[18px] text-[#53556b]">
                    we may share your information with trusted third party
                    service providers who perform services on our behalf such as
                    shipping, payment processing, data storage/management, and
                    web hosting.
                  </p>
                </div>
                <div className="flex flex-row">
                  <p className="text-[#1f1f41] text-[18px] pr-2">2</p>
                  <p className="text-[18px] text-[#53556b]">
                    We may share your information with law enforcement,
                    government and/or judicial bodies if we believe it is
                    necessary to comply with any applicable law or regulation.
                  </p>
                </div>
              </div>
              <p className="text-[45px] text-[#1f1f41] mb-1">Data Security</p>
              <p className="text-[18px] text-[#53556b] mb-4">
                The security of your personal information is of utmost
                importance to us which is why we take all the necessary
                precautions to protect it from loss, theft, misuse, unauthorized
                access, disclosure, alteration and destruction. Our Site uses
                Secure Socket Layers (SSLs) to create an encrypted connection
                and ensure all data transmission remains private.
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">Opting-Out</p>
              <p className="text-[18px] text-[#53556b]">
                You may receive marketing communications from us via email. If
                you wish to opt-out you can click on the unsubscribe link.
              </p>
            </div>
          </div>
        </div>
        <Contact />
      </div>
    </>
  );
};

export default Privacy;
