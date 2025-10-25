import React, { useState } from 'react'

function AddJobs() {

  const [form, setForm] = useState({
    title: null,
    company: null,
    location: null,
    type: null,
    source: "Internal",
    requirements: null,
    description: null
  })

  const handleChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(form);
    try {
        const res = await axios.post("http://localhost:8000/recruiter/addjobs", form, {withCredentials: true})
        console.log(res.data);
    } catch (error) {
        console.log("Error in adding job!!", error);
    }
  }
  return (
    <form className='flex justify-center' onSubmit={handleSubmit}>
        <div className='flex border-2 text-lg border-black rounded-lg w-[90%] bg-slate-400 space-x-3 p-3'>
        <div className='flex flex-col space-y-4 w-[25%] p-3 text-xl '>
            <input type="text" name='title' onChange={handleChange} className='border-2 border-black rounded-md p-2' placeholder='Enter Title..'/>
            <input type="text" name='company' onChange={handleChange} className='border-2 border-black rounded-md p-2' placeholder='Enter Company..'/>
            <input type="text" name='location' onChange={handleChange} className='border-2 border-black rounded-md p-2' placeholder='Enter Location..'/>
            <input type="text" name='type' onChange={handleChange} className='border-2 border-black rounded-md p-2' placeholder='Enter Type'/>
            
        </div>
        <div className='flex flex-col space-y-4 w-[25%] p-3'>
            <p className='border-2 border-black rounded-md p-2'>Source : Internal</p>
            <input type="text" name='requirements' onChange={handleChange} className='border-2 border-black rounded-md p-2' placeholder='Enter Requirements'/>
        </div>
        <div className='flex flex-col space-y-4 w-[50%] p-3 items-end'>
          <textarea name='description' onChange={handleChange} className='border-2 w-full border-black rounded-md p-2' rows={8} placeholder='Enter Description'></textarea>
          <button type='submit' onClick={handleSubmit} className='border-2 border-black rounded-md p-2 cursor-pointer w-[10%] right-0'>Add</button>
        </div>
    </div>

  </form>
  )
}

export default AddJobs
