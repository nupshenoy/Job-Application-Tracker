import React, { useState, useEffect } from "react";
import axios from "axios";

const EditJob = ({ isOpen, onClose, jobData, onUpdate }) => {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    applicationDate: "",
    link: "",
  });

  useEffect(() => {
    if (jobData) {
      setForm({
        company: jobData.company || "",
        role: jobData.role || "",
        status: jobData.status || "Applied",
        applicationDate: jobData.applicationDate?.split("T")[0] || "",
        link: jobData.link || "",
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
    try {
      await axios.put(`http://localhost:5000/jobs/${jobData._id}`, form);
      onUpdate(); // refresh job list
      onClose();  // close modal
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Edit Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role"
            className="w-full p-2 border rounded"
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          <input
            type="date"
            name="applicationDate"
            value={form.applicationDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="url"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="Application Link"
            className="w-full p-2 border rounded"
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
