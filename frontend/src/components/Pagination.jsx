import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="bg-white shadow-md py-1 flex justify-center items-center gap-2 z-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white cursor-pointer"
      >
        &lt;
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-3 py-1 rounded-md text-xs cursor-pointer  ${
            currentPage === index + 1
              ? "text-green-600 font-semibold text-decoration-line"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md text-sm  bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white cursor-pointer"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
