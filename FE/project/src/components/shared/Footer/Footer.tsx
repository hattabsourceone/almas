import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Footer: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1)); // Remove the leading #
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return (
    <>
      <footer id="footer" className="w-full mx-auto">
        <div
          className="flex flex-wrap w-[95%] mx-auto md:w-[97%] lg:w-[95%] xl:w-[91%] 2xl:w-[81%] justify-between font-semibold text-center aos-init aos-animate pb-7 pt-10"
          data-aos="fade-up"
          data-aos-duration="500"
          style={{ fontFamily: '"Plain Light", sans-serif' }}
        >
          <div className="w-11/12 mx-auto sm:w-1/2 md:w-1/3 xl:w-[13%] flex flex-col items-center sm:items-start pb-10 sm:pb-0">
            <h5 className="text-[20px] uppercase font-bold text-start h-16">
              About us
            </h5>
            <ul className="text-[14px] list-none font-medium flex flex-col items-center sm:items-start">
              <li className="h-[35px]">
                <Link to="about#" className="hover:text-white">
                  Our Story
                </Link>
              </li>
              <li className="h-[35px]">
                <Link to="about#ol" className="hover:text-white">
                  Office Location
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-11/12 mx-auto sm:w-1/2 md:w-1/3 xl:w-[13%] flex flex-col items-center sm:items-start">
            <h5 className="text-[20px] uppercase font-bold text-start h-16">
              Diamonds
            </h5>
            <ul className="text-[14px] list-none font-normal flex flex-col items-center sm:items-start">
              <li className="h-[35px]">
                <Link
                  to="/search-inventory/all-diamond"
                  className="hover:text-white"
                >
                  Search Inventory
                </Link>
              </li>
              <li className="h-[35px]">
                <Link
                  to="search-inventory/spicial-offer"
                  className="hover:text-white"
                >
                  Stones on Special Offer
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-11/12 mx-auto sm:w-1/2 md:w-1/3 xl:w-[18.5%] pt-10 md:pt-0 flex flex-col items-center sm:items-start">
            <h5 className="text-[20px] uppercase font-bold text-start h-16">
              Why Almas-Online?
            </h5>
            <ul className="text-[14px] list-none font-normal flex flex-col items-center sm:items-start">
              <li className="h-[35px]">
                <Link to="/why-almas#lifetime" className="hover:text-white">
                  Free Lifetime Warranty
                </Link>
              </li>
              <li className="h-[35px]">
                <Link to="/why-almas#free-ship" className="hover:text-white">
                  30 Days Moneyback{" "}
                </Link>
              </li>
              <li className="h-[35px]">
                <Link to="/why-almas#free-ship" className="hover:text-white">
                  Free Secure Shipping
                </Link>
              </li>
              <li className="h-[35px]">
                <Link to="/why-almas#secure-pay" className="hover:text-white">
                  Secure Payment Process
                </Link>
              </li>
              <li className="h-[35px]">
                <Link to="/why-almas#tax" className="hover:text-white">
                  Unmatched Prices
                </Link>
              </li>
              <li className="text-start space-y-4 h-[35px]">
                <Link
                  to="/why-almas#natural-diamond"
                  className="block w-full truncate leading-relaxed hover:text-white"
                  title="Only Natural & Quality Diamonds"
                >
                  Only Natural &amp; Quality Diamonds
                </Link>
              </li>

              <li className="h-[35px]">
                <Link
                  to="/why-almas#natural-diamond"
                  className="hover:text-white"
                >
                  Conflict-Free Diamonds
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-11/12 mx-auto sm:w-1/2 md:w-1/3 xl:w-[18.5%] pt-10 lg:pt-0 flex flex-col items-center sm:items-start">
            <h5 className="text-[20px] uppercase font-bold text-start h-16 2xl:text-nowrap pr-4 lg:pr-0">
              Diamond Buying Guide
            </h5>
            <div className="text-[14px] list-none font-normal flex flex-col items-center sm:items-start">
              <li className="h-[35px]">
                <Link to="/buying-guide#shape" className="hover:text-white">
                  Shapes
                </Link>
              </li>
              <li className="h-[35px]">
                <Link to="/buying-guide#4cs" className="hover:text-white">
                  The 4Cs
                </Link>
              </li>
              <li className="h-[35px]">
                <Link
                  to="/buying-guide#certification"
                  className="hover:text-white"
                >
                  Certification
                </Link>
              </li>
              <li className="h-[35px]">
                <Link to="/buying-guide#glossary" className="hover:text-white">
                  Glossary
                </Link>
              </li>
              <li className="h-[35px]">
                <Link to="/buying-guide#origins" className="hover:text-white">
                  Origins of Diamonds
                </Link>
              </li>
            </div>
          </div>

          <div className="w-11/12 mx-auto sm:w-1/2 md:w-1/3 xl:w-[18.5%] pt-10 lg:pt-0 flex flex-col items-center sm:items-start">
            <h5 className="text-[20px] uppercase font-bold text-start h-16 pr-4 lg:pr-0">
              Social Responsibility
            </h5>
            <ul className="text-[14px] list-none font-normal flex flex-col items-center sm:items-start">
              <li className="h-[35px]">
                <Link to="social-responsibility" className="hover:text-white">
                  Diamond Child Foundation
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-11/12 mx-auto sm:w-1/2 md:w-1/3 xl:w-[18.5%] pt-10 lg:pt-0 flex flex-col items-center sm:items-start">
            <h5 className="text-[20px] uppercase font-bold text-start h-16">
              Customer Care
            </h5>
            <ul className="text-[14px] list-none font-normal flex flex-col items-center sm:items-start">
              <li className="h-[35px]">
                <Link to="/contact#contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li className="h-[35px]">
                <Link to="/contact#faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li className="h-[35px]">
                <Link to="/authentification" className="hover:text-white">
                  Order Status
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 mx-auto w-full pb-7">
          <ul className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:flex-wrap text-[12px] list-none font-normal items-center justify-center">
            <li>
              <Link
                to="privacy"
                className="whitespace-nowrap hover:text-white mx-[20px]"
              >
                Privacy Policy
              </Link>
            </li>
            <li className="hidden sm:block">|</li>
            <li>
              <Link
                to="shipping-policy"
                className="whitespace-nowrap hover:text-white mx-[20px]"
              >
                Shipping Policy
              </Link>
            </li>
            <li className="hidden sm:block">|</li>
            <li>
              <Link
                to="payment-policy"
                className="whitespace-nowrap hover:text-white mx-[20px]"
              >
                Payment Policy
              </Link>
            </li>
            <li className="hidden sm:block">|</li>
            <li>
              <Link
                to="international-return-policy"
                className="whitespace-nowrap hover:text-white mx-[20px]"
              >
                International Return Policy
              </Link>
            </li>
            <li className="hidden sm:block">|</li>
            <li>
              <Link
                to="terms"
                className="whitespace-nowrap hover:text-white mx-[20px]"
              >
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
          <p className="text-center text-base pt-[20px]">
            © 2023 Almas Online All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
