import React from "react";
import busCareImage from "@assets/Contact/bus-care-bg-dots.jpg"; // Import the image

const Glossary: React.FC = () => {
  return (
    <div className="w-[90%] 2xl:w-[80%] mx-auto  text-shadow-[0px_0px_#000]">
      <div className="w-full lg:flex lg:space-x-8">
        {/* Left Column */}
        <div className="w-full lg:w-[80%] " style={{    textShadow: " 0px 0px #000"}}>
          <h1 className="text-start text-shadow-[0px_0px_#000] font-normal text-[28px] md:text-[60px] mb-[20px] w-100 text-[#201f41]">
            GLOSSARY
          </h1>
          <a
            href="https://www.kimberleyprocess.com"  
            target="_blank"
            className="sm:text-[12px] mb-[16px] block lg:text-[19px] "
          >
            <h4 className="text-[15px] md:text-[20px] font-light italic sm:text-[19px] text-[#53556b] [text-shadow:_0_0_0_rgb(0_0_#000_/_100%)] " > 
              KPCS
            </h4>
            <p className="sub-color my-1 sm:text-[12px] hover:text-current hover:opacity-[0.4]" style={{textShadow:" 0px 0px #ffffff00"}}>https://www.kimberleyprocess.com</p>
            <h6 className="text-[15px] md:text-[20px] font-light italic text-[#53556b] [text-shadow:_0_0_0_rgb(0_0_#000_/_100%)] mb-[16px]">
              Kimberley Process Certification Scheme
            </h6>
          </a>

          <a
            href="https://www.dmcc.ae"
            target="_blank"
            className="sm:text-[12px] mb-[16px] block lg:text-[19px] "  
          >
            <h4 className="text-[15px] md:text-[20px] font-light italic sm:text-[19px] text-[#53556b] [text-shadow:_0_0_0_rgb(0_0_#000_/_100%)]">
              DMCC
            </h4>
            <p className="sub-color my-1 text-sm text-[#53556b] [text-shadow:_0_0_0_rgb(0_0_#000_/_100%)] hover:opacity-[0.4] hover:text-current" style={{textShadow:" 0px 0px #ffffff00"}}>https://www.dmcc.ae</p>
            <h6 className="text-[15px] md:text-[20px] font-light italic text-[#53556b] [text-shadow:_0_0_0_rgb(0_0_#000_/_100%)] mb-[16px]">
              Dubai Multi Commodities Centre
            </h6>
          </a>

          <a
            href="https://www.gia.edu"
            target="_blank"
            className="sm:text-[12px] mb-[16px] block lg:text-[19px] " 
          >
            <h4 className="text-[15px] md:text-[20px] font-light italic sm:text-[19px] text-[#53556b] [text-shadow:_0_0_0_rgb(0_0_#000_/_100%)]">
              GIA
            </h4>
            <p className="sub-color my-1 text-sm hover:text-current hover:opacity-[0.4]" style={{textShadow:" 0px 0px #ffffff00"}} >https://www.gia.edu</p>
            <h6 className="text-[15px] md:text-[20px] font-light italic text-[#53556b] [text-shadow:_0_0_0_rgb(0_0_#000_/_100%)]">
              Gemological Institute of America. It is the world's foremost and trusted gemological institution.
            </h6>
          </a>
        </div>

        {/* Right Column - Dots on Large Screens */}
        <div
          className="lg:w-[30%] lg:block hidden bg-repeat bg-center"
          style={{
            backgroundImage: `url(${busCareImage})`, // Add the image source here
            backgroundSize: "auto", // You can adjust the size if needed
            backgroundPosition: "center", // Position the dots in the center
            width: "25%",
            height: "65vh", // Adjust height as desired, set to 120vh for taller height
          }}
        >
          {/* This column now has a tiled background with the dot pattern */}
        </div>
      </div>
    </div>
  );
};

export default Glossary;
