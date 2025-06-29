// components/FilterToolbar.jsx
import React from "react";
import { LuFilter } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

const FilterToolbar = ({
  keyword,
  setKeyword,
  onOpenModal,
  hasActiveFilters,
  onClearFilters,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <SearchBar keyword={keyword} setKeyword={setKeyword} />

      <button
        onClick={onOpenModal}
        className="bg-white flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 py-3 px-3 rounded-md text-sm font-medium cursor-pointer"
      >
        <LuFilter />
      </button>

      {hasActiveFilters && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={onClearFilters}
          className="flex items-center gap-1 px-3 py-1 rounded-full text-sm border font-medium cursor-pointer bg-gray-200 text-gray-600 hover:bg-gray-300"
        >
          Clear All <IoClose className="text-xs" />
        </motion.button>
      )}
    </div>
  );
};

export default FilterToolbar;
