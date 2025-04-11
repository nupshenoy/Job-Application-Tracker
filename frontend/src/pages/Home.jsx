import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios"
import EditJob from './EditJob';

const Home = () => {

  const [jobs, setJobs] = useState([]);

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

  const handleStatusChange = (id, newStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, status: newStatus } : job
      )
    );
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

  return (
    <div>
      <div className="container mx-auto mt-10 px-4 py-6">

        {/* Filter Controls */}
        <div className="flex items-center mb-6">
          {/* Status Filter */}
          <div className="flex items-center mr-3 ">
            <label htmlFor="statusFilter" className="mr-2 text-black">Status:</label>
            <select
              id="statusFilter"
              // value={statusFilter}
              // onChange={handleStatusFilterChange}
              className="bg-gray-500 text-white px-4 py-2 rounded"
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
            <label htmlFor="dateFilter" className="mr-2 text-black">Date:</label>
            <input
              id="dateFilter"
              type="date"
              // value={dateFilter}
              // onChange={handleDateFilterChange}
              className="bg-gray-500 text-white border-black-[2px] px-4 py-2 rounded"
            />
          </div>

          {/* add job button */}
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
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800 text-white py-3">
                <th className="px-4 py-2 border-b border-gray-600 text-center">Company</th>
                <th className="px-4 py-2 border-b border-gray-600 text-center">Role</th>
                <th className="px-4 py-2 border-b border-gray-600 text-center">Status</th>
                <th className="px-4 py-2 border-b border-gray-600 text-center">Application Date</th>
                <th className="px-4 py-2 border-b border-gray-600 text-center">Link</th>
                <th className="px-4 py-2 border-b border-gray-600 text-center">Options</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="bg-gray-700 text-white">
                  <td className="px-4 py-2 border-b border-gray-600 text-center">{job.company}</td>
                  <td className="px-4 py-2 border-b border-gray-600 text-center">{job.role}</td>
                  <td className="px-4 py-2 border-b border-gray-600 text-center ">
                    <select
                      value={job.status}
                      onChange={(e) => handleStatusChange(job.id, e.target.value)}
                      className={`text-white cursor-pointer border border-gray-600 rounded-2xl px-2 py-1 ${getStatusClass(job.status)}`}
                    >
                      <option value="Applied" className="bg-pink-500 ">Applied</option>
                      <option value="Interview" className="bg-yellow-500">Interview</option>
                      <option value="Offer" className="bg-green-500">Offer</option>
                      <option value="Rejected" className="bg-red-500">Rejected</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b border-gray-600 text-center">
                    {new Date(job.applicationDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-600 text-center">
                    <a
                      href={job.link}
                      className="text-teal-400 hover:text-teal-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </td>
                  <td className="px-4 py-2 border-b border-gray-600 text-center ">
                    <button onClick={() => openEditModal(job)} className="bg-blue-500 text-white px-3 py-1 mx-2 rounded cursor-pointer">
                      E
                    </button>
                    <button onClick={() => handleDelete(job._id)} className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer">
                      D
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div >
    </div>
  )
}

export default Home
