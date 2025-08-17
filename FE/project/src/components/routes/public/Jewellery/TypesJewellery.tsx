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
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";

type TypeJewellery = {
  id: number;
  name: string;
  category: string;
  type: string;
  image_lines: TypeImages[];
  price: number;
  discount_price: number;
};

type TypeImages = {
  id: number;
  images_urls: string[];
  metal_value?: string;
};

type TypesJewelleryProps = {
  showFilter: boolean;
};

export interface SortByJw {
  displayName: string;
  name: string;
  value: number;
}

const TypesJewellery: React.FC<TypesJewelleryProps> = ({ showFilter }) => {
  const { category_name, type_name, design } = useParams<{
    category_name: string;
    type_name: string;
    design?: string;
  }>();

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [data, setData] = useState<TypeJewellery[] | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [metal, setMetal] = useState<number>(1);
  const [price, setPrice] = useState<string>("");

  const sortByPrice: SortByModel[] = [
    { name: "Default", value: "" },
    { name: "price (low>high)", value: "price_low_high" },
    { name: "price (high>low)", value: "price_high_low" },
  ];

  const sortByStyleRings: SortByJw[] = [
    { displayName: "Solitaire Rings", name: "Solitaire", value: 1 },
    { displayName: "Sidestone Rings", name: "SideStone", value: 2 },
    { displayName: "Halo Rings", name: "Halo", value: 3 },
    { displayName: "Three Stone Rings", name: "Three-Stone", value: 4 },
    { displayName: "Diamond Bands", name: "Diamond Bands", value: 5 },
    { displayName: "All", name: "all", value: 100 },
  ];

  const sortByStyleEarrings: SortByJw[] = [
    { displayName: "Diamonds Hoops", name: "Diamond Hoops", value: 6 },
    { displayName: "Diamonds Studs Earrings", name: "Diamond Studs", value: 7 },
    {
      displayName: "Halo Studs Earrings",
      name: "Diamond Halo Studs",
      value: 8,
    },
    { displayName: "All", name: "all", value: 100 },
  ];

  const sortByMetal: SortByJw[] = [
    { displayName: "White Gold 18k", name: "18k White", value: 1 },
    { displayName: "Yellow Gold 18k", name: "18k Yellow", value: 2 },
  ];

  const sortByStyleBracel: SortByJw[] = [
    { displayName: "Bezel Bracelet", name: "Bezel Bracelet", value: 10 },
    { displayName: "Tennis bracelet", name: "Tennis bracelet", value: 11 },
    {
      displayName: "Channel-Set Bangle",
      name: "Channel-Set Bangle",
      value: 12,
    },
    { displayName: "pave Bangle", name: "pave Bangle", value: 13 },
    { displayName: "All Bracelets", name: "all", value: 9 },
  ];

  const sortByStylePend: SortByJw[] = [
    // { displayName:"" , name: "Halo", value: 11 },
    { displayName: "Halo", name: "Halo Pendant", value: 11 },
    { displayName: "Solitare", name: "Solitare Pendant", value: 12 },
    { displayName: "Muse", name: "Muse Pendant", value: 13 },
    { displayName: "Bezel", name: "Cascata Pendant", value: 14 },
    { displayName: "All Pendants", name: "all", value: 10 },
  ];

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
        is_design_available: design ? true : false,
      };
      console.log("fetch data body ------------", body);
      response = await axios.post(
        `${BASE_URL}/api/v1/get_jewelleries_by_filter`,
        body
      );
      if (response.data.jewellery) {
        setData(response.data.jewellery);
        console.log(response.data.jewellery);
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
        return design ? sortByStyleRings.filter((e) => !e.name.toLocaleLowerCase().includes("band")) : sortByStyleRings;
      } else if (name === "Earrings") {
        return design ? sortByStyleEarrings.filter((e) => !e.name.toLocaleLowerCase().includes("hoop")) : sortByStyleEarrings;
      } else if (name === "Bracelet") {
        return sortByStyleBracel;
      } else {
        return sortByStylePend;
      }
    }
    return [];
  };

  const [sortList, setSortList] = useState<SortByJw[]>(setListFromUrl());

  useEffect(() => {
    if (pathname.includes("/jewellery/")) {
      const segments = pathname.split("/");
      const jewelleryIndex = segments.indexOf("jewellery");
      let name = segments[jewelleryIndex + 1];
      navigate(`/jewellery/${name}/${sort}${design ? '/design' : ''}`);
      // document.title = `${name} `;
      // console.log(name,"");
    }
  }, [sort]);

  useEffect(() => {
    fetchData();
  }, [metal, price]);

  useEffect(() => {
    if (!showFilter) {
      getGlimpseJewellery();
    }
  }, []);

  useEffect(() => {
    document.title = `${type_name}`;

    fetchData();
    setSortList(setListFromUrl());
  }, [category_name, type_name]);

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

  function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    }).format(price);
  }

  function getEarringSubText(type: string) {
    if (!type_name) {
      return "";
    }
    const name = type.toLocaleLowerCase();
    if (name.includes("hoop")) {
      return "From Double row of round brilliant diamonds in a prong setting hoops with comfortable hinged backs that is perfect for every occasion.";
    } else if (name.includes("halo")) {
      return "From Standout with these modern halo stud earrings featuring two center round brilliant diamonds for extra shimmer and brilliance.";
    } else {
      return "From Accentuate your stud's diamond with a 4 wire-claw setting that adds a sense of dreamy romance and classic elegance to your earring collection.";
    }
  }

  console.log("Types jewellery ----------------------", data);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full mt-2 md:mt-0 -ml-6 md:-ml-10 lg:-ml-10 xl:-ml-8 2xl:ml-0 2xl:mt-0">
        <Breadcrumb
          menu={[
            {
              title: category_name || "",
              link: `/jewellery/${category_name}`,
              level: 1,
            },
            {
              title: type_name || "",
              link: `/jewellery/${category_name}/${type_name}`,
              level: 1,
            },
          ]}
        />
      </div>
      <div className="w-[92%] md:w-[96%] lg:w-[93%] xl:w-[90%] 2xl:w-[80%] mx-auto flex flex-col py-3">
        {/* {category_name?.toLocaleLowerCase().includes("earring") && (
          <>
            <p className="text-[18px] text-[#4e4e4ed6] font-medium">
              {getEarringSubText(type_name || "")}
            </p>
            <div className="border-b-[1px] border-[#eee] mb-[20px] mt-[20px]"></div>
          </>
        )} */}
        {showFilter ? (
          <FilterTypes
            setSort={setSort}
            setMetal={setMetal}
            setPrice={setPrice}
            sortByStyle={sortList}
            sortByPrice={sortByPrice}
            sortByMetal={sortByMetal}
            defaultSortValue={
              sortList.find((s) => s.name === type_name)?.value!
            }
          />
        ) : null}
        {isLoading ? (
          <div className="min-h-[500px] flex flex-col items-center justify-center">
            <Loading />
          </div>
        ) : error !== null || !data ? (
          <div className="min-h-[500px] flex flex-col items-center justify-center">
            <NotFound />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 lg:grid-cols-4 w-full md:gap-x-6 lg:gap-x-8 -mt-2">
            {/* <div className="grid grid-cols-4 gap-3"> */}
            {data?.map((item) => (
              <Link
                to={`/jewellery-details/${item.id}`}
                key={item.id}
                className="card-extended w-full"
              >
                <div className="flex flex-col items-center justify-center overflow-x-hidden">
                  <div className="w-[99%] h-[591px] md:w-[99%] md:h-[343px] lg:w-[99%] lg:h-[210px] xl:w-[99%] xl:h-[260px] 2xl:w-[99%] 2xl:h-[358px] flex flex-col items-center justify-center">
                    {item.image_lines
                      ?.filter(
                        (e) =>
                          e.metal_value?.toLocaleLowerCase().trim() ===
                          sortByMetal
                            ?.find((e) => e.value === metal)
                            ?.name?.toLocaleLowerCase()
                      )
                      .find((e) => e.images_urls.length != 0)
                      ?.images_urls[0] ? (
                      <img
                        className="max-w-full max-h-full object-contain px-2 lg:px-1"
                        src={
                          item.image_lines
                            ?.filter(
                              (e) =>
                                e.metal_value?.toLocaleLowerCase().trim() ===
                                sortByMetal
                                  ?.find((e) => e.value === metal)
                                  ?.name?.toLocaleLowerCase()
                            )
                            .find((e) => e.images_urls.length != 0)
                            ?.images_urls[0]
                        }
                        alt={item.name}
                        onMouseEnter={(e) =>
                          item.image_lines
                            ?.filter(
                              (e) =>
                                e.metal_value?.toLocaleLowerCase().trim() ===
                                sortByMetal
                                  ?.find((e) => e.value === metal)
                                  ?.name?.toLocaleLowerCase()
                            )
                            .find((e) => e.images_urls.length != 0)
                            ?.images_urls[1]
                            ? (e.currentTarget.src = item.image_lines
                                ?.filter(
                                  (e) =>
                                    e.metal_value?.toLocaleLowerCase().trim() ===
                                    sortByMetal
                                      ?.find((e) => e.value === metal)
                                      ?.name?.toLocaleLowerCase()
                                )
                                .find(
                                  (e) => e.images_urls.length != 0
                                )?.images_urls[1]!)
                            : null
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.src = item.image_lines
                            ?.filter(
                              (e) =>
                                e.metal_value?.toLocaleLowerCase().trim() ===
                                sortByMetal
                                  ?.find((e) => e.value === metal)
                                  ?.name?.toLocaleLowerCase()
                            )
                            .find(
                              (e) => e.images_urls.length != 0
                            )?.images_urls[0]!)
                        }
                      />
                    ) : (
                      <MdNoPhotography className="max-w-full max-h-full object-contain" />
                    )}
                  </div>
                </div>
                <div className="h-[80px] py-2 my-2">
                  <p className="text-[21px] text-[#201f41] capitalize text-center font-medium leading-none">
                    {item.name}
                  </p>
                </div>
                <div className="cursor-pointer flex flex-rowitems-center justify-center text-[14px] font-semibold w-[98%] md:w-[92%] mb-2 bg-[#201f41] py-3 text-white">
                  <p>
                    {item.discount_price && item.discount_price > 0 ? (
                      <div>
                        <p
                          className="text-center"
                          style={{ fontFamily: '"Open Sans"' }}
                        >
                          Price: from {formatPrice(item.discount_price)}
                          <span className="line-through text-[#999] ml-2">
                            {formatPrice(item.price)}
                          </span>
                          <span className="text-white text-[11px] ml-2">
                            ex (VAT)
                          </span>
                          <br />
                          {/* <span
                            className="text-[12px] text-[#999] !font-bold block mt-1"
                            style={{ fontWeight: 600 }}
                          >
                            Ex Tax: {formatPrice(item.discount_price)}
                          </span> */}
                        </p>
                      </div>
                    ) : (
                      <p>
                        Price: from {formatPrice(item.price)}
                        <span className="text-white text-[11px] pl-1">
                          ex (VAT)
                        </span>
                      </p>
                    )}
                  </p>
                </div>
                {/* {item.discount_price === 0 && (
                  <div className="flex items-end justify-start w-[98%] md:w-[92%] pt-1">
                    <p className="text-start text-[12px] text-[#999]">
                      Ex Tax: {formatPrice(item.price)}
                    </p>
                  </div>
                )} */}
              </Link>
            ))}
          </div>
        )}
      </div>
      {showFilter ? <Contact /> : <></>}
    </div>
  );
};

export default TypesJewellery;
