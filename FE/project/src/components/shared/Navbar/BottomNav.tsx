import React from "react";
import LoadLogo from "../LoadLogo/LoadLogo";
import { GiHamburgerMenu } from "react-icons/gi";
import NavLinks from "./NavLinks";
import NavBarCostumeLink from "./NavBarCostumeLink";

const BottomNav: React.FC = () => {
  return (
    <>
      <div className="md:hidden sticky top-0 z-50 w-full bg-white px-3 py-1 min-h-[48px]">
        <div className="flex flex-row">
          <LoadLogo />
          <button
            className="navbar-toggler bg-blue navbar-btn absolute z-50 right-4 mt-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDarkDropdown"
            aria-controls="navbarNavDarkDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <GiHamburgerMenu className="navbar-icons" />
            </span>
          </button>
        </div>
        <div
          className="collapse navbar-collapse flex flex-col justify-center"
          id="navbarNavDarkDropdown"
        >
          <ul className="navbar-nav center visible w-[96%] row items-center justify-center border-b-2 border-gray-300 md:border-b-0">
            <NavLinks
              rootmenu="About us"
              submenu={[
                { title: "Who we are", link: "/about" },
                { title: "Office Location", link: "/about" },
              ]}
            />
            <NavLinks
              link="/diamonds"
              rootmenu="Diamonds"
              submenu={[
                {
                  title: "Search Inventory",
                  link: "/search-inventory/all-diamond",
                },
                {
                  title: "Stones on special offer",
                  link: "search-inventory/spicial-offer",
                },
              ]}
            />
            <NavLinks
              rootmenu="Why almas online?"
              submenu={[
                {
                  title: "Free Lifetime warranty",
                  link: "/why-almas#lifetime",
                },
                {
                  title: "30 Days Moneyback guarantee",
                  link: "/why-almas#raf",
                },
                { title: "Free secure shipping", link: "/why-almas#free-ship" },
                { title: "secure payment process", link: "/why-almas" },
                { title: "unmatched prices", link: "/why-almas" },
                {
                  title: "only natural & Quality diamonds",
                  link: "/why-almas",
                },
                { title: "conflict-Free daimonds", link: "/why-almas" },
              ]}
            />
            <NavBarCostumeLink />
            <NavLinks
              rootmenu="Diamonds buying guide"
              submenu={[
                { title: "shape", link: "/buying-guide#shape" },
                { title: "The 4Cs", link: "/buying-guide#4cs" },
                {
                  title: "Certification",
                  link: "/buying-guide#certification",
                },
                { title: "Glossary", link: "/buying-guide#glossary" },
                { title: "Origins of Diamonds", link: "/buying-guide#origins" },
              ]}
            />

            <NavLinks
              rootmenu="Social Responsibility"
              submenu={[
                {
                  title: "Diamound child foundation",
                  link: "/social-responsibility",
                },
              ]}
            />
            <NavLinks
              rootmenu="Customer Care"
              submenu={[
                { title: "Contact us", link: "/contact" },
                { title: "FAQ", link: "/contact" },
              ]}
            />
          </ul>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
