import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddJob = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    applicationDate: "",
    link: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.role || !formData.applicationDate || !formData.link) {
      alert("Please fill in all required fields.");
      return;
    }

    setFormData({
      company: formData.company,
      role: formData.role,
      status: formData.status,
      applicationDate: formData.applicationDate,
      link: formData.link,
    });

    axios
      .post('http://localhost:5000/jobs', formData)
      .then(() => {
        console.log("Navigating to home")
        navigate('/')
      })
      .catch((err) => {
        console.log(err.message)
      })
  };


  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Add Job Application</h2>
      <form method='POST' onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <input
          type="date"
          name="applicationDate"
          value={formData.applicationDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
          required
        />

        <input
          type="url"
          name="link"
          placeholder="Application Link"
          value={formData.link}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
