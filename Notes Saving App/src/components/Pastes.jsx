import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removePaste, resetPastes } from '../storeSlice';
import { NavLink } from 'react-router-dom';
function Pastes() {
  const pastes = useSelector((state) => state.reducer.pastes || [])

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const deletepaste = (id) => {
    dispatch(removePaste(id));
  }

  const resetall =() => {
    dispatch(resetPastes());
  }

  const filterPaste = pastes.filter((paste) => paste.title.toLowerCase()
                                               .includes(search.toLowerCase()))

  return (
    <div className='w-full space-y-9 '>
      <div className='flex space-x-3 w-full '>
      <input 
      type='text'
      placeholder='Search Here...'
      className='border-2 p-2 rounded-md border-purple-500'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />
    </div >
    <div className='flex flex-col border-4 border-purple-500 rounded-md space-y-3 items-start w-full p-3'>
        <div className='flex justify-around items-center w-full mb-6'>
        <h1 className='font-extrabold text-4xl '>All Pastes</h1>
        <button onClick={resetall} className='bg-purple-500 text-white font-bold p-3 rounded-md'>Reset All Pastes</button>
        </div>
     {
      filterPaste.map((paste) => {
        return(     
         <div key={paste.id} className='border-2 border-grey-500 flex justify-start items-center p-4 w-full'>
          <div className='w-[70%] flex flex-col items-start'>
            <h1 className='font-bold text-4xl'>{paste.title}</h1>
            <p>{paste.content}</p>
          </div>
          <div className='w-[30%] space-y-3 '>
            <div className='flex justify-center items-center space-x-4'>
            <button ><NavLink to={`/?pasteid=${paste?.id}`}><img src="src/assets/editing.png" alt="" width="30rem" /></NavLink></button>
            <button onClick={() => deletepaste(paste?.id)}><img src="src/assets/delete.png" alt="" width="30rem" /></button>
            <button ><NavLink to={`/pastes/${paste?.id}`}><img src="src/assets/view.png" alt="" width="30rem" /></NavLink></button>
            <button onClick={() => navigator.clipboard.writeText(paste.content)}><img src="src/assets/copy.png" alt="" width="30rem" /></button>
            </div>
            <p className='font-bold'>{paste.createdAt}</p>
          </div>
        </div>
      )}
      )
      }
    </div>
    </div>
  )
}

export default Pastes
