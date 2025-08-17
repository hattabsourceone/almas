import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export type PropsTab = {
  question: string;
  response: string;
  id: number;
};

const Tab: React.FC<PropsTab> = ({ question, response, id }) => {
  const [target, setTarget] = useState<number>(-1);
  return (
    <div
      style={{ fontFamily: '"Plain Light", sans-serif' }}
      className=" my-4"
      // data-aos-duration="2000"
      // data-aos="fade-up"
    >
      <h2
        className=""
        id={`flush-heading-${id}`}
        style={{ backgroundColor: "white" }}
      >
        <button
          className="accordion-button-style collapsed flex items-center justify-between  text-[18px] hover:!text-[#201f41]"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#flush-collapse-${id}`}
          aria-expanded="false"
          aria-controls={`flush-collapse-${id}`}
          onClick={() => {
            setTarget(target == id ? -1 : id);
          }}
          style={{
            backgroundColor: "white",
            fontFamily: '"Plain Light", sans-serif',
            padding: "2vh",
            borderWidth: "0px 0px 0px 0px",
            borderRadius: "0px",
            fontSize: "18px",
            color: "#656565",
            textShadow: "0px 0px",
          }}
        >
          <div className="text-[19px] font-medium">{question}</div>
          <div>
            {target == id ? (
              <IoMdArrowDropup size={32} color="black" />
            ) : (
              <IoMdArrowDropdown size={32} color="black" />
            )}{" "}
          </div>
        </button>
      </h2>
      <div
        id={`flush-collapse-${id}`}
        className="accordion-collapse collapse"
        aria-labelledby={`flush-heading-${id}`}
        style={{ visibility: "visible" }}
      >
        <div
          className="accordion-body text-[16px] text-[#88787e] font-medium leading-[28px] px-5"
        >
          {response}
        </div>
      </div>
      <div className="border-b-[1px] border-[#656565] opacity-10"></div>
    </div>
    // <div className="accordion-item">
    //   <h2 className="accordion-header" id={`heading${id}`}>
    //     <button
    //       className="accordion-button"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target={`#collapse${id}`}
    //       aria-expanded="true"
    //       aria-controls={`#collapse${id}`}
    //     >
    //       Accordion Item #1
    //     </button>
    //   </h2>
    //   <div
    //     id={`collapse${id}`}
    //     className="accordion-collapse collapse show"
    //     aria-labelledby={`heading${id}`}
    //     data-bs-parent="#accordionExample"
    //     style={{ visibility: "visible" }}
    //   >
    //     <div className="accordion-body">
    //       <strong>This is the first item's accordion body.</strong> It is shown
    //       by default, until the collapse plugin adds the appropriate classes
    //       that we use to style each element. These classes control the overall
    //       appearance, as well as the showing and hiding via CSS transitions. You
    //       can modify any of this with custom CSS or overriding our default
    //       variables. It's also worth noting that just about any HTML can go
    //       within the <code>.accordion-body</code>, though the transition does
    //       limit overflow.
    //     </div>
    //   </div>
    // </div>
  );
};

export default Tab;
