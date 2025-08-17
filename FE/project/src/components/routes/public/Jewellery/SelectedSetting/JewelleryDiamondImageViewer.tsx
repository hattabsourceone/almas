import shapeImages from "@assets/default/default_img";
import planImages from "@assets/default/default_plans";
import React, { useState } from "react";
import { MdNoPhotography } from "react-icons/md";
import videoPlayer from "@assets/video-thumb.png";

type Props = {
  data: any;
  seconddata?: any;
};

const JewelleryDiamondImageViewer: React.FC<Props> = ({ data, seconddata }) => {
  const [imagHasError, setimagHasError] = useState<boolean>(false);
  const [imag2HasError, setimag2HasError] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    data.image_file
  );
  const [selectedVideo, setselectedVideo] = useState<boolean>(
    data.video_url ? true : false
  );
  const [secondselectedVideo, secondsetselectedVideo] = useState<boolean>(
    data.video_url ? true : false
  );
  const [secondselectedImage, secondsetSelectedImage] = useState<
    string | undefined
  >(data.image_file);

  const ShapeImage = (shape: any) => {
    const key = !shape["shape"]
      ? "round"
      : shape["shape"].includes("Cushion")
      ? "cushion"
      : shape["shape"].toLowerCase();
    const imageSrc = shapeImages[key];
    if (imageSrc) {
      return (
        <div className="flex flex-col">
          <img className="h-auto max-w-[80%]" src={imageSrc} alt="diamond" />
          <p className="text-[12px] pt-2">
            This is a sample image{" "}
            <a href="/buying-guide#4c" className="font-semibold">
              click here
            </a>{" "}
            to learn more about your diamond
          </p>
        </div>
      );
    } else {
      return <MdNoPhotography className="h-auto max-w-[47%]" />;
    }
  };

  const SecondShapeImage = (shape: any) => {
    const key = !shape["shape"]
      ? "round"
      : shape["shape"].includes("Cushion")
      ? "cushion"
      : shape["shape"].toLowerCase();
    const imageSrc = shapeImages[key];
    if (imageSrc) {
      return (
        <div className="flex flex-col">
          <img className="h-auto max-w-[80%]" src={imageSrc} alt="diamond" />
          <p className="text-[12px] pt-2">
            This is a sample image{" "}
            <a href="/buying-guide#4c" className="font-semibold">
              click here
            </a>{" "}
            to learn more about your diamond
          </p>
        </div>
      );
    } else {
      return <MdNoPhotography className="h-auto max-w-[47%]" />;
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
          className="h-[100px] w-[100px] cursor-pointer border-[1.5px] rounded-sm border-slate-500"
          src={imageSrc}
          alt="diamond"
          onClick={() => {
            setselectedVideo(false);
            setSelectedImage(imageSrc);
          }}
        />
      );
    } else {
      return (
        <MdNoPhotography className="h-[100px] w-[100px] cursor-pointer border-[1.5px] rounded-sm border-slate-500" />
      );
    }
  };

  const SecondSmallShapeImage = (shape: any) => {
    const key = !shape["shape"]
      ? "round"
      : shape["shape"].includes("Cushion")
      ? "cushion"
      : shape["shape"].toLowerCase();
    const imageSrc = shapeImages[key];
    if (imageSrc) {
      return (
        <img
          className="h-[100px] w-[100px] cursor-pointer border-[1.5px] rounded-sm border-slate-500"
          src={imageSrc}
          alt="diamond"
          onClick={() => {
            secondsetselectedVideo(false);
            secondsetSelectedImage(imageSrc);
          }}
        />
      );
    } else {
      return (
        <MdNoPhotography className="h-[100px] w-[100px] cursor-pointer border-[1.5px] rounded-sm border-slate-500" />
      );
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
          className="h-[100px] w-[100px] bg-[#111] cursor-pointer border-[1.5px] rounded-sm border-slate-500"
          src={imageSrc}
          alt="diamond"
          onClick={() => {
            setselectedVideo(false);
            setSelectedImage(imageSrc);
          }}
        />
      );
    } else {
      return (
        <MdNoPhotography className="h-[100px] w-[100px] cursor-pointer border-[1.5px] rounded-sm border-slate-500" />
      );
    }
  };

  const SecondSmallPlanImage = (shape: any) => {
    const key = !shape["shape"]
      ? "round"
      : shape["shape"].includes("Cushion")
      ? "cushion"
      : shape["shape"].toLowerCase();
    const imageSrc = planImages[key];
    if (imageSrc) {
      return (
        <img
          className="h-[100px] w-[100px] bg-[#111] cursor-pointer border-[1.5px] rounded-sm border-slate-500"
          src={imageSrc}
          alt="diamond"
          onClick={() => {
            secondsetselectedVideo(false);
            secondsetSelectedImage(imageSrc);
          }}
        />
      );
    } else {
      return (
        <MdNoPhotography className="h-[100px] w-[100px] cursor-pointer border-[1.5px] rounded-sm border-slate-500" />
      );
    }
  };

  const handleError = (id: number) => {
    if (id === 1) {
      setimagHasError(true);
    } else if (id === 2) {
      setimag2HasError(true);
    }
  };

  return (
    <div className="flex flex-col w-[95%] lg:w-[60%] mx-auto">
      {seconddata && (
        <div className="w-[90%] border-b border-slate-300 items-center justify-center flex mb-2">
          <p
            className="text-[#201f41] text-[24px] pl-36"
            style={{ fontFamily: '"Open Sans", sans-serif' }}
          >
            Diamond 1
          </p>
        </div>
      )}
      <div className="flex flex-row justify-start space-x-8 pl-10 items-start">
        {/* side images */}
        <div className="flex flex-col justify-start items-start space-y-5 h-full">
          {data.video_url && (
            <div
              onClick={() => {
                if (data.video_url) {
                  setselectedVideo(true);
                }
              }}
              className="flex bg-[#cacaca] cursor-pointer w-[100px] h-[100px] items-center justify-center"
            >
              <img
                className="w-[50%] border border-white rounded-md object-fill fill-white mt-4"
                style={{ filter: "brightness(0%) invert(1)" }}
                src={videoPlayer}
                alt="diamond"
              />
            </div>
          )}
          {data.image_file &&
          !imagHasError &&
          data.image_file.toString().trim().length > 10 ? (
            data.image_file.includes("http0") ? (
              <iframe
                className="h-[100px] w-[100px] border-[1.5px] rounded-sm border-slate-500"
                src={data.image_file.replace("http0", "https")}
                onError={() => handleError(1)}
                onClick={() => {
                  setselectedVideo(false);
                  setSelectedImage(data.image_file);
                }}
              />
            ) : (
              <img
                className="h-[100px] w-[100px] border-[1.5px] rounded-sm border-slate-500"
                src={data.image_file}
                alt="diamond"
                onError={() => handleError(1)}
                onClick={() => {
                  setselectedVideo(false);
                  setSelectedImage(data.image_file);
                }}
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
        {/* main image */}
        <div className="flex flex-col items-center justify-center 2xl:pl-16 h-[450px] lg:h-[430px] xl:h-[460px] 2xl:h-[500px]">
          {selectedVideo && data.video_url ? (
            <iframe
              src={data.video_url}
              title="360 Video"
              className="max-w-[80%] max-h-full"
              style={{
                top: 0,
                left: 0,
                display: "block",
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              scrolling="no"
              allowFullScreen
            />
          ) : selectedImage &&
            !imagHasError &&
            selectedImage.toString().trim().length > 0 ? (
            selectedImage.includes("http0") ? (
              <iframe
                className={`max-h-full max-w-[80%] ${
                  selectedImage!.includes("plan") ? "bg-[#000]" : ""
                }`}
                src={selectedImage.replace("http0", "https")}
                onError={() => handleError(1)}
              />
            ) : (
              <div className="relative flex mx-auto flex-col pt-8">
                {selectedImage!.includes("plan") && (
                  <span className="lineTop relative ml-4 block w-[80%] h-[1px] bg-gray-300 font-bold pointer-events-none -top-[22px] pl-4">
                    <small className="text-[#666] text-[12px]">
                      WIDTH: {data?.meas_width} MM
                    </small>
                  </span>
                )}
                <div className="flex mx-auto w-full flex-row">
                  {selectedImage!.includes("plan") && (
                    <span className="verticalLine relative block max-h-full w-[1px] bg-gray-300 pointer-events-none mr-4"></span>
                  )}
                  <img
                    className={`max-h-full max-w-[80%] ${
                      selectedImage!.includes("plan") ? "bg-[#000]" : "-mt-10"
                    }`}
                    src={selectedImage}
                    alt="diamond"
                    onError={() => handleError(1)}
                  />
                </div>
                {!selectedImage!.includes("plan") &&
                  selectedImage !== data.image_file && (
                    <p className="pl-14 text-[12px] pt-2 text-[#666]">
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
                {selectedImage!.includes("plan") && (
                  <small className="font-bold text-[#666] text-[12px] pt-3">
                    LENGTH: {data?.meas_length} MM
                  </small>
                )}
              </div>
            )
          ) : (
            <ShapeImage shape={data.shape.value_name} />
          )}
        </div>
      </div>
      {seconddata && (
        <div className="w-[90%] border-b border-slate-300 items-center justify-center flex mb-2">
          <p
            className="text-[#201f41] text-[24px] pl-36"
            style={{ fontFamily: '"Open Sans", sans-serif' }}
          >
            Diamond 2
          </p>
        </div>
      )}
      {seconddata && (
        <div className="flex flex-row justify-start space-x-8 pl-10 items-start">
          {/* side images */}
          <div className="flex flex-col justify-start items-start space-y-5 h-full">
            {seconddata.video_url && (
              <div
                onClick={() => {
                  if (seconddata.video_url) {
                    secondsetselectedVideo(true);
                  }
                }}
                className="flex bg-[#cacaca] cursor-pointer w-[100px] h-[100px] items-center justify-center"
              >
                <img
                  className="w-[50%] border border-white rounded-md object-fill fill-white mt-4"
                  style={{ filter: "brightness(0%) invert(1)" }}
                  src={videoPlayer}
                  alt="diamond"
                />
              </div>
            )}
            {seconddata.image_file &&
            !imag2HasError &&
            seconddata.image_file.toString().trim().length > 10 ? (
              seconddata.image_file.includes("http0") ? (
                <iframe
                  className="h-auto w-[100px] border-[1.5px] rounded-sm border-slate-500"
                  src={seconddata.image_file.replace("http0", "https")}
                  onError={() => handleError(2)}
                  onClick={() => {
                    secondsetselectedVideo(false);
                    secondsetSelectedImage(seconddata.image_file);
                  }}
                />
              ) : (
                <img
                  className="h-auto w-[100px] border-[1.5px] rounded-sm border-slate-500"
                  src={seconddata.image_file}
                  alt="diamond"
                  onError={() => handleError(2)}
                  onClick={() => {
                    secondsetselectedVideo(false);
                    secondsetSelectedImage(seconddata.image_file);
                  }}
                />
              )
            ) : (
              <SecondSmallShapeImage shape={seconddata.shape.value_name} />
            )}
            <SecondSmallPlanImage shape={seconddata.shape.value_name} />
          </div>
          {/* main image */}
          <div className="flex flex-col items-center justify-center 2xl:pl-16 h-[450px] lg:h-[430px] xl:h-[460px] 2xl:h-[500px]">
            {secondselectedVideo && seconddata.video_url ? (
              <iframe
                src={seconddata.video_url}
                title="360 Video"
                className="max-w-[80%] max-h-full"
                style={{
                  top: 0,
                  left: 0,
                  display: "block",
                  overflow: "hidden",
                  width: "100%",
                  height: "100%",
                }}
                scrolling="no"
                allowFullScreen
              />
            ) : secondselectedImage &&
              !imagHasError &&
              secondselectedImage.toString().trim().length > 10 ? (
              secondselectedImage.includes("http0") ? (
                <iframe
                  className={`max-h-full max-w-[80%] ${
                    selectedImage!.includes("plan") ? "bg-[#000]" : ""
                  }`}
                  src={secondselectedImage.replace("http0", "https")}
                  onError={() => handleError(2)}
                />
              ) : (
                <div className="relative flex mx-auto flex-col pt-8">
                  {secondselectedImage!.includes("plan") && (
                    <span className="lineTop relative ml-4 block w-[80%] h-[1px] bg-gray-300 font-bold pointer-events-none -top-[22px] pl-4">
                      <small className="text-[#666] text-[12px]">
                        WIDTH: {seconddata?.meas_width} MM
                      </small>
                    </span>
                  )}
                  <div className="flex mx-auto w-full flex-row">
                    {secondselectedImage!.includes("plan") && (
                      <span className="verticalLine relative block max-h-full w-[1px] bg-gray-300 pointer-events-none mr-4"></span>
                    )}
                    <img
                      className={`max-h-full max-w-[80%] ${
                        secondselectedImage!.includes("plan")
                          ? "bg-[#000]"
                          : "-mt-10"
                      }`}
                      src={secondselectedImage}
                      alt="diamond"
                      onError={() => handleError(2)}
                    />
                  </div>
                  {!secondselectedImage!.includes("plan") &&
                    secondselectedImage !== seconddata.image_file && (
                      <p className="pl-14 text-[12px] pt-2 text-[#666]">
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
                  {secondselectedImage!.includes("plan") && (
                    <small className="font-bold text-[#666] text-[12px] pt-3">
                      LENGTH: {seconddata?.meas_length} MM
                    </small>
                  )}
                </div>
              )
            ) : (
              <SecondShapeImage shape={data.shape.value_name} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JewelleryDiamondImageViewer;
