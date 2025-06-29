import { useState } from "react";


const MultiSelectAccordion = ({
  label,
  list,
  filterKey,
  selected,
  onToggleItem,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left font-medium select-none cursor-pointer"
      >
        {open ? "▼" : "▶"} {label}
      </button>

      {open && (
        <div className="pl-4 mt-2 max-h-40 overflow-y-auto space-y-1">
          {list.map((item) => {
            const isActive = selected.includes(item);
            return (
              <button
                type="button"
                key={item}
                onClick={() => onToggleItem(filterKey, item)}
                className={`block w-full text-left text-sm rounded px-3 py-1 cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelectAccordion;