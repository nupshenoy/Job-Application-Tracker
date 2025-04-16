// JobTable.jsx
import React from "react";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const JobTable = ({
  jobs,
  onEdit,
  onDelete,
  onStatusChange,
  getStatusClass,
}) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 overflow-hidden bg-white">
      <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Company</th>
            <th scope="col" className="px-6 py-3">Role</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Application Date</th>
            <th scope="col" className="px-6 py-3">Link</th>
            <th scope="col" className="px-6 py-3">Options</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr
              key={job._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {job.company}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                {job.role}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                <select
                  value={job.status}
                  onChange={(e) => onStatusChange(job._id, e.target.value)}
                  className={`text-white cursor-pointer border border-gray-300 rounded-2xl px-2 py-1 ${getStatusClass(job.status)}`}
                >
                  <option value="Applied" className="bg-pink-500">Applied</option>
                  <option value="Interview" className="bg-yellow-500">Interview</option>
                  <option value="Offer" className="bg-green-500">Offer</option>
                  <option value="Rejected" className="bg-red-500">Rejected</option>
                </select>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                {new Date(job.applicationDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                <a
                  href={job.link}
                  className="text-teal-400 hover:text-teal-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 text-right flex items-center">
                <button
                  onClick={() => onEdit(job)}
                  className="text-blue-800 px-3 py-1 mr-1 text-xl cursor-pointer hover:text-blue-500"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => onDelete(job._id)}
                  className="text-red-500 px-3 py-1 text-xl cursor-pointer hover:text-red-300"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
