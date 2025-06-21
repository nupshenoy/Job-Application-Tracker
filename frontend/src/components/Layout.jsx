// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <Navbar />
      <main className="flex-grow px-4 py-6">
        {children}
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
