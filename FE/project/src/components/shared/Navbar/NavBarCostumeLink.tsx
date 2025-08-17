import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";
import { BASE_URL } from "@components/api/api";
import CostumesLinks, { CostumesLinksProps } from "./CostumesLinks";
import { Link } from "react-router-dom";

const NavBarCostumeLink: React.FC = () => {
  const [responseData, setResponseData] = useState<CostumesLinksProps[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [boxWidth, setBoxWidth] = useState(
    calculateBoxWidth(window.innerWidth)
  );

  useEffect(() => {
    getData();
    const handleResize = () => {
      setBoxWidth(calculateBoxWidth(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function calculateBoxWidth(screenWidth: number) {
    if (screenWidth >= 1536) return "800px";
    if (screenWidth >= 1280) return "700px";
    if (screenWidth >= 1024) return "600px";
    if (screenWidth >= 768) return "650px";
    return "98%";
  }

  const getData = async () => {
    try {
      setIsLoad(true);
      const response = await axios.get(`${BASE_URL}/api/v1/get_all_categories`);
      setResponseData(response.data.categories as CostumesLinksProps[]);
      setIsLoad(false);
    } catch (error) {
      console.log("get costume links data:", error);
      setIsLoad(false);
    }
  };  

  return (
    <li
      className="nav-item dropdown text-center border-t-2 border-gray-300 md:border-t-0 text-fit md:text-wrap"
      style={{ fontFamily: '"Plain Light", sans-serif' }}
    >
      <a
        className="nav-link dropdown-toggle text-black hover:text-black text-[12px]"
        href="#"
        id="navbarDarkDropdownMenuLink"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        jewellery
      </a>
      {!isLoad ? (
        <ul
          className="dropdown-menu z-100 h-auto costum-nav-item p-4 overflow-y-auto"
          aria-labelledby="navbarDarkDropdownMenuLink"
          style={{ width: boxWidth, maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}
        >
          <Link to={"/jewellery"}>
            <p className="text-[#201F41] hover:text-[#23527C] text-[18px] font-medium underline underline-offset-8 normal-case decoration-[3.1px]">
              Shop all jewellery
            </p>
          </Link>
          <div className="flex flex-col sm:flex-row w-full mt-3">
            <div className="flex flex-col space-y-0 col-sm-4">
              {responseData.length > 0 &&
          [responseData[0], responseData[2]].map((response, i) => (
            <CostumesLinks
              key={i}
              id={i}
              title={response.title}
              types={response.types}
            />
          ))}
            </div>
            <div className="flex flex-col space-y-0 col-sm-4">
              {responseData.length > 0 &&
          [responseData[1], responseData[3]].map((response, i) => (
            <CostumesLinks
              key={i}
              id={i + 2}
              title={response.title}
              types={response.types}
            />
          ))}
            </div>
            <div className="flex flex-col font-bold text-[14px] space-y-0 col-sm-4">
              <a
          href="/custom-order"
          className="link-design uppercase font-semibold pt-4 hover:text-[#23527C]"
              >
          Be spoke design
              </a>
              <a
          href="/buying-guide"
          className="link-design font-semibold capitalize pt-3 hover:text-[#23527C]"
              >
          RING SIZE GUIDE
              </a>
            </div>
          </div>
        </ul>
      ) : (
        <ul
          className="dropdown-menu z-100 costum-nav-item"
          aria-labelledby="navbarDarkDropdownMenuLink"
        >
          <li>
            <div className="relative">
              <Loading />
            </div>
          </li>
        </ul>
      )}
    </li>
  );
};

export default NavBarCostumeLink;
