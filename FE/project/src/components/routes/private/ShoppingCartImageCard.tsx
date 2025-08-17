import React, { useState } from "react";

export type Props = {
  item: any;
  SmallShapeImage: (shape: any) => JSX.Element;
};

const ShoppingCartImageCard: React.FC<Props> = ({ item, SmallShapeImage }) => {
  const [imagHasError, setimagHasError] = useState<boolean>(false);
  return (
    <div className="w-[100px] h-[100px] flex items-center justify-center border">
      {item.name ? (
        item.image_lines &&
        !imagHasError &&
        item.image_lines[0].images_urls[0] &&
        item.image_lines[0].images_urls[0] ? (
          item.image_lines[0].images_urls[0].includes("http0") ? (
            <iframe
              className="max-h-full max-w-full object-cover"
              src={item.image_lines[0].images_urls[0].replace("http0", "https")}
              onError={() => setimagHasError(true)}
            />
          ) : (
            <img
              className="max-h-full max-w-full object-cover"
              src={item.image_lines[0].images_urls[0]}
              alt="diamond"
              onError={() => setimagHasError(true)}
            />
          )
        ) : item.sampleImage && !imagHasError ? (
          item.sampleImage.includes("http0") ? (
            <iframe
              className="max-h-full max-w-full object-cover"
              src={item.sampleImage.replace("http0", "https")}
              onError={() => setimagHasError(true)}
            />
          ) : (
            <img
              className="max-h-full max-w-full object-cover"
              src={item.sampleImage}
              alt="diamond"
              onError={() => setimagHasError(true)}
            />
          )
        ) : (
          <SmallShapeImage shape={""} />
        )
      ) : item.image_file &&
        item.image_file.toString().trim().length > 10 &&
        !imagHasError ? (
        item.image_file.includes("http0") ? (
          <iframe
            className="max-h-full max-w-full object-cover"
            src={item.image_file.replace("http0", "https")}
            onError={() => setimagHasError(true)}
          />
        ) : (
          <img
            className="max-h-full max-w-full object-cover"
            src={item.image_file}
            alt="diamond"
            onError={() => setimagHasError(true)}
          />
        )
      ) : (
        <SmallShapeImage shape={item.shape ? item.shape.value_name : ""} />
      )}
    </div>
  );
};

export default ShoppingCartImageCard;
