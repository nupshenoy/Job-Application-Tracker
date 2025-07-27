import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const JobContext = createContext();
export const useJobs = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [resumeOptions, setResumeOptions] = useState([]);

  //Upload resume
  const uploadResume = async (file) => {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await axios.post(
      "http://localhost:5000/resume/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data; // expects { url, name, etc. }
  };

  //Get resume
  const fetchResumeOptions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/resume", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResumeOptions(res.data); // expects array of { name, url }
    } catch (err) {
      console.error("Failed to load resumes:", err);
    }
  };

  // Fetch all jobs for the user
  const fetchJobs = async () => {
    if (!user || !token) return;
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const jobList = Array.isArray(res.data.data) ? res.data.data : [];
      setJobs(jobList);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      setJobs([]); // fallback to empty
    } finally {
      setLoading(false);
    }
  };

  // Add a job and prepend it to the list
  const addJob = async (jobData) => {
    try {
      const res = await axios.post("http://localhost:5000/jobs", jobData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newJob = res.data;
      setJobs((prev) => (Array.isArray(prev) ? [newJob, ...prev] : [newJob]));
      toast.success("Job added successfully!");
    } catch (err) {
      console.error("Error adding job:", err);
      toast.error("Failed to add job");
    }
  };

  // Delete a job by ID
  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs((prev) =>
        Array.isArray(prev) ? prev.filter((job) => job._id !== id) : []
      );
      toast.success("Job deleted!");
    } catch (err) {
      console.error("Error deleting job:", err);
      toast.error("Failed to delete job");
    }
  };

  // Update only job status
  const updateJobStatus = async (id, newStatus) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/jobs/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedStatus = res.data?.status;

      setJobs((prev) =>
        Array.isArray(prev)
          ? prev.map((job) =>
              job._id === id ? { ...job, status: updatedStatus } : job
            )
          : []
      );
    } catch (err) {
      console.error("Error updating job status:", err);
    }
  };

  // Full update of a job (from Edit modal)
  const updateJob = async (id, updatedFields) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/jobs/${id}`,
        updatedFields,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedJob = res.data;
      if (!updatedJob || !updatedJob._id) {
        console.error("Invalid job update response:", updatedJob);
        return;
      }

      setJobs((prev) =>
        Array.isArray(prev)
          ? prev.map((job) => (job._id === id ? updatedJob : job))
          : []
      );
      toast.success("Job updated!");
    } catch (err) {
      console.error("Error updating job:", err);
      toast.error("Failed to update job");
    }
  };

  // Initial fetch when user/token are ready
  useEffect(() => {
    if (user && token) {
      fetchJobs();
    }
  }, [user, token]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        loading,
        fetchJobs,
        addJob,
        deleteJob,
        updateJobStatus,
        updateJob,
        uploadResume,
      resumeOptions,
      fetchResumeOptions,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
