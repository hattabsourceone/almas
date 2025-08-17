import { BASE_URL } from "@components/api/api";
import Banner from "@components/shared/Banner/Banner";
import NotFound from "@components/shared/NotFond.tsx/NotFound";
import Loading from "@shared/Loading/Loading";
import axios from "axios";
import { Base64 } from "js-base64";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import banner from "@assets/AboutUs/banner.jpg";
import bannerEar from "@assets/CustomOrder/banner-ear.png";
import bannerPend from "@assets/CustomOrder/banner-pend.png";
import bannerBracelt from "@assets/CustomOrder/banner-brac.png";
import DesRing from "@assets/Jewellery/design-ring.png";
import DesEar from "@assets/Jewellery/des-ear.png";
import DesPend from "@assets/Jewellery/des-pend.png";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";

type TypesJewelleryProps = {
  id: number;
  type_name: string;
  type_image_large: string;
};

type CategoriesJewelleryProps = {
  id: number;
  categorie_name: string;
  category_desc: string;
  types: TypesJewelleryProps[];
};

const CategoriesJewellery: React.FC = () => {
  const { categorie_name } = useParams<{ categorie_name: string }>();
  const [data, setData] = useState<CategoriesJewelleryProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/api/v1/get_types_by_category/`,
          {
            category_name: categorie_name,
          }
        );
        setData(response.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error?.message as string);
      }
      setIsLoading(false);
      document.title = `${categorie_name}`;
    };

    fetchData();
  }, [categorie_name]);

  return (
    <div className="w-full flex flex-col">
      <Banner
        title={`Diamond ${categorie_name}`}
        img={
          categorie_name === "Earring"
            ? bannerEar
            : categorie_name === "Pendants"
            ? bannerPend
            : categorie_name === "Rings"
            ? banner
            : bannerBracelt
        }
      />
      <div className="mt-4"></div>
      <Breadcrumb
        menu={[
          {
            title: `${categorie_name}`,
            link: "#",
            level: 1,
          },
        ]}
      />
      {isLoading ? (
        <Loading />
      ) : error || !data ? (
        <NotFound />
      ) : (
        <div
          className="flex flex-col w-[92%] md:w-[92%] lg:w-[91%] xl:w-[88%] 2xl:w-[80%] mx-auto items-start"
          style={{ fontFamily: "Montserrat" }}
        >
          <h6
            className="mb-3 text-center pt-10 text-[28px] text-[#666] font-normal leading-relaxed"
            style={{ fontFamily: "Montserrat" }}
          >
            Explore our Collection of diamond {categorie_name} for every
            occasion. From classic chic studs to high-quality statement hoops
            that will elevate your look.
          </h6>
          <Link
            to={`/jewellery/${categorie_name}/all`}
            className="bg-[#201F41] mx-auto text-white text-[20px] font-medium py-2 px-3"
            style={{ fontFamily: '"Plain Light", sans-serif' }}
          >
            Shop All {categorie_name}
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 xl:gap-x-7 gap-y-2 my-2 pb-3">
            {data.types.map((item: TypesJewelleryProps) => (
              <div className="flex flex-col">
                <Link
                  to={`/jewellery/${categorie_name}/${item.type_name}`}
                  key={item.id}
                  className="card no-style"
                >
                  <img className="w-100" src={item.type_image_large} alt="" />
                </Link>
                <h4 className="text-[24px] font-bold text-[#444] text-start">
                  {item.type_name}
                </h4>
              </div>
            ))}
          </div>
          {categorie_name != "Bracelets" && (
            <>
              <p className="text-start text-[#201f41] underline text-[18px] font-medium underline-offset-4 decoration-[3.1px]">
                Design Your Own{" "}
                {categorie_name?.endsWith("s")
                  ? categorie_name.slice(0, -1)
                  : categorie_name}
              </p>
              <p className="text-[16px] w-[95%] lg:w-[50%] xl:w-[33%] text-[#666] leading-loose pt-3">
                Choose your favourite setting and diamond pair to create your
                perfect and personlized diamond earrings
              </p>
              <img
                className="md:w-[220px] lg:w-[293px] xl:w-[360px] h-auto 2xl:w-auto"
                src={
                  categorie_name === "Earring"
                    ? DesEar
                    : categorie_name === "Pendants"
                    ? DesPend
                    : DesRing
                }
                alt=""
              />
              <Link
                to={`/jewellery/${categorie_name}/all`}
                className="bg-[#201F41] text-white text-[16px] rounded-md font-normal py-2 flex items-center justify-center w-[300px]"
                style={{ fontFamily: '"Plain Light", sans-serif' }}
              >
                <p>Start Designing</p>
              </Link>
              <div className="border-b-[0.5px] border-slate-600 opacity-10 w-full pt-8 mb-10"></div>
            </>
          )}
        </div>
      )}
      <Contact />
    </div>
  );
};

export default CategoriesJewellery;
