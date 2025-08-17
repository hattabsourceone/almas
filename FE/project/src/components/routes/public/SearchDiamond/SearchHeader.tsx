import React from "react";
import image from "@assets/SearchDiamond/header.jpg";
import headerSp from "@assets/SearchDiamond/header_sp.jpg";

const SearchHeader: React.FC = () => {
  const { pathname } = location;
  return (
    <div className="w-full">
      {pathname.toString() !== "/search-inventory/compare-products" && (
        <div
          className="flex items-center justify-center h-[200px] sm:h-[216px] md:h-[260px] lg:h-[349px] xl:h-[438px] 2xl:h-[660px] md:justify-start md:px-16 lg:px-16 xl:-mt-12 2xl:px-64 2xl:-mt-12"
          style={{
            background: `url(${
              pathname.toString() === "/search-inventory/spicial-offer"
                ? headerSp
                : image
            })`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-white uppercase font-medium text-[40px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[65px]">
            Diamonds
          </h1>
        </div>
      )}
    </div>
  );
};

export default SearchHeader;
