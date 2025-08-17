import React,{useEffect} from "react";
import image from "@assets/SocialResponsibility/social-res.png";
import Contact from "@components/shared/Contact/Contact";
import Breadcrumb from "@components/shared/Breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import "./_SocialResponsibility.css";

const SocialResponsibility: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;
    useEffect(() => {
      document.title = "Social Responsibility";
    }, []);
  return (
    <>
      <div className="banner flex items-center justify-center h-[200px] sm:h-[216px] md:h-[260px] lg:h-[349px] xl:h-[438px] 2xl:h-[660px] md:justify-start md:px-16 lg:px-16 xl:-mt-12 2xl:px-64 2xl:-mt-12">
        <h1 className="text-white uppercase font-medium text-[40px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[65px]">
          Social Responsibility
        </h1>
      </div>
      <div className="mt-10 -ml-7 md:-ml-5 lg:ml-3 xl:ml-8 2xl:ml-[85px]">
        <Breadcrumb
          menu={[
            {
              title: "Social Responsibility",
              link: pathname,
              level: 1,
            },
          ]}
        />
      </div>
      <div className="social-responsibility w-full mt-12 xl:mt-24">
        <div className="flex flex-col mx-auto w-[93%] md:w-[90%] lg:w-[83%] xl:w-[81%] 2xl:w-[72%]">
          <div className="flex md:items-end items-center space-y-6 md:space-y-0 flex-col md:flex-row space-x-8 lg:space-x-5 xl:space-x-8 2xl:space-x-20">
            <div
              className="w-[391px] h-[391px] md:min-w-[199px] md:h-[199px] lg:min-w-[267px] lg:h-[267px] xl:min-w-[327.5px] xl:h-[327.5px] 2xl:min-w-[391px] 2xl:h-[391px]"
              data-aos="fade-right"
              data-aos-duration="3000"
            >
              <img className="w-full h-full" src={image} alt="" />
            </div>
            <div
              className="flex flex-col space-y-3 md:space-y-8 xl:w-[60%] 2xl:w-[45%]"
              data-aos="fade-left"
              data-aos-duration="3000"
              style={{
                fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
              }}
            >
              <h1 className="lg:text-center strong text-[35px] sm:text-[40px] xl:text-[50px] 2xl:text-[60px] !font-normal text-lg-start">
                DIAMOND CHILD
              </h1>
              <p className="italic text-[18px] xl:text-[20px] leading-[1.7] text-[#444]">
                <span className="strong">“Diamond Child”</span> is a charity
                campaign that help support underprivileged children and youths
                in Areas where we run our operations in Africa. In other words,
                for every diamond you purchase US$ 5 goes to help support a
                <span className="strong"> Diamond Child.</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div
              className="w-[99%] md:w-1/2 text-[#88787e] mt-28"
              data-aos="fade-right"
              data-aos-duration="3000"
            >
              <h1 className="mb-[30px] text-start text-[30px] md:text-[34px] italic">
                Recognition
              </h1>
              <p className="no-spacing my-2 me-lg-4 w-sm-75 leading-7 text-[15px] md:text-[18px] xl:text-[20px] xl:w-[95%] 2xl:w-[85%]">
                There are many communities across the globe that deserves
                recognition for their efforts and Almas-Online we are constantly
                looking to give back to these people through our numerous
                charitable donations. Every Almas-Online diamond we sell US$5
                goes to Diamond Child, in partnership with XXX organization,
                registered charity number XXX
              </p>
            </div>
            <div
              className="w-[99%] md:w-1/2 text-justify pt-10 flex justify-center md:justify-normal"
              data-aos="fade-left"
              data-aos-duration="3000"
            >
              <div
                style={{ fontFamily: '"Plain Light", sans-serif' }}
                className="italic text-center w-[300px] max-w-full h-[300px] py-[50px] px-[20px] bg-[#1f1f41] text-white rounded-full flex flex-col justify-center items-center"
              >
                <h3 className="text-[21px] mb-[30px] font-medium">
                  In Less <br /> Privileged Communities
                </h3>
                <p className="font-medium text-[15px]">
                  Diamond child provides life-changing support to the brightest
                  children and youths whose families cannot afford to give them
                  better education.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact />
    </>
  );
};

export default SocialResponsibility;
