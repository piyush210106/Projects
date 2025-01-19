import React from 'react'
import { useState } from 'react';
import {addPaste, updatePaste} from '../storeSlice'
import { data, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function Home() {

const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [searchParams, setserchParams] = useSearchParams();
const pasteid = searchParams.get("pasteid");
const dispatch = useDispatch();
const allPastes = useSelector((state) => state.reducer.pastes);

 const handleContent = (e) => {
    setContent(e.target.value);
 }

 const handleTitle = (e) => {
    setTitle(e.target.value);
 }

 useEffect(() => {
   if(pasteid){
    const paste= allPastes.find((p) => String(p.id) === String(pasteid))
    setTitle(paste.title);
    setContent(paste.content);
   }
   
 }, [pasteid])

 const add = () => {
  const paste = {
    id:Date.now(),
    title:title ,
    content:content, 
    createdAt: new Date().toISOString().slice(0,10),
  }

   if(pasteid){
    const paste2 = {
      id: pasteid,
      title:title ,
      content:content, 
      createdAt: new Date().toISOString().slice(0,10),

    }
    dispatch(updatePaste(paste2));
   }
   else{
    dispatch(addPaste(paste));
   }
   setContent("");
   setTitle("");
   setserchParams({});
 }

  return (
    <div className='flex flex-col space-y-4  p-4 w-full  justify-center '>
      <div className='flex space-x-3 '>
      <input 
      type='text'
      placeholder='Enter Title Here'
      value={title}
      className='border-2 p-2 rounded-md border-purple-500'
      onChange={handleTitle}
     
      />
      <button className=' p-3 rounded-md bg-purple-600
                        text-white font-bold hover:bg-purple-400 
                          transition-all duration-200' onClick={add}>
                           { pasteid ?"Update Paste" : "Create My Paste"}
                          </button>
      
    </div>
    <textarea
    type='text'
    placeholder='Enter your content here...'
    className='border-2 border-purple-500 p-2'
    value={content}
    onChange={handleContent}
     rows={18}
    />
    </div>
  )
}

export default Home
