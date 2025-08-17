import React from "react";
import { billingAddressProps } from "./_Profile";

type DisplayAddressPropTypes = {
  address: any;
  handleBillingUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DisplayBillingAddress: React.FC<DisplayAddressPropTypes> = ({
  address,
  handleBillingUpdate,
}) => {
  return (
    <div className="flex flex-col w-full space-y-2">
      <input
        type="text"
        name="full_name"
        id="name"
        className="mb-2 mt-1 block outline-none w-full  border-1 border-slate-300 px-2 h-[50px] bg-transparent rounded-none shadow-none text-[16px] text-[#88787e]"
        placeholder="Full Name"
        onChange={handleBillingUpdate}
        value={address.full_name}
        disabled={true}
      />
      <input
        type="text"
        name="mobile_w_country"
        id="mobile"
        className="mb-2 mt-1 block outline-none w-full  border-1 border-slate-300 px-2 h-[50px] bg-transparent rounded-none shadow-none text-[16px] text-[#88787e]"
        placeholder="Mobile with country code"
        onChange={handleBillingUpdate}
        value={address.mobile_w_country}
        disabled={true}
      />
      <input
        type="text"
        name="address"
        id="address"
        className="mb-2 mt-1 block outline-none w-full  border-1 border-slate-300 px-2 h-[50px] bg-transparent rounded-none shadow-none text-[16px] text-[#88787e]"
        placeholder="Address"
        onChange={handleBillingUpdate}
        value={address.address}
        disabled={true}
      />
      <input
        type="text"
        name="city"
        id="city"
        className="mb-2 mt-1 block outline-none w-full  border-1 border-slate-300 px-2 h-[50px] bg-transparent rounded-none shadow-none text-[16px] text-[#88787e]"
        placeholder="City"
        onChange={handleBillingUpdate}
        value={address.city}
        disabled={true}
      />
      <input
        type="text"
        name="post_code"
        id="postcode"
        className="mb-2 mt-1 block outline-none w-full  border-1 border-slate-300 px-2 h-[50px] bg-transparent rounded-none shadow-none text-[16px] text-[#88787e]"
        placeholder="Postcode"
        onChange={handleBillingUpdate}
        value={address.post_code}
        disabled={true}
      />
      <input
        type="text"
        name="country"
        id="country"
        className="mb-2 mt-1 block outline-none w-full  border-1 border-slate-300 px-2 h-[50px] bg-transparent rounded-none shadow-none text-[16px] text-[#88787e]"
        placeholder="Country"
        onChange={handleBillingUpdate}
        value={address.country}
        disabled={true}
      />
      <input
        type="text"
        name="state"
        id="state"
        className="mb-2 mt-1 block outline-none w-full  border-1 border-slate-300 px-2 h-[50px] bg-transparent rounded-none shadow-none text-[16px] text-[#88787e]"
        placeholder="State"
        onChange={handleBillingUpdate}
        value={address.state}
        disabled={true}
      />
    </div>
  );
};

export default DisplayBillingAddress;
