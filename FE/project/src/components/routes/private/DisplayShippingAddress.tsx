import React from "react";
import { billingAddressProps, shippingAddressProps } from "./_Profile";

type DisplayAddressPropTypes = {
  address: any;
  handleShippingUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DisplayShippingAddress: React.FC<DisplayAddressPropTypes> = ({
  address,
  handleShippingUpdate,
}) => {
  return (
    <div className="flex flex-col w-full space-y-2">
      <input
        type="text"
        name="full_name"
        id="name"
        className="mb-2 mt-1 block outline-none w-full  border-1 border-slate-300 px-2 h-[50px] bg-transparent rounded-none shadow-none text-[16px] text-[#88787e]"
        placeholder="Full Name"
        onChange={handleShippingUpdate}
        disabled={true}
        value={address.full_name}
      />
      <input
        type="text"
        name="mobile_w_country"
        id="mobile"
        className="mb-2 mt-1 block outline-none w-full  border-1 border-slate-300 px-2 h-[50px] bg-transparent rounded-none shadow-none text-[16px] text-[#88787e]"
        placeholder="Mobile with country code"
        onChange={handleShippingUpdate}
        disabled={true}
        value={address.mobile_w_country}
      />
      <input
        type="text"
        name="address"
        id="address"
        className="mb-2 mt-1 block outline-none w-full  border-1 border-slate-300 px-2 h-[50px] bg-transparent rounded-none shadow-none text-[16px] text-[#88787e]"
        placeholder="Address"
        onChange={handleShippingUpdate}
        disabled={true}
        value={address.address}
      />
      <input
        type="text"
        name="city"
        id="city"
        className="mb-2 mt-1 block outline-none w-full  border-1 border-slate-300 px-2 h-[50px] bg-transparent rounded-none shadow-none text-[16px] text-[#88787e]"
        placeholder="City"
        onChange={handleShippingUpdate}
        disabled={true}
        value={address.city}
      />
      <input
        type="text"
        name="post_code"
        id="postcode"
        className="mb-2 mt-1 block outline-none w-full  border-1 border-slate-300 px-2 h-[50px] bg-transparent rounded-none shadow-none text-[16px] text-[#88787e]"
        placeholder="Postcode"
        onChange={handleShippingUpdate}
        disabled={true}
        value={address.post_code}
      />
      <input
        type="text"
        name="country"
        id="country"
        className="mb-2 mt-1 block outline-none w-full  border-1 border-slate-300 px-2 h-[50px] bg-transparent rounded-none shadow-none text-[16px] text-[#88787e]"
        placeholder="Country"
        onChange={handleShippingUpdate}
        disabled={true}
        value={address.country}
      />
      <input
        type="text"
        name="state"
        id="state"
        className="mb-2 mt-1 block outline-none w-full  border-1 border-slate-300 px-2 h-[50px] bg-transparent rounded-none shadow-none text-[16px] text-[#88787e]"
        placeholder="State"
        onChange={handleShippingUpdate}
        disabled={true}
        value={address.state}
      />
    </div>
  );
};

export default DisplayShippingAddress;
