import React from "react";
import NavBarCostumeLink from "./NavBarCostumeLink";
import NavLinks from "./NavLinks";

const SubMenuNav: React.FC = () => {
  return (
    <ul className="hidden md:flex bg-white sticky top-0 z-50 lg:-space-x-2 xl:space-x-5 2xl:space-x-4 flex-row flex-wrap gap-0 md:justify-start lg:justify-center justify-center items-center w-full py-2 text-sm font-normal uppercase">
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
          { title: "Free Lifetime warranty", link: "/why-almas#lifetime" },
          { title: "30 Days Moneyback guarantee", link: "/why-almas#raf" },
          { title: "Free secure shipping", link: "/why-almas#free-ship" },
          { title: "secure payment process", link: "/why-almas#secure-pay" },
          { title: "unmatched prices", link: "/why-almas#tax" },
          {
            title: "only natural & Quality diamonds",
            link: "/why-almas#natural-diamond",
          },
          {
            title: "conflict-Free daimonds",
            link: "/why-almas#natural-diamond",
          },
        ]}
      />
      <NavBarCostumeLink />
      <NavLinks
        rootmenu="Diamonds buying guide"
        submenu={[
          { title: 'shape', link: '/buying-guide#shape' },
          { title: 'The 4Cs', link: '/buying-guide#4cs' },
          { title: 'Certification', link: '/buying-guide#certification' },
          { title: 'Glossary', link: '/buying-guide#glossary' },
          { title: 'Origins of Diamonds', link: '/buying-guide#origins' },
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
          { title: "Contact us", link: "/contact#contact" },
          { title: "FAQ", link: "/contact#faq" },
        ]}
      />
    </ul>
  );
};

export default SubMenuNav;
