import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";
import withAuth from "@components/shared/withAuth";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import circle from "@assets/LandingPage/Collections/circle.png";
import { format } from "date-fns";
import {
  TableProps,
  TColumnsPropsDef,
  TRowsPropsDef,
} from "./OrderHistoryPage";

import { ImCopy } from "react-icons/im";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import shapeImages from "@assets/default/default_img";
import { MdNoPhotography } from "react-icons/md";

interface Order {
  id: number;
  purchase_date: any;
  status: string;
  link: string;
  shipping_address: any;
  billing_address: any;
  amount: number;
  jewellery_ids: { id: number; name: string }[];
  diamond_ids: { id: number; diamond_id: string }[];
  deliver_on: any;
  items: any;
  //new
  shoppinglist: any[];
  tracking_link: any;
  courier_company: any;
  shipment_number: any;
  name: any;
}

interface T1Order extends Order {
  items: number;
  name: string;
  deliver_on: any;
}
interface T2Order extends Order {
  items: number;
  name: string;
  shipment_number: string;
  tracking_link: string;
  courier_company: string;
}
const Table = <TData extends {}>({
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
    <div
      className={` w-full overflow-x-auto ${responsive ? "overflow-auto" : ""}`}
      style={props.style}
    >
      <table
        className={` xl:min-w-full border ${
          autoWidth ? "md:table-fixed table-auto" : "table-auto"
        } w-full border-collapse text-sm lg:text-base`}
      >
        <thead>
          <tr className="bg-gray-800 ">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`text-nowrap md:!text-wrap !px-[50px] !py-[20px]  !font-[400] !text-[15px]  text-white] ${
                  borderless ? "" : "border-b border-[2px solid] border-[#eee]"
                }
                ${index < 4 ? " !text-center" : " !text-right"}`}
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
                  : "bg-[#f7f7f7]",
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
                  className={`!px-[50px] !py-[20px] text-[#666] !font-[400] !text-[16px] text-nowrap !text-center  leading-6  ${
                    borderless ? "" : ""
                  }
                  // ${colIndex < 4 ? "!text-center" : "!text-right"}
                `}
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
const Table2 = <TData extends {}>({
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
    <div
      className={` w-full overflow-x-auto ${responsive ? "overflow-auto" : ""}`}
      style={props.style}
    >
      <table
        className={` xl:min-w-full border !leading-[30px] ${
          autoWidth ? "md:table-fixed table-auto" : "table-fixed"
        } w-full border-collapse text-sm lg:text-base`}
      >
        <thead>
          <tr className="bg-gray-800 ">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`!text-nowrap  !px-[50px] !py-[20px]  !font-[400] !text-[15px]  text-white !leading-[20px] ${
                  borderless ? "" : "border-b border-[2px solid] border-[#eee]"
                }${index < 4 ? " !text-center" : " !text-right"}`}
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
                  : "bg-[#f7f7f7]",
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
                  className={`!px-[50px] !py-[20px] text-[#666] !font-[400] !text-[16px] text-nowrap   ${
                    borderless ? "" : ""
                  }${colIndex < 4 ? "!text-center" : "!text-right"}
                `}
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
function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

const SmallShapeImage = (shape: any) => {
  const key = shape["shape"].includes("Cushion")
    ? "cushion"
    : shape["shape"]!.toLowerCase();
  const imageSrc = shapeImages[key];
  if (imageSrc) {
    return (
      <img
        className="max-h-full max-w-full object-cover"
        src={imageSrc}
        alt="diamond"
      />
    );
  } else {
    return <MdNoPhotography className="max-h-full max-w-full object-cover" />;
  }
};
type RingSizeMap = { [key: number]: string };
const ringSizeMap: RingSizeMap = {
  252: "US 3",
  253: "US 3.5",
  254: "US 4",
  255: "US 4.5",
  256: "US 5",
  257: "US 5.5",
  258: "US 6",
  259: "US 6.5",
  260: "US 7",
  261: "US 7.5",
  262: "US 8",
  263: "US 8.5",
  264: "US 9",
};
function getRingSizeName(ringSizeValue: number | string): string {
  const value =
    typeof ringSizeValue === "string" ? parseInt(ringSizeValue) : ringSizeValue;
  return ringSizeMap[value] || "Unknown size";
}

const OrdersStatusPage: React.FC = () => {
  const location = useLocation();
  const [orders, setOrders] = useState<Order[] | any>([]);
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [searchParams, setSearchParams] = useSearchParams();
  if (
    (!orders || orders?.length < 1) &&
    !Cookies.get(`order-${searchParams.get("order_id") || ""}`)
  ) {
    return <Navigate to="/profile/orders-history" />;
  }

  const table1Columns: TColumnsPropsDef<T1Order>[] = [
    {
      key: "status",
      label: "Order Status",
      renderCell: (row) => (
        <span
          style={{ letterSpacing: "0px" }}
          className="!text-[18px] !text-center !text-[#535e60] p-[10px] !font-[400] !leading-normal"
        >{`${row.status}`}</span>
      ),
      width: "250px",
    },
    {
      key: "purchase_date",
      label: "Order Date",
      width: "250px",
      renderCell: (row) => (
        <span
          style={{ letterSpacing: "0px" }}
          className="!text-[15px] !text-center !text-[#88787e] p-[10px] !font-[400] !leading-normal"
        >{`${row.purchase_date}`}</span>
      ),
    },
    {
      key: "items",
      label: "Items",
    },

    {
      key: "deliver_on",
      label: "Deliver On",
      renderCell: (row) => <>{`${row.deliver_on}`}</>,
    },
    {
      key: "amount",
      label: "Total",
      renderCell: (row) => <>{`${formatPrice(row.amount)}`}</>,
    },
  ];
  const table2Columns: TColumnsPropsDef<T2Order>[] = [
    {
      key: "shipment_number",
      label: "Shipment Number",
      renderCell: (row) => (
        <>
          {row.shipment_number && (
            <p
              style={{ letterSpacing: "0px" }}
              className="!text-[14px] !text-center  p-[10px] "
            >
              <a
                onClick={() => {
                  copyToClipboard(row.shipment_number);
                  alert("Tracking Number Copied.");
                }}
                className="!text-[#201f41] !font-[400] !leading-normal hover:!text-[#23527c]"
              >{`${row.shipment_number}`}</a>
              &nbsp;&nbsp;
              <i
                onClick={() => {
                  copyToClipboard(row.shipment_number);
                  alert("Tracking Number Copied.");
                }}
                className="inline-block w-fit text-[#201f41]"
              >
                <ImCopy className="mx-auto" size={14} />
              </i>
            </p>
          )}
        </>
      ),
      width: "250px",
    },
    {
      key: "name",
      label: "Name",
      width: "250px",
      renderCell: (row) => (
        <span
          style={{ letterSpacing: "0px!important" }}
          className="!text-[15px] !text-center !text-[#88787e]  !font-[400] !leading-normal"
        >{`${row.name}`}</span>
      ),
    },
    {
      key: "courier_company",
      label: "Courier Company",
      renderCell: (row) => (
        <span
          style={{ letterSpacing: "0px!important" }}
          className="!text-[16px] !text-center !text-[#666]  !font-[400] !leading-normal"
        >{`${row.courier_company}`}</span>
      ),
    },

    {
      key: "tracking_link",
      label: "Tracking Link",
      renderCell: (row) => (
        <>
          <p
            style={{ letterSpacing: "0px" }}
            className="!text-[16px] !text-center  p-[10px] "
          >
            <a
              href={`https://${row.tracking_link}`}
              target="_blank"
              className="!text-[#201f41] !font-[400] !leading-normal  hover:!text-[#23527c] focus:!text-[#f5deb3]"
            >{`${row.tracking_link}`}</a>
          </p>
        </>
      ),
    },
    {
      key: "amount",
      label: "Total Amount",
      renderCell: (row) => <>{`${formatPrice(row.amount)}`}</>,
    },
  ];

  const formatOrders = useCallback((orders: Order[] | any[]): T1Order[] => {
    return orders.map((order: Order) => ({
      ...order,
      items: order.items,
      purchase_date: format(
        new Date(order?.purchase_date?.split("/").reverse().join("-")),
        "dd/MM/yyyy"
      ),
      deliver_on: order.deliver_on,
    })) as TRowsPropsDef<T1Order>[];
  }, []);
  const formatOrders2 = useCallback((orders: Order[] | any[]): T2Order[] => {
    return orders.map((order: Order) => ({
      ...order,
      name: order.shipping_address?.full_name || "Unknown",
      shipment_number: order?.shipment_number || "",
      courier_company: order?.courier_company || "",
      tracking_link: order?.tracking_link || "",
    })) as TRowsPropsDef<T2Order>[];
  }, []);

  const rows1 = useMemo(() => formatOrders(orders), [orders, formatOrders]);
  const rows2 = useMemo(() => formatOrders2(orders), [orders, formatOrders2]);

  useEffect(() => {
    if (location.state && location.state?.id) {
      let to_push = [];
      to_push.push(location.state);
      setOrders(to_push);
    } else {
      let order = JSON.parse(
        Cookies.get(`order-${searchParams.get("order_id") || ""}`) || "{}"
      );
      if (order && order.id) {
        let to_push = [];
        to_push.push(order);
        setOrders(to_push);
      }
    }
  }, []);

  console.log("orders -------------------", orders);

  return (
    <div className="flex flex-col items-start mt-4">
      <div className="w-full max-[1439px]:px-[2.5em] px-[120px] mx-auto md:!w-[750px] lg:!w-[970px] xl:!w-[1170px] min-[1700px]:!w-[1560px] [&>*]:p-0 [&>*]:py-[30px]   ">
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
            {
              title: "Orders Information",
              link: "/profile/order-status",
              level: 1,
            },
          ]}
        />
      </div>
      <div className="flex flex-col w-full max-[1439px]:px-[2.5em] px-[120px] mx-auto md:!w-[750px] lg:!w-[970px] xl:!w-[1170px] min-[1700px]:!w-[1560px] items-start justify-center ">
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
            ORDER <br /> STATUS
          </h1>
        </div>
        <h3 className="text-[#201f41] text-[30px] font-medium pt-10 pb-6 uppercase">{`Details for order #${orders[0]?.id}`}</h3>
        <div className=" w-full  pb-[100px]  ">
          <div className="well p-4  mx-0 !mt-[20px] !mb-[50px]   bg-very-lite-blue !rounded-none !border-[#e1e1e1] !border-solid !border-[2px] w-full flex flex-col lg:flex-row lg:justify-between ">
            <div className="w-[95%] lg:w-[48%] flex flex-col">
              <div className="flex flex-row justify-between">
                <h5 className="text-[#333333] text-[16px] max-[1366px]:text-[12px] font-[700] py-[10px]">
                  Billing Address
                </h5>
              </div>
              <div
                className="capitalize text-[16px] font-[400] leading-[30px] text-left text-[#666] py-[20px]"
                style={{
                  fontFamily: '"Plain Light", sans-serif',
                  fontWeight: "500",
                  unicodeBidi: "isolate",
                }}
              >
                {rows2[0]?.name || ""}
                <br />
                {rows2[0]?.billing_address?.address || ""}
                <br />
                {rows2[0]?.billing_address?.address2 || ""}
                <br />
                {rows2[0]?.billing_address?.city || ""},{" "}
                {rows2[0]?.billing_address?.post_code || ""}
                <br />
                {rows2[0]?.billing_address?.city || ""},{" "}
                {rows2[0]?.billing_address?.country || ""}
                <br />
              </div>
            </div>
            <div className="w-[95%] lg:w-[48%] flex flex-col">
              <div className="flex flex-row justify-between">
                <h5 className="text-[#333333] text-[16px] max-[1366px]:text-[12px] font-[700] py-[10px]">
                  Shipping Address
                </h5>
              </div>
              <div
                className="capitalize text-[16px] font-[400] leading-[30px] text-left text-[#666] py-[20px]"
                style={{
                  fontFamily: '"Plain Light", sans-serif',
                  fontWeight: "500",
                  unicodeBidi: "isolate",
                }}
              >
                {rows2[0]?.name || ""}
                <br />
                {rows2[0]?.shipping_address?.address || ""}
                <br />
                {rows2[0]?.shipping_address?.address2 || ""}
                <br />
                {rows2[0]?.shipping_address?.city || ""},{" "}
                {rows2[0]?.shipping_address?.post_code || ""}
                <br />
                {rows2[0]?.shipping_address?.city || ""},{" "}
                {rows2[0]?.shipping_address?.country || ""}
              </div>
            </div>
          </div>
          <div className="!mt-20 mb-[20px]">
            <Table columns={table1Columns} rows={rows1} responsive autoWidth />
          </div>
          <h1 className="!text-center text-[20px]">Tracking Module </h1>
          <div className="!my-[20px]">
            <Table2 columns={table2Columns} rows={rows2} responsive />
          </div>
          <div className="well !bg-white p-4  mx-0   !rounded-none !border-[#e1e1e1] !border-solid !border-[2px] w-full flex flex-col lg:flex-row lg:justify-between ">
            <div className="w-full flex flex-col">
              {orders &&
                orders?.length > 0 &&
                orders[0].shoppinglist.map((item: any, index: number) => (
                  <li
                    key={item.id || index}
                    className="flex flex-col pt-4 justify-between items-start w-full rounded-lg"
                  >
                    <div className="flex flex-row w-full justify-between items-start">
                      <div className="flex flex-wrap flex-row items-start">
                        <div className="w-[100px] h-[100px] flex items-center justify-center border">
                          {item.ring_size ? (
                            item.image_lines &&
                            item.image_lines[0].images_urls[0] &&
                            item.image_lines[0].images_urls[0] ? (
                              item.image_lines[0].images_urls[0].includes(
                                "http0"
                              ) ? (
                                <iframe
                                  className="max-h-full max-w-full object-cover"
                                  src={item.image_lines[0].images_urls[0].replace(
                                    "http0",
                                    "https"
                                  )}
                                />
                              ) : (
                                <img
                                  className="max-h-full max-w-full object-cover"
                                  src={item.image_lines[0].images_urls[0]}
                                  alt="diamond"
                                />
                              )
                            ) : item.sampleImage ? (
                              item.sampleImage.includes("http0") ? (
                                <iframe
                                  className="max-h-full max-w-full object-cover"
                                  src={item.sampleImage.replace(
                                    "http0",
                                    "https"
                                  )}
                                />
                              ) : (
                                <img
                                  className="max-h-full max-w-full object-cover"
                                  src={item.sampleImage}
                                  alt="diamond"
                                />
                              )
                            ) : (
                              !item.ring_size && (
                                <SmallShapeImage
                                  shape={item.shape ? item.shape : ""}
                                />
                              )
                            )
                          ) : item.image_file &&
                            item.image_file.toString().trim().length > 10 ? (
                            item.image_file.includes("http0") ? (
                              <iframe
                                className="max-h-full max-w-full object-cover"
                                src={item.image_file.replace("http0", "https")}
                              />
                            ) : (
                              <img
                                className="max-h-full max-w-full object-cover"
                                src={item.image_file}
                                alt="diamond"
                              />
                            )
                          ) : (
                            !item.ring_size && (
                              <SmallShapeImage
                                shape={item.shape ? item.shape : ""}
                              />
                            )
                          )}
                        </div>
                        {item.ring_size ? (
                          <div className="flex flex-row ml-3 xl:ml-14">
                            <div className="flex flex-col space-y-2 min-w-[120px] xl:min-w-[170px]">
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Product Name:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Metal:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Shape:-
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                {item?.category
                                  .toLowerCase()
                                  .includes("pendant")
                                  ? "Chain Length:"
                                  : "Ring Size:"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                SKU:
                              </h6>
                            </div>
                            <div className="flex flex-col space-y-2 min-w-[120px] xl:min-w-[170px]">
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.name || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.metal_id
                                  ? item.metal[item.metal_id]
                                  : item.metal || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.shape || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {(item?.category
                                  .toLowerCase()
                                  .includes("pendant")
                                  ? `${item.ring_size} Inches`
                                  : item.ring_size || "\u00A0") || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.sku || "\u00A0"}
                              </h6>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-row items-start ml-3 xl:ml-14">
                            <div className="flex flex-col space-y-2 min-w-[120px] xl:min-w-[170px]">
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Product Name:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Carat:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Shape:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Cut:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Color:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Clarity:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Polish:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Symmetry:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Fluorescence:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                Lab:
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#333333]">
                                SKU:
                              </h6>
                            </div>
                            <div className="flex flex-col space-y-2 min-w-[120px] xl:min-w-[170px]">
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.name}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {Number(item.diamond_size).toFixed(2) ||
                                  "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.shape || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.cut || "--"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.color || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.clarity || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.polish || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.symmetry || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.fluor_intensity || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.lab || "\u00A0"}
                              </h6>
                              <h6 className="text-[13px] font-medium text-[#888]">
                                {item.sku || "\u00A0"}
                              </h6>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2 items-end">
                        <h6 className="font-medium text-[13px] text-[#333333]">
                          Price:{" "}
                          <span className="text-[18px] text-[#000] font-medium">
                            {formatPrice(
                              item.final_price ||
                                item.total_sales_price ||
                                item.price
                            )}
                          </span>
                        </h6>
                      </div>
                    </div>
                    {orders &&
                      orders?.length > 0 &&
                      orders[0].shoppinglist.length - 1 != index && (
                        <hr className="w-full border-white opacity-10 rounded-md border-2 mt-3" />
                      )}
                  </li>
                ))}
            </div>
          </div>
          <div className=" flex flex-col justify-center items-end mt-[20px] mb-[50px] py-[31px] px-[15px] bg-[#f7f7f7] border-0">
            <div className="w-fit flex flex-col">
              <div className="w-fit flex flex-row">
                <div className="w-fit flex flex-row items-start justify-normal flex-nowrap ">
                  <div className="w-full flex flex-col items-center flex-nowrap  ">
                    <div className="w-full  px-[30px] py-[15px] text-end">
                      <b className=" text-[#333333] text-[20px] max-[1366px]:text-[12px] font-[700] !leading-[30px] !h-[50px] text-nowrap">
                        Sub-Total
                      </b>
                    </div>
                    <div className="w-full px-[30px] py-[15px] text-end">
                      <b className=" text-[#333333] text-[20px] max-[1366px]:text-[12px] font-[700] leading-[30px] text-nowrap">
                        Free Shipping
                      </b>
                    </div>
                    <div className="w-full  px-[30px] py-[15px] text-end">
                      <b className=" text-[#333333] text-[20px] max-[1366px]:text-[12px] font-[700] leading-[30px] text-nowrap">
                        VAT (5%)
                      </b>
                    </div>
                    <div className="w-full  px-[30px] py-[15px] text-end">
                      <b className=" text-[#333333] text-[20px] max-[1366px]:text-[12px] font-[700] leading-[30px] text-nowrap">
                        Total
                      </b>
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-center flex-nowrap ">
                    <div className="w-full  px-[30px] py-[15px] text-right">
                      <b className=" text-[#333333] text-[16px] max-[1366px]:text-[12px] font-[700] leading-[30px] text-nowrap">
                        {formatPrice((orders[0]?.amount * 100) / 105)}
                      </b>
                    </div>
                    <div className="w-full px-[30px] py-[15px] text-right">
                      <b className=" text-[#333333] text-[16px] max-[1366px]:text-[12px] font-[700] leading-[30px] text-nowrap">
                        {formatPrice(0)}
                      </b>
                    </div>
                    <div className="w-full px-[30px] py-[15px] text-right">
                      <b className=" text-[#333333] text-[16px] max-[1366px]:text-[12px] font-[700] leading-[30px] text-nowrap">
                        {formatPrice(((orders[0]?.amount * 100) / 105) * 0.05)}
                      </b>
                    </div>
                    <div className="w-full  px-[30px] py-[15px] text-right">
                      <b className=" text-[#333333] text-[16px] max-[1366px]:text-[12px] font-[700] leading-[30px] text-nowrap">
                        {formatPrice(orders[0]?.amount)}
                      </b>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" py-[15px] text-[20px] font-[700] text-left max-[350px]:text-right  text-nowrap">
                <Link
                  target="_self"
                  to="/international-return-policy"
                  className="!text-[#201f41] !font-[700] !leading-normal  hover:!text-[#23527c] focus:!text-[#f5deb3]"
                >
                  Return policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default withAuth(OrdersStatusPage);
