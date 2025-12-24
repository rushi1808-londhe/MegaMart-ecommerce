import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100000]);

  return (
    <FilterContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
