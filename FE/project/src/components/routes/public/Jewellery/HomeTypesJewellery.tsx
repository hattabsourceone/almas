import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@components/api/api";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "@components/shared/Loading/Loading";
import FilterTypes from "./FilterTypes";
import NotFound from "@components/shared/NotFond.tsx/NotFound";
import Contact from "@components/shared/Contact/Contact";
import { SortByModel } from "@components/models/SortByModel";
import { MdNoPhotography } from "react-icons/md";
import { CostumesLinksProps } from "@components/shared/Navbar/CostumesLinks";

type TypeJewellery = {
  id: number;
  name: string;
  category: string;
  type: string;
  image_lines: TypeImages[];
  price: number;
};

type TypeImages = {
  id: number;
  images_urls: string[];
};

export interface SortByJw {
  name: string;
  value: number;
}

const HomeTypesJewellery: React.FC = () => {
  const { type_name } = useParams<{ type_name: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [data, setData] = useState<TypeJewellery[] | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [metal, setMetal] = useState<number>(1);
  const [price, setPrice] = useState<string>("high");

  const sortByPrice: SortByModel[] = [
    { name: "price (low>high)", value: "price_low_high" },
    { name: "price (high>low)", value: "price_high_low" },
  ];

  const sortByStyleRings: SortByJw[] = [
    { name: "Solitaire", value: 1 },
    { name: "Sidestone", value: 2 },
    { name: "Halo", value: 3 },
    { name: "Three - Stone", value: 4 },
    { name: "Diamond Band", value: 5 },
    { name: "all", value: 100 },
  ];

  const sortByStyleEarrings: SortByJw[] = [
    { name: "Hoops", value: 6 },
    { name: "Studs", value: 7 },
    { name: "Halo Studs", value: 8 },
    { name: "all", value: 100 },
  ];

  const sortByMetal: SortByJw[] = [
    { name: "18k White", value: 1 },
    { name: "18k Yellow", value: 2 },
    { name: "all", value: 100 },
  ];

  const sortByStyleBracel: SortByJw[] = [{ name: "All Bracelets", value: 9 }];

  const sortByStylePend: SortByJw[] = [{ name: "All Pendants", value: 10 }];

  const fetchData = async () => {
    try {
      if (!type_name || !metal) return;
      let response;
      setIsLoading(true);
      const contId = await getCategoryFromUrl();
      const body = {
        type: type_name,
        metal: metal,
        category_id: contId,
        sort: price,
      };
      response = await axios.post(
        `${BASE_URL}/api/v1/get_jewelleries_by_filter`,
        body
      );
      if (response.data.jewellery) {
        setData(response.data.jewellery);
        setError(null);
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log("fetch jewellery:", error);
      setError(error.message as string);
      setIsLoading(false);
    }
  };

  const getTypeFromUrl = (): string => {
    const segments = pathname.split("/");
    const jewelleryIndex = segments.indexOf("jewellery");
    if (jewelleryIndex !== -1 && segments.length > jewelleryIndex + 1) {
      let name = segments[jewelleryIndex + 2];
      return name;
    }
    return "";
  };

  const getCategoryFromUrl = async (): Promise<string> => {
    const segments = pathname.split("/");
    const jewelleryIndex = segments.indexOf("jewellery");
    if (jewelleryIndex !== -1 && segments.length > jewelleryIndex + 1) {
      let name = segments[jewelleryIndex + 1];
      const response = await axios.get(`${BASE_URL}/api/v1/get_all_categories`);
      const cat = response.data.categories.find(
        (category: any) => category.title === name
      );
      return cat.id;
    }
    return "";
  };

  const [sort, setSort] = useState<string>(getTypeFromUrl());

  const setListFromUrl = (): SortByJw[] => {
    const segments = pathname.split("/");
    const jewelleryIndex = segments.indexOf("jewellery");
    if (jewelleryIndex !== -1 && segments.length > jewelleryIndex + 1) {
      let name = segments[jewelleryIndex + 1];
      if (name === "Rings") {
        return sortByStyleRings;
      } else if (name === "Earring") {
        return sortByStyleEarrings;
      } else if (name === "Bracelets") {
        return sortByStyleBracel;
      } else {
        return sortByStylePend;
      }
    }
    return [];
  };

  const [sortList, setSortList] = useState<SortByJw[]>(setListFromUrl());

  useEffect(() => {
    fetchData();
    setSortList(setListFromUrl());
  }, [type_name]);

  useEffect(() => {
    if (pathname.includes("/jewellery/")) {
      const segments = pathname.split("/");
      const jewelleryIndex = segments.indexOf("jewellery");
      let name = segments[jewelleryIndex + 1];
      navigate(`/jewellery/${name}/${sort}`);
    }
  }, [sort]);

  useEffect(() => {
    fetchData();
  }, [metal, price]);

  useEffect(() => {
    getGlimpseJewellery();
  }, []);

  const getGlimpseJewellery = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}/api/v1/get_jewelleries_for_view`
      );
      if (response.data.jewellery) {
        setData(response.data.jewellery);
        setError(null);
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log("fetch jewellery:", error);
      setError(error.message as string);
      setIsLoading(false);
    }
  };

  function fetchImages(item: any) {
    item.image_lines = item.image_lines
      .filter((e: any) => e.images_urls.length > 0)
      .sort((a: any, b: any) => {
        const aHasWhite = a.image_type_name.toLowerCase().includes("white");
        const bHasWhite = b.image_type_name.toLowerCase().includes("white");
        if (aHasWhite && !bHasWhite) return -1;
        if (!aHasWhite && bHasWhite) return 1;
        return 0;
      });
    return item;
  }

  return (
    <div
      className="w-full flex flex-col"
      style={{ fontFamily: '"Plain Light", sans-serif' }}
    >
      <div className="w-full mx-auto flex flex-col py-2 lg:py-4 2xl:py-6">
        {isLoading ? (
          <div className="min-h-[500px] flex flex-col items-center justify-center">
            <Loading />
          </div>
        ) : error !== null || !data ? (
          <div className="min-h-[500px] flex flex-col items-center justify-center">
            <NotFound />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-0 gap-y-8 lg:gap-y-0 mx-auto w-[100%] md:w-[98%] lg:w-[97%] xl:w-[93%] 2xl:w-[82%]">
            {data &&
              data?.map((item) => (
                <Link
                  to={`/jewellery-details/${item.id}`}
                  key={item.id}
                  className="w-[90%] border p-1 mx-3"
                >
                  {fetchImages(item)?.image_lines[0]?.images_urls[0] ? (
                    <img
                      className="w-[591px] h-[422px] md:h-[245px] md:w-[343px] lg:h-[150px] lg:w-[211px] xl:h-[186px] xl:w-[260px] 2xl:h-[256px] 2xl:w-[358px] object-contain align-middle mx-auto my-2"
                      src={fetchImages(item)?.image_lines[0]?.images_urls[0]}
                      alt={item.name}
                      onMouseEnter={(e) =>
                        fetchImages(item)?.image_lines[0]?.images_urls[1]
                          ? (e.currentTarget.src =
                              fetchImages(item)?.image_lines[0]?.images_urls[1])
                          : null
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.src =
                          fetchImages(item)?.image_lines[0]?.images_urls[0])
                      }
                    />
                  ) : (
                    <MdNoPhotography className="w-[591px] h-[422px] md:h-[245px] md:w-[343px] lg:h-[150px] lg:w-[211px] xl:h-[186px] xl:w-[260px] 2xl:h-[256px] 2xl:w-[358px] object-contain align-middle mx-auto my-2" />
                  )}
                  <h4 className="text-[18px] xl:text-[21px] h-14 capitalize px-1 text-[#201f41] text-center font-bold">
                    {item.name}
                  </h4>
                  <div className="bg-[#201f41] text-white text-[14px] flex flex-col items-center justify-center font-semibold  mt-6 mx-2 lg:mx-3 h-14 md:mb-4 lg:mb-20 xl:mb-12 2xl:mb-20">
                    <p>
                      Price: from {item.price} ${" "}
                      <span className="text-[11px]">ex (VAT)</span>
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeTypesJewellery;
