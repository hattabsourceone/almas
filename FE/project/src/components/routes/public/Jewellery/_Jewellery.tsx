import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "@components/shared/Loading/Loading";
import { BASE_URL } from "@components/api/api";
import { Base64 } from "js-base64";
import Contact from "@components/shared/Contact/Contact";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Banner from "@components/shared/Banner/Banner";
import BannerImg from "@assets/CustomOrder/banner.png";

type Product = {
  id: string;
  title: string;
  category_image: string;
};


const Jewellery: React.FC = () => {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [productsList, setProductsList] = useState<Product[]>([]);
  // const [mytitle, setMytitle] = useState<string>("Diamond Jewellery");

  useEffect(() => {
    getData();
    document.title = "Diamond Jewellery";

  }, []);
  const navigate = useNavigate();

  const handleClick = (title: string) => {
    // setMytitle(title);
    // console.log(mytitle)
    navigate(`/jewellery/${title}`);


  };

  const getData = async () => {
    setIsLoad(true);

    await axios
      .get(`${BASE_URL}/api/v1/shop_all_jewellery`)
      .then((res) => {
        setProductsList(res.data.categories as Array<Product>);
      })
      .catch((err) => {
        console.warn(err);
      });

    setIsLoad(false);
  };
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <Banner title={"Diamond Jewellery"} img={BannerImg} />
      <div className="mt-4">
        <Breadcrumb
          menu={[
            {
              title: "Diamond Jewellery",
              link: pathname,
              level: 1,
            },
          ]}
        />
      </div>
      <div className="w-[97%] md:w-[95%] lg:w-[95%] xl:w-[92%] 2xl:w-[80%] mx-auto flex flex-col pt-28">
        <h6 className="text-center text-[18px] font-medium text-[#53556b]">
          Explore our collection of diamond earrings for every occasion. From
          classic Chic Studs to high-quality statement hoops that will elevate
          your look
        </h6>
        <h1 className="text-start text-[24px] font-semibold text-[#444] mt-14">
          Shop Jewellery By Category
        </h1>
        <div className="line-top-bottom-new pt-8 opacity-20"></div>
        {isLoad ? (
          <div className="relative col-12">
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-4 md:gap-y-0 md:grid-cols-4 gap-x-4 mt-6 cursor-pointer px-3 md:px-2">
            {productsList.map((product) => (
              <div className="flex flex-col space-y-4">
                <div
                  onClick={() => {
                    handleClick(product?.title);
                  }}
                  className="p-4 border "
                  key={product?.id}
                >
                  <img
                    className="w-100 "
                    src={product?.category_image}
                    alt=""
                  />
                </div>
                <h4 className="text-[24px] font-bold text-[#444] text-start">
                  {product?.title}
                </h4>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-20">
        <Contact />
      </div>
    </>
  );
};

export default Jewellery;
