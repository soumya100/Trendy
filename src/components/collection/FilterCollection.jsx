import React from 'react'

const FilterCollection = ({
    title,
    filters,
    showFilter,
    extraContainerCls
}) => {
  return (
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "block" : "hidden"
          } sm:block ${extraContainerCls}`}
        >
          <p className="font-medium text-sm mb-3">
            {title}
          </p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {filters.map((category, idx) => (
              <p key={idx} className="flex gap-2">
                <label
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    className="w-3"
                    type="checkbox"
                    value={category.value}
                  />
                  {category.label}
                </label>
              </p>
            ))}
          </div>
        </div>
  )
}

export default FilterCollection
