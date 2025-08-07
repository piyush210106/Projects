import React from 'react'

function card({title, amount, type, category, date, id}) {
  const bgColor = type === "Credit" ? "bg-green-500" : "bg-red-500";

  return (
    <div className={`flex border-2 hover:scale-105 duration-100 w-[90%] border-white justify-between p-4 px-6 m-2 rounded-md   text-xl  ${bgColor}`}>
      <div className='flex flex-col spcae-y-3'>
        <h2>Amount: {amount}</h2>
        <h2>Title: {title}</h2>
        <h2>Category: {category}</h2>
      </div>
      <div className='flex flex-col space-y-3'>
        <h2>Date: {date}</h2>
        <h2>Type: {type}</h2>
      </div>
    </div>
  )
}

export default card
