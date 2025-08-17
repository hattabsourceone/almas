import React,{useEffect} from "react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {

  useEffect(() => {
    document.title = "Register Account";
  }, []);

  return (
    <div className="w-full md:w-[46%]">
      <div className="well bg-very-lite-blue  rounded">
        <h2 className="pt-[25px] text-[28px] font-medium text-[#444] pb-2">
          New Customer
        </h2>
        <h6 className="text-[12px] text-[#666] my-[10px] font-semibold">Register</h6>
        <p className="text-[12px] font-normal text-[#666] pb-4 text-justify">
          By creating an account you will be able to shop faster, be up to date
          on an order's status, and keep track of the orders you have previously
          made.
        </p>
        <Link to="/authentification/register">
          <button className="text-xl h-[58px] font-medium uppercase text-white bg-[#201F41] py-2 px-12 rounded-full">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Register;