import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios"
import EditJob from './EditJob';
import { FaTrashAlt } from "react-icons/fa";

import AddButton from '../components/AddButton';
import JobFilters from '../components/JobFilters';
import JobTable from '../components/JobTable';

const Home = () => {

  const [jobs, setJobs] = useState([]);


  // Get All Jobs
  useEffect(() => {
    axios
      .get('http://localhost:5000/jobs')
      .then((res) => {
        setJobs(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])


  // Status Dropdown

  const handleStatusChange = (id, newStatus) => {
    axios.patch(`http://localhost:5000/jobs/${id}`, { status: newStatus })
      .then(() => {
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === id ? { ...job, status: newStatus } : job
          )
        );
      })
      .catch((error) => {
        console.log("Failed to update status:", error.message);
      });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Applied":
        return "bg-pink-500";
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

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/jobs/${id}`)
      .then(() => {
        console.log("Successfully deleted job")
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
      })
      .catch((err) => {
        console.log(err.message)
      })
  }



  // Edit Modal

  const [editingJob, setEditingJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openEditModal = (job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };



  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  const filteredJobs = jobs.filter((job) => {
    const statusMatch = statusFilter ? job.status === statusFilter : true;
    const dateMatch = dateFilter ? job.applicationDate?.slice(0, 10) === dateFilter : true;
    return statusMatch && dateMatch;
  });



  return (
    <div>
      <div className="container mx-auto mt-10 px-4 py-6">
        {/* Filter Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center ">
            <JobFilters
              statusFilter={statusFilter}
              dateFilter={dateFilter}
              onStatusChange={handleStatusFilterChange}
              onDateChange={handleDateFilterChange}
            />
          </div>
          {/* Add Job Button */}
          <AddButton />
        </div>

        {/* Edit Modal */}
        <EditJob
          isOpen={isModalOpen}
          onClose={closeEditModal}
          jobData={editingJob}
          onUpdate={() => {
            // re-fetch jobs
            axios.get('http://localhost:5000/jobs').then(res => setJobs(res.data.data));
          }}
        />

        {/* Table */}
        <JobTable
          jobs={filteredJobs}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          getStatusClass={getStatusClass}
        />

      </div >
    </div>
  )
}

export default Home
