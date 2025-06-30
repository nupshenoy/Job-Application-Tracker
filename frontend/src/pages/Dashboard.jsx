import React, { useState, useEffect } from "react";
import { useJobs } from "../context/JobContext";
import EditModal from "../components/EditModal";
import JobTable from "../components/JobTable";
import FiltersModal from "../components/FiltersModal";
import FilterToolbar from "../components/FilterToolbar";
import FilterChips from "../components/FilterChips";

const Home = () => {
  const { jobs, deleteJob, updateJobStatus, updateJob } = useJobs();

  const [filters, setFilters] = useState({
    keyword: "",
    status: [],
    company: [],
    role: [],
    location: [],
    jobType: [],
    dateFrom: "",
    dateTo: "",
    salaryMin: "",
    salaryMax: "",
  });

  const clearFilters = () =>
    setFilters({
      keyword: "",
      status: [],
      company: [],
      role: [],
      location: [],
      jobType: [],
      dateFrom: "",
      dateTo: "",
      salaryMin: "",
      salaryMax: "",
    });

  const hasActive =
    filters.status.length ||
    filters.company.length ||
    filters.role.length ||
    filters.location.length ||
    filters.jobType.length ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.salaryMax ||
    filters.salaryMin;

  // Modal
  const [showModal, setShowModal] = useState(false);

  //  Filtered Jobs
  const jobMatches = (job) => {
    const f = filters;
    const kwTokens = f.keyword.toLowerCase().split(/\s+/).filter(Boolean);

    const kwOk =
      kwTokens.length === 0 ||
      kwTokens.every((t) =>
        [job.company, job.role, job.location ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(t)
      );

    const checks = [
      kwOk,
      f.status.length === 0 || f.status.includes(job.status),
      f.company.length === 0 ||
        f.company.some((c) => c.toLowerCase() === job.company.toLowerCase()), // keep OR here
      f.role.length === 0 ||
        f.role.some((r) => r.toLowerCase() === job.role.toLowerCase()),
      f.location.length === 0 ||
        f.location.some((l) => l.toLowerCase() === job.location?.toLowerCase()),
      f.jobType.length === 0 || f.jobType.includes(job.jobType),
      !f.dateFrom || job.applicationDate.slice(0, 10) >= f.dateFrom,
      !f.dateTo || job.applicationDate.slice(0, 10) <= f.dateTo,
      f.salaryMin === "" || Number(job.salary) >= Number(f.salaryMin),
      f.salaryMax === "" || Number(job.salary) <= Number(f.salaryMax),
    ];

    return checks.every(Boolean);
  };

  const filteredJobs = jobs.filter(jobMatches);

  // Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;
  useEffect(() => setPage(1), [filters]);
  const sliceStart = (page - 1) * perPage;
  const pageJobs = filteredJobs.slice(sliceStart, sliceStart + perPage);
  const totalPages = Math.ceil(filteredJobs.length / perPage);

  //  Edit Modal
  const [editing, setEditing] = useState(null);


//   const getJobTypeClass = (type) => {
//   switch (type) {
//     case "Remote":
//       return "bg-pink-500";
//     case "Hybrid":
//       return "bg-purple-500";
//     case "On-site":
//       return "bg-yellow-500";
//     default:
//       return "bg-gray-500";
//   }
// };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* toolbar */}
      <FilterToolbar
        keyword={filters.keyword}
        setKeyword={(k) => setFilters((p) => ({ ...p, keyword: k }))}
        onOpenModal={() => setShowModal(true)}
        hasActiveFilters={hasActive}
        onClearFilters={clearFilters}
      />

      {/* chips */}
      <FilterChips
        filters={filters}
        setFilters={setFilters}
        showAllChips={false}
        setShowAllChips={() => {}}
      />

      {/* modal */}
      {showModal && (
        <FiltersModal
          jobs={jobs}
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowModal(false)}
          onClear={clearFilters}
        />
      )}

      {/* edit modal */}
      {editing && (
        <EditModal
          isOpen={!!editing}
          onClose={() => setEditing(null)}
          jobData={editing}
          onUpdate={async (id, data) => {
            await updateJob(id, data);
            setEditing(null);
          }}
        />
      )}

      {/* count */}
      <p className="text-sm text-gray-600 font-semibold mb-2 mx-2">
        Showing {filteredJobs.length} job{filteredJobs.length !== 1 && "s"}
      </p>

      {/* table */}
      <JobTable
        jobs={pageJobs}
        onEdit={(j) => setEditing(j)}
        onDelete={deleteJob}
        onStatusChange={updateJobStatus}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        getJobTypeClass={(jt)=>({
          Remote: "bg-pink-100 text-pink-500",
          Hybrid: "bg-purple-100 text-purple-500",
          "On-site" : "bg-rose-100 text-rose-700",
        }[jt])}
        getStatusClass={(s) =>
          ({
            Applied: "bg-blue-500",
            Interview: "bg-yellow-500",
            Offer: "bg-green-500",
            Rejected: "bg-red-500",
          }[s] || "bg-gray-500")
        }
        
      />
    </div>
  );
};

export default Home;
