import React from "react";

export default function FilterCollection({
  title,
  filters = [],
  selected = [],
  handleChange,
  extraContainerCls = ""
}) {
  return (
    <div className={`my-4 ${extraContainerCls}`}>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>

      <div className="flex flex-col gap-2">
        {filters.map((item) => {
          const value = item.value.toLowerCase(); // ensure consistency
          const isChecked = selected.includes(value);

          return (
            <label
              key={value}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                value={value}
                checked={isChecked}            // ✔ controlled checkbox
                onChange={handleChange}        // ✔ updates state + URL
                className="h-4 w-4 cursor-pointer"
              />

              <span className="text-sm">{item.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
