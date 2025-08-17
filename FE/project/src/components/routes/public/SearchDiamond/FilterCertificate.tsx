import React from "react";
import { MdOutlineCheck } from "react-icons/md";

type Props = {
  certificateIncluded: boolean;
  setCertificateIncluded: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilterCertificate: React.FC<Props> = React.memo(
  ({ certificateIncluded, setCertificateIncluded }) => {
    return (
      <div
        className="Certificate d-flex justify-content-start align-items-center"
        onClick={() => {
          setCertificateIncluded(!certificateIncluded);
        }}
      >
        <div>
          {certificateIncluded ? (
            <span className="true">
              <MdOutlineCheck />
            </span>
          ) : (
            <div className="checkmark-class"></div>
          )}
        </div>
        <div>
          <h4 className="text-[20px] font-medium">Certificate</h4>
          <p className="text-[14px]">(GIA only)</p>
        </div>
      </div>
    );
  }
);

export default FilterCertificate;
