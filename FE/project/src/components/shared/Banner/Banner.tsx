import React from "react";

type Props = {
  title: string;
  img: string;
};

const Banner: React.FC<Props> = ({ title, img }) => {
  return (
    <div
      className="flex items-center justify-center h-[200px] sm:h-[226px] md:h-[272px] lg:h-[365px] xl:h-[457px] 2xl:h-[689px] md:justify-start md:px-16 lg:px-16 xl:-mt-12 2xl:px-64 2xl:-mt-12"
      style={{
        background: `url(${img})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* <img className="w-full" src={img} alt="search" /> */}
      <h1 className="text-white uppercase font-medium text-[40px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[65px]">
        {title}
      </h1>
    </div>
  );
};

export default Banner;
