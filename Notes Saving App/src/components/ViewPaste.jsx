import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

function ViewPaste() {

  const {id} = useParams();
  const allPastes = useSelector((state) => state.reducer.pastes);
  const paste = allPastes.filter((p) => p.id == id)[0];

  return (
    <div className='flex flex-col space-y-4  p-4 w-full  justify-center '>
      <div className='flex space-x-3 '>
      <input 
      type='text'
      placeholder='Enter Title Here'
      value={paste.title}
      disabled
      className='border-2 p-2 rounded-md border-purple-500'
     
      />
      
    </div>
    <textarea
    type='text'
    placeholder='Enter your content here...'
    className='border-2 border-purple-500 p-2'
    value={paste.content}
    disabled
    rows={18}
    />
    </div>
  )
}

export default ViewPaste
