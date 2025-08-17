import { BASE_URL } from "@components/api/api";
import useAuth from "@components/hooks/useAuth";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export type Props = {
  compareCount: () => void;
};

const ComparePage: React.FC<Props> = ({ compareCount }) => {
  const { currentTokenRef, currentUIDRef } = useAuth();
  const [newBasket, setNewBasket] = useState<any[]>([]);
  const navigate = useNavigate();
  const uid: number =
    Number(Cookies.get("uid")) || Number(currentUIDRef.current);
  const session_id = Cookies.get("session_id_token") || currentTokenRef.current;
  const navigateToRoute = (route: string) => {
    navigate(`/${route}`);
  };

  const removeFromCompare = async (id: string) => {
    try {
      const compareBasket = localStorage.getItem("compareDiamonds");
      const newBasket = compareBasket ? JSON.parse(compareBasket) : [];
      const index = newBasket.findIndex((item: any) => item.id === id);
      if (index > -1) {
        newBasket.splice(index, 1);
        localStorage.setItem("compareDiamonds", JSON.stringify(newBasket));
        setNewBasket(newBasket);
      }
      const response = await axios.post(
        `${BASE_URL}/api/v1/remove_from_compare_diamonds`,
        {
          session_id,
          uid,
          diamond_id: id,
        }
      );
      if (response.status === 200) {
        // TODO
      } else {
        // test failed
      }
    } catch (error) {
      console.log("add to compare:", error);
    }
  };

  useEffect(() => {
    const basket = localStorage.getItem("compareDiamonds");
    setNewBasket(basket ? JSON.parse(basket) : []);
  }, []);

  return (
    <div className="flex flex-col mb-44 pt-0 border">
      {newBasket.length === 0 ? (
        <div className="p-4">
          <p className="text-[14px] text-[#333] pb-4">No Diamonds Selected.</p>
          <button
            onClick={() => navigateToRoute("")}
            className="px-8 py-2 w-min text-white text-[15px] bg-[#211F41] rounded-full"
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto border p-1">
          <table className="min-w-full bg-white border-[1px] border-slate-300">
            <tbody className="table-auto w-full border-collapse border-[1px] border-slate-300">
              <tr className="text-left text-[15px] text-[#1f1f41] font-semibold bg-white">
                <td className="py-3 px-6 border-b border-r-[1px] border-slate-300">
                  View Diamond
                </td>
                {newBasket.map((element: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center w-[20%] border-r-[1px] border-slate-300"
                  >
                    {element.diamond_size} Carat {element.shape.value_name}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-6 border-b text-[15px] text-[#1f1f41] font-semibold border-r-[1px] border-slate-300">
                  SKU
                </td>
                {newBasket.map((element: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center text-[15px] text-[#666] font-semibold border-r-[1px] border-slate-300"
                  >
                    {element.stock_num}
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-6 border-b text-[15px] text-[#1f1f41] font-semibold border-r-[1px] border-slate-300">
                  Add To
                </td>
                {newBasket.map((_: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center text-[15px] text-white font-semibold border-r-[1px] border-slate-300"
                  >
                    <select
                      className="border p-2 rounded bg-[#1f1f41] w-full py-2"
                      defaultValue={"ADD TO"}
                    >
                      <option hidden value="ADD TO">
                        ADD TO
                      </option>
                      <option>Basket</option>
                      <option>Wishlist</option>
                    </select>
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-6 border-b text-[15px] text-[#1f1f41] font-semibold border-r-[1px] border-slate-300">
                  Price
                </td>
                {newBasket.map((element: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center text-[15px] text-[#666] font-semibold border-r-[1px] border-slate-300"
                  >
                    {element.total_sales_price}$
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-6 border-b text-[15px] text-[#1f1f41] font-semibold border-r-[1px] border-slate-300">
                  Carat
                </td>
                {newBasket.map((element: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center text-[15px] text-[#666] font-semibold border-r-[1px] border-slate-300"
                  >
                    {element.diamond_size}
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-6 border-b text-[15px] text-[#1f1f41] font-semibold border-r-[1px] border-slate-300">
                  Shape
                </td>
                {newBasket.map((element: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center text-[15px] text-[#666] font-semibold border-r-[1px] border-slate-300"
                  >
                    {element.shape.value_name}
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-6 border-b text-[15px] text-[#1f1f41] font-semibold border-r-[1px] border-slate-300">
                  Cut
                </td>
                {newBasket.map((element: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center text-[15px] text-[#666] font-semibold border-r-[1px] border-slate-300"
                  >
                    {element.cut.value_name || "--"}
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-6 border-b text-[15px] text-[#1f1f41] font-semibold border-r-[1px] border-slate-300">
                  Color
                </td>
                {newBasket.map((element: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center text-[15px] text-[#666] font-semibold border-r-[1px] border-slate-300"
                  >
                    {element.color.value_name}
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-6 border-b text-[15px] text-[#1f1f41] font-semibold border-r-[1px] border-slate-300">
                  Clarity
                </td>
                {newBasket.map((element: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center text-[15px] text-[#666] font-semibold border-r-[1px] border-slate-300"
                  >
                    {element.clarity.value_name}
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-6 border-b text-[15px] text-[#1f1f41] font-semibold border-r-[1px] border-slate-300">
                  Depth
                </td>
                {newBasket.map((element: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center text-[15px] text-[#666] font-semibold border-r-[1px] border-slate-300"
                  >
                    {element.depth}%
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-6 border-b text-[15px] text-[#1f1f41] font-semibold border-r-[1px] border-slate-300">
                  Table
                </td>
                {newBasket.map((element: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center text-[15px] text-[#666] font-semibold border-r-[1px] border-slate-300"
                  >
                    {element.table}%
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-6 border-b text-[15px] text-[#1f1f41] font-semibold border-r-[1px] border-slate-300">
                  Polish
                </td>
                {newBasket.map((element: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center text-[15px] text-[#666] font-semibold border-r-[1px] border-slate-300"
                  >
                    {element.polish.value_name}
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-6 border-b text-[15px] text-[#1f1f41] font-semibold border-r-[1px] border-slate-300">
                  Symmetry
                </td>
                {newBasket.map((element: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center text-[15px] text-[#666] font-semibold border-r-[1px] border-slate-300"
                  >
                    {element.symmetry.value_name}
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-6 border-b text-[15px] text-[#1f1f41] font-semibold border-r-[1px] border-slate-300">
                  Culet
                </td>
                {newBasket.map((element: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center text-[15px] text-[#666] font-semibold border-r-[1px] border-slate-300"
                  >
                    {element.polish.value_name}
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-6 border-b text-[15px] text-[#1f1f41] font-semibold border-r-[1px] border-slate-300">
                  Fluorescence
                </td>
                {newBasket.map((element: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center text-[15px] text-[#666] font-semibold border-r-[1px] border-slate-300"
                  >
                    {element.fluor_intensity.value_name}
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-6 border-b text-[15px] text-[#1f1f41] font-semibold border-r-[1px] border-slate-300">
                  Measurements
                </td>
                {newBasket.map((element: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center text-[15px] text-[#666] font-semibold border-r-[1px] border-slate-300"
                  >
                    {element.meas_length} * {element.meas_width} *{" "}
                    {element.meas_depth}mm
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-6 border-b text-[15px] text-[#1f1f41] font-semibold border-r-[1px] border-slate-300">
                  Lab
                </td>
                {newBasket.map((element: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center text-[15px] text-[#666] font-semibold border-r-[1px] border-slate-300"
                  >
                    {element.lab}
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-6 border-b text-[15px] text-[#1f1f41] font-semibold border-r-[1px] border-slate-300"></td>
                {newBasket.map((element: any, index: number) => (
                  <td
                    key={index}
                    className="py-3 px-6 border-b text-center text-[15px] text-[#666] font-semibold border-r-[1px] border-slate-300"
                  >
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        removeFromCompare(element.id);
                        compareCount();
                        event.stopPropagation();
                      }}
                      className="bg-[#211f41] rounded-xl px-[8px]"
                    >
                      <i
                        className="fa fa-trash-o text-[22px] text-[#888]"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
