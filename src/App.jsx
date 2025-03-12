import React from 'react'
import SignIn from './Components/SignIn'
import Singup from './Components/Signup'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import ProjectList from './Components/ProjectList'
import TaskList from './Components/TaskList'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignIn />} /> 
        <Route path='/signup' element={<Singup />} />\
        <Route path='/dashboard' element={<Navbar />} />
        <Route path='/project' element={<ProjectList />} />
        <Route path='/task' element={<TaskList />} />
      </Routes>
 
    </div>
  )
}

export default App