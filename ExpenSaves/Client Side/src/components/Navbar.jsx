import React from 'react'
import { NavLink } from 'react-router-dom'


function Navbar() {
  return (
    <div className='flex justify-between overflow-x-hidden items-center w-screen space-x-4 p-2 rounded-md border-2 border-gray-200'>
      
      <div className='flex items-center space-x-3'>
        <img src="assets\Logo.png" alt="" className='w-[5%] rounded-md'/>
        <h2 className='font-extrabold text-3xl'>ExpenSaves</h2>
      </div>

      <div className='flex space-x-3'>
            <NavLink to="/user/home" className='border-2 p-2 rounded-md'>Home</NavLink>
            <NavLink to="/user/statistics" className='border-2 p-2 rounded-md'>Statistics</NavLink>
            <NavLink to="/user/history" className='border-2 p-2 rounded-md'>History</NavLink>
            <NavLink to="/user/cashy" className='border-2 p-2 rounded-md'>Cashy</NavLink>
            <NavLink to="/user/reminders" className='border-2 p-2 rounded-md'>Reminders</NavLink>
            <NavLink to="/user/calculator" className='border-2 p-2 rounded-md'>Calculator</NavLink>
            <NavLink to="/user/logout" className='border-2 p-2 rounded-md'>LogOut</NavLink>
            
      </div>
    </div>
  )
}

export default Navbar
