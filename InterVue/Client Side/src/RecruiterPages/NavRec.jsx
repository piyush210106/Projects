import React from 'react'
import { NavLink } from 'react-router-dom'
function NavRec() {
  return (
      <div className='flex justify-around items-center border-2 border-black p-3 rounded-md max-w-screen m-2'>
        <h3 className='text-2xl font-extrabold'>InterVue</h3>
        <div className='flex space-x-4'>
          <NavLink to="/recruiter/addjobs" className='border-2 border-black p-2 rounded-lg'>Add Jobs</NavLink>
          <NavLink to="/recruiter/appliedcans" className='border-2 border-black p-2 rounded-lg'>Applied Candidates</NavLink>
          <NavLink to="/recruiter/chatbot" className='border-2 border-black p-2 rounded-lg'>Chatbot</NavLink>
          <NavLink to="/recruiter/resume" className='border-2 border-black p-2 rounded-lg'>Resume</NavLink>
          <NavLink to="/" className='border-2 border-black p-2 rounded-lg'>LogOut</NavLink>
        </div>

    </div>
  )
}

export default NavRec
