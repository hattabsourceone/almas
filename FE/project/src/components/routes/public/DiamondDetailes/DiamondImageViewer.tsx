import React, { useState } from "react";
import { MdNoPhotography } from "react-icons/md";
import shapeImages from "@assets/default/default_img";
import planImages from "@assets/default/default_plans";
import videoPlayer from "@assets/video-thumb.png";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilePdf } from "react-icons/ai";

type Props = {
  data: any;
  checkPdf: () => void;
};

const DiamondImageViewer: React.FC<Props> = ({ data, checkPdf }) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    data.image_file
  );
  const [selectedVideo, setselectedVideo] = useState<boolean>(
    data.video_url ? true : false
  );
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  const [imagHasError, setimagHasError] = useState<boolean>(false);

  const ShapeImage = (shape: any) => {
    const key = !shape["shape"]
      ? "round"
      : shape["shape"].includes("Cushion")
      ? "cushion"
      : shape["shape"].toLowerCase();
    const imageSrc = shapeImages[key];
    if (imageSrc) {
      return (
        <div onClick={toggleFullScreen} className="flex flex-col mt-12">
          <img
            className={`max-w-[355px] max-h-[335px] sm:max-w-[600px] sm:max-h-[620px] lg:max-w-[355px] lg:max-h-[335px] xl:max-w-[440px] xl:max-h-[420px] 2xl:max-w-[600px] 2xl:max-h-[480px] ${
              selectedImage!.includes("plan") ? "bg-[#000]" : ""
            }`}
            src={imageSrc}
            alt="diamond"
          />
          <p className="mx-auto text-[12px] pt-3 text-[#666]">
            This is a sample image{" "}
            <a href="/buying-guide#4c" className="font-semibold text-[#333]">
              click here
            </a>{" "}
            to learn more about your diamond
          </p>
        </div>
      );
    } else {
      return <MdNoPhotography className="h-96 w-96" />;
    }
  };

  const SmallShapeImage = (shape: any) => {
    const key = !shape["shape"]
      ? "round"
      : shape["shape"].includes("Cushion")
      ? "cushion"
      : shape["shape"].toLowerCase();
    const imageSrc = shapeImages[key];
    if (imageSrc) {
      return (
        <img
          className="max-h-[100px] max-w-[100px] cursor-pointer"
          src={imageSrc}
          alt="diamond"
          onClick={() => {
            setselectedVideo(false);
            setSelectedImage(imageSrc);
          }}
        />
      );
    } else {
      return <MdNoPhotography className="h-[100px] w-[100px]" />;
    }
  };

  const SmallPlanImage = (shape: any) => {
    const key = !shape["shape"]
      ? "round"
      : shape["shape"].includes("Cushion")
      ? "cushion"
      : shape["shape"].toLowerCase();
    const imageSrc = planImages[key];
    if (imageSrc) {
      return (
        <img
          className="max-h-[100px] max-w-[100px] bg-[#111] cursor-pointer"
          src={imageSrc}
          alt="diamond"
          onClick={() => {
            setselectedVideo(false);
            setSelectedImage(imageSrc);
          }}
        />
      );
    } else {
      return <MdNoPhotography className="max-h-[100px] max-w-[100px]" />;
    }
  };

  console.log("image data ------------", data);

  return (
    <div className="flex relative justify-start items-center flex-col w-[98%] lg:w-[40%] xl:w-[46%] 2xl:w-[55%] h-auto">
      {selectedVideo && data.video_url ? (
        <div className="w-[375px] h-[375px] sm:w-[620px] sm:h-[500px] lg:w-[375px] lg:h-[375px] xl:w-[460px] xl:h-[460px] 2xl:w-[620px] 2xl:h-[520px]">
          <iframe
            src={data.video_url}
            title="360 Video"
            allowFullScreen
            className="overflow-hidden inline-block"
            style={{
              top: 0,
              left: 0,
              display: "block",
              overflow: "hidden",
              width: "100%",
              height: "100%",
            }}
            scrolling="no"
          />
        </div>
      ) : selectedImage && selectedImage.toString().trim().length > 10 ? (
        selectedImage.includes("http0") ? (
          <iframe
            className={`max-w-[375px] max-h-[375px] sm:max-w-[620px] sm:max-h-[620px] lg:max-w-[375px] lg:max-h-[375px] xl:max-w-[460px] xl:max-h-[460px] 2xl:max-w-[620px] 2xl:max-h-[520px] ${
              selectedImage!.includes("plan") ? "bg-[#000]" : ""
            }`}
            src={selectedImage.replace("http0", "https")}
            onError={() => setimagHasError(true)}
            onClick={() => {
              toggleFullScreen();
            }}
          />
        ) : (
          <div className="position-relative flex w-[375px] h-[375px] sm:w-[620px] sm:h-[500px] lg:w-[375px] lg:h-[375px] xl:w-[460px] xl:h-[460px] 2xl:w-[620px] 2xl:h-[520px] flex-col items-center justify-center">
            {selectedImage!.includes("plan") ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-max h-max">
                  {selectedImage!.includes("plan") && (
                    <span className="lineTop relative block max-w-[600px] h-[1px] bg-gray-300 font-bold pointer-events-none -top-[20px] pl-4 ml-4">
                      <small className="text-[#666] text-[12px]">
                        WIDTH: {data?.meas_width} MM
                      </small>
                    </span>
                  )}
                  <div className="flex mx-auto w-full flex-row">
                    {selectedImage!.includes("plan") && (
                      <span className="verticalLine relative block h-full w-[1px] bg-gray-300 pointer-events-none mr-3"></span>
                    )}
                    <img
                      className={`max-w-[355px] max-h-[335px] sm:max-w-[600px] sm:max-h-[620px] lg:max-w-[355px] lg:max-h-[335px] xl:max-w-[440px] xl:max-h-[410px] 2xl:max-w-[600px] 2xl:max-h-[460px] ${
                        selectedImage!.includes("plan") ? "bg-[#000]" : ""
                      }`}
                      onClick={() => {
                        toggleFullScreen();
                      }}
                      onError={() => setimagHasError(true)}
                      src={selectedImage}
                      alt="diamond"
                    />
                  </div>
                  {selectedImage!.includes("plan") && (
                    <small className="font-bold text-[#666] text-[12px] pt-3">
                      LENGTH: {data?.meas_length} MM
                    </small>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <img
                  className={`max-w-[355px] max-h-[335px] sm:max-w-[600px] sm:max-h-[620px] lg:max-w-[355px] lg:max-h-[335px] xl:max-w-[440px] xl:max-h-[420px] 2xl:max-w-[600px] 2xl:max-h-[480px] ${
                    selectedImage!.includes("plan") ? "bg-[#000]" : ""
                  }`}
                  onClick={() => {
                    toggleFullScreen();
                  }}
                  onError={() => setimagHasError(true)}
                  src={selectedImage}
                  alt="diamond"
                />
                {!selectedImage!.includes("plan") &&
                  selectedImage !== data.image_file && (
                    <p className="mx-auto text-[12px] text-[#666] position-absolute bottom-0 text-center">
                      This is a sample image{" "}
                      <a
                        href="/buying-guide#4c"
                        className="font-semibold text-[#333]"
                      >
                        click here
                      </a>{" "}
                      to learn more about your diamond
                    </p>
                  )}
              </div>
            )}
          </div>
        )
      ) : (
        <ShapeImage shape={data.shape.value_name} />
      )}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative w-[70%] h-[90%]">
            <img
              src={selectedImage}
              alt="diamond"
              className="w-full h-full object-contain"
            />
            <button
              onClick={toggleFullScreen}
              className="absolute top-4 right-4 text-white text-3xl bg-gray-800 rounded-full p-1"
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-row justify-center mx-auto sm:pl-10 space-x-4 w-[99%] sm:w-[90%] my-4 ">
        {data.video_url && (
          <div
            onClick={() => {
              if (data.video_url) {
                setselectedVideo(true);
              }
            }}
            className="flex bg-[#cacaca] cursor-pointer max-h-[100px] max-w-[100px] items-center justify-center"
          >
            <img
              className="w-[50%] object-fill fill-white"
              style={{ filter: "brightness(0%) invert(1)" }}
              src={videoPlayer}
              alt="diamond"
            />
          </div>
        )}
        {data.image_file &&
        data.image_file.toString().trim().length > 10 &&
        !imagHasError ? (
          data.image_file.includes("http0") ? (
            <iframe
              className="max-h-[100px] max-w-[100px] cursor-pointer"
              src={data.image_file.replace("http0", "https")}
              onClick={() => {
                setselectedVideo(false);
                setSelectedImage(data.image_file);
              }}
              onError={() => setimagHasError(true)}
            />
          ) : (
            <img
              className="max-h-[100px] max-w-[100px] cursor-pointer"
              src={data.image_file}
              alt="diamond"
              onClick={() => {
                setselectedVideo(false);
                setSelectedImage(data.image_file);
              }}
              onError={() => setimagHasError(true)}
            />
          )
        ) : (
          <SmallShapeImage shape={data.shape.value_name} />
        )}
        <SmallPlanImage
          shape={data.shape.value_name}
          onClick={() => {
            setselectedVideo(false);
            setSelectedImage(data.image_file);
          }}
        />
      </div>
      <button
        onClick={checkPdf}
        className="btn px-3 flex flex-row items-center space-x-1 mx-auto rounded-full text-[16px] bg-[#201f41] text-white"
      >
        <AiOutlineFilePdf className="text-[16px]" />
        <p>View Grading Report</p>
      </button>
    </div>
  );
};

export default DiamondImageViewer;
