import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MainNav from "./MainNav";

const TaskList = () => {
  // 1️⃣ Load tasks from localStorage
  const getStoredTasks = () => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  };
  const navigate = useNavigate()

  const goToBack =()=>{
    navigate('/dashboard',{state:{tasks}})
  }

  // 2️⃣ State Management
  const [tasks, setTasks] = useState(getStoredTasks());
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // For creating/updating tasks
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [newTask, setNewTask] = useState({
    name: "",
    status: "Pending",
    startDate: "",
    dueDate: "",
  });

  // 3️⃣ Update localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // 4️⃣ Handle changes to input fields
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // 5️⃣ Add or Update a Task
  const handleSaveTask = () => {
    // Validate required fields
    if (!newTask.name || !newTask.startDate || !newTask.dueDate) {
      Swal.fire("Error!", "Please fill all required fields.", "error");
      return;
    }

    if (editingIndex !== null) {
      // Update existing task
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = newTask;
      setTasks(updatedTasks);
      Swal.fire("Updated!", "Task has been updated.", "success");
    } else {
      // Add new task
      setTasks([...tasks, newTask]);
      Swal.fire("Success!", "Task added successfully.", "success");
    }

    // Reset form
    setNewTask({ name: "", status: "Pending", startDate: "", dueDate: "" });
    setEditingIndex(null);
    setShowForm(false);
  };

  // 6️⃣ Edit a Task
  const handleEditTask = (index) => {
    setEditingIndex(index);
    setNewTask(tasks[index]);
    setShowForm(true);
  };

  // 7️⃣ Delete a Task
  const handleDeleteTask = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        Swal.fire("Deleted!", "The task has been deleted.", "success");
      }
    });
  };

  // 8️⃣ Filter tasks by searchTerm
  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 9️⃣ Pagination logic
  const totalTasks = filteredTasks.length;
  const totalPages = Math.ceil(totalTasks / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentTasks = filteredTasks.slice(startIndex, endIndex);

  // 1️⃣0️⃣ Navigation for pagination
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // 1️⃣1️⃣ "Show X entries" dropdown
  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
       <MainNav />
      <h1 className="text-2xl font-bold mb-4 border-b pb-2">Task</h1>

      {/* Entries & Search Row */}
      <div className="flex justify-between items-center mb-4">
        {/* Show X entries */}
        <div className="flex items-center gap-2">
          <label htmlFor="entriesPerPage" className="text-sm">
            Show
          </label>
          <select
            id="entriesPerPage"
            value={entriesPerPage}
            onChange={handleEntriesChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {[5, 10, 25, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="text-sm">entries</span>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <span className="text-sm">Search:</span>
          <input
            type="text"
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Toggle Form Button */}
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingIndex(null);
          setNewTask({ name: "", status: "Pending", startDate: "", dueDate: "" });
        }}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? "Close Form" : "Add New Task"}
      </button>

      {/* Form for Adding/Editing Task */}
      {showForm && (
        <div className="mb-4 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-bold mb-2">
            {editingIndex !== null ? "Edit Task" : "Add New Task"}
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block text-sm font-medium mb-1">Task Name*</label>
              <input
                type="text"
                name="name"
                className="border p-2 rounded w-full"
                value={newTask.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                className="border p-2 rounded w-full"
                value={newTask.status}
                onChange={handleInputChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date Started*</label>
              <input
                type="date"
                name="startDate"
                className="border p-2 rounded w-full"
                value={newTask.startDate}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Due Date*</label>
              <input
                type="date"
                name="dueDate"
                className="border p-2 rounded w-full"
                value={newTask.dueDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button
            onClick={handleSaveTask}
            className="bg-green-700 text-white px-4 py-2 rounded"
          >
            {editingIndex !== null ? "Update Task" : "Create Task"}
          </button>
        </div>
      )}

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">#</th>
            <th className="border p-2">Task</th>
            <th className="border p-2">Date Started</th>
            <th className="border p-2">Due Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No data available in table
              </td>
            </tr>
          ) : (
            currentTasks.map((task, index) => {
              // index in `currentTasks` is different from main `tasks` index
              // we need the absolute index to properly edit/delete
              const absoluteIndex = startIndex + index;
              return (
                <tr key={absoluteIndex}>
                  <td className="border p-2">{absoluteIndex + 1}</td>
                  <td className="border p-2">{task.name}</td>
                  <td className="border p-2">{task.startDate}</td>
                  <td className="border p-2">{task.dueDate}</td>
                  <td className="border p-2">{task.status}</td>
                  <td className="border p-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEditTask(absoluteIndex)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteTask(absoluteIndex)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-2 text-sm">
        <div>
          {currentTasks.length > 0 && (
            <p>
              Showing {startIndex + 1} to {Math.min(endIndex, totalTasks)} of {totalTasks} entries
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${
              currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-white"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages || totalPages === 0
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
      <button className="bg-gray-500 text-white px-4 py-2 rounded mt-4" onClick={goToBack}>Go Back</button>
    </div>
  );
};

export default TaskList;
