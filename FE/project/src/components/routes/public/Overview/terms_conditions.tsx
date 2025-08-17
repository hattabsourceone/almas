import image from "@assets/SearchDiamond/header.jpg";
import Banner from "@components/shared/Banner/Banner";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import React ,{useEffect} from "react";
import leftFlower from "@assets/SearchDiamond/left_flower.png";
import rightFlower from "@assets/SearchDiamond/right_flower.png";

const TermsConditions: React.FC = () => {
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
    document.title = "Terms & Conditions";
  }, []);
  return (
    <>
      <div className="w-full flex flex-col">
        <Banner title="Terms & Conditions" img={image} />
        <div className="w-full mt-4 -ml-5 sm:-ml-9 md:-ml-10 lg:-ml-10 xl:-ml-8 2xl:ml-14">
          <Breadcrumb
            menu={[
              {
                title: "Terms & Conditions",
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
                Welcome to{" "}
                <a href="/" className="text-[#201f41]">
                  www.almas-online.com
                </a>
                . We hope you have a pleasant shopping experience and enjoy what
                our website has to offer.
                <a href="/" className="text-[#201f41]">
                  www.almas-online.com
                </a>
                . (the “Site”) is owned and operated by Manjam Precious Stones
                DMCC, a company based in Dubai, UAE. By using the site, you
                agree to these terms and conditions.
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                Almas online reserves the right to change or modify all or any
                part of these Terms & Conditions at any time, and in its sole
                discretion. Any changes or modifications shall be deemed
                effective immediately upon getting posted online. Your continued
                use of the Site following any changes or modifications will
                constitute your acceptance of the revised Terms & Conditions.
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">Pricing</p>
              <p className="text-[18px] text-[#53556b] mb-4">
                Prices on the Site are displayed in US Dollars and are not
                inclusive of taxes. In accordance with the UAE's VAT Law,
                products sold by Almas online are subject to the standard 5%
                sales tax (VAT), except for those that are shipped
                internationally as taxes will be charged by the country of
                import. If you are a tourist collecting an item from us, you can
                get a tax refund upon departure from any Abu Dhabi, Dubai or
                Sharjah airport. More information can be found here{" "}
                <a
                  href="https://www.planetpayment.ae/tourist"
                  className="text-[#201f41]"
                >
                  https://www.planetpayment.ae/tourist
                </a>
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                While we make every effort to ensure the correct display and
                communication of prices on our Site, through email and
                telephone, errors may occur. We reserve the right to correct any
                errors if and when they occur. In the event of a pricing error,
                we will contact you with the revised price and give you the
                option of either canceling the order or paying the difference if
                the revised price is higher.
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                All our prices are final and are subject to change without
                notice. Please review our{" "}
                <a href="/payment-policy" className="text-[#201f41]">
                  Payment Policy
                </a>{" "}
                for detailed information on payment methods and conditions.
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">
                Orders & Product Availability
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                All products listed on our Site show an estimated delivery date,
                however this is not a guarantee. If you require a product before
                the listed delivery date please{" "}
                <a href="/contact#contact" className="text-[#201f41]">
                  contact us
                </a>{" "}
                to see if it qualifies for expedite delivery.
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                Please review our{" "}
                <a href="/shipping-policy" className="text-[#201f41]">
                  Shipping Policy
                </a>{" "}
                for information on domestic and international shipping.
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">
                Information on Our Site
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                At Almas online , we make a significant effort to ensure that
                all product information on our Site is as accurate as possible.
                Nevertheless, as our Site adapts to your screen size products
                may sometimes appear larger or smaller than their actual size.
                The capabilities of your device can also affect the colors that
                you see on your screen which may result in slight color
                variations. Due to the reasons above, we cannot guarantee that
                any product(s) displayed on your device will be accurate in
                size, colour, texture or detail. However, the details contained
                in the diamonds' certificates should be your primary criteria
                for making a purchase decision.
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">Use of Site</p>
              <p className="text-[18px] text-[#53556b] mb-4">
                The Site and all content and other materials, including, without
                limitation, the Almas online logo, and all designs, text,
                graphics, pictures, selection, coordination, 'look and feel',
                information, data, software, sound files, other files and the
                selection and arrangement thereof (collectively, the "Site
                Materials") are the property of Almas online or its licensors or
                users and are protected by copyright and trademark laws, and
                various other intellectual property rights and unfair
                competition laws.
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                You are permitted to access the site solely for personal and
                non-commercial use and agree not to reproduce, publish,
                transmit, distribute, modify, create derivative works from, or
                commercially exploit in any way any of the Site’s content.
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">Privacy Policy</p>
              <p className="text-[18px] text-[#53556b] mb-4">
                Please review our{" "}
                <a href="/privacy" className="text-[#201f41]">
                  {" "}
                  Privacy Policy
                </a>{" "}
                for information on how Almas online collects, uses and discloses
                personally identifiable information from its customers.
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">Indemnity</p>
              <p className="text-[18px] text-[#53556b] mb-4">
                You agree to defend, indemnify and hold harmless Manjam Precious
                Stones DMCC, its independent contractors, service providers and
                consultants, and their respective directors, employees and
                agents, from and against any claims, damages, costs,
                liabilities, and expenses (including, but not limited to,
                reasonable attorneys' fees) arising out of or related to any
                Content you post, store or otherwise transmit on or through our
                Site or your use of or inability to use our Site, including
                without limitation any actual or threatened suit, demand or
                claim made against Manjam Precious Stones DMCC and/or its
                independent contractors, service providers, employees, directors
                or consultants, arising out of or relating to the Content, your
                conduct, your violation of these Terms & Conditions or your
                violation of the rights of any third party.
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">
                Governing Law & Jurisdiction
              </p>
              <p className="text-[18px] text-[#53556b]">
                These Terms & Conditions as well as your access to the Site are
                subject to and governed by the federal laws of the UAE and the
                laws of the Emirate of Dubai. Any disputes that may arise
                between you and Almas online are subject to the exclusive
                jurisdiction of the Dubai courts. If the court determines any
                portion of these Terms & Conditions as unenforceable, the
                remaining portion of these Terms & Conditions shall nevertheless
                remain in full force and effect.
              </p>
            </div>
          </div>
        </div>
        <Contact />
      </div>
    </>
  );
};

export default TermsConditions;
