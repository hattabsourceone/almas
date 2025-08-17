import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import React, { useEffect, useState } from "react";
import withAuth from "@components/shared/withAuth";

const ThankYouPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full justify-center">
      <Breadcrumb
        menu={[
          {
            title: "Order complete",
            link: "/thank-you",
            level: 1,
          },
        ]}
      />
      <div className="flex flex-col items-center justify-center w-full pb-20">
        <p className="text-4xl font-semibold pt-20 pb-4">
          Thank you for your purchase!
        </p>
        <p className="text-base font-semibold">
          Your order has been completed.
        </p>
      </div>
      <div className="h-10"></div>
      <Contact />
    </div>
  );
};

export default withAuth(ThankYouPage);
