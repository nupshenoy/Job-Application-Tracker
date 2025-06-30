import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useJobs } from "../context/JobContext";

const EditModal = ({ isOpen, onClose, jobData }) => {
  const { updateJob } = useJobs();
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    applicationDate: "",
    link: "",
    notes: "",
    resume: "",
    salary: "",
    location: "",
    jobType: "Unspecified",
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
        salary: jobData.salary || "",
        location: jobData.location || "",
        jobType: jobData.jobType || "",
      });
    }
  }, [jobData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobData || !jobData._id) return;
    try {
      await updateJob(jobData._id, form);
      onClose();
    } catch (err) {
      console.error("Error updating job:", err);
      alert("Failed to update job.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Edit Job</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
          >
            <IoCloseOutline className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium">Company *</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                required
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Role *</label>
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Status *</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
               className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Application Date *</label>
              <input
                type="date"
                name="applicationDate"
                value={form.applicationDate}
                onChange={handleChange}
                required
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Salary</label>
              <input
                type="text"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="e.g. 12 LPA / $100k"
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Job Type</label>
              <select
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              >
                <option value="Unspecified">— Unspecified —</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Resume Link</label>
              <input
                type="url"
                name="resume"
                value={form.resume}
                onChange={handleChange}
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Application Link</label>
            <input
              type="url"
              name="link"
              value={form.link}
              onChange={handleChange}
             className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white hover:bg-gray-900 rounded-md cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
