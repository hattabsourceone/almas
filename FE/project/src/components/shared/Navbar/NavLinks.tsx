import React from "react";
import { Link } from "react-router-dom";

export type submenu = {
  title: string;
  link?: string;
};
export type item = {
  rootmenu: string;
  submenu?: submenu[];
  link?: string;
};
const NavLinks: React.FC<item> = ({ rootmenu, submenu, link }) => {
  return (
    <li className="nav-item dropdown text-fit inline-block text-center border-t-2 border-gray-300 md:border-t-0">
      <Link
        to={link || "#"}
        className="nav-link dropdown-toggle text-black text-[12px] hover:text-black"
        id="navbarDarkDropdownMenuLink"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {rootmenu}
      </Link>
      <ul className="dropdown-menu min-w-40 text-nowrap py-0  z-100">
        {submenu?.map((i, index) => {
          return (
            <li key={`${i.title}-${index}`} className="hover:bg-[#201f41] h-10 flex items-center hover:text-white">
              <Link
                to={i.link || "#"}
                className="capitalize p-2 text-[14px] hover:text-white w-full"
              >
                {i.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default NavLinks;
