import React from 'react'
import { NavLink } from 'react-router-dom'
import useCandidateStore from '../Stores/CandidateStore.js';

const truncateText = (text, maxLength = 200) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function JobCard({job}) {
  const {selectedjobs, addselectedjob, removeselectedjob} = useCandidateStore();

  const handleClick = (action, job) => {
      if(action === "Add") addselectedjob(job);
      else removeselectedjob(job.id || job._id);
  }

  const description = truncateText(job.description || 'No description available.');
  return (
    <div className='flex border-2 text-lg border-black rounded-lg w-[90%] bg-slate-500 space-x-3 p-3'>
        <div className='flex flex-col space-y-4 w-[25%] p-3 text-xl font-bold'>
            <p>{job.title}</p>
            <p>{job.company.display_name || job.company}</p>
            <p>{job.area.display_name || job.location}</p>
            <p>{null || job.type}</p>
        </div>
        <div className='flex flex-col space-y-4 w-[25%]  p-3'>
            <p>Source</p>
            <p>{job.salary_min || job.salary}</p>
            <p>{null || job.requirements}</p>
            <NavLink to={job.redirect_url || null}>Link</NavLink>
        </div>
        <div className='flex flex-col space-y-4 w-[50%]  p-3'>
            <textarea>{job.description}</textarea>
            <div className='flex space-x-3 w-full justify-center items-center'>
              <button className='p-3 border-2 border-black rounded-lg cursor-pointer' onClick={() => handleClick("Add", job)} >Add</button>
              <button className='p-3 border-2 border-black rounded-lg cursor-pointer' onClick={() => handleClick("Remove", job)} >Remove</button>
            </div>
        </div>
    </div>
  )
}

export default JobCard
