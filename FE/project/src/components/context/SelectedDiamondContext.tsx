import React, { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

export type _selectedJewellery = {
  shape: string;
  color: string;
  caret: number;
  price: number;
  jewellery_id: number;
  category: string;
  type: string;
  metal_id: number;
  external_metal_id: number;
  name?: string;
  addedValues?: any;
};

export type _selectedDiamond = {
  shape: string;
  color: string;
  caret: number;
  price: number;
  diamond_id: number;
};

export interface SelectedDiamondContextType {
  setSelectedJewellery: React.Dispatch<
    React.SetStateAction<_selectedJewellery>
  >;
  setSelectedDiamond: React.Dispatch<React.SetStateAction<_selectedDiamond>>;
  secondsetSelectedDiamond: React.Dispatch<React.SetStateAction<_selectedDiamond>>;
  selectedJewellery: _selectedJewellery;
  selectedDiamond: _selectedDiamond;
  secondselectedDiamond: _selectedDiamond;
  resetSelections: () => void;
}

const SelectedDiamondContext = createContext<SelectedDiamondContextType>({
  setSelectedJewellery: () => {},
  setSelectedDiamond: () => {},
  secondsetSelectedDiamond: () => {},
  resetSelections: () => {},
  selectedJewellery: {
    shape: "",
    color: "",
    caret: 0,
    price: 0,
    jewellery_id: 0,
    category: "",
    type: "",
    metal_id: 0,
    external_metal_id: 0,
  },
  selectedDiamond: {
    shape: "",
    color: "",
    caret: 0,
    price: 0,
    diamond_id: 0,
  },
  secondselectedDiamond: {
    shape: "",
    color: "",
    caret: 0,
    price: 0,
    diamond_id: 0,
  },
});

export default SelectedDiamondContext;

interface SelectedDiamondContextProviderProps {
  children: ReactNode;
}

const SelectedDiamondContextProvider: React.FC<
  SelectedDiamondContextProviderProps
> = ({ children }: SelectedDiamondContextProviderProps) => {
  const getDefaultJewellery = (): _selectedJewellery => ({
    shape: Cookies.get("jewellery_shape") || "",
    color: Cookies.get("jewellery_color") || "",
    caret: parseFloat(Cookies.get("jewellery_caret") || "0"),
    price: parseFloat(Cookies.get("jewellery_price") || "0"),
    jewellery_id: parseInt(Cookies.get("jewellery_id") || "0", 10),
    category: Cookies.get("jewellery_category") || "",
    type: Cookies.get("jewellery_type") || "",
    metal_id: parseFloat(Cookies.get("jewellery_metal_id") || "0"),
    external_metal_id: parseFloat(Cookies.get("jewellery_external_metal_id") || "0"),
    name: Cookies.get("jewellery_name") || "",
    addedValues: Cookies.get("jewellery_addedValues") || "",
  });

  const getDefaultDiamond = (): _selectedDiamond => ({
    shape: Cookies.get("diamond_shape") || "",
    color: Cookies.get("diamond_color") || "",
    caret: parseFloat(Cookies.get("diamond_caret") || "0"),
    price: parseFloat(Cookies.get("diamond_price") || "0"),
    diamond_id: parseInt(Cookies.get("diamond_id") || "0", 10),
  });

  const getSecondDefaultDiamond = (): _selectedDiamond => ({
    shape: Cookies.get("second_diamond_shape") || "",
    color: Cookies.get("second_diamond_color") || "",
    caret: parseFloat(Cookies.get("second_diamond_caret") || "0"),
    price: parseFloat(Cookies.get("second_diamond_price") || "0"),
    diamond_id: parseInt(Cookies.get("second_diamond_id") || "0", 10),
  });

  const [selectedJewellery, setSelectedJewellery] =
    useState<_selectedJewellery>(getDefaultJewellery);
  const [selectedDiamond, setSelectedDiamond] =
    useState<_selectedDiamond>(getDefaultDiamond);
  const [secondselectedDiamond, secondsetSelectedDiamond] =
    useState<_selectedDiamond>(getSecondDefaultDiamond);

  useEffect(() => {
    Cookies.set("jewellery_shape", selectedJewellery.shape);
    Cookies.set("jewellery_color", selectedJewellery.color);
    Cookies.set("jewellery_caret", selectedJewellery.caret.toString());
    Cookies.set("jewellery_price", selectedJewellery.price.toString());
    Cookies.set("jewellery_id", selectedJewellery.jewellery_id.toString());
    Cookies.set("jewellery_category", selectedJewellery.category.toString());
    Cookies.set("jewellery_type", selectedJewellery.type.toString());
    Cookies.set("jewellery_name", selectedJewellery.name ? selectedJewellery.name : "" );
    Cookies.set("jewellery_addedValues", selectedJewellery.addedValues ? selectedJewellery.addedValues : "" );
    Cookies.set("jewellery_metal_id", selectedJewellery.metal_id.toString());
    Cookies.set("jewellery_external_metal_id", selectedJewellery.external_metal_id.toString());
  }, [selectedJewellery]);

  useEffect(() => {
    Cookies.set("diamond_shape", selectedDiamond.shape);
    Cookies.set("diamond_color", selectedDiamond.color);
    Cookies.set("diamond_caret", selectedDiamond.caret.toString());
    Cookies.set("diamond_price", selectedDiamond.price.toString());
    Cookies.set("diamond_id", selectedDiamond.diamond_id.toString());
  }, [selectedDiamond]);

  useEffect(() => {
    Cookies.set("second_diamond_shape", secondselectedDiamond.shape);
    Cookies.set("second_diamond_color", secondselectedDiamond.color);
    Cookies.set("second_diamond_caret", secondselectedDiamond.caret.toString());
    Cookies.set("second_diamond_price", secondselectedDiamond.price.toString());
    Cookies.set("second_diamond_id", secondselectedDiamond.diamond_id.toString());
  }, [secondselectedDiamond]);

  const resetSelections = () => {
    setSelectedJewellery({
      shape: "",
      color: "",
      caret: 0,
      price: 0,
      jewellery_id: 0,
      category: "",
      type: "",
      metal_id: 0,
      addedValues: "",
      external_metal_id: 0,
    });
    setSelectedDiamond({
      shape: "",
      color: "",
      caret: 0,
      price: 0,
      diamond_id: 0,
    });
    secondsetSelectedDiamond({
      shape: "",
      color: "",
      caret: 0,
      price: 0,
      diamond_id: 0,
    });
    Cookies.remove("jewellery_shape");
    Cookies.remove("jewellery_color");
    Cookies.remove("jewellery_caret");
    Cookies.remove("jewellery_price");
    Cookies.remove("jewellery_id");
    Cookies.remove("jewellery_name");
    Cookies.remove("jewellery_addedValues");
    Cookies.remove("jewellery_category");
    Cookies.remove("jewellery_external_metal_id");
    Cookies.remove("jewellery_metal_id");
    Cookies.remove("diamond_shape");
    Cookies.remove("diamond_color");
    Cookies.remove("diamond_caret");
    Cookies.remove("diamond_price");
    Cookies.remove("diamond_id");
    Cookies.remove("second_diamond_shape");
    Cookies.remove("second_diamond_color");
    Cookies.remove("second_diamond_caret");
    Cookies.remove("second_diamond_price");
    Cookies.remove("second_diamond_id");
  };

  return (
    <SelectedDiamondContext.Provider
      value={{
        selectedJewellery,
        setSelectedJewellery,
        selectedDiamond,
        setSelectedDiamond,
        resetSelections,
        secondselectedDiamond,
        secondsetSelectedDiamond,
      }}
    >
      {children}
    </SelectedDiamondContext.Provider>
  );
};

export { SelectedDiamondContextProvider };
