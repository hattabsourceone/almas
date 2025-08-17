import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import bg from "@assets/LandingPage/Collections/logo-big.png";
import circle from "@assets/LandingPage/Collections/circle.png";
import { BASE_URL } from "@components/api/api";
import Loading from "@components/shared/Loading/Loading";
import CollectionItem from "./CollectionItem";
import NotFound from "@components/shared/NotFond.tsx/NotFound";
import shapeImages from "@assets/default/default_img";
import { MdNoPhotography } from "react-icons/md";

export type Attribut = {
  value_name: string;
};
export type Diamond = {
  clarity: Attribut;
  color: Attribut;
  cut: Attribut;
  diamond_id: number;
  diamond_size: number;
  fluor_intensity: Attribut;
  id: number;
  polish: Attribut;
  shape: Attribut;
  symmetry: Attribut;
  image_file: string;
  total_sales_price: number;
};
const Collections: React.FC = () => {
  const [data, setData] = useState<Diamond[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imagHasError, setimagHasError] = useState<boolean>(false);
  const [imag2HasError, setimag2HasError] = useState<boolean>(false);
  const [imag3HasError, setimag3HasError] = useState<boolean>(false);
  const [imag4HasError, setimag4HasError] = useState<boolean>(false);
  const navigate = useNavigate();
  const navigateTo = (id: number): void => {
    navigate(`/diamond-details/${id}`);
  };

  useEffect(() => {
    getData();
  }, []);

  const ShapeImage = (shape: any) => {
    const key = !shape["shape"]
      ? "round"
      : shape["shape"].includes("Cushion")
      ? "cushion"
      : shape["shape"].toLowerCase();
    const imageSrc = shapeImages[key];
    if (imageSrc) {
      return (
        <img
          className="collection-image2 w-100 position-absolute top-0"
          src={imageSrc}
          alt="diamond"
        />
      );
    } else {
      return <MdNoPhotography className="h-64 w-64" />;
    }
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}/api/v1/get_glimpse_diamond`
      );
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("get collections data:", error);
    }
  };
  const handleError = (id: number) => {
    if (id === 1) {
      setimagHasError(true);
    } else if (id === 2) {
      setimag2HasError(true);
    } else if (id === 3) {
      setimag3HasError(true);
    } else {
      setimag4HasError(true);
    }
  };

  return isLoading ? (
    <Loading />
  ) : error !== "" ? (
    <NotFound />
  ) : (
    <div
      style={{ fontFamily: '"Plain Light", sans-serif' }}
      className="w-full flex flex-col relative bg-white mt-10 2xl:mt-0 mx-auto mb-20 overflow-hidden"
    >
      <img
        src={bg}
        className="object-cover w-[100%] h-[136vh] sm:h-[172vh] sm:w-[100%]   md:w-[110%]  xl:h-[85%]  2xl:h-[51vh] top-0 md:!top-[15%]  lg:!top-[-16%] 2xl:!top-[19%] 2xl:!h-auto  absolute  xl:!top-[0%] z-1 lg:mt-56 xl:mt-56 2xl:mt-0 overflow-hidden"
      />
      <div className="relative z-1 w-[90%] xl:w-[90%] 2xl:w-[80%] mx-auto pt-36">
        <div className="relative flex flex-col items-start justify-center w-[98%] sm:w-[60%] 2xl:w-[40%]">
          <img
            src={circle}
            className="hidden sm:block w-[60%] absolute z-0 bottom-0"
          />
          <h1 className="text-[#201F41] relative z-10 font-medium text-center sm:text-start text-4xl xl:text-[60px] pb-10 leading-none pt-2 w-[95%] sm:w-[80%]">
            A GLIMPSE OF OUR COLLECTION
          </h1>
          <div className="flex flex-col relative z-10 items-start">
            <p className="text-base text-center sm:text-start font-semibold italic text-[#88787E] pb-1 sm:pb-3">
              whatever your taste is, Almas-online always has something for you.
            </p>
            <p className="text-base text-center sm:text-start font-semibold italic text-[#88787E] pb-20">
              Each stone in our collection creates a special mood.
            </p>
          </div>
        </div>
        <div className="hidden relative sm:flex flex-row justify-center space-x-10 lg:space-x-8 2xl:space-x-60 mx-auto pl-10 lg:pl-24 2xl:pl-4 xl:mt-20 2xl:mt-4">
          <div
            className="relative z-10"
            data-aos="zoom-in"
            data-aos-duration="1000"
            onClick={() => navigateTo(data[0].id)}
          >
            <div className="border-dashs w-[130px] h-[130px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] xl:w-[300px] xl:h-[300px] rounded-full">
              <div className="collection-image-container position-relative absolute left-6 md:left-14">
                <CollectionItem data={data[0]} />
                {data[0]?.image_file && !imagHasError ? (
                  <img
                    className="collection-image2 position-absolute top-0"
                    src={data[0]?.image_file}
                    alt="collection-diamond-image1"
                    onError={() => handleError(1)}
                  />
                ) : (
                  <ShapeImage
                    shape={data[0]?.shape ? data[0]?.shape.value_name : ""}
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className="pl-32 md:pl-52 2xl:pl-32 relative"
            data-aos="zoom-in"
            data-aos-duration="1000"
            onClick={() => navigateTo(data[1].id)}
          >
            <div className="border-dashs w-[180px] h-[180px] md:w-[270px] md:h-[270px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] rounded-full">
              <div className="collection-image-container-x position-relative absolute right-20 md:right-10 -mt-20 md:-mt-16">
                <CollectionItem data={data[1]} />
                {data[1]?.image_file && !imag2HasError ? (
                  <img
                    className="collection-image2 position-absolute top-0"
                    src={data[1]?.image_file}
                    alt="collection-diamond-image2"
                    onError={() => handleError(2)}
                  />
                ) : (
                  <ShapeImage
                    shape={data[1]?.shape ? data[1]?.shape.value_name : ""}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex flex-row pl-10 2xl:pl-20 justify-start space-x-10 md:space-x-40 lg:space-x-32 xl:space-x-40 2xl:space-x-80 mt-32 lg:mt-20 mx-auto">
          <div
            className="relative z-10"
            data-aos="zoom-in"
            data-aos-duration="1000"
            onClick={() => navigateTo(data[2].id)}
          >
            <div className="border-dashs w-[230px] h-[230px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] xl:w-[400px] xl:h-[400px] rounded-full">
              <div className="collection-image-container-x position-relative absolute left-8 md:left-14 -mt-10 md:-mt-28">
                <CollectionItem data={data[2]} />
                {data[2]?.image_file && !imag3HasError ? (
                  <img
                    className="collection-image2 position-absolute top-0"
                    src={data[2]?.image_file}
                    alt="collection-diamond-image3"
                    onError={() => handleError(3)}
                  />
                ) : (
                  <ShapeImage
                    shape={data[2]?.shape ? data[2]?.shape.value_name : ""}
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className="relative"
            data-aos="zoom-in"
            data-aos-duration="1000"
            onClick={() => navigateTo(data[3].id)}
          >
            <div className="border-dashs w-[160px] h-[160px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] xl:w-[400px] xl:h-[400px] rounded-full">
              <div className="collection-image-container position-relative absolute left-4 md:left-10 -mt-10">
                <CollectionItem data={data[3]} />

                {data[3]?.image_file && !imag4HasError ? (
                  <img
                    className="collection-image2 position-absolute top-0"
                    src={data[3]?.image_file}
                    alt="collection-diamond-image4"
                    onError={() => handleError(4)}
                  />
                ) : (
                  <ShapeImage
                    shape={data[3]?.shape ? data[3]?.shape.value_name : ""}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className="relative z-10 block sm:hidden mx-auto w-full"
          data-aos="zoom-in"
          data-aos-duration="1000"
          onClick={() => navigateTo(data[0].id)}
        >
          <div className="collection-image-container-y position-relative absolute mx-auto">
            <CollectionItem data={data[0]} />
            {data[0]?.image_file && !imagHasError ? (
              <img
                className="collection-image2 position-absolute"
                src={data[0]?.image_file}
                alt="collection-diamond-image1"
                onError={() => handleError(1)}
              />
            ) : (
              <ShapeImage
                shape={data[0]?.shape ? data[0]?.shape.value_name : ""}
              />
            )}
          </div>
        </div>
        <div
          className="relative z-10 block sm:hidden mx-auto w-full mt-8"
          data-aos="zoom-in"
          data-aos-duration="1000"
          onClick={() => navigateTo(data[1].id)}
        >
          <div className="collection-image-container-y position-relative absolute mx-auto">
            <CollectionItem data={data[1]} />
            {data[1]?.image_file && !imag2HasError ? (
              <img
                className="collection-image2 position-absolute"
                src={data[1]?.image_file}
                alt="collection-diamond-image1"
                onError={() => handleError(2)}
              />
            ) : (
              <ShapeImage
                shape={data[1]?.shape ? data[1]?.shape.value_name : ""}
              />
            )}
          </div>
        </div>
        <div
          className="relative z-10 block sm:hidden mx-auto w-full mt-8"
          data-aos="zoom-in"
          data-aos-duration="1000"
          onClick={() => navigateTo(data[2].id)}
        >
          <div className="collection-image-container-y position-relative absolute mx-auto">
            <CollectionItem data={data[2]} />
            {data[2]?.image_file && !imag3HasError ? (
              <img
                className="collection-image2 position-absolute"
                src={data[2]?.image_file}
                alt="collection-diamond-image1"
                onError={() => handleError(3)}
              />
            ) : (
              <ShapeImage
                shape={data[2]?.shape ? data[2]?.shape.value_name : ""}
              />
            )}
          </div>
        </div>
        <div
          className="relative z-10 block sm:hidden mx-auto w-full mt-8"
          data-aos="zoom-in"
          data-aos-duration="1000"
          onClick={() => navigateTo(data[3].id)}
        >
          <div className="collection-image-container-y position-relative absolute mx-auto">
            <CollectionItem data={data[3]} />
            {data[3]?.image_file && !imag4HasError ? (
              <img
                className="collection-image2 position-absolute"
                src={data[3]?.image_file}
                alt="collection-diamond-image1"
                onError={() => handleError(4)}
              />
            ) : (
              <ShapeImage
                shape={data[3]?.shape ? data[3]?.shape.value_name : ""}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
