import React from "react";

const ProductSort = ({ sortOptions }) => {
  return (
    <div className="relative inline-block">
      <select
        className="appearance-none border border-gray-300 text-sm font-medium text-gray-700 
               bg-white px-4 py-2 pr-10 rounded-md shadow-sm 
               hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300
               transition-all cursor-pointer"
        defaultValue=""
      >
        <option disabled value="">
          Sort by
        </option>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom Dropdown Arrow */}
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
};

export default ProductSort;
