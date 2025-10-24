import React from 'react'
import { NavLink } from 'react-router-dom'

function NavCan() {
  return (
    <div className='flex justify-around items-center border-2 border-black p-3 rounded-md max-w-screen m-2'>
        <h3 className='text-2xl font-extrabold'>InterVue</h3>
        <div className='flex space-x-4'>
          <NavLink to="/candidate/exjobs" className='border-2 border-black p-2 rounded-lg'>External Jobs</NavLink>
          <NavLink to="/candidate/injobs" className='border-2 border-black p-2 rounded-lg'>Internal Jobs</NavLink>
          <NavLink to="/candidate/selectedjobs" className='border-2 border-black p-2 rounded-lg'>Selected Jobs</NavLink>
          <NavLink to="/candidate/meetings" className='border-2 border-black p-2 rounded-lg'>Meetings</NavLink>
          <NavLink to="/candidate/appliedjobs" className='border-2 border-black p-2 rounded-lg'>Applied Jobs</NavLink>
        </div>
    </div>
  )
}

export default NavCan
