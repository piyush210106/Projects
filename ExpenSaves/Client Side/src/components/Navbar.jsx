import React from 'react'
import { NavLink } from 'react-router-dom'
import { Wallet, LogOut } from 'lucide-react'

function Navbar() {
  const linkClass = ({ isActive }) => 
    `px-4 py-2 rounded-full text-sm font-medium transition-all ${
      isActive 
        ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
    }`;

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-4 w-full max-w-7xl mx-auto border-b border-white/5 bg-white/[0.02] backdrop-blur-md mb-8 rounded-b-3xl mt-4">
      
      <div className='flex items-center gap-3'>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <h2 className='font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 hidden md:block'>
          ExpenSaves
        </h2>
      </div>

      <div className='flex space-x-2 mr-2 overflow-x-auto custom-scrollbar pb-1 md:pb-0'>
            <NavLink to="/user/home" className={linkClass}>Home</NavLink>
            <NavLink to="/user/statistics" className={linkClass}>Statistics</NavLink>
            <NavLink to="/user/history" className={linkClass}>History</NavLink>
            <NavLink to="/user/cashy" className={linkClass}>Cashy</NavLink>
            <NavLink to="/user/reminders" className={linkClass}>Reminders</NavLink>
            <NavLink to="/user/calculator" className={linkClass}>Calculator</NavLink>
            
            <NavLink to="/user/logout" className="px-4 py-2 rounded-full text-sm font-medium transition-all text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 ml-4 flex items-center gap-1">
              <LogOut className="w-4 h-4" /> LogOut
            </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
