import React, { useEffect } from "react";
import ShapeBuyingGuide from "./ShapeBuyingGuide";
import The4 from "./The4";
import CertificationBuying from "./CertificationBuying";
import OriginsDiamonds from "./OriginsDiamonds";
import Contact from "@components/shared/Contact/Contact";
import Glossary from "./Glossary";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import Banner from "@components/shared/Banner/Banner";
import BannerImg from "@assets/CustomOrder/diamond-guide-banner.jpg";
import thecsBg from "@assets/BuyingGuide/thecs/thecs-bg.jpg";

const BuyingGuide: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;
  const { hash } = location;

  useEffect(() => {
    document.title = " Buying Guide";
    if (hash) {
      new Promise((f) => setTimeout(f, 1000)).then(() => {
        const [section, key] = hash.substring(1).split("?");
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  }, [hash]);

  useEffect(() => {
    if (hash) {
      const [section, key] = hash.substring(1).split("?");
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);
  return (
    <div className="w-full flex flex-col">
      <div
        className="flex items-center justify-center h-[200px] sm:h-[216px] md:h-[260px] lg:h-[349px] xl:h-[438px] 2xl:h-[660px] md:justify-start md:px-16 lg:px-16 xl:-mt-12 2xl:px-64 2xl:-mt-12"
        style={{
          background: `url(${BannerImg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-white uppercase  text-[20px] font-semibold sm:text-[40px] md:text-[50px] md:font-medium lg:text-[60px] xl:text-[70px] 2xl:text-[75px]">
          Diamonds Buying Guide
        </h1>
      </div>
      <div className="w-full md:ml-[-3%] 2xl:ml-1 mt-[20px]">
        <Breadcrumb
          menu={[
            {
              title: "Diamonds Buying Guide",
              link: pathname,
              level: 1,
            },
          ]}
        />
      </div>
      <div
        id="shape"
        className="mx-auto mt-16 2xl:mt-2 w-[96%] md:w-[95%] lg:w-[93%] xl:w-[90%] 2xl:w-[81%] bg-[#ffffff]"
      >
        <ShapeBuyingGuide />
      </div>
      <div
        id="4cs"
        className="mx-auto bg-cover bg-center w-full sm:py-[30px] md:py-[100px]"
        style={{
          backgroundImage: `url(${thecsBg})`,
        }}
      >
        <The4 />
      </div>
      <div
        id="certification"
        className="w-full mx-auto bg-[#f8f8f8] py-8"
      >
        <CertificationBuying />
      </div>
      <div id="glossary" className="pt-[150px] bg-[#ffffff]">
        <Glossary />
      </div>
      <div id="origins" className=" bg-[#f8f8f8]">
        <div className="w-[98%] pt-[150px] lg:w-[96%] xl:w-[92%] 2xl:w-[80%] mx-auto">
          <OriginsDiamonds />
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default BuyingGuide;
