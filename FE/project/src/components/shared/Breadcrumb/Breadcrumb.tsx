import React from "react";
import { Link } from "react-router-dom";

export type Props = {
  menu: items[];
};

type items = {
  title: string;
  link: string;
  level: number;
};

const Breadcrumb: React.FC<Props> = ({ menu }) => {
  return (
    <div className="flex flex-row items-center flex-wrap space-x-2 space-y-0 pl-[7.5%] 2xl:pl-[10%]">
      <Link className="no-style text-base " to={"/"}>
        Home
      </Link>
      {menu.map((item) => (
        <div key={item.title} className="px-1 breadcrumb">
          <Link className="no-style text-base" to={item.link}>
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;