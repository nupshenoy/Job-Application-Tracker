import React, { useMemo } from "react";
import { useJobs } from "../context/JobContext";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Doughnut, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

/* ─── color palettes ────────────────────────── */
const STATUS_COLORS   = ["#3b82f6", "#facc15", "#10b981", "#ef4444"];
const TYPE_COLORS     = ["#f472b6", "#a78bfa", "#9ca3af", "#fb923c"];
const LOCATION_COLORS = ["#06b6d4", "#6366f1", "#14b8a6", "#84cc16", "#e11d48"];

/* ─── helpers ───────────────────────────────── */
const countBy = (arr, key, fallback = "Unspecified") =>
  arr.reduce((acc, item) => {
    const k = item[key] || fallback;
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});

const salaryBands = (arr, step = 20000) =>
  arr.reduce((acc, { salary }) => {
    if (!salary) return acc;
    const n = Number(salary);
    const low = Math.floor(n / step) * step;
    const label = `₹${(low / 1000).toLocaleString()}k–₹${(
      (low + step) /
      1000
    ).toLocaleString()}k`;
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

const toChartData = (obj, colors) => ({
  labels: Object.keys(obj),
  datasets: [{ data: Object.values(obj), backgroundColor: colors }],
});

/* ─── UI wrappers ───────────────────────────── */
const ChartBox = ({ title, height = 220, children }) => (
  <div className="bg-white rounded-xl shadow p-4 border border-gray-100 hover:shadow-md transition">
    <h2 className="text-sm font-semibold text-gray-700 mb-2">{title}</h2>
    <div style={{ height }}>{children}</div>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className={`${getLabel(label)} rounded-lg p-4 shadow-sm text-center border-2 border-double border-green-600`}>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-xl font-semibold text-gray-800">{value}</p>
  </div>
);

const getLabel = (label) =>{
    switch(label){
        case 'Applied':
            return "bg-blue-100";
        case 'Interview':
            return "bg-yellow-100";
        case 'Offer':
            return "bg-green-100";
        case 'Rejected':
            return "bg-red-100";
        default:
            return "bg-purple-100"
        }
}

/* ─── Insights page ─────────────────────────── */
const Insights = () => {
  const { jobs } = useJobs();

  /* --- analytics (memo) --- */
  const {
    statusCounts,
    typeCounts,
    companyTop,
    locationCounts,
    salaryCounts,
    lineLabels,
    lineVals,
  } = useMemo(() => {
    const status   = countBy(jobs, "status");
    const type     = countBy(jobs, "jobType");
    const company  = countBy(jobs, "company", "Unknown");
    const location = countBy(jobs, "location");
    const salary   = salaryBands(jobs);

    const dateMap = jobs.reduce((acc, j) => {
      const d = j.applicationDate?.slice(0, 10);
      if (!d) return acc;
      acc[d] = (acc[d] || 0) + 1;
      return acc;
    }, {});
    const labels = Object.keys(dateMap).sort();
    const vals   = labels.map((d) => dateMap[d]);

    return {
      statusCounts: status,
      typeCounts: type,
      companyTop: Object.entries(company).sort((a, b) => b[1] - a[1]).slice(0, 7),
      locationCounts: location,
      salaryCounts: salary,
      lineLabels: labels,
      lineVals: vals,
    };
  }, [jobs]);

  const chartOpts = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { font: { size: 12 }, color: "#4b5563", usePointStyle: true },
      },
    },
  };

  return (
    <div className=" bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Insights Dashboard
        </h1>

        {/* ── Stat Cards Row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
          <StatCard label="Total"     value={jobs.length} />
          <StatCard label="Applied" value={statusCounts.Applied   || 0} />
          <StatCard label="Interview" value={statusCounts.Interview || 0} />
          <StatCard label="Offer"     value={statusCounts.Offer     || 0} />
          <StatCard label="Rejected"  value={statusCounts.Rejected  || 0} />
        </div>

        {/* ── Charts Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Status */}
          <ChartBox title="Status Breakdown">
            <Pie data={toChartData(statusCounts, STATUS_COLORS)} options={chartOpts} />
          </ChartBox>

          {/* Job Type */}
          <ChartBox title="Job Types">
            <Doughnut data={toChartData(typeCounts, TYPE_COLORS)} options={chartOpts} />
          </ChartBox>

          {/* Top Companies */}
          <ChartBox title="Top Companies">
            <Bar
              data={{
                labels: companyTop.map(([n]) => n),
                datasets: [{ data: companyTop.map(([, v]) => v), backgroundColor: "#60a5fa" }],
              }}
              options={{ ...chartOpts, plugins: { legend: { display: false } } }}
            />
          </ChartBox>

          {/* Applications Over Time */}
          <ChartBox title="Applications Over Time">
            <Line
              data={{
                labels: lineLabels,
                datasets: [
                  {
                    data: lineVals,
                    borderColor: "#6366f1",
                    backgroundColor: "rgba(99,102,241,0.2)",
                    tension: 0.3,
                    fill: true,
                  },
                ],
              }}
              options={{
                ...chartOpts,
                plugins: { legend: { display: false } },
                elements: { point: { radius: 0 } },
              }}
            />
          </ChartBox>

          {/* Locations */}
          <ChartBox title="Locations">
            <Pie data={toChartData(locationCounts, LOCATION_COLORS)} options={chartOpts} />
          </ChartBox>

          {/* Salary Bands */}
          <ChartBox title="Salary Bands">
            <Bar
              data={{
                labels: Object.keys(salaryCounts),
                datasets: [{ data: Object.values(salaryCounts), backgroundColor: "#f97316" }],
              }}
              options={{
                ...chartOpts,
                plugins: { legend: { display: false } },
                scales: {
                  x: { ticks: { maxRotation: 40, minRotation: 40 } },
                  y: { beginAtZero: true, ticks: { stepSize: 1 } },
                },
              }}
            />
          </ChartBox>
        </div>
      </div>
    </div>
  );
};

export default Insights;
