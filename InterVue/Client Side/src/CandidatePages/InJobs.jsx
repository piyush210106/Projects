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
      {injobs.map((job) => (
        <JobCard key={job.id || job.id} job={job}/>
      ))}
    </div>
  )
}

export default InJobs
