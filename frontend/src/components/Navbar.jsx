import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoLogoBuffer } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi";

import { useJobs } from "../context/JobContext";
import { useAuth } from "../context/AuthContext";
import AddModal from "./AddModal";

const Navbar = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, token, logout } = useAuth();
  const { fetchJobs } = useJobs();
  const navigate = useNavigate();

  const isAuthenticated = !!token;

  /* ---------------- handlers ---------------- */
  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  const handleAddSuccess = async () => {
    await fetchJobs();
    setShowAddModal(false);
  };

  const linkStyle = ({ isActive }) =>
    isActive
      ? "px-3 py-2 border-b-2 border-black font-medium"
      : "px-3 py-2 hover:border-b-2 border-transparent";

  /* ---------------- ui ---------------------- */
  return (
    <>
      <header className="shadow-xl bg-white z-20">
        <div className="container mx-auto px-4 py-4 flex flex-col">
        <div className=" flex items-center justify-between">
          {/* brand */}
          <NavLink to="/" className="flex items-center gap-2 text-3xl font-bold">
            <IoLogoBuffer className="text-3xl" />
            <span className="hidden sm:inline">Job Application Tracker</span>
          </NavLink>

          {/* hamburger (md:hidden) */}
          {isAuthenticated && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-2xl text-gray-700 focus:outline-none"
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          )}

          {/* desktop nav */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-4">
              <NavLink to="/dashboard" className={linkStyle}>
                Dashboard
              </NavLink>
              <NavLink to="/insights" className={linkStyle}>
                Insights
              </NavLink>
              <NavLink to="/profile" className={linkStyle}>
                Profile
              </NavLink>

              <button
                onClick={() => setShowAddModal(true)}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-100 hover:text-black transition cursor-pointer"
              >
                + Add Application
              </button>

              <button
                onClick={handleSignOut}
                className="bg-gray-100 text-black px-4 py-2 rounded hover:bg-black hover:text-white transition cursor-pointer"
              >
                Sign Out
              </button>
            </nav>
          )}
        </div>

{/* greeting (desktop only) */}
      {isAuthenticated && (
        <p className="hidden md:block text-gray-600 container mx-auto mt-2 px-4">
          Welcome back, {user?.name || "User"}!
        </p>
      )}
      </div>

        {/* mobile dropdown */}
        {isAuthenticated && mobileOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 shadow-inner">
            <div className="flex flex-col p-4 gap-3">
              <NavLink
                to="/dashboard"
                className={linkStyle}
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/insights"
                className={linkStyle}
                onClick={() => setMobileOpen(false)}
              >
                Insights
              </NavLink>
              <NavLink
                to="/profile"
                className={linkStyle}
                onClick={() => setMobileOpen(false)}
              >
                Profile
              </NavLink>

              <button
                onClick={() => {
                  setShowAddModal(true);
                  setMobileOpen(false);
                }}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-100 hover:text-black transition "
              >
                + Add Application
              </button>

              <button
                onClick={() => {
                  handleSignOut();
                  setMobileOpen(false);
                }}
                className="bg-gray-100 text-black px-4 py-2 rounded hover:bg-black hover:text-white transition "
              >
                Sign Out
              </button>
            </div>
          </nav>
        )}
      </header>

      

      {/* Add‑Application Modal */}
      {showAddModal && (
        <AddModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddSuccess}
        />
      )}
    </>
  );
};

export default Navbar;
