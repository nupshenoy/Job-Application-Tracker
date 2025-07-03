
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaChartBar,
  FaFilter,
  FaClock,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { IoLogoBuffer } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";


const Feature = ({ icon, title, desc, color, delay = 0 }) => (
  <motion.div
    className="p-4"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
  >
    <div className={`text-3xl ${color} mb-2`}>{icon}</div>
    <h3 className="font-semibold">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </motion.div>
);

const Step = ({ title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
  >
    <h3 className="font-bold text-xl mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
);



const LandingPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMenu = () => setMobileOpen(!mobileOpen);

  return (
    <div className="bg-white text-gray-800">
      {/* NAVBAR */} 
      <nav className="bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <NavLink to="/" className="flex items-center gap-2 text-3xl font-bold ">
            <IoLogoBuffer className="text-3xl" />
            <span className="hidden sm:inline ">JobTrackr</span>
          </NavLink>

          {/* desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <NavLinks />
            <AuthButtons />
          </div>

          {/* hamburger */}
          <button onClick={toggleMenu} className="md:hidden text-2xl">
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t shadow-inner px-4 pb-4">
            <NavLinks onClick={toggleMenu} mobile />
            <AuthButtons mobile />
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="bg-gray-50 py-20 px-6 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Organize Your Job Hunt Like a Pro
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Stay on top of every application, follow up with ease, and gain insights that get you hired.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/register">
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 cursor-pointer">
              Register Free
            </button>
          </Link>
          <Link to="/login">
            <button className="border border-black px-6 py-3 rounded-lg hover:bg-black hover:text-white cursor-pointer">
              Sign In
            </button>
          </Link>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6 bg-white max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Why Choose Our Tracker?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Feature
            icon={<FaCheckCircle />}
            title="Simple & Efficient"
            desc="Track job applications without the clutter."
            color="text-blue-500"
            delay={0}
          />
          <Feature
            icon={<FaChartBar />}
            title="Powerful Insights"
            desc="Visualize trends and optimize your strategy."
            color="text-green-500"
            delay={0.1}
          />
          <Feature
            icon={<FaFilter />}
            title="Advanced Filters"
            desc="Easily slice and dice your applications."
            color="text-purple-500"
            delay={0.2}
          />
          <Feature
            icon={<FaClock />}
            title="Smart Reminders"
            desc="Never miss a follow‑up opportunity."
            color="text-yellow-500"
            delay={0.3}
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 py-16 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-10">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
          <Step
            title="1. Add Jobs"
            desc="Log every application with role, company, and status."
            delay={0}
          />
          <Step
            title="2. Track Progress"
            desc="Monitor status changes and upcoming dates."
            delay={0.1}
          />
          <Step
            title="3. View Insights"
            desc="See trends over time and adjust your approach."
            delay={0.2}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Start tracking smarter today.
        </h2>
        <Link to="/register">
          <button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 cursor-pointer">
            Create Your Free Account
          </button>
        </Link>
      </section>

      <Footer/>
    </div>
  );
};


const NavLinks = ({ mobile = false, onClick = () => {} }) => {
  const cls = mobile ? "block py-2" : "hover:text-blue-600";
  return (
    <>
      <Link to="/dashboard" className={cls} onClick={onClick}>
        Dashboard
      </Link>
      <Link to="/insights" className={cls} onClick={onClick}>
        Insights
      </Link>
    </>
  );
};

const AuthButtons = ({ mobile = false }) =>
  mobile ? (
    <div className="mt-3 space-y-2">
      <Link to="/login">
        <button className="w-full bg-black text-white py-2 rounded cursor-pointer">Sign In</button>
      </Link>
      <Link to="/register">
        <button className="w-full border border-black py-2 rounded cursor-pointer">
          Register
        </button>
      </Link>
    </div>
  ) : (
    <div className="flex gap-3">
      <Link to="/login">
        <button className="border border-black px-4 py-2 rounded hover:bg-black hover:text-white cursor-pointer">
          Sign In
        </button>
      </Link>
      <Link to="/register">
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900 cursor-pointer">
          Register
        </button>
      </Link>
    </div>
  );

export default LandingPage;
