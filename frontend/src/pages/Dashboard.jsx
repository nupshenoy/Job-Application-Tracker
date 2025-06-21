import React, { useState, useEffect } from "react";
import { useJobs } from "../context/JobContext"; 
import EditJob from "./EditJob";
import JobFilters from "../components/JobFilters";
import JobTable from "../components/JobTable";

const Home = () => {
  const {
    jobs,
    deleteJob,
    updateJobStatus,
    updateJob, 
  } = useJobs(); // from context

  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleStatusFilterChange = (e) => setStatusFilter(e.target.value);
  const handleDateFilterChange = (e) => setDateFilter(e.target.value);

  const getStatusClass = (status) => {
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
  };

  
  // console.log("jobs from context:", jobs);

  const filteredJobs = jobs.filter((job) => {
    const statusMatch = statusFilter ? job.status === statusFilter : true;
    const dateMatch = dateFilter
      ? job.applicationDate?.slice(0, 10) === dateFilter
      : true;
    return statusMatch && dateMatch;
  });

  // Edit modal
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

  return (
    // <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
          <JobFilters
            statusFilter={statusFilter}
            dateFilter={dateFilter}
            onStatusChange={handleStatusFilterChange}
            onDateChange={handleDateFilterChange}
          />
        </div>

        {/* Edit Modal */}
        <EditJob
          isOpen={isModalOpen}
          onClose={closeEditModal}
          jobData={editingJob}
          onUpdate={handleEditSubmit} // 
        />

        {/* Table */}
        <JobTable
          jobs={filteredJobs}
          onEdit={openEditModal}
          onDelete={deleteJob} 
          onStatusChange={updateJobStatus} 
          getStatusClass={getStatusClass}
        />
      </div>
    // </div>
  );
};

export default Home;
