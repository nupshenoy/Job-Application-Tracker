import React from "react";
import { IoSearchSharp, IoClose } from "react-icons/io5";

const SearchBar = ({ keyword, setKeyword }) => {
  return (
    <div className="relative w-1/3 min-w-[200px]">
      <IoSearchSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        placeholder="Search jobs by company or role..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="pl-10 pr-8 py-2 border border-gray-300 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
      />
      {keyword && (
        <IoClose
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={() => setKeyword("")}
        />
      )}
    </div>
  );
};

export default SearchBar;
