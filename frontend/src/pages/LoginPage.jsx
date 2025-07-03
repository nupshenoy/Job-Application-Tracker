import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { IoLogoBuffer } from "react-icons/io5";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
        <motion.div
          className="bg-white shadow-xl rounded-lg overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Left Branding */}
          <div className="hidden md:flex flex-col items-center justify-center bg-gray-100 p-10 text-gray-800">
            <IoLogoBuffer className="text-5xl mb-4" />
            <h2 className="text-3xl font-bold mb-2">Job Tracker</h2>
            <p className="text-sm text-gray-600 text-center">
              Organize. Track. Conquer your job hunt.
            </p>
          </div>

          {/* Right Form */}
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Sign in to your job tracker account
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm mb-1 font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded transition cursor-pointer"
              >
                Sign In
              </button>

              <div className="text-center text-sm text-gray-600 mt-4">
                Don’t have an account?{" "}
                <NavLink
                  to="/register"
                  className="text-black font-semibold hover:underline"
                >
                  Sign Up
                </NavLink>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default LoginPage;
