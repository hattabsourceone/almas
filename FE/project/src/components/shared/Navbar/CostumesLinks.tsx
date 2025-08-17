import React from "react";
import { Link } from "react-router-dom";
import Pendants from "@assets/Jewellery/pendant.png";
import Bracelets from "@assets/Jewellery/bracelts.png";
type type = {
  title: string;
  image_url: string;
};

export type CostumesLinksProps = {
  id: number;
  title: string;
  types: type[];
};

const CostumesLinks: React.FC<CostumesLinksProps> = ({ id, title, types }) => {
  return (
    <span key={id} className="w-full">
      <Link className="link-design" to={`/jewellery/${title}`}>
        <h6 className="text-[14px] font-bold hover:text-[#23527C]">{title}</h6>
      </Link>
      <div className="space-y-0 py-2 pb-3">
        {title.toLocaleLowerCase().includes("bracelet") ? (
          <Link
            className="ps-2 normal-case flex flex-row items-center text-base font-normal space-x-1"
            to={`/jewellery/${title}`}
          >
            <img
              src={types[0].image_url}
              className="w-[47px] h-[30px] object-contain"
              alt=""
            />
            <div className="hover:bg-[#1f1f3c] hover:text-white text-black p-2">
              <p className="text-[14px] font-normal">All {title}</p>
            </div>
          </Link>
        ) : title.toLocaleLowerCase().includes("pendant") ? (
          <Link
            className="ps-2 normal-case flex flex-row items-center text-base font-normal space-x-1"
            to={`/jewellery/${title}`}
          >
            <img
              src={types[0].image_url}
              className="w-[47px] h-[30px] object-contain"
              alt=""
            />
            <div className="hover:bg-[#1f1f3c] hover:text-white text-black p-2">
              <p className="text-[14px] font-normal">All {title}</p>
            </div>
          </Link>
        ) : (
          types?.map((type, i) => {
            return (
              <main key={i}>
                <Link
                  className="ps-2 normal-case flex flex-row items-center text-base font-normal"
                  to={`/jewellery/${title}/${type.title}`}
                >
                  <img
                    src={type.image_url}
                    className="w-[47px] h-[30px] object-contain"
                    alt=""
                  />
                  <div className="hover:bg-[#1f1f3c] hover:text-white text-black p-2">
                    <p className="text-[14px] font-normal">{type.title}</p>
                  </div>
                </Link>
              </main>
            );
          }))
        }
      </div>
      {title.toLocaleLowerCase().includes("bracelet") ? (
        <></>
      ) : (
        <a
          href={`/jewellery/${title}/all/design`}
          className="link-design font-bold text-[14px] normal-case"
        >
          Design Your Own {title}
        </a>
      )}
    </span>
  );
};

export default CostumesLinks;
