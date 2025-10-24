import React from 'react'
import { NavLink } from 'react-router-dom'
function JobCard({Title, Company, Location, Type, Source, Requirements, URL, Description}) {
  return (
    <div className='flex border-2 text-lg border-black rounded-lg w-[90%] bg-slate-500 space-x-3 p-3'>
        <div className='flex flex-col space-y-4 w-[25%] p-3 text-xl font-bold'>
            <p>Title</p>
            <p>Company</p>
            <p>Location</p>
            <p>Type</p>
        </div>
        <div className='flex flex-col space-y-4 w-[25%]  p-3'>
            <p>Source</p>
            <p>Requirements</p>
            <NavLink>URL</NavLink>
        </div>
        <div className='flex flex-col space-y-4 w-[50%]  p-3'>
            <textarea>DESCRIPTION</textarea>
        </div>
    </div>
  )
}

export default JobCard
