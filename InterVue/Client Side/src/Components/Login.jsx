import axios from 'axios';
import React from 'react'
import { useState } from 'react'

function Login() {

  const [form, setForm] = useState({
    role: null,
    linkedin: null,
    resume: null
  })
  const handleChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  }
  const handleResume = (e) => {
      e.preventDefault();
      const file = e.target.files[0];
      setForm((prev) => ({...prev, resume: file}));
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(form.role, form.linkedin);
    try {
          const res = await axios.post("http://localhost:8000/login", form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });
          console.log(res.data);
    } catch (error) {
        console.log("Error in submitting onboarding form!!", error);
    }
  }
  
  return (
    <form onSubmit={handlesubmit} className='flex justify-center items-center max-w-screen mt-20'>
      <div className='flex flex-col space-y-4 bg-slate-600 text-white p-6 border-2 border-black rounded-lg'> 
          <h1 className='text-3xl font-extrabold'>
            Complete your profile
          </h1>
          <h3 className='font-bold'>Choose Your Role: </h3>
          <div className='flex space-x-5'>
            <button className='border-2 border-black p-3 rounded-lg cursor-pointer' name='role' value="Candidate" onClick={handleChange}>Candidate</button>
            <button className='border-2 border-black p-3 rounded-lg cursor-pointer' name='role' value="Recruiter" onClick={handleChange}>Recruiter</button>
          </div>
          <h3 className='font-bold'>Upload Resume: </h3>
          <input type="file" accept='.pdf' className='border-2 border-black p-3 rounded-lg cursor-pointer' onChange={handleResume}/>
          <h3 className='font-bold'>Upload LinkedIn URL:</h3>
          <input type="url" placeholder='https://www.linkedin.com/in/yourname' className='border-2 rounded-lg border-black p-3' name='linkedin' onChange={handleChange}/>
          <button type='submit' onClick={handlesubmit} className='border-2 border-black p-3 rounded-lg cursor-pointer font-bold'>Save and Continue</button>
      </div>
    </form>
  )
}

export default Login
