import React from 'react'

function card({title, amount, type, category, date, id}) {
  return (
    <div>
      <div className='flex flex-col'>
        <h2>Amount: {amount}</h2>
        <h2>Title: {title}</h2>
        <h2>Category: {category}</h2>
      </div>
      <div>
        <h2>Date: {date}</h2>
        <h2>Type: {type}</h2>
      </div>
    </div>
  )
}

export default card
