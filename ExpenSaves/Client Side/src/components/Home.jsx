import React from 'react'
import { useState, useEffect } from 'react'
import Card from "./Card"

let [amount, setAmount] = useState()
let [description, setDescription] = useState()
let [type, setType] = useState()
let [date, setDate] = useState()
let [category, setCategory] = useState()
let [transactions, setTransactions] = useState([])


function Home() {
  return (
    <div className='flex flex-col spcae-y-6'>
        <div className='flex flex-col px-3 space-y-4 border-2 border-white py-5 my-2 rounded-md mx-2'>
        <h2 className='text-2xl font-extrabold'>Add Transaction</h2>
        <form >
          <div className='flex justify-between items-center'>
            
              <div className='flex flex-col justify-center space-y-3 w-[50%] '>
                <input type="number" value={amount} placeholder='Enter Amount' className='border-2 border-white w-[30%] p-2 rounded-md' min={1}/>
                <input type="text" value={description} placeholder='Enter Description' className='border-2 boder-white p-2 rounded-md'/>
                <div className='flex flex-row space-x-2 border-2 border-white p-2 rounded-md '>
                  <input type="checkbox" value={category} name='one'/>
                </div>
              </div>

              <div className='flex flex-col p-2 space-y-5 justify-end items-center mr-2'>
                <input type="date" value={date} className='border-2 border-white rounded-md p-3'/>
                <div className='flex space-x-3'>
                  <input type="checkbox" value={type}/>
                  <input type="checkbox" value={type}/>
                </div>
                <button className='border-2 border-white bg-amber-200' type="submit">ADD</button>
              </div>

          </div>
        </form>
        </div>
        <div className='flex flex-col p-4 space-y-4 border-2 border-white rounded-md m-2'>
          <h2 className='text-3xl font-extrabold'>Today's Overview:</h2>
          <h2 className='text-xl font-bold'>Today's Expenses: </h2>
          <h2 className='text-xl font-bold'>Today's Revenue:</h2>
        </div>
        <div className='flex flex-col p-4 space-y-4 border-2 border-white rounded-md m-2'>
          <h2 className='text-3xl font-extrabold'>Today's Transactions:</h2>
          <div className='flex flex-col space-y-2'></div>
          <>
          {transactions.map((entry, id) => (
            <div key={id}>
              <Card></Card>
            </div>
          ))}
          </>
        </div>
    </div>
  )
}

export default Home
