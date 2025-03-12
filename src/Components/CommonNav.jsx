import React from 'react'
import { FaBars, FaUser } from 'react-icons/fa'

const CommonNav = () => {
  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md ">
    <div className="flex items-center gap-4">
      <button onClick={() => setIsSidebarOpen(true)} className="text-white text-2xl">
        <FaBars />
      </button>
      <h1 className="text-xl font-bold">The Internship Platform</h1>
    </div>
    <div className="text-white text-2xl">
      <FaUser /> 
    </div>
  </nav>

  )
}

export default CommonNav