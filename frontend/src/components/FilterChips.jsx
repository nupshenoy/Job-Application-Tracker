import React from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const FilterChips = ({
  filters,
  setFilters,
  showAllChips,
  setShowAllChips,
}) => {
 
  const arrays = [
    ["status", filters.status],
    ["company", filters.company],
    ["role", filters.role],
    ["location", filters.location],
    ["jobType", filters.jobType],
  ];

  const salaryChips = [];
if (filters.salaryMin) salaryChips.push({ key: "salaryMin", val: `Min ₹${filters.salaryMin}` });
if (filters.salaryMax) salaryChips.push({ key: "salaryMax", val: `Max ₹${filters.salaryMax}` });


  const allChips = [
  ...arrays.flatMap(([key, arr]) => arr.map((v) => ({ key, val: v }))),
  ...salaryChips,
];

  const visible = showAllChips ? allChips : allChips.slice(0, 6);

  const removeChip = (key, val) => {
  if (key === "salaryMin" || key === "salaryMax") {
    setFilters((prev) => ({ ...prev, [key]: "" }));
  } else {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].filter((v) => v !== val),
    }));
  }
};

  /* chip colour logic */
  const chipClass = (key, val) => {
    const baseStyles = "px-3 py-1 rounded-full text-xs border font-medium";

    if (key === "status") {
      return (
        {
          Applied:
            "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200",
          Interview:
            "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200",
          Offer:
            "bg-green-100 text-green-800 border-green-300 hover:bg-green-200",
          Rejected: "bg-red-100 text-red-800 border-red-300 hover:bg-red-200",
        }[val] || "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
      );
    }

    if (key === "jobType") {
      return (
        {
          "": "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200", // unspecified
          Remote:
            "bg-indigo-100 text-indigo-800 border-indigo-300 hover:bg-indigo-200",
          Hybrid: "bg-teal-100 text-teal-800 border-teal-300 hover:bg-teal-200",
          "On-site":
            "bg-pink-100 text-pink-800 border-pink-300 hover:bg-pink-200",
        }[val] || "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
      );
    }

    if (key === "salaryMin" || key === "salaryMax") {
  return "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200";
}

    const categoryColors = {
      company: "bg-rose-100 text-rose-800 border-rose-300 hover:bg-rose-200",
      role: "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200",
      location:
        "bg-green-100 text-green-800 border-green-300 hover:bg-green-200",
    };

    return (
      categoryColors[key] ||
      "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
    );
  };

 
  if (allChips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4 items-center">
      <AnimatePresence>
        {visible.map(({ key, val }) => (
          <motion.button
            key={key + val}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            onClick={() => removeChip(key, val)}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs border cursor-pointer font-medium transition ${chipClass(
              key,
              val
            )}`}
          >
            {val}
            <IoClose className="text-xs" />
          </motion.button>
        ))}
      </AnimatePresence>

      {allChips.length > 6 && (
        <button
          onClick={() => setShowAllChips(!showAllChips)}
          className="text-sm text-blue-500 hover:underline cursor-pointer"
        >
          {showAllChips ? "Show Less" : `+${allChips.length - 6} more`}
        </button>
      )}
    </div>
  );
};

export default FilterChips;
