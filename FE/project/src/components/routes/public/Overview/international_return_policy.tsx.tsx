import image from "@assets/privacy.png";
import Banner from "@components/shared/Banner/Banner";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import React, { useEffect } from "react";
import leftFlower from "@assets/SearchDiamond/left_flower.png";
import rightFlower from "@assets/SearchDiamond/right_flower.png";

const InternationalReturnPolicy: React.FC = () => {
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
      document.title = "International Return Policy"; }
    , []);
  return (
    <>
      <div className="w-full flex flex-col">
        <Banner title="International Return Policy" img={image} />
        <div className="w-full mt-4 -ml-5 sm:-ml-9 md:-ml-10 lg:-ml-10 xl:-ml-8 2xl:ml-14">
          <Breadcrumb
            menu={[
              {
                title: "International Return Policy",
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
                To ensure you make the right choice, we offer a very flexible
                return policy. If for any reason you are not satisfied, you can
                return any item in its original condition within 30 days of the
                date of shipment for a refund or an exchange.
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">
                30-Day Money Back Guarantee
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                Our commitment to you does not end at delivery. Items may be
                returned or exchanged within 30 days from when they were
                shipped, no questions asked.
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">
                Our Return Policy
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                We accept returns for refund or exchange within 30 days of
                shipment from our facility. You will only pay for return
                shipping and insurance fees. A Return Merchandise Authorization
                (RMA) number is required for all returns. You may request an RMA
                by following the steps outlined below.
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                Please note that to be eligible for return, items must be in
                their original purchase condition, including all product
                documentation, and shipped back to us within 30 days.
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                To expedite an exchange for a different product, we recommend
                returning the original item for a refund and placing a new
                order. Please allow two weeks for your refund to be processed.
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                If a package or item delivered to you arrives damaged, please
                refuse the shipment and Contact us immediately. Please retain
                all packing materials unless instructed otherwise by Almas
                online. Claims for damaged or missing items must be reported
                immediately or within five days of receipt of your order. Almas
                online is not responsible for lost or damaged returned
                shipments.
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">
                How to Prepare a Return or Exchange
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                To return a diamond or jewellery item to Almas online, please
                follow the process below:
              </p>
              <div className="ml-10 flex flex-col space-y-3 mb-4">
                <div className="flex flex-row">
                  <p className="text-[#1f1f41] text-[18px] pr-2">1</p>
                  <p className="text-[18px] text-[#53556b]">
                    <span className="text-[#1f1f41] font-bold">
                      Initiate your return.
                    </span>
                    <a href="/contact#contact" className="text-[#201f41]">
                      {" "}
                      Contact us
                    </a>{" "}
                    to speak with a Diamond Consultant. You will receive a
                    Return Merchandise Authorisation Code (RMA) as well as
                    detailed instructions for returning your order.
                  </p>
                </div>
                <div className="flex flex-row">
                  <p className="text-[#1f1f41] text-[18px] pr-2">2</p>
                  <p className="text-[18px] text-[#53556b]">
                    <span className="text-[#1f1f41] font-bold pr-1">
                      Arrange shipping and insurance.
                    </span>
                    You may return your merchandise using the carrier of your
                    choice. We recommend sending your return via our preferred
                    Parcel Pro insured FedEx carrier. Please be sure to confirm
                    that you insure your Diamonds to the value that was paid.
                    You are responsible for any return shipping costs and
                    insurance fees.
                  </p>
                </div>
                <div className="flex flex-row">
                  <p className="text-[#1f1f41] text-[18px] pr-2">3</p>
                  <p className="text-[18px] text-[#53556b]">
                    <span className="text-[#1f1f41] font-bold pr-1">
                      Package your item(s) securely in the original packing
                      materials.
                    </span>
                    Clearly write your Return Merchandise Authorization (RMA)
                    number on the outside of the shipping box you are returning
                    and include any diamond grading reports. For security
                    reasons, do not write Almas online anywhere on the outside
                    of the box.
                  </p>
                </div>
              </div>
              <p className="text-[45px] text-[#1f1f41] mb-1">
                After Your Return is Received
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                Returns are processed weekdays and typically entered into our
                system within 2 business days of receipt. Once entered into our
                system you will receive a confirmation email alerting you that
                your return has been passed along to our Quality Assurance
                department. Please allow 5 to 10 business days for this process
                to complete.
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                <span className="font-bold">
                  If you are expecting a refund,
                </span>{" "}
                credit will be submitted to your bank within three business days
                after completing the inspection. It may take your bank up to 10
                business days to post the funds to your account after the return
                has been processed.{" "}
              </p>
              <p className="text-[18px] text-[#53556b] mb-4">
                <span className="font-bold">
                  If you are expecting a return shipment,
                </span>{" "}
                you will receive an email once the outbound shipment date has
                been set. You will also receive a shipping confirmation email
                the day of the outbound shipment.{" "}
              </p>
              <p className="text-[45px] text-[#1f1f41] mb-1">
                Cancel or Change an Order
              </p>
              <p className="text-[18px] text-[#53556b]">
                If you would like to change or cancel an order please{" "}
                <a href="/contact#contact" className="text-[#201f41]">
                  Contact us{" "}
                </a>
                to speak with our Diamond Consultant. We will attempt to
                accommodate order changes to the extent possible prior to
                shipping confirmation. Some changes will result in a shipping
                delay. We are unable to accommodate changes or cancellations on
                orders that have already shipped. If you would like your package
                held for collection, please contact us.
              </p>
            </div>
          </div>
        </div>
        <Contact />
      </div>
    </>
  );
};

export default InternationalReturnPolicy;
