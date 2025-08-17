import { BASE_URL } from "@components/api/api";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import DiamondWishListCard from "@components/shared/DiamondCard/DiamondWishListCard";
import withAuth from "@components/shared/withAuth";
import axios from "axios";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Country } from "country-state-city";
import circle from "@assets/LandingPage/Collections/circle.png";
import { FaRegEye } from "react-icons/fa";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { format } from "date-fns";

interface Order {
  id: number;
  purchase_date: any;
  status: string;
  shipping_address: any;
  billing_address: any;
  tracking_link: any;
  courier_company: any;
  shipment_number: any;
  amount: number;
  jewellery_ids: { id: number; name: string }[];
  diamond_ids: { id: number; diamond_id: string }[];
  //new
  shoppinglist: any[];
  deliver_on: any;
}
interface TOrder extends Order {
  items: string;
  view: string;
}
export interface TColumnsPropsDef<TData> {
  key: keyof TData; // Ensures the column key corresponds to a key in the row data
  label: string; // Display label for the column header
  width?: string | number; // Optional width for the column
  renderCell?: (row: TData) => ReactNode; // Optional custom cell rendering
}
export type TRowsPropsDef<TData> = TData;

export const Table = <TData extends {}>({
  columns,
  rows,
  borderless = false,
  responsive = true,
  striped = false,
  hoverEffect = false,
  autoWidth = false,
  ...props
}: TableProps<TData>) => {  
  return (
    <div className={`overflow-x-auto ${responsive ? "overflow-auto" : ""}`}>
      <table
        {...props}
        className={`  border ${
          autoWidth ? "md:!table-fixed table-auto" : "table-auto"
        } w-full border-collapse text-sm lg:text-base`}
      >
        <thead>
          <tr className="bg-gray-800 ">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`leading-6 text-nowrap md:!text-wrap !px-8 !py-4 !text-left !font-[400] !text-[13px] md:!text-[20px] text-white] ${
                  borderless ? "" : "border-b border-[2px solid] border-[#eee]"
                }`}
                style={{
                  width: column.width,
                  textShadow: "rgb(255, 255, 255) 0px 0px 0px",
                  fontFamily: '"Plain Light", sans-serif',
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={[
                striped
                  ? rowIndex % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50"
                  : "bg-white",
                hoverEffect ? "hover:bg-gray-50" : "",
                borderless
                  ? ""
                  : "border-b-2 border-t-0 border-[#eee] last:border-b-0",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`!px-8 !p-[8px] text-[#666] !font-[400] !text-[18px] text-nowrap md:!text-wrap leading-6  ${
                    borderless ? "" : ""
                  }`}
                  style={{
                    fontFamily: '"Plain Light", sans-serif',
                    letterSpacing: "1px",
                  }}
                >
                  {column.renderCell ? (
                    <>{column.renderCell(row)}</>
                  ) : (
                    <>{`${row[column.key] || "-"} `}</>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export interface TableProps<TData> extends React.HTMLAttributes<HTMLElement> {
  columns: TColumnsPropsDef<TData>[]; // Array of column definitions
  rows: TRowsPropsDef<TData>[]; // Array of row data
  borderless?: boolean; // Optional flag to remove inner borders
  responsive?: boolean; // Optional flag to enable horizontal scrolling
  striped?: boolean; // Optional striped row styling
  hoverEffect?: boolean; // Optional hover effect for rows
  autoWidth?: boolean;
}
type StatusType = { [key: string]: string };
const Status: StatusType = {
  order_placed: "Placed",
  refused: "Refused",
  under_process: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  return_request: "Returning",
  returned: "Returned",
  return_received: "Return Received",
  canceled: "Canceled",
  unknown: "Unknown Status",
};

const OrdersHistoryPage: React.FC = () => {
  const countriesList = Country.getAllCountries();
  const session_id = Cookies.get("session_id_token");
  const uid: number = Number(Cookies.get("uid"));
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }


  const tableColumns: TColumnsPropsDef<TOrder>[] = [
    {
      key: "id",
      label: "Order No",
      width: "100px",
      renderCell: (row) => <>{`#${row.id}`}</>,
    },
    {
      key: "purchase_date",
      label: "Order Date",
      width: "120px",
    },
    {
      key: "items",
      label: "Items",
      width: "50px",
    },
    {
      key: "status",
      label: "Status",
      width: "120px",
    },
    {
      key: "shipping_address",
      label: "Address",
      width: "200px",
      renderCell: (row) => (
        <>{`${row.shipping_address?.address || ""} ${
          row.shipping_address?.address2 || ""
        } , ${row.shipping_address?.post_code || ""} ${
          row.shipping_address?.city || ""
        } ${row.shipping_address?.country || ""}.`}</>
      ),
    },
    {
      key: "amount",
      label: "Total",
      width: "100px",
      renderCell: (row) => <>{`${formatPrice(row.amount)}`}</>,
    },
    {
      key: "view",
      label: "",
      width: "100px",
      renderCell: (row) => (
        <>
          <button
            onClick={() => {
              //checking if key
              Cookies.set(
                `order-${row.id}`,
                JSON.stringify({
                  id: row.id,
                  purchase_date: row.purchase_date,
                  amount: row.amount,
                  status: row.status,
                  items: row.items,
                  shipping_address: row.shipping_address,
                  billing_address: row.billing_address,
                  tracking_link: row.tracking_link,
                  shoppinglist: [...row.jewellery_ids, ...row.diamond_ids],
                  courier_company: row.courier_company,
                  shipment_number: row.shipment_number,
                  deliver_on: row.deliver_on,
                }),
                {
                  expires: new Date(new Date().getTime() + 15 * 60 * 1000),
                }
              );
              navigate(row.view, {
                state: {
                  id: row.id,
                  purchase_date: row.purchase_date,
                  amount: row.amount,
                  status: row.status,
                  items: row.items,
                  shipping_address: row.shipping_address,
                  billing_address: row.billing_address,
                  tracking_link: row.tracking_link,
                  shoppinglist: [...row.jewellery_ids, ...row.diamond_ids],
                  courier_company: row.courier_company,
                  shipment_number: row.shipment_number,
                  deliver_on: row.deliver_on,
                },
              });
            }}
            className=" ease-in-out  relative flex flex-row  flex-nowrap gap-1 items-center !text-sm px-[10px] py-[3px] group hover:bg-gray-900 hover:text-white text-[#201f41] border-1 border-[#201f41] rounded-xl "
          >
            <div className=" z-10 hover:transition-all transition duration-[300ms] ease-in-out ml-1 absolute flex flex-column justify-center items-center opacity-0 group-hover:!opacity-100 -mt-8">
              <p className=" z-20 rounded shadow-lg p-1 bg-black text-white !text-xs px-2 ">
                View
              </p>
              <TbTriangleInvertedFilled
                size={14}
                className="-mt-2 text-black"
              />
            </div>
            <FaRegEye size={14} /> View
          </button>
        </>
      ),
    },
  ];

  const formatOrders = useCallback((orders: Order[]): TOrder[] => {
    return orders.map((order) => ({
      ...order,
      items: new String(order.jewellery_ids.length + order.diamond_ids.length),
      purchase_date: format(new Date(order.purchase_date), "dd/MM/yyyy"),
      view: `/profile/orders-history/order-status?order_id=${order.id}`,
      status: Status[order.status] || Status["unknown"],
    })) as TRowsPropsDef<TOrder>[];
  }, []);

  const rows = useMemo(() => formatOrders(orders), [orders, formatOrders]);

  const getOrders = async () => {
    try {
      const body = {
        session_id: session_id,
        uid: uid,
      };
      const response = await axios.post(`${BASE_URL}/api/v1/get_orders`, body);
      if (response.status === 200) {
        console.log("example here ", response.data.orders);
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log("add to cart:", error);
    }
  };

  useEffect(() => {
    document.title = "Order History";
    getOrders();
  }, []);

  return (
    <div className="flex flex-col items-start mt-4">
      <div className="[&>*]:py-[30px] -ml-4 md:-ml-6 xl:-ml-3 2xl:ml-28 w-full">
        <Breadcrumb
          menu={[
            {
              title: "Account",
              link: "/profile",
              level: 1,
            },
            {
              title: "Orders History",
              link: "/profile/orders-history",
              level: 1,
            },
          ]}
        />
      </div>
      <div className="flex flex-col mx-auto w-[400px] sm:w-[570px] md:w-[700px] lg:w-[920px] xl:w-[1115px] 2xl:w-[69%] items-start justify-center ">
        <div
          className="bg-no-repeat bg-contain pt-[40px] md:bg-center"
          style={{
            backgroundImage: `url(${circle})`,
            backgroundPosition: "left 70px top 0px",
            maxWidth: 240,
            minHeight: 170,
            width: 240,
          }}
        >
          <h1 className="text-[#211F41] mb-[15px] mt-0 uppercase text-[40px]">
            ORDER <br /> HITSORY
          </h1>
        </div>
        {/* <div className=" w-full xl:!w-auto  pb-[100px]  "> */}
        <div className=" w-full   pb-[100px]  ">
          {rows.length === 0 ? (
            <>
              <p className="text-[#211F41] text-lg font-normal py-12 pl-[10%]">
                Your order history is currently empty.
              </p>
            </>
          ) : (
            <>
              <Table
                columns={tableColumns}
                rows={rows}
                responsive
                autoWidth={false}
              />
            </>
          )}
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default withAuth(OrdersHistoryPage);
