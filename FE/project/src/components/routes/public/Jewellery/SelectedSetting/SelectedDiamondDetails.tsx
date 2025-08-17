import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "@components/shared/Loading/Loading";
import { BASE_URL } from "@components/api/api";
import Contact from "@components/shared/Contact/Contact";
import JewelleryDetailesViewers from "./JewelleryDetailesViewers";
import JewelleryDiamondImageViewer from "./JewelleryDiamondImageViewer";
import HeaderJewelleryDetails from "../JewelleryDetails/HeaderJewelleryDetails";
import Tick from "@assets/Jewellery/tick.png";
import Stone from "@assets/Jewellery/stone.png";
import { FaFilePdf } from "react-icons/fa";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import { AiOutlineFilePdf } from "react-icons/ai";
import useSelectedProps from "@components/hooks/useSelectedProps";

const SelectedDiamondDetails: React.FC = () => {
  const { id } = useParams();
  const { selectedJewellery } = useSelectedProps();
  const [data, setData] = React.useState<any | null>(null);
  const [seconddata, setSecondData] = React.useState<any | null>(null);
  const [isPageAvailable, setIsPageAvailable] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSecondModal, setShowSecondModal] = useState<boolean>(false);
  useEffect(() => {
    if (id) {
      if (id.includes("with")) {
        console.log("earring data here ---------------");
        const [firstId, secondId] = id.split("with");
        console.log("secondId -----------------", secondId);
        getData(firstId, setData);
        getData(secondId, setSecondData);
      } else {
        getData(id, setData);
      }
    }
  }, []);

  const handleOpenPdf = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenSecondPdf = () => {
    setShowSecondModal(true);
  };

  const handleCloseSecondModal = () => {
    setShowSecondModal(false);
  };

  const checkPdf = async () => {
    try {
      const response = await axios.get(
        `https://www.diamondselections.com/GetCertificate.aspx?diamondid=${data.diamond_id}`,
        {
          responseType: "text",
        }
      );
      if (
        !response.data.includes("src=") ||
        response.data.trim().length === 0
      ) {
        setIsPageAvailable(false);
      } else {
        setIsPageAvailable(true);
        handleOpenPdf();
      }
    } catch (error) {
      console.error("Error fetching PDF:", error);
      setIsPageAvailable(false);
    }
  };

  const getData = async (
    id: string,
    setter: React.Dispatch<React.SetStateAction<any>>
  ) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/get_diamond_by_id`,
        {
          model_id: id,
        }
      );
      setter(response.data.data);
    } catch (error) {
      console.log("getData:", error);
    }
  };

  console.log("goted data --------------", data);
  console.log("goted seconddata --------------", seconddata);
  const isLoading = id && id.includes("with") ? !data || !seconddata : !data;

  console.log("isLoading -------------------", isLoading);

  return (
    <div className="flex flex-col w-full pt-4">
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white flex flex-col p-4 rounded-lg shadow-lg w-full max-w-4xl relative">
            <div className="flex flex-row w-full justify-between pb-2 border-b-slate-300 border-b-[1px] mb-3">
              <p className="text-[15px] text-[#444] px-4">CERTIFICATE</p>
              <button
                onClick={handleCloseModal}
                className="font-bold text-[21px] bg-[#000] opacity-20 text-[#000] btn px-0 rounded-t-full rounded-b-full py-0 mx-4"
                style={{ textShadow: "0 1px 0 #fff" }}
              >
                <p>x</p>
              </button>
            </div>
            <iframe
              src={`https://www.diamondselections.com/GetCertificate.aspx?diamondid=${data.diamond_id}`}
              title="PDF Viewer"
              className="w-full h-[80vh] border-none"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}
      {showSecondModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white flex flex-col p-4 rounded-lg shadow-lg w-full max-w-4xl relative">
            <div className="flex flex-row w-full justify-between pb-2 border-b-slate-300 border-b-[1px] mb-3">
              <p className="text-[15px] text-[#444] px-4">CERTIFICATE</p>
              <button
                onClick={handleCloseSecondModal}
                className="font-bold text-[21px] bg-[#000] opacity-20 text-[#000] btn px-0 rounded-t-full rounded-b-full py-0 mx-4"
                style={{ textShadow: "0 1px 0 #fff" }}
              >
                <p>x</p>
              </button>
            </div>
            <iframe
              src={`https://www.diamondselections.com/GetCertificate.aspx?diamondid=${seconddata.diamond_id}`}
              title="PDF Viewer"
              className="w-full h-[80vh] border-none"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}
      {!isLoading ? (
        <>
          <div className="w-full -ml-9 md:-ml-10 lg:-ml-10 xl:-ml-8 2xl:ml-0">
            <Breadcrumb
              menu={[
                {
                  title: selectedJewellery.category || " ",
                  link: `/jewellery/${selectedJewellery.category}`,
                  level: 1,
                },
                {
                  title: selectedJewellery.type || " ",
                  link: `/jewellery/${selectedJewellery.category}/${selectedJewellery.type}`,
                  level: 2,
                },
                {
                  title: selectedJewellery.name || " ",
                  link: "", // TODO here
                  level: 3,
                },
              ]}
            />
          </div>
          <div className="flex flex-col mx-auto w-[96%] md:w-[95%] lg:w-[93%] xl:w-[90%] 2xl:w-[80%] mb-4 mt-3">
            <div className="w-full flex flex-col">
              <HeaderJewelleryDetails
                category_name={selectedJewellery.category}
                route={2}
                price={0}
                data={data}
              />
              <div className="flex flex-col lg:flex-row w-full items-start pt-4 border-b-[1px] border-slate-400">
                <JewelleryDiamondImageViewer
                  data={data}
                  seconddata={seconddata}
                />
                <JewelleryDetailesViewers data={data} seconddata={seconddata} />
              </div>
              <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row pt-10 w-[80%] 2xl:w-[67%] justify-between">
                <div className="flex flex-row">
                  <span className="mr-2 mt-1">
                    <img className="w-7 h-7" src={Stone} />
                  </span>
                  <div className="flex flex-col space-y-1">
                    <h2 className="text-lg font-semibold mb-3 flex items-center">
                      <p className="text-[18px] text-[#201F41] font-medium underline decoration-[3px] underline-offset-8">
                        Diamond Information
                      </p>
                    </h2>
                    <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row justify-between lg:space-x-24 2xl:space-x-52">
                      <div className="flex flex-col">
                        {seconddata && (
                          <div className="border-[#5555] border-[1px] px-1 max-w-min mb-2">
                            <p
                              className="text-[#211f41] text-[20px] text-nowrap"
                              style={{
                                fontFamily: '"Plain Light", sans-serif',
                              }}
                            >
                              Diamond 1
                            </p>
                          </div>
                        )}
                        <div className="flex flex-row space-x-2 items-start">
                          <div className="flex flex-col space-y-1">
                            <p className="text-[12px] font-bold text-[#666]">
                              SKU:
                            </p>
                            <p className="text-[12px] font-bold text-[#666]">
                              Carat:
                            </p>
                            <p className="text-[12px] font-bold text-[#666]">
                              Shape:
                            </p>
                            <p className="text-[12px] font-bold text-[#666]">
                              Cut:
                            </p>
                            <p className="text-[12px] font-bold text-[#666]">
                              Color:
                            </p>
                            <p className="text-[12px] font-bold text-[#666]">
                              Clarity:
                            </p>
                            <p className="text-[12px] font-bold text-[#666]">
                              Polish:
                            </p>
                            <p className="text-[12px] font-bold text-[#666]">
                              Symmetry:
                            </p>
                            <p className="text-[12px] font-bold text-[#666]">
                              Fluorescence:
                            </p>
                            <p className="text-[12px] font-bold text-[#666]">
                              Lab:
                            </p>
                            <p className="text-[12px] font-bold text-[#666]">
                              Dimentions:
                            </p>
                            <p className="text-[12px] font-bold text-[#666]">
                              Culet:
                            </p>
                            <p className="text-[12px] font-bold text-[#666]">
                              Table:
                            </p>
                            <p className="text-[12px] font-bold text-[#666]">
                              Depth:
                            </p>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <p className="text-[12px] font-medium text-[#666]">
                              {data.stock_num || "\u00A0"}
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              {data.diamond_size || "\u00A0"}
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              {data.shape?.value_name || "\u00A0"}
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              {data.cut?.value_name || "--"}
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              {data.color?.value_name || "\u00A0"}
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              {data.clarity?.value_name || "\u00A0"}
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              {data.polish?.value_name || "\u00A0"}
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              {data.symmetry?.value_name || "\u00A0"}
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              {data.fluor_intensity?.value_name || "\u00A0"}
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              {data.lab || "\u00A0"}
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              {data?.meas_depth || "\u00A0"} *{data?.meas_length || "\u00A0"} *
                              {data?.meas_width || "\u00A0"} mm
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              N
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              {data?.table || "\u00A0"}%
                            </p>
                            <p className="text-[12px] font-medium text-[#666]">
                              {data?.depth || "\u00A0"}%
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={handleOpenPdf}
                          className="btn px-3 flex flex-row items-center space-x-1 mx-auto rounded-full text-[16px] bg-[#201f41] text-white mt-2 text-nowrap"
                        >
                          <AiOutlineFilePdf className="text-[16px]" />
                          <p>View Grading Report</p>
                        </button>
                      </div>
                      {seconddata && (
                        <div className="flex flex-col">
                          <div className="border-[#5555] border-[1px] px-1 max-w-min mb-2">
                            <p
                              className="text-[#211f41] text-[20px] text-nowrap"
                              style={{
                                fontFamily: '"Plain Light", sans-serif',
                              }}
                            >
                              Diamond 2
                            </p>
                          </div>
                          <div className="flex flex-row space-x-2 items-start">
                            <div className="flex flex-col space-y-1">
                              <p className="text-[12px] font-bold text-[#666]">
                                SKU:
                              </p>
                              <p className="text-[12px] font-bold text-[#666]">
                                Carat:
                              </p>
                              <p className="text-[12px] font-bold text-[#666]">
                                Shape:
                              </p>
                              <p className="text-[12px] font-bold text-[#666]">
                                Cut:
                              </p>
                              <p className="text-[12px] font-bold text-[#666]">
                                Color:
                              </p>
                              <p className="text-[12px] font-bold text-[#666]">
                                Clarity:
                              </p>
                              <p className="text-[12px] font-bold text-[#666]">
                                Polish:
                              </p>
                              <p className="text-[12px] font-bold text-[#666]">
                                Symmetry:
                              </p>
                              <p className="text-[12px] font-bold text-[#666]">
                                Fluorescence:
                              </p>
                              <p className="text-[12px] font-bold text-[#666]">
                                Lab:
                              </p>
                              <p className="text-[12px] font-bold text-[#666]">
                                Dimentions:
                              </p>
                              <p className="text-[12px] font-bold text-[#666]">
                                Culet:
                              </p>
                              <p className="text-[12px] font-bold text-[#666]">
                                Table:
                              </p>
                              <p className="text-[12px] font-bold text-[#666]">
                                Depth:
                              </p>
                            </div>
                            <div className="flex flex-col space-y-1">
                              <p className="text-[12px] font-medium text-[#666]">
                                {seconddata.stock_num || "\u00A0"}
                              </p>
                              <p className="text-[12px] font-medium text-[#666]">
                                {seconddata.diamond_size || "\u00A0"}
                              </p>
                              <p className="text-[12px] font-medium text-[#666]">
                                {seconddata.shape?.value_name || "\u00A0"}
                              </p>
                              <p className="text-[12px] font-medium text-[#666]">
                                {seconddata.cut?.value_name || "--"}
                              </p>
                              <p className="text-[12px] font-medium text-[#666]">
                                {seconddata.color?.value_name || "\u00A0"}
                              </p>
                              <p className="text-[12px] font-medium text-[#666]">
                                {seconddata.clarity?.value_name || "\u00A0"}
                              </p>
                              <p className="text-[12px] font-medium text-[#666]">
                                {seconddata.polish?.value_name || "\u00A0"}
                              </p>
                              <p className="text-[12px] font-medium text-[#666]">
                                {seconddata.symmetry?.value_name || "\u00A0"}
                              </p>
                              <p className="text-[12px] font-medium text-[#666]">
                                {seconddata.fluor_intensity?.value_name || "\u00A0"}
                              </p>
                              <p className="text-[12px] font-medium text-[#666]">
                                {seconddata.lab || "\u00A0"}
                              </p>
                              <p className="text-[12px] font-medium text-[#666]">
                                {seconddata?.meas_depth || "\u00A0"} *
                                {seconddata?.meas_length || "\u00A0"} *
                                {seconddata?.meas_width || "\u00A0"} mm
                              </p>
                              <p className="text-[12px] font-medium text-[#666]">
                                N
                              </p>
                              <p className="text-[12px] font-medium text-[#666]">
                                {seconddata?.table || "\u00A0"}%
                              </p>
                              <p className="text-[12px] font-medium text-[#666]">
                                {seconddata?.depth || "\u00A0"}%
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={handleOpenSecondPdf}
                            className="btn px-3 flex flex-row items-center space-x-1 mx-auto rounded-full text-[16px] bg-[#201f41] text-white mt-2 text-nowrap"
                          >
                            <AiOutlineFilePdf className="text-[16px]" />
                            <p>View Grading Report</p>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-start">
                  <span className="mr-2 mt-1">
                    <img className="w-8" src={Tick} />
                  </span>
                  <div className="flex flex-col space-y-2">
                    <h2 className="text-lg font-semibold mb-2 flex items-center">
                      <p className="text-[18px] text-[#201F41] font-medium underline decoration-[3px] underline-offset-8">
                        Included In Your Order{" "}
                      </p>
                    </h2>
                    <p className="text-[16px] font-medium text-black">
                      Free Secure Shipping
                    </p>
                    <p className="text-[16px] font-medium text-black">
                      Diamond Grading Report
                    </p>
                    <p className="text-[16px] font-medium text-black">
                      Free Lifetime Warranty
                    </p>
                    <p className="text-[16px] font-medium text-black">
                      30 Days Money Back Guarantee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
      <Contact />
    </div>
  );
};

export default SelectedDiamondDetails;
