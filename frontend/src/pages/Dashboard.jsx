import React, { useState } from "react";
import { useJobs } from "../context/JobContext";
import EditJob from "./EditJob";
import JobTable from "../components/JobTable";
import FiltersModal from "../components/FiltersModal";
import { IoFilterSharp } from "react-icons/io5";

const Home = () => {
  const { jobs, deleteJob, updateJobStatus, updateJob } = useJobs();

  // Filters
  const [filters, setFilters] = useState({
    status: "",
    applicationDate: "",
    company: "",
    role: "",
  });

  const filteredJobs = jobs.filter((job) => {
    const statusMatch = filters.status ? job.status === filters.status : true;
    const dateMatch = filters.applicationDate
      ? job.applicationDate?.slice(0, 10) === filters.applicationDate
      : true;
    const companyMatch = filters.company
      ? job.company?.toLowerCase().includes(filters.company.toLowerCase())
      : true;
    const roleMatch = filters.role
      ? job.role?.toLowerCase().includes(filters.role.toLowerCase())
      : true;

    return statusMatch && dateMatch && companyMatch && roleMatch;
  });

  // Modal logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

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

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setIsFiltersModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <IoFilterSharp />
             Filters
            </div>
          </button>
          <button
            onClick={() =>
              setFilters({
                status: "",
                applicationDate: "",
                company: "",
                role: "",
              })
            }
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Filters Modal */}
      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />

      {/* Edit Modal */}
      <EditJob
        isOpen={isModalOpen}
        onClose={closeEditModal}
        jobData={editingJob}
        onUpdate={handleEditSubmit}
      />

      {/* Job Table */}
      {filteredJobs.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No jobs found with the applied filters.
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Home;
