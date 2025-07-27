import React, { useState, useEffect, useRef } from "react";

const ResumeUploader = ({ value, onChange, resumeOptions, uploadResume }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Reset file input if value changes externally
  useEffect(() => {
    if (!value) {
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    onChange(""); // Clear dropdown
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      const { url } = await uploadResume(selectedFile);
      onChange(url);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Resume upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDropdownChange = (e) => {
    onChange(e.target.value);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const clearDropdown = () => onChange("");

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="col-span-2 mb-4">
      <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
        Resume
      </label>

      {/* Resume Dropdown */}
      <div className="flex gap-2 items-center mb-3">
        <select
          className="w-full p-2.5 text-sm rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:outline-none focus:ring-blue-200 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          onChange={handleDropdownChange}
          value={value && !selectedFile ? value : ""}
          disabled={!!selectedFile}
        >
          <option value="">— Select previously uploaded —</option>
          {resumeOptions.map((resume) => (
            <option key={resume._id} value={resume.url}>
              {resume.name}
            </option>
          ))}
        </select>

        {value && !selectedFile && (
          <button
            type="button"
            onClick={clearDropdown}
            className="text-sm text-red-500 hover:underline"
          >
            Remove
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-3">
        or upload a new resume
      </div>

      {/* File Upload Input */}
      <div className="flex gap-2 items-center">
        <input
          type="file"
          accept=".pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={!!value && !selectedFile}
          className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 hover:file:cursor-pointer text-sm rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 bg-white dark:bg-gray-600 dark:border-gray-500 dark:text-white"
        />

        {selectedFile && (
          <button
            type="button"
            onClick={clearFile}
            className="text-sm text-red-500 hover:underline"
          >
            Remove
          </button>
        )}
      </div>

      {/* Upload Button */}
      {selectedFile && (
        <div className="mt-2">
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className={`px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
