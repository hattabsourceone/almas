import React from "react";
import { Link } from "react-router-dom";

const UpperNav: React.FC = () => {
  return (
    <div className="bg-[#000] font-sans lg:bg-[#201F41] w-full text-white p-[10px] h-[58px] lg:h-auto text-[11px] lg:text-[12px] font-bold hover:text-[#201f41]">
      <ul className="center flex flex-wrap justify-center md:flex-row md:space-x-4 lg:space-x-6">
        <li className="mr-4 md:mr-0">
          <Link to="/why-almas#lifetime">Free Lifetime Warranty</Link>
        </li>
        <li className="mr-4 md:mr-0">
          <Link to="/why-almas#raf">30 Days Moneyback Guarantee</Link>
        </li>
        <li className="mr-4 md:mr-0">
          <Link to="/why-almas#free-ship">Free Secure Shipping</Link>
        </li>
        <li>
          <Link to="/why-almas#secure-pay">Secure Payment</Link>
        </li>
      </ul>
    </div>
  );
};

export default UpperNav;
