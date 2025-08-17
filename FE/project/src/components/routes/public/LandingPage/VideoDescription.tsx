import React from "react";
import video from "@assets/LandingPage/almas.mp4";
const VideoDescription: React.FC = () => {
  return (
    <div className="h-auto flex flex-col md:flex-row items-start my-8 md:my-14 lg:my-14 xl:my-28 2xl:mt-36 space-x-5 w-[97%] md:w-[96%] lg:w-[95%] xl:w-[90%] 2xl:w-[82%] mx-auto">
      <div className="w-[95%] md:w-[50%] mx-auto" data-aos="fade-right">
        <h1 className="text-[40px] md:text-[50px] 2xl:text-[60px] text-[#201F41] font-medium sm:pb-4 md:pb-0 lg:pb-2 xl:pb-10 w-[85%] md:w-[80%] lg:w-[90%] xl:w-[70%] 2xl:w-[60%]">
          ALMAS-ONLINE STONES
        </h1>
        <p className="menu-description w-[99%] lg:w-[95%] 2xl:w-[70%]">
          Almas-online stones collection is a bewitching combination of our
          impressions of the beauty of the surrounding world and of the emotions
          that we want to share.
        </p>
      </div>
      <div className="w-[95%] md:w-[50%] mx-auto" data-aos="fade-left">
        <div className="video-contianer">
          <video className="w-full" src={video} autoPlay loop muted />
        </div>
      </div>
    </div>
  );
};

export default VideoDescription;
