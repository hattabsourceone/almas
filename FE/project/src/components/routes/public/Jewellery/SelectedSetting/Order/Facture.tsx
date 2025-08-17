import React from "react";
import OrderDiamondViewers from "./OrderDiamondViewers";
import OrderJewelleryViewers from "./OrderJewelleryViewers";

type PropsItems = {
  data: any;
  type: "Diamond" | "Jewellery";
};
type Props = {
  data: PropsItems[];
  setRingSize: React.Dispatch<React.SetStateAction<string>>;
  showSizeRequired: boolean;
  seconddataDiamond?: any;
  isEarring?: boolean;
};

const Facture: React.FC<Props> = ({ data, setRingSize, showSizeRequired, seconddataDiamond, isEarring }) => {
  const jdata = data.find((e) => e.type === "Jewellery");
  return (
    <div className="d-flex flex-column w-[90%] md:w-full mx-auto">
      <h3 className="pl-4 mb-2 w-100 text-[20px] font-bold text-[#000000]">
        {jdata?.data.name}
      </h3>
      {isEarring && <h3 className="pl-4 mb-2 text-[15px] font-medium text-[#666]" style={{fontFamily: '"Open Sans", sans-serif'}}>
        The total diamond carat weight of your earrings is
      </h3>}
      {data.map((item, index) => {
        if (item.type === "Diamond") {
          return <OrderDiamondViewers key={index} data={item.data} seconddataDiamond={seconddataDiamond} />;
        } else {
          return <OrderJewelleryViewers key={index} data={item.data} setRingSize={setRingSize} showSizeRequired={showSizeRequired} isEarring={isEarring} />;
        }
      })}
    </div>
  );
};

export default Facture;
