import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Reminders() {
  let [reminder, setReminder] = useState([]);
  let [amount, setAmount] = useState()
  let [description, setDescription] = useState()
  let [date, setDate] = useState()
  let [formdata, setformdata] = useState({
    amount: "",
    title: "",
    type: "",
    category: "",
    date: ""
  })

  const options = ["Housing", "Transportation", "Food", "Health", "Entertainment", "Lifestyle", " Financial Obligations", "Miscellaneous"];
  const [selected, setSelected] = useState(null);

  const types = ["Credit", "Debit"];
  const [type, setType] = useState(null);
  

  const handleChange = (e) => {
      setformdata({
        ...formdata, [e.target.name]: e.target.value
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);

    try {
        await axios.post("http://localhost:8000/reminders", formdata);
        console.log("Reminder added successfully!!!");
        setformdata({
            amount: "",
            title: "",
            type: "",
            category: "",
            date: ""
        })
        const newdata = await axios.get("http://localhost:8000/reminder");
        setReminder(newdata);    
    } catch (error) {
        console.log("Error in adding reminder!! ", error);
    }
  }
  
  const handleCheckbox = (option) => {
    setSelected(selected === option ? null : option); 
  };

  const handleType = (check) => {
    setType(type === check ? null : type); 
  };

  return (
    <div>
        <div className='flex flex-col px-3 space-y-4 border-2 border-white py-5 my-2 rounded-md mx-2'>
        <h2 className='text-2xl font-extrabold'>Add Transaction</h2>
        <form >
          <div className='flex justify-between items-center'>
            
              <div className='flex flex-col justify-center space-y-3 w-[70%] '>
                <input type="number" onChange={handleChange} value={amount} placeholder='Enter Amount' className='border-2 border-white w-[30%] p-2 rounded-md' min={1}/>
                <input type="text" onChange={handleChange} value={description} placeholder='Enter Description' className='border-2 boder-white p-2 rounded-md w-[40%]'/>
                <div className="flex border-2 border-white space-x-2 p-2 rounded-md">
                      {options.map((option, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selected === option}
                            onChange={() => handleCheckbox(option)}
                            className="form-checkbox text-blue-500 h-5 w-5"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                </div>              
              </div>

              <div className='flex flex-col p-4 space-y-5 justify-end items-center mr-2 w-[30%] '>
                <input type="date" onChange={handleChange} value={date} className='border-2 border-white rounded-md p-2'/>
                <div className="flex justify-center border-2 border-white space-x-2 p-2 w-[60%] rounded-md">
                      {types.map((type, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selected === type}
                            onChange={() => handleType(type)}
                            className="form-checkbox text-blue-500 h-5 w-5"
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                </div>              
                <button onClick={handleSubmit} className='border-2 border-white bg-amber-200' type="submit">ADD</button>
              </div>

          </div>
        </form>
        </div>

        <div className='border-2 border-white rounded-md p-2 m-2'>
          <>
          {reminder.map((entry, id) => (
            <div key={id}>
              <Card
                amount = {entry.amount}
                title = {entry.title}
                type = {entry.type}
                category = {entry.category}
                date = {entry.date}
                id = {entry._id}
              ></Card>
            </div>
          ))}
          </>
         
        </div>
    </div>
  )
}

export default Reminders
