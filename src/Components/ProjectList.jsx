import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MainNav from "./MainNav";
const ProjectList = () => {
  const navigate = useNavigate();

  // Load projects from localStorage
  const getStoredProjects = () => {
    const storedProjects = localStorage.getItem("projects");
    return storedProjects ? JSON.parse(storedProjects) : [];
  };


  const dataTransfer = ()=>{
    navigate('/dashboard',{state:{projects}})
  }

  const [projects, setProjects] = useState(getStoredProjects());
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    status: "Pending",
    startDate: "",
    dueDate: "",
    taskDetails: "",
    progress: "10%", // Default to 10%
  });

  // Update localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleDeleteProject = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProjects = projects.filter((_, i) => i !== index);
        setProjects(updatedProjects);
        Swal.fire("Deleted!", "The task has been deleted.", "success");
      }
    });
  };

  const handleAddProject = () => {
    if (!newProject.name || !newProject.startDate || !newProject.dueDate) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all required fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setProjects((prevProjects) => [...prevProjects, newProject]);
    setNewProject({
      name: "",
      status: "Pending",
      startDate: "",
      dueDate: "",
      taskDetails: "",
      progress: "10%",
    });
    setShowForm(false);

    Swal.fire({
      title: "Success!",
      text: "Task added successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const showTaskDetails = (project) => {
    Swal.fire({
      title: project.name,
      html: `<b>Status:</b> ${project.status} <br>
             <b>Start Date:</b> ${project.startDate} <br>
             <b>Due Date:</b> ${project.dueDate} <br>
             <b>Progress:</b> ${project.progress} <br>
             <b>About Task:</b> ${project.taskDetails}`,
      icon: "info",
      confirmButtonText: "Close",
    });
  };

  return (
    
    <div className="p-4 bg-white rounded-lg shadow-md">
      <MainNav />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold border-b pb-2">Project List</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "Create The Project"}
        </button>
      </div>

      {showForm && (
        <div className="mb-4 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-bold mb-2">Add New Project</h3>
          <input type="text" name="name" placeholder="Project Name" className="border p-2 rounded w-full mb-2" value={newProject.name} onChange={handleInputChange} />
          <input type="date" name="startDate" className="border p-2 rounded w-full mb-2" value={newProject.startDate} onChange={handleInputChange} />
          <input type="date" name="dueDate" className="border p-2 rounded w-full mb-2" value={newProject.dueDate} onChange={handleInputChange} />
          <select name="progress" className="border p-2 rounded w-full mb-2" value={newProject.progress} onChange={handleInputChange}>
            {Array.from({ length: 10 }, (_, i) => (i + 1) * 10).map((value) => (
              <option key={value} value={`${value}%`}>{value}%</option>
            ))}
          </select>
          <textarea name="taskDetails" placeholder="Write About Task" className="border p-2 rounded w-full mb-2" value={newProject.taskDetails} onChange={handleInputChange}></textarea>
          <button className="bg-green-700 text-white px-4 py-2 rounded" onClick={handleAddProject}>Create Project</button>
        </div>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">#</th>
            <th className="border p-2">Project</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Progress</th>
            <th className="border p-2">Start Date</th>
            <th className="border p-2">Due Date</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-4">No data available in table</td>
            </tr>
          ) : (
            projects.map((project, index) => (
              <tr key={index}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{project.name}</td>
                <td className="border p-2">{project.status}</td>
                <td className="border p-2">{project.progress}</td>
                <td className="border p-2">{project.startDate}</td>
                <td className="border p-2">{project.dueDate}</td>
                <td className="border p-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2" onClick={() => showTaskDetails(project)}>Show</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDeleteProject(index)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button className="bg-gray-500 text-white px-4 py-2 rounded mt-4" onClick={dataTransfer}>Go Back</button>
    </div>
  );
};

export default ProjectList;