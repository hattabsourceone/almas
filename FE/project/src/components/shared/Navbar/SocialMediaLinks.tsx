import React from "react";

const SocialMediaLinks: React.FC = () => {
  return (
    <ul className="hidden md:flex flex-row w-min space-x-2 text-[12px] items-end">
      <li className="block text-nowrap">FOLLOW US</li>
      <li>
        <a href="https://www.facebook.com/AlmasOnlineCom/">
          <i className="fa fa-facebook-official text-xl" aria-hidden="true"></i>
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/almasonlinecom/">
          <i className="fa fa-instagram text-xl" aria-hidden="true"></i>
        </a>
      </li>
    </ul>
  );
};

export default SocialMediaLinks;
