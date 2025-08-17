import React from "react";

const OriginsDiamonds: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-[#201f41] sm:text-[30px] font-normal italic text-[30px] md:text-[60px] text-center">
        Origins of Diamonds
      </h1>
      <div
        className="text-[14px] 2xl:text-[16px] md:text-[16px] md:leading-[30px] leading-[26px] text-center font-medium text-[#53556b] mt-10"
        style={{ textShadow: "0 0 0 rgba(0, 0, 0, 0.5)" }}
      >
        <p className="pb-[16px]">
          Diamond is a solid form of the element carbon with its atoms arranged
          in a crystal structure called diamond cubic. At certain temperature
          and pressure, another solid form of carbon known as graphite is the
          chemically stable form, but diamond almost never converts to it.
          Diamond has the highest hardness and thermal conductivity of any
          natural material, properties that are utilized in major industrial
          applications such as cutting and polishing tools. They are also the
          reason that diamond anvil cells can subject materials to pressures
          found deep in the Earth.
        </p>
        <p className="pb-[16px]">
          Because the arrangement of atoms in diamond is extremely rigid, few
          types of impurity can contaminate it (two exceptions being boron and
          nitrogen). Small numbers of defects or impurities (about one per
          million of lattice atoms) color diamond blue (boron), yellow
          (nitrogen), brown (defects), green (radiation exposure), purple, pink,
          orange, or red. Diamond also has relatively high optical dispersion
          (ability to disperse light of different colors).
        </p>
        <p className="pb-[16px]">
          Most natural diamonds have ages between 1 billion and 3.5 billion
          years. Most were formed at depths between 150 and 250 kilometers (93
          and 155 mi) in the Earth's mantle, although a few have come from as
          deep as 800 kilometers (500 mi). Under high pressure and temperature,
          carbon-containing fluids dissolved minerals and replaced them with
          diamonds. Much more recently (tens to hundreds of million years ago),
          they were carried to the surface in volcanic eruptions and deposited
          in igneous rocks known as kimberlites and lamproites. Approximately
          70% of the world’s diamonds come from Africa, and the remaining 30%
          comes from other parts of the world in locations such as Canada,
          Australia, and Russia.
        </p>
        <p className="text-[#666]">
          Once a diamond stone is certified by a reputable certification lab,
          its geographical origin becomes irrelevant, what matters is the
          specifications of the stone as certified by the lab.
        </p>
      </div>
    </div>
  );
};

export default OriginsDiamonds;
