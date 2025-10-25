import React from 'react'
import useCandidateStore from '../Stores/CandidateStore.js';
import { useEffect } from 'react';

function InJobs() {

  const {injobs, addinjob} = useCandidateStore();
  useEffect(() => {
    addinjob();
  }, [addinjob]);

  return (
    <div className='flex flex-col space-y-2 justify-center items-center'>
      {exjobs.map((job) => (
        <JobCard key={job._id} job={job}/>
      ))}
    </div>
  )
}

export default InJobs
