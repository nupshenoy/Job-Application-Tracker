import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useJobs } from "../context/JobContext";
import AddModal from "./AddModal";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const isAuthenticated = !!token;

  const { fetchJobs } = useJobs();

  const handleSignOut = () => {
    logout(); // Clears token & user from context and localStorage
    navigate("/login");
  };

  const handleAddSuccess = async () => {
    await fetchJobs();
    setShowAddModal(false);
  };

  return (
    <>
      <div className="shadow-xl pb-2 pt-6 z-10 relative bg-white">
        <div className="container mx-auto ">
          <div className="flex justify-between items-center">
            <NavLink to="/dashboard">
              <h1 className="text-3xl font-bold">Job Application Tracker</h1>
            </NavLink>

            {isAuthenticated && (
              <div className="flex gap-3">
                {/* Add Button */}
                <button
                  className="bg-black text-white font-medium px-4 py-2 rounded hover:bg-gray-100 hover:text-black cursor-pointer"
                  onClick={() => setShowAddModal(true)}
                >
                  + Add Application
                </button>

                {/* Sign Out Button  */}
                <button
                  onClick={handleSignOut}
                  className="hover:bg-black hover:text-white font-medium px-4 py-2 rounded bg-gray-100 text-black  cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
          {isAuthenticated && (
            <p className="text-gray-600 mt-2">
              Welcome back, {user?.name || "User"}!
            </p>
          )}
        </div>
      </div>
      {/* Add Modal open  */}

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
