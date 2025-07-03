import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, token, logout, login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, password: "" });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
      "http://localhost:5000/auth/profile",
      { ...formData },                // { name, email, password? }
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const updatedUser = res.data.user;
    login(updatedUser, token); 
    setFormData((p) => ({ ...p, password: "" }));
      toast.success('Profile updated successfully!');
     
    } catch (err) {
      console.error(err);
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure? This action is permanent.");
    if (!confirm) return;

    try {
      await axios.delete("http://localhost:5000/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      logout();
    } catch (err) {
      console.error(err);
      toast.error("Account deletion failed.");
    }
  };

  return (
    <>
 
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Account Settings</h2>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password <span className="text-gray-400 text-sm">(optional)</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-black focus:border-black"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition cursor-pointer"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>

          <hr className="my-8" />

          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              Danger Zone
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Deleting your account is irreversible.
            </p>
            <button
              onClick={handleDelete}
              className="border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition cursor-pointer"
            >
              Delete Account
            </button>
          </div>
        </motion.div>
      </div>
      
    </>
  );
};

export default ProfilePage;
