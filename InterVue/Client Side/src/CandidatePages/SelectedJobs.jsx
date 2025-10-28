import React, {useEffect} from 'react'
import useCandidateStore from '../Stores/CandidateStore.js';
import JobCard from '../Components/JobCard.jsx';
function SelectedJobs() {

  const {selectedjobs} = useCandidateStore();

  return (
    <div className='flex flex-col space-y-2 justify-center items-center'>
      {selectedjobs.map((job) => (
        <JobCard key={job.id || job._id} job={job}/>
      ))}
    </div>
  )
}

export default SelectedJobs
