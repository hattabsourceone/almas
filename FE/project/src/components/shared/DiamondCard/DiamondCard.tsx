/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { MdNoPhotography } from "react-icons/md";
import DiamondActions from "../DiamondActions/DiamondActions";
import { Link } from "react-router-dom";
import shapeImages from "@assets/default/default_img";

export type Props = {
  data: any;
  link: string;
  compareCount: () => void;
};

const DiamondCard: React.FC<Props> = ({ data, link, compareCount }) => {
  const [imagHasError, setimagHasError] = useState<boolean>(false);

  const ShapeImage = (shape: any) => {
    const key = !shape["shape"]
      ? "round"
      : shape["shape"].includes("Cushion")
      ? "cushion"
      : shape["shape"].toLowerCase();
    const imageSrc = shapeImages[key];
    if (imageSrc) {
      return <img className="max-h-72 w-72" src={imageSrc} alt="diamond" />;
    } else {
      return <MdNoPhotography className="max-h-72 w-72" />;
    }
  };

  function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    }).format(price || 0);
  }
  return (
    <Link className="w-full" to={link}>
      <div key={data.diamond_id} className="card p-0">
        {data.image_file &&
        !imagHasError &&
        data.image_file.toString().trim().length > 10 ? (
          data.image_file.includes("http0") ? (
            <iframe
              className="max-h-72 w-72"
              src={data.image_file.replace("http0", "https")}
              onError={() => setimagHasError(true)}
            />
          ) : (
            <img
              className="max-h-72 w-72"
              src={data.image_file}
              alt="diamond"
              onError={() => setimagHasError(true)}
            />
          )
        ) : (
          <ShapeImage shape={data.shape.value_name} />
        )}
        <div className="flex flex-col items-center py-4 w-full">
          <p
            className="text-base font-normal pb-2"
            style={{
              fontWeight: 500,
              fontSize: "18px",
              fontFamily: "Open Sans",
            }}
          >
            {data.diamond_size} - Caret {data.shape.value_name}
          </p>

          <div className="flex flex-row justify-between w-full h-10 px-6">
            <div className="flex flex-col">
              <p className="text-sm font-bold">Cut</p>
              <p className="text-sm font-normal">{data.cut.value_name || "--"}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-bold">Color</p>
              <p className="text-sm font-normal">{data.color.value_name}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-bold">Clarity</p>
              <p className="text-sm font-normal">{data.clarity.value_name}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-bold">Cert</p>
              <p className="text-sm font-normal">{data.lab}</p>
            </div>
          </div>
        </div>
        <p
          className="pt-0 pb-2 text-[#201f41]"
          style={{ fontWeight: 500, fontSize: "18px", fontFamily: "Open Sans" }}
        >
          {data.total_sales_price
            ? formatPrice(data.total_sales_price)
            : formatPrice(data.new_price)}{" "}
          (ex VAT)
        </p>
        <DiamondActions data={data} compareCount={compareCount} />
      </div>
    </Link>
  );
};

export default DiamondCard;
