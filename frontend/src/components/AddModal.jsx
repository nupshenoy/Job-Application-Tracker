import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useJobs } from "../context/JobContext"; // Import context

function AddModal({ isOpen, onClose }) {
  const { addJob } = useJobs(); // Use addJob from context

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    applicationDate: new Date().toISOString().split("T")[0],
    link: "",
    notes: "",
    resume: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.company || !formData.role || !formData.applicationDate) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await addJob(formData); // Use context function
      setFormData({
        company: "",
        role: "",
        status: "Applied",
        applicationDate: new Date().toISOString().split("T")[0],
        link: "",
        notes: "",
        resume: "",
      });
      onClose();
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Failed to add job. Please make sure you're logged in.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add Job Application
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 cursor-pointer rounded-lg text-md w-8 h-8 flex items-center justify-center hover:text-gray-600"
          >
            <IoCloseOutline className="text-2xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid gap-4 mb-4 grid-cols-2">
            {/* Company */}
            <div className="col-span-1">
              <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Company Name <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            {/* Role */}
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Job Title <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            {/* Status */}
            <div className="col-span-1">
              <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Status <span className="text-red-700">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Date */}
            <div className="col-span-1">
              <label htmlFor="applicationDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Application Date <span className="text-red-700">*</span>
              </label>
              <input
                type="date"
                name="applicationDate"
                value={formData.applicationDate}
                onChange={handleChange}
                required
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            {/* Link */}
            <div className="col-span-2">
              <label htmlFor="link" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Application Link
              </label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 bg-gray-50 focus:ring-2 focus:outline-none focus:ring-blue-200 rounded-lg focus:outline-none focus:ring"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="col-span-2 mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
          </div>

          {/* Resume */}
          <div className="col-span-2 mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Resume Link
            </label>
            <input
              type="url"
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-100 hover:text-black cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddModal;
