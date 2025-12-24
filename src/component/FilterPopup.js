import React from "react";
import { useFilter } from "../context/FilterContext";

export default function FilterPopup({ onClose }) {
  const {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange
  } = useFilter();

  const categories = [
    "all",
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration"
  ];

  return (
    <div className="filter-overlay">
      <div className="filter-box">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Filters</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        {/* CATEGORY FILTER */}
        <div className="mb-4">
          <label className="fw-semibold">Category</label>
          <select
            className="form-select mt-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* PRICE FILTER */}
        <div className="mb-4">
          <label className="fw-semibold">
            Max Price: ₹{priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            className="form-range"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([0, Number(e.target.value)])
            }
          />
        </div>

        {/* ACTION BUTTON */}
        <button
          className="btn btn-dark w-100"
          onClick={onClose}
        >
          Apply Filters
        </button>

      </div>
    </div>
  );
}
