import React from 'react'

export default function Navbar2() {

  const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  return (
    <div className='flex justify-between overflow-x-hidden items-center w-screen space-x-4 p-2 rounded-md border-2 border-gray-200'>

      <div className='flex items-center space-x-3'>
        <img src="assets\Logo.png" alt="" className='w-[5%] rounded-md'/>
        <h2 className='font-extrabold text-3xl'>ExpenSaves</h2>
      </div>

      <div className='flex w-[50%]'>
        <button className='w-[80%]' onClick={handleLogin}>Login WIth Google</button>
      </div>
    </div>
  )
}
