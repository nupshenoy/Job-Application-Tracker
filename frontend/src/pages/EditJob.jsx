import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useJobs } from "../context/JobContext";

const EditJob = ({ isOpen, onClose, jobData }) => {
  const { updateJob } = useJobs();
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    applicationDate: "",
    link: "",
    notes: "",
    resume: "",
  });

  useEffect(() => {
    if (jobData) {
      setForm({
        company: jobData.company || "",
        role: jobData.role || "",
        status: jobData.status || "Applied",
        applicationDate: jobData.applicationDate?.split("T")[0] || "",
        link: jobData.link || "",
        notes: jobData.notes || "",
        resume: jobData.resume || "",
      });
    }
  }, [jobData]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobData || !jobData._id) return;
    try {
      await updateJob(jobData._id, form);
      onClose();
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Edit Job Application
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 cursor-pointer rounded-lg text-sm w-8 h-8 flex items-center justify-center"
          >
            <span className="text-xl">
              <IoCloseOutline />
            </span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Company Name <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                required
                className="w-full p-2.5 text-sm rounded-lg border bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Job Title <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="w-full p-2.5 text-sm rounded-lg border bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Status <span className="text-red-700">*</span>
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-2.5 text-sm rounded-lg border bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Application Date <span className="text-red-700">*</span>
              </label>
              <input
                type="date"
                name="applicationDate"
                value={form.applicationDate}
                onChange={handleChange}
                required
                className="w-full p-2.5 text-sm rounded-lg border bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Application Link
              </label>
              <input
                type="url"
                name="link"
                value={form.link}
                onChange={handleChange}
                placeholder="Application URL"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Additional notes"
              rows={3}
              className="w-full p-2.5 rounded-lg border bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
          </div>

          <div className="col-span-2 mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Resume Link
            </label>
            <input
              type="url"
              name="resume"
              value={form.resume}
              onChange={handleChange}
              placeholder="Resume URL"
              className="w-full p-2.5 rounded-lg border bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-black px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 hover:text-black"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
