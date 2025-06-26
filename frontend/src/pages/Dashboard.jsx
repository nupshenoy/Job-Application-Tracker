import { LuFilter } from "react-icons/lu";
import React, { useState, useEffect } from "react";
import { useJobs } from "../context/JobContext";
import EditJob from "./EditJob";
import JobTable from "../components/JobTable";
import FiltersModal from "../components/FiltersModal";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../components/SearchBar";
import FilterChips from "../components/FilterChips";

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

  //Pagination Data
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const handleClearFilters = () =>
    setFilters({
      status: [],
      company: [],
      role: [],
      dateFrom: "",
      dateTo: "",
      keyword: "",
    });

  //Filtered Jobs
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

  //Pagination Data
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

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

  //Resets pagination to page 1 when filters are modified
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-6">
      
      {/* Search and Filters Row */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <SearchBar
          keyword={filters.keyword}
          setKeyword={(value) =>
            setFilters((prev) => ({ ...prev, keyword: value }))
          }
        />

        <button
          onClick={() => setIsFiltersModalOpen(true)}
          className="bg-white flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 py-3 px-3 rounded-md text-sm font-medium cursor-pointer"
        >
          <LuFilter />
        </button>

       {/* <FilterChips
  filters={filters}
  removeFilter={removeFilter}
  showAllChips={showAllChips}
  setShowAllChips={setShowAllChips}
  handleClearFilters={handleClearFilters}
  getChipColorClass={getChipColorClass}
/> */}

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
      <div className="mb-2 mx-2 text-sm text-gray-600 font-semibold">
        Showing {filteredJobs.length} job{filteredJobs.length !== 1 && "s"}
      </div>

      {/* Table */}
      <JobTable
        jobs={currentJobs}
        onEdit={openEditModal}
        onDelete={deleteJob}
        onStatusChange={updateJobStatus}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
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
