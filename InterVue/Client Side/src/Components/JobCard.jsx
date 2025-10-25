import React from 'react'
import { NavLink } from 'react-router-dom'
function JobCard({job}) {
  return (
    <div className='flex border-2 text-lg border-black rounded-lg w-[90%] bg-slate-500 space-x-3 p-3'>
        <div className='flex flex-col space-y-4 w-[25%] p-3 text-xl font-bold'>
            <p>{job.job_title}</p>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.employment_statuses}</p>
        </div>
        <div className='flex flex-col space-y-4 w-[25%]  p-3'>
            <p>Source</p>
            <p>{job.salary_string}</p>
            <p>{job.technology_slugs}</p>
            <NavLink to={job.source_url}>Link</NavLink>
        </div>
        <div className='flex flex-col space-y-4 w-[50%]  p-3'>
            <textarea>DESCRIPTION</textarea>
        </div>
    </div>
  )
}

export default JobCard
