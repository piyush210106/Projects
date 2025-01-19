import React from 'react'
import { NavLink } from 'react-router-dom'
function Navbar() {
  return (
    <div className='flex space-x-4 justify-center items-center'>
      <NavLink to="/" className={({isActive}) =>  isActive ?"text-purple-500 font-bold" : "text-grey-700"}>Home</NavLink>
      <NavLink to="/pastes" className={({isActive}) =>  isActive ?"text-purple-500 font-bold" : "text-grey-700"}>All Pastes</NavLink>
    </div>
  )
}

export default Navbar
