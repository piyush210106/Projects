import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-around items-center border-2 p-2 rounded-md border-black max-w-screen m-2 overflow-x-hidden'>
        <h1 className='text-black font-extrabold text-3xl'>InterVue</h1>
        <button className='border-2 border-black rounded-md p-2 font-bold cursor-pointer'>Sign In with Google</button>
    </div>
  )
}

export default Navbar
