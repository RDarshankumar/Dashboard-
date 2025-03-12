import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaProjectDiagram, FaTachometerAlt, FaTasks, FaUser } from 'react-icons/fa';

const MainNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md mb-3">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(true)} className="text-white text-2xl">
            <FaBars />
          </button>
          <h1 className="text-xl font-bold">The Internship Platform</h1>
        </div>
       
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="mb-6 text-white text-xl font-bold hover:text-red-400 transition"
        >
          ✖
        </button>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/task" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
              <FaTasks /> Task
            </Link>
          </li>
          <li>
            <Link to="/project" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
              <FaProjectDiagram /> Project
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainNav;
