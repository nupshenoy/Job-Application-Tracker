// JobFilters.jsx
import React from 'react';

import { IoFilter } from "react-icons/io5";

const JobFilters = ({
  statusFilter,
  dateFilter,
  onStatusChange,
  onDateChange,
}) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center mr-3 ">
            <label htmlFor="statusFilter" className="m-3 text-md"><IoFilter /> </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={onStatusChange}
              className=" shadow-sm border border-blue-800 text-sm font-bold text-left text-gray-700 uppercase px-4 py-2 rounded cursor-pointer"
            >
              <option value="">All</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex items-center">
            {/* <label htmlFor="dateFilter" className="mr-2 text-black font-bold">Date:</label> */}
            <input
              id="dateFilter"
              type="date"
              value={dateFilter}
              onChange={onDateChange}
              className="shadow-sm border border-blue-800 text-sm font-bold px-4 py-2 rounded cursor-pointer"
            />
          </div>
    </div>
  );
};

export default JobFilters;
