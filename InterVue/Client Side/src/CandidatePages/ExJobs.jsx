import React from 'react';
import axios from 'axios';
import JobCard from '../Components/JobCard.jsx';
import useCandidateStore from '../Stores/CandidateStore.js';
import { useEffect } from 'react';

function ExJobs() {
  const exjobs = useCandidateStore((state) => state.exjobs);
  const addexjob = useCandidateStore((state) => state.addexjob);  
  
  useEffect(() => {
    addexjob()
  }, []);

  return (
    <div className='flex flex-col space-y-2 justify-center items-center'>
      {exjobs.map((job) => (
        <JobCard key={job.id || job._id} job={job}/>
      ))}
    </div>
  )
}

export default ExJobs
