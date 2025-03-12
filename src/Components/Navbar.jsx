
import React, { useState } from "react";
import { FaBars, FaUser, FaTachometerAlt, FaTasks, FaProjectDiagram } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Footer from "./Footer";


const Navbar = () => {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const projects = location.state?.projects || [];
  const email = location.state?.email
  

  // Retrieve 'tasks' from the location state
  const tasks = location.state?.tasks || [];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Prepare project data ensuring progress is a valid number
  const projectData = projects.length > 0 
    ? projects.map((project) => {
        let progressValue;
        if (typeof project.progress === "string" && project.progress.includes("%")) {
          progressValue = parseFloat(project.progress.replace("%", ""));
        } else {
          progressValue = Number(project.progress);
        }
        return {
          name: project.name || "Unnamed Project",
          progress: !isNaN(progressValue) ? progressValue : 0,
        };
      })
    : [{ name: "No Data", progress: 0 }];

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md relative">
      <div className="flex items-center gap-4">
        <button onClick={() => setIsSidebarOpen(true)} className="text-white text-2xl">
          <FaBars />
        </button>
        <h1 className="text-xl font-bold">The Internship Platform</h1>
      </div>
      <div className="relative">
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-white text-2xl flex items-center gap-2">
          {email} <FaUser />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-lg overflow-hidden">

            <button className="block w-full px-4 py-2 text-left hover:bg-gray-200" onClick={()=>navigate('/')}>Logout</button>
          </div>
        )}
      </div>
    </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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

      {/* Dashboard Section */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-3 gap-4">
          {/* Project Progress Table */}
          <div className="col-span-2 bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-3">Project Progress</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Project</th>
                  <th className="border border-gray-300 p-2">Progress</th>
                  <th className="border border-gray-300 p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{project.name}</td>
                    <td className="border border-gray-300 p-2">{project.progress}</td>
                    <td className="border border-gray-300 p-2">{project.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Count & Total Tasks */}
          <div className="flex flex-col gap-4">
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">Total Projects</h3>
              <p className="text-2xl font-bold">{projects.length}</p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">Total Tasks</h3>
              <p className="text-2xl font-bold">{tasks.length}</p>
            </div>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="mt-6 bg-white shadow-lg rounded-lg p-4" style={{ width: "100%", height: "300px" }}>
          <h2 className="text-xl font-semibold mb-3">Project Progress Chart</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projectData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="progress" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Navbar;
