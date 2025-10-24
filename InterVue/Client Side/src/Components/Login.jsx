import React from 'react'

function Login() {
  return (
    <div className='flex justify-center items-center max-w-screen mt-20'>
      <div className='flex flex-col space-y-4 bg-slate-600 text-white p-6 border-2 border-black rounded-lg'> 
          <h1 className='text-3xl font-extrabold'>
            Complete your profile
          </h1>
          <h3 className='font-bold'>Choose Your Role: </h3>
          <div className='flex space-x-5'>
            <button className='border-2 border-black p-3 rounded-lg cursor-pointer'>Candidate</button>
            <button className='border-2 border-black p-3 rounded-lg cursor-pointer'>Recruiter</button>
          </div>
          <h3 className='text-bold'>Upload Resume: </h3>
          <input type="file" accept='.pdf' className='border-2 border-black p-3 rounded-lg cursor-pointer'/>
          <h3 className='font-bold'>Upload LinkedIn URL:</h3>
          <input type="url" placeholder='https://www.linkedin.com/in/yourname' className='border-2 rounded-lg border-black p-3'/>
          <button className='border-2 border-black p-3 rounded-lg cursor-pointer font-bold'>Save and Continue</button>
      </div>
    </div>
  )
}

export default Login
