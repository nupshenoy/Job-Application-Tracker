// FiltersModal.jsx
import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

const FiltersModal = ({ filters, setFilters, onClose, onClear, jobs = [] }) => {
  const statuses = ["Applied", "Interview", "Offer", "Rejected"];

  const normalize = (arr) => {
    const map = new Map();
    for (const item of arr.filter(Boolean)) {
      const key = item.toLowerCase();
      if (!map.has(key)) map.set(key, item);
    }
    return [...map.values()];
  };

  const allCompanies = normalize(jobs.map((j) => j.company));
  const allRoles = normalize(jobs.map((j) => j.role));

  const [localFilters, setLocalFilters] = useState(filters);
  const [showCompanyList, setShowCompanyList] = useState(false);
  const [showRoleList, setShowRoleList] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const toggleStatus = (status) => {
    setLocalFilters((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status],
    }));
  };

  const toggleCompany = (company) => {
    setLocalFilters((prev) => ({
      ...prev,
      company: prev.company.includes(company)
        ? prev.company.filter((c) => c.toLowerCase() !== company.toLowerCase())
        : [...prev.company, company],
    }));
  };

  const toggleRole = (role) => {
    setLocalFilters((prev) => ({
      ...prev,
      role: prev.role.includes(role)
        ? prev.role.filter((r) => r.toLowerCase() !== role.toLowerCase())
        : [...prev.role, role],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };

  const getStatusClasses = (status) => {
    const base = "px-3 py-1 rounded border text-sm cursor-pointer";
    const selected = localFilters.status.includes(status);

    const colorMap = {
      Applied: "bg-blue-600 text-white border-blue-600",
      Interview: "bg-yellow-500 text-white border-yellow-500",
      Offer: "bg-green-600 text-white border-green-600",
      Rejected: "bg-red-600 text-white border-red-600",
    };

    const selectedClass =
      colorMap[status] || "bg-gray-500 text-white border-gray-500";

    return selected
      ? `${base} ${selectedClass}`
      : `${base} bg-gray-100 text-gray-700 border-gray-300`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] overflow-auto">
      <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl cursor-pointer"
        >
          <IoCloseOutline />
        </button>

        <h2 className="text-2xl font-semibold border-b border-gray-300 pb-4">Advanced Filters</h2>

        {/* Status Checkboxes */}
        <div className="border-b border-gray-300 pb-4">
          <p className="font-medium mb-2">Status</p>
          <div className="flex flex-wrap gap-4">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => toggleStatus(status)}
                className={getStatusClasses(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Companies Accordion */}
        <div className="border-b border-gray-300 pb-4">
          <button
            onClick={() => setShowCompanyList(!showCompanyList)}
            className="font-medium mb-2 text-left w-full cursor-pointer"
          >
            {showCompanyList ? "▼ Companies" : "▶ Companies"}
          </button>
          {showCompanyList && (
            <div className="pl-4 space-y-2 max-h-40 overflow-y-auto border-l">
              {allCompanies.map((company) => (
                <button
                  key={company}
                  onClick={() => toggleCompany(company)}
                  className={`block w-full text-left px-3 py-1 rounded text-sm cursor-pointer ${
                    localFilters.company.some(
                      (c) => c.toLowerCase() === company.toLowerCase()
                    )
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {company}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Roles Accordion */}
        <div className="border-b border-gray-300 pb-4">
          <button
            onClick={() => setShowRoleList(!showRoleList)}
            className="font-medium mb-2 text-left w-full cursor-pointer"
          >
            {showRoleList ? "▼ Roles" : "▶ Roles"}
          </button>
          {showRoleList && (
            <div className="pl-4 space-y-2 max-h-40 overflow-y-auto border-l">
              {allRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => toggleRole(role)}
                  className={`block w-full text-left px-3 py-1 rounded text-sm cursor-pointer ${
                    localFilters.role.some(
                      (r) => r.toLowerCase() === role.toLowerCase()
                    )
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Range */}
        <div className="flex gap-6">
          <div className="flex-1">
            <label className="block mb-1 font-medium">From</label>
            <input
              type="date"
              name="dateFrom"
              value={localFilters.dateFrom}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">To</label>
            <input
              type="date"
              name="dateTo"
              value={localFilters.dateTo}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-6">
          <button
            onClick={onClear}
            className="bg-gray-100 text-black px-5 py-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
