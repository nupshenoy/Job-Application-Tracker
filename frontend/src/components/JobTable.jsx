import React from "react";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useJobs } from "../context/JobContext"; 

const JobTable = ({ jobs, onEdit, getStatusClass }) => {
  const {  deleteJob, updateJobStatus } = useJobs(); // Pull context data

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 overflow-hidden bg-white">
      <div className="max-h-[600px] overflow-y-auto">
      <table className="w-full text-sm text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-left dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Company</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Application Date</th>
            <th className="px-6 py-3">Link</th>
            <th className="px-6 py-3">Notes</th>
            <th className="px-6 py-3">Resume</th>
            <th className="px-6 py-3">Options</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length != 0 ? ( jobs.map((job) => (
            <tr
              key={job._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {job.company}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {job.role}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                <select
                  value={job.status}
                  onChange={(e) => updateJobStatus(job._id, e.target.value)} // direct call
                  className={`text-white cursor-pointer border border-gray-300 rounded-2xl px-2 py-1 ${getStatusClass(job.status)}`}
                >
                  <option value="Applied" className="bg-pink-500">Applied</option>
                  <option value="Interview" className="bg-yellow-500">Interview</option>
                  <option value="Offer" className="bg-green-500">Offer</option>
                  <option value="Rejected" className="bg-red-500">Rejected</option>
                </select>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {new Date(job.applicationDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                {job.link ? (
                  <a
                    href={job.link}
                    className="text-teal-400 hover:text-teal-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white max-w-xs break-words">
                {job.notes || "-"}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                {job.resume ? (
                  <a
                    href={job.resume}
                    className="text-indigo-500 hover:text-indigo-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 flex  items-center">
                <button
                  onClick={() => onEdit(job)} 
                  className="text-blue-800 px-3 py-1 mr-1 text-xl cursor-pointer hover:text-blue-500"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => deleteJob(job._id)} // direct delete
                  className="text-red-500 px-3 py-1 text-xl cursor-pointer hover:text-red-300"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>


          ))):(<tr>
      <td colSpan="8" className="text-center py-4">
        No job data available.
      </td>
    </tr>)}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default JobTable;
