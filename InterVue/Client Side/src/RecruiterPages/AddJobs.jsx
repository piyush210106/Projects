import React from 'react'

function AddJobs() {
  return (
    <div className='flex justify-center'>
      <form className='flex w-screen justify-center'>
        <div className='flex border-2 text-lg border-black rounded-lg w-[90%] bg-slate-400 space-x-3 p-3'>
        <div className='flex flex-col space-y-4 w-[25%] p-3 text-xl '>
            <input type="text" className='border-2 border-black rounded-md p-2' placeholder='Enter Title..'/>
            <input type="text" className='border-2 border-black rounded-md p-2' placeholder='Enter Company..'/>
            <input type="text" className='border-2 border-black rounded-md p-2' placeholder='Enter Location..'/>
            <input type="text" className='border-2 border-black rounded-md p-2' placeholder='Enter Type'/>
            
        </div>
        <div className='flex flex-col space-y-4 w-[25%] p-3'>
            <p className='border-2 border-black rounded-md p-2'>Source : Internal</p>
            <input type="text" className='border-2 border-black rounded-md p-2' placeholder='Enter Requirements'/>
        </div>
        <div className='flex flex-col space-y-4 w-[50%] p-3 items-end'>
          <textarea className='border-2 w-[100%] border-black rounded-md p-2' rows={8} placeholder='Enter Description'></textarea>
          <button className='border-2 border-black rounded-md p-2 cursor-pointer w-[10%] right-0'>Add</button>
        </div>
    </div>

      </form>
  </div>
  )
}

export default AddJobs
