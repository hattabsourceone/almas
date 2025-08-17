import React, { useEffect, useState } from "react";
import DiamondImageViewer from "./DiamondImageViewer";
import { useParams } from "react-router-dom";
import axios from "axios";
import DiamondDetailesViewers from "./DiamondDetailesViewers";
import Loading from "@components/shared/Loading/Loading";
import { BASE_URL } from "@components/api/api";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import Contact from "@components/shared/Contact/Contact";

const DiamondDetailes: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<any | null>(null);
  const [isPageAvailable, setIsPageAvailable] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    getData();
  }, []);

  const handleOpenPdf = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getData = async () => {
    try {
      axios
        .post(`${BASE_URL}/api/v1/get_diamond_by_id`, {
          model_id: id,
        })
        .then((res) => {
          setData(res.data.data);
          setUrl(
            `https://www.diamondselections.com/GetCertificate.aspx?diamondid=${res.data.data.diamond_id}`
          );
          checkPdf(
            `https://www.diamondselections.com/GetCertificate.aspx?diamondid=${res.data.data.diamond_id}`
          );
        });
    } catch (error) {
      console.log("getData diamond details:", error);
    }
  };

  const checkPdf = async (url: string) => {
    try {
      const response = await axios.get(url, {
        responseType: "text",
      });
      if (
        !response.data.includes("src=") ||
        response.data.trim().length === 0
      ) {
        setIsPageAvailable(false);
      } else {
        setIsPageAvailable(true);
      }
    } catch (error) {
      console.error("Error fetching PDF:", error);
      setIsPageAvailable(false);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white flex flex-col pt-3 rounded-lg shadow-lg w-full max-w-4xl relative">
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
              src={url}
              title="PDF Viewer"
              className="w-full h-[60vh] border-none px-3 pb-3"
              loading="lazy"
            ></iframe>
            {/* <div className="text-center text-red-500">
                Not Available Currently
              </div> */}
          </div>
        </div>
      )}
      {data ? (
        <div className="w-full flex flex-col pt-3">
          <Breadcrumb
            menu={[
              {
                title: "Search",
                link: "/search-inventory/all-diamond",
                level: 1,
              },
              {
                title: `${data?.diamond_size} Carat ${data?.shape?.value_name}`,
                link: "#",
                level: 1,
              },
            ]}
          />
          <div className="flex flex-col lg:flex-row w-[90%] lg:w-[95%] xl:w-[95%] 2xl:w-[83%] mx-auto pt-12 pb-32 lg:space-x-1 space-y-10 lg:space-y-0">
            <DiamondImageViewer data={data} checkPdf={handleOpenPdf} />
            <DiamondDetailesViewers data={data} />
          </div>
          <Contact />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default DiamondDetailes;
