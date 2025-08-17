import React from "react";

import payment1 from "@assets/WhyAlmas/payment/american-express.png";
import payment2 from "@assets/WhyAlmas/payment/visa-ico.png";
import payment3 from "@assets/WhyAlmas/payment/master-card-ico.png";
import payment4 from "@assets/WhyAlmas/payment/paypall-ico.png";
import payment5 from "@assets/WhyAlmas/payment/mutual.png";
const SecurePayment: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row w-[96%] md:w-[86%] lg:w-[83%] xl:w-[81%] 2xl:w-[72%] mx-auto space-y-8 lg:space-y-0 lg:space-x-3 2xl:space-x-6 z-10 relative">
      <div
        className="w-11/12 lg:w-1/2 flex flex-col mx-auto items-center lg:items-start"
        data-aos-duration="1000"
        data-aos="fade-right"
      >
        <h1 className="sm:text-center lg:text-start text-[#201f41] text-[40px] xl:text-[50px] 2xl:text-[60px] 2xl:text-nowrap xl:leading-[55px] 2xl:leading-[65px]">
          SECURE
          <br />
          PAYMENTS PROCESS
        </h1>
        <div className="payment flex flex-wrap justify-center lg:justify-normal px-0">
          <li>
            <button>
              <img className="" src={payment2} alt="payment2" />
            </button>
          </li>
          <li>
            <button>
              <img className="" src={payment1} alt="payment1" />
            </button>
          </li>

          <li>
            <button>
              <img className="" src={payment4} alt="payment4" />
            </button>
          </li>
          <li>
            <button>
              <img className="" src={payment3} alt="payment3" />
            </button>
          </li>
          <li>
            <button>
              <img className="" src={payment5} alt="payment5" />
            </button>
          </li>
        </div>
      </div>
      <div
        id="secure-pay"
        className="w-11/12 lg:w-1/2 mx-auto lg:pl-6"
        data-aos-duration="1000"
        data-aos="fade-left"
      >
        <p className="text-[15px] 2xl:text-[16px] text-[#88787e]">
          Almas-Online selected Network to be our International Online Payment
          partner. We selected Network because Network is one of the world’s
          largest global payment provider and strongly protects our customers
          through its secure, fair, and transparent payment environment. Network
          accepts Visa, Mastercard and American Express as well as a number of
          other different payment methods and is available in many Countries.
        </p>
        <h2 className="mt-4 mb-2 text-[27px] text-[#444]">Taxes</h2>
        <p className="text-[15px] 2xl:text-[16px] text-[#88787e]">
          Prices listed on our site are not inclusive of taxes and are subject
          to the standard 5% sales tax (VAT) for orders placed from inside the
          UAE. Products shipped internationally are exempted from the 5% VAT as
          customs, duties and taxes will be charged by the country of import. If
          you are a tourist collecting an item from us, you can get a tax refund
          upon departure from any Abu Dhabi, Dubai or Sharjah airport. More
          information can be found here{" "}
          <a
            className="text-[#30c1d3]"
            href="https://www.planetpayment.ae/tourist"
          >
            https://www.planetpayment.ae/tourist
          </a>
        </p>
      </div>
    </div>
  );
};

export default SecurePayment;
