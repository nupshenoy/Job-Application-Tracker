import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="bg-white shadow-md py-3 px-4 flex justify-center items-center gap-2 z-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md text-md  bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
      >
        &lt;
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-3 py-1 rounded-md text-sm cursor-pointer  ${
            currentPage === index + 1
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md text-md  bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
