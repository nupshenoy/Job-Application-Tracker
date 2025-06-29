import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import MultiSelectAccordion from "./MultiselectAccordion";

const statusOptions = ["Applied", "Interview", "Offer", "Rejected"];
const jobTypeOptions = ["Remote", "Hybrid", "On-site"];
// jobTypeOptions.unshift("");

const FiltersModal = ({ jobs, filters, setFilters, onClose, onClear }) => {
  const unique = (arr) => {
    const map = new Map();
    arr.forEach((x) => {
      if (!x) return;
      const key = x.toLowerCase();
      if (!map.has(key)) map.set(key, x);
    });
    return [...map.values()];
  };
  const companies = unique(jobs.map((j) => j.company));
  const roles = unique(jobs.map((j) => j.role));
  const locations = unique(jobs.map((j) => j.location));

  //keep local draft so user can cancel (Local Filters)
  const [draft, setDraft] = useState(filters);
  useEffect(() => setDraft(filters), [filters]);

  const toggleArrVal = (key, val) =>
    setDraft((p) => ({
      ...p,
      [key]: p[key].includes(val)
        ? p[key].filter((v) => v !== val)
        : [...p[key], val],
    }));

  const handleRange = (e) =>
    setDraft({ ...draft, [e.target.name]: e.target.value });

  const getStatusClasses = (status) => {
    const base = "px-3 py-1 rounded border text-sm cursor-pointer";
    const selected = draft.status.includes(status);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-xl p-6 space-y-6">
        {/* close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-2xl text-gray-500 hover:text-black cursor-pointer"
        >
          <IoCloseOutline />
        </button>

        <h2 className="text-2xl font-semibold border-b pb-3">
          Advanced Filters
        </h2>

        {/* STATUS */}
        <div className="border-b border-gray-300 pb-4">
          <p className="font-medium mb-2">Status</p>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((s) => (
              <button
                key={s}
                onClick={() => toggleArrVal("status", s)}
                className={getStatusClasses(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* JOB TYPE */}
        <div className="border-b border-gray-300  pb-4">
          <p className="font-medium mb-2">Job Type</p>
          <div className="flex flex-wrap gap-2">
            {jobTypeOptions.map((jt) => (
              <button
                key={jt || "unspecified"}
                onClick={() => toggleArrVal("jobType", jt)}
                className={`cursor-pointer px-3 py-1 rounded border text-sm ${
                  draft.jobType.includes(jt)
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
              >
                {jt || "Unspecified"}
              </button>
            ))}
          </div>
        </div>

        {/* COMPANY / ROLE / LOCATION lists */}
        <MultiSelectAccordion
          label="Companies"
          list={companies}
          filterKey="company"
          selected={draft.company}
          onToggleItem={toggleArrVal}
        />

        <MultiSelectAccordion
          label="Roles"
          list={roles}
          filterKey="role"
          selected={draft.role}
          onToggleItem={toggleArrVal}
        />

        <MultiSelectAccordion
          label="Locations"
          list={locations}
          filterKey="location"
          selected={draft.location}
          onToggleItem={toggleArrVal}
        />

        {/* DATE RANGE */}
        <div className="grid grid-cols-2 gap-4  pt-4">
          <div>
            <label className="block text-sm font-medium mb-1">From</label>
            <input
              type="date"
              name="dateFrom"
              value={draft.dateFrom}
              onChange={handleRange}
              className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <input
              type="date"
              name="dateTo"
              value={draft.dateTo}
              onChange={handleRange}
              className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
          </div>
        </div>

        {/* SALARY RANGE */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Min Salary</label>
            <input
              type="number"
              name="salaryMin"
              value={draft.salaryMin}
              onChange={(e) =>
                setDraft((p) => ({ ...p, salaryMin: e.target.value }))
              }
              className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              placeholder="e.g. 50000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max Salary</label>
            <input
              type="number"
              name="salaryMax"
              value={draft.salaryMax}
              onChange={(e) =>
                setDraft((p) => ({ ...p, salaryMax: e.target.value }))
              }
              className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              placeholder="e.g. 200000"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between pt-4">
          <button
            onClick={onClear}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded cursor-pointer"
          >
            Clear
          </button>
          <button
            onClick={() => {
              setFilters(draft);
              onClose();
            }}
            className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
