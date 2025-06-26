import { LuFilter } from "react-icons/lu";
import React, { useState } from "react";
import { useJobs } from "../context/JobContext";
import EditJob from "./EditJob";
import JobTable from "../components/JobTable";
import FiltersModal from "../components/FiltersModal";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";


const Home = () => {
  const { jobs, deleteJob, updateJobStatus, updateJob } = useJobs();

  // Filters state
  const [filters, setFilters] = useState({
    status: [],
    company: [],
    role: [],
    dateFrom: "",
    dateTo: "",
    keyword: "",
  });

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [showAllChips, setShowAllChips] = useState(false);

  const handleClearFilters = () =>
    setFilters({
      status: [],
      company: [],
      role: [],
      dateFrom: "",
      dateTo: "",
      keyword: "",
    });

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(job.status);

    const matchesCompany =
      filters.company.length === 0 ||
      filters.company.some(
        (c) => c.toLowerCase() === job.company.toLowerCase()
      );
    const matchesRole =
      filters.role.length === 0 ||
      filters.role.some((r) => r.toLowerCase() === job.role.toLowerCase());

    const jobDate = job.applicationDate?.slice(0, 10);
    const matchesDateFrom = filters.dateFrom
      ? jobDate >= filters.dateFrom
      : true;
    const matchesDateTo = filters.dateTo ? jobDate <= filters.dateTo : true;

    const keyword = filters.keyword.toLowerCase();
    const matchesKeyword =
      keyword === "" ||
      job.company.toLowerCase().includes(keyword) ||
      job.role.toLowerCase().includes(keyword);

    return (
      matchesStatus &&
      matchesCompany &&
      matchesRole &&
      matchesDateFrom &&
      matchesDateTo &&
      matchesKeyword
    );
  });

  // Edit Modal state
  const [editingJob, setEditingJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openEditModal = (job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingJob(null);
    setIsModalOpen(false);
  };

  const handleEditSubmit = async (id, updatedData) => {
    await updateJob(id, updatedData);
    closeEditModal();
  };

  const removeFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((v) => v !== value),
    }));
  };

  const getChipColorClass = (value, type) => {
    if (type === "status") {
      switch (value) {
        case "Applied":
          return "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200";
        case "Interview":
          return "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200";
        case "Offer":
          return "bg-green-100 text-green-800 border-green-300 hover:bg-green-200";
        case "Rejected":
          return "bg-red-100 text-red-800 border-red-300 hover:bg-red-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200";
      }
    }

    const hash = [...value].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      "bg-indigo-100 text-indigo-800 border-indigo-300 hover:bg-indigo-200",
      "bg-pink-100 text-pink-800 border-pink-300 hover:bg-pink-200",
      "bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200",
      "bg-teal-100 text-teal-800 border-teal-300 hover:bg-teal-200",
    ];
    return colors[hash % colors.length];
  };

  const chips = [...filters.status, ...filters.company, ...filters.role];
  const visibleChips = showAllChips ? chips : chips.slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Search and Filters Row */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="relative w-1/3 min-w-[200px]">
          <IoSearchSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search jobs by company or role..."
            value={filters.keyword || ""}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, keyword: e.target.value }))
            }
            className=" bg-white pl-10 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
          />
          {filters.keyword && (
            <IoClose
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setFilters((prev) => ({ ...prev, keyword: "" }))}
            />
          )}
        </div>

        <button
          onClick={() => setIsFiltersModalOpen(true)}
          className="bg-white flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 py-3 px-3 rounded-md text-sm font-medium cursor-pointer"
        >
          <LuFilter />
        </button>

        {(filters.status.length > 0 ||
          filters.company.length > 0 ||
          filters.role.length > 0 ||
          filters.dateFrom ||
          filters.dateTo) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={handleClearFilters}
            className="flex items-center gap-1 px-3 py-1 rounded-full text-sm border font-medium cursor-pointer bg-gray-200 text-gray-600 hover:bg-gray-300"
          >
            Clear All <IoClose className="text-xs" />
          </motion.button>
        )}
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <AnimatePresence>
          {visibleChips.map((val) => {
            const type = filters.status.includes(val)
              ? "status"
              : filters.company.includes(val)
              ? "company"
              : "role";
            return (
              <motion.button
                key={type + val}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs border cursor-pointer font-medium transition ${getChipColorClass(
                  val,
                  type
                )}`}
                onClick={() => removeFilter(type, val)}
              >
                {val} <IoClose className="text-xs" />
              </motion.button>
            );
          })}
        </AnimatePresence>

        {chips.length > 4 && (
          <button
            onClick={() => setShowAllChips(!showAllChips)}
            className="text-sm text-blue-400 hover:underline cursor-pointer"
          >
            {showAllChips ? "Show Less" : `+${chips.length - 4} more`}
          </button>
        )}
      </div>

     
      {/* Filters Modal */}
      {isFiltersModalOpen && (
        <FiltersModal
          filters={filters}
          setFilters={setFilters}
          onClose={() => setIsFiltersModalOpen(false)}
          onClear={handleClearFilters}
          jobs={jobs}
        />
      )}


      {/* Edit Modal */}
      <EditJob
        isOpen={isModalOpen}
        onClose={closeEditModal}
        jobData={editingJob}
        onUpdate={handleEditSubmit}
      />

      {/* Job Count */}
<div className="mb-2 mx-1 text-sm text-gray-600 font-semibold">
  Showing {filteredJobs.length} job{filteredJobs.length !== 1 && "s"}
</div>

      {/* Table */}
      <JobTable
        jobs={filteredJobs}
        onEdit={openEditModal}
        onDelete={deleteJob}
        onStatusChange={updateJobStatus}
        getStatusClass={(status) => {
          switch (status) {
            case "Applied":
              return "bg-blue-500";
            case "Interview":
              return "bg-yellow-500";
            case "Offer":
              return "bg-green-500";
            case "Rejected":
              return "bg-red-500";
            default:
              return "bg-gray-500";
          }
        }}
      />
    </div>
  );
};

export default Home;
