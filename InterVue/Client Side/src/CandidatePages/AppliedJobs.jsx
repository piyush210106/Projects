import React, {useEffect} from 'react'
import useCandidateStore from '../Stores/CandidateStore.js'
import JobCard from '../Components/JobCard.jsx';

function AppliedJobs() {
  const {appliedjobs, fetchappliedjobs} = useCandidateStore();

  useEffect(() => {
    fetchappliedjobs();
  }, [appliedjobs]);

  return (
    <div className='flex flex-col space-y-2 justify-center items-center'>
      {appliedjobs.map((job) => (
        <JobCard key={job.id || job.id} job={job}/>
      ))}
    </div>
  )
}

export default AppliedJobs
