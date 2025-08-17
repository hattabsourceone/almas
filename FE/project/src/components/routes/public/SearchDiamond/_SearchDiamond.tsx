import Loading from "@components/shared/Loading/Loading";
import React, { useEffect, useState, Suspense, lazy } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchHeader = lazy(() => import("./SearchHeader"));
const Filter = lazy(() => import("./Filter"));
const Breadcrumb = lazy(
  () => import("@components/shared/Breadcrumb/Breadcrumb")
);

const SearchDiamond: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cut, setCut] = useState<number | null>(null);
  const [color, setColor] = useState<number | null>(null);
  const [clarity, setClarity] = useState<number | null>(null);
  const cutTypesList: string[] = ["Excellent", "Very Good", "Good"];
  const colors = ["K", "J", "I", "H", "G", "F", "E", "D"];
  const clarities = ["SI2", "SI1", "VS2", "VS1", "VVS2", "VVS1", "IF", "FL"];

  useEffect(() => {
    document.title = "Diamonds";
    if (location.pathname === "/search-inventory") {
      navigate("/search-inventory/all-diamond", { replace: true });
    }
    getSearch(location.search);
  }, [location.pathname, navigate]);

  const { pathname } = location;

  const getSearch = (search: string) => {
    let searchInfo: string[] = search.slice(1).split("=");

    if (searchInfo[0] == "cut") {
      setCut(
        cutTypesList.length -
          cutTypesList.indexOf(searchInfo[1].toString().replace("%20", " ")) -
          1
      );
    } else if (searchInfo[0] == "color") {
      setColor(colors.indexOf(searchInfo[1].toString()));
    } else if (searchInfo[0] == "clarity") {
      let clar = searchInfo[1].split("-");
      setClarity(clarities.indexOf(clar[1].toString()) - 1);
    }
  };

  return (
    <div>
      <Suspense
        fallback={
          <div className="container h-screen">
            <Loading />
          </div>
        }
      >
        <SearchHeader />
        <div className="w-[60%] sm:w-[40%] md:w-[40%] lg:w-[40%] xl:w-[70%] 2xl:w-full pt-3">
          {pathname.toString() === "/search-inventory/all-diamond" ? (
            <Breadcrumb
              menu={[
                {
                  title: "Search Inventory",
                  link: "/search-inventory/all-diamond",
                  level: 1,
                },
              ]}
            />
          ) : pathname.toString() === "/search-inventory/spicial-offer" ? (
            <Breadcrumb
              menu={[
                {
                  title: "Special Offer",
                  link: "/search-inventory/spicial-offer",
                  level: 1,
                },
              ]}
            />
          ) : (
            <div className="mt-32">
              <Breadcrumb
                menu={[
                  {
                    title: "Product Comparison",
                    link: "/search-inventory/compare-products",
                    level: 1,
                  },
                ]}
              />
            </div>
          )}
        </div>
        <Filter cut={cut} color={color} clarity={clarity} />
      </Suspense>
    </div>
  );
};

export default SearchDiamond;
