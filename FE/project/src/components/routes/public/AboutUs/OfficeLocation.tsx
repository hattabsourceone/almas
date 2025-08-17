import React,{useState} from "react";

import map from "@assets/AboutUs/map.png";



export type Props = {
  small: boolean;
};
const OfficeLocation: React.FC<Props> = ({ small }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="w-full mx-auto md:mb-28 2xl:ml-10 xl:mb-0  xl:mt-[-20px] 2xl:mt-[-30px] sm:pl-[34px] sm:pr-[30px] md:pl-[57px] xl:pl-[0px] xl:!ml-[-40px] 2xl:!ml-[-100px]">
      <div
        className={
          !small
            ? "flex flex-col md:gap-5 lg:flex-row"
            : "flex flex-col md:gap-7 lg:flex-col"
        }
      >
        <div
          id="ol"
          className="flex md:flex-row  flex-col mx-auto gap-3 md:justify-between md:gap-[10px] items-center text-left md:bg-new-jewel-head-bg bg-no-repeat bg-contain xl:size-auto xl:pt-20 2xl:pt-24 xl:items-start xl:pl-24 2xl:pl-28"
          data-aos-duration="1000"
          data-aos="zoom-in"
        >
          {/* <div className="flex flex-col"> */}
            
          {/* </div> */}

          <div className="text-[#53556b] text-[15px] xl:text-[18px] flex flex-col space-y-4 xl:items-start">

            <h1 className="text-[34px] leading-[40px] md:leading-[45px] uppercase text-[#201F41] xl:text-left"> Office Location </h1>
            {/* <p className="text-[#53556b] text-[15px]">Office no. 3103C, </p> */}
            

            <p className="leading-[23px] text-[19px]    xl:ml-0 xl:text-left w-[70%] flex flex-row  gap-x-2 ">
            {/* <FaLocationDot
            className="text-[#a5cbd7] text-[38px] " /> */}
            <i className="fa fa-map-marker" style={{ color: "#a5cbd7", fontSize: "28px", height:"50px",width:"50px" }}></i>
               
             <span>
              : HDS Business Centre,Cluster M, Jumeirah Lakes Towers Dubai, United Arab Emirates
              </span>

            </p>


            
            <p className="">
            <a href="tel:+971-455-46028" className="hover:text-current flex flex-row gap-x-2">
            {/* <FaPhone className="text-[#a5cbd7] text-[28px] " */}
            <i className="fa fa-phone" style={{ color: "#a5cbd7", fontSize: "28px",height:"30px",width:"30px"  }}></i>
   
    
            <span > : +97145546028</span></a>
            </p>
            <p className="sm:!mb-[30px]">
              <a href="mailto:someone@example.com" className="hover:text-current flex flex-row gap-x-2"> 
              {/* <FaEnvelope className="text-[#a5cbd7] text-[28px] " /> */}
              <i className="fa fa-envelope" style={{ color: "#a5cbd7", fontSize: "28px",height:"30px",width:"30px"  }}></i>

              <span> : info@almas-online.com</span>
              </a>
            </p>
          </div>
          <div
            className="sm:h-[300px]  sm:w-[100%] md-w-[50%] lg:w-auto  md:ml-auto md:rounded-full md:mx-auto  xl:mt-5 xl:ml-[30px] xl:size-[350px] 2xl:mt-[-20px] 2xl:size-[400px] 2xl:ml-[60px]"
            data-aos-duration="1000"
            data-aos="zoom-in"
          >
            <a
              href="https://www.google.com/maps?ll=25.063881,55.138565&amp;z=17&amp;t=m&amp;hl=en&amp;gl=US&amp;mapclient=embed&amp;q=HDS+Business+Centre+Cluster+M+Jumeirah+Lakes+Towers+-+Dubai+United+Arab+Emirates"
              target="_blank"
            >
              <img
                className="w-full sm:h-full xl:h-[87%] 2xl:h-[95%] lg:h-[84%] md:h-[111%]    md:rounded-full object-cover "
                src={map}
                onMouseEnter={() =>{ setIsVisible(true)   }}
                onMouseLeave={() => {setIsVisible(false) }}
              />
            </a>
            <iframe
              className="d-none"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.1120324134645!2d55.13586171500692!3d25.064191683958175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6cb3268ae6ab%3A0xecce746348d028aa!2sHDS%20Business%20Centre%20-%20Cluster%20M%20-%20Jumeirah%20Lakes%20Towers%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1599047174547!5m2!1sen!2s"
            ></iframe>
          </div>
           {/* Popper/Tooltip */}
        {isVisible && (
          <div className="absolute 2xl:!top-[9%] xl:!top-[15%] lg:!top-[-9%] md:!top-[-10%] sm:!top-[-9%] transform -translate-x-1/2 mt-2    sm:right-1/3 md:right-20 lg:right-20 xl:right-20 w-[120px] md:translate-x-0 bg-[#575757] text-white p-1 text-center rounded shadow-lg z-50">
          Go to Full Map
             </div>
)}
        </div>
      </div>
    </div>
  );
};

export default OfficeLocation;
