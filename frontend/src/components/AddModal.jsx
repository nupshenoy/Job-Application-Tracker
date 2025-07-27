import React, { useState, useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";
import { useJobs } from "../context/JobContext";
import { useNavigate } from "react-router-dom";
import ResumeUploader from "./ResumeUploader";
import axios from "axios";

function AddModal({ isOpen, onClose }) {
  const { addJob } = useJobs();
  const navigate = useNavigate();
const { uploadResume, resumeOptions, fetchResumeOptions } = useJobs();

useEffect(() => {
  if (isOpen) {
    fetchResumeOptions();
  }
}, [isOpen]);


  // const [resumeFile, setResumeFile] = useState(null);
  // const [resumeOptions, setResumeOptions] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect(() => {
  //   if (isOpen) {
  //     fetch("http://localhost:5000/resume", {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setResumeOptions(data))
  //       .catch((err) => console.error("Failed to fetch resumes", err));
  //   }
  // }, [isOpen]);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    applicationDate: new Date().toISOString().split("T")[0],
    link: "",
    notes: "",
    resume: "",
    salary: "",
    location: "",
    jobType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { company, role, applicationDate } = formData;

    if (!company || !role || !applicationDate) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      // if (resumeFile) {
      //   const data = new FormData();
      //   data.append("resume", resumeFile);

      //   const response = await axios.post(
      //     "http://localhost:5000/resume/upload",
      //     data,
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //         Authorization: `Bearer ${localStorage.getItem("token")}`,
      //       },
      //     }
      //   );

      //   formData.resume = response.data.url;
      // }

      await addJob(formData);
      setFormData({
        company: "",
        role: "",
        status: "Applied",
        applicationDate: new Date().toISOString().split("T")[0],
        link: "",
        notes: "",
        resume: "",
        salary: "",
        location: "",
        jobType: "Unspecified",
      });
      // setResumeFile(null);
      setIsSubmitting(false);
      onClose();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Failed to add job. Please make sure you're logged in.");
    }
  };

  const fileInputRef = useRef(null);

  const handleRemoveFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
            className="text-gray-400 hover:text-gray-600 rounded-lg text-md w-8 h-8 flex items-center justify-center cursor-pointer"
          >
            <IoCloseOutline className="text-2xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Company <span className="text-red-500">*</span>
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

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Job Title <span className="text-red-500">*</span>
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

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Status <span className="text-red-500">*</span>
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

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Application Date <span className="text-red-500">*</span>
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

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Salary
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. $100k or 12 LPA"
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Job Type
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              >
                <option value="Unspecified">— Unspecified —</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Application Link
              </label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            {/* Resume */}
            

            <ResumeUploader
  value={formData.resume}
  onChange={(resumeUrl) => setFormData((prev) => ({ ...prev, resume: resumeUrl }))}
  resumeOptions={resumeOptions}
  uploadResume={uploadResume}
/>

            <div className="mb-4 col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-black text-sm px-4 py-2 rounded-md hover:bg-gray-300 cursor-pointer transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white  ${
                isSubmitting
                  ? "bg-gray-500 text-gray-800 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-300 hover:text-black cursor-pointer transition"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddModal;
