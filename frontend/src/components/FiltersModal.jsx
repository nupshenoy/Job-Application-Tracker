import React from "react";

const FiltersModal = ({ isOpen, onClose, filters, setFilters }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClearAll = () => {
    setFilters({
      status: "",
      applicationDate: "",
      company: "",
      role: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
        {/* Top Close (X) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Advanced Filters</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-white mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">All</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-white mb-1">Application Date</label>
            <input
              type="date"
              name="applicationDate"
              value={filters.applicationDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-white mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={filters.company}
              onChange={handleChange}
              placeholder="e.g. Google"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-white mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={filters.role}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={handleClearAll}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
