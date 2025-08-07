import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from './Card';
function Reminders() {
  let [reminder, setReminder] = useState([]);
  let [formdata, setformdata] = useState({
    amount: "",
    title: "",
    category: "",
    reminderDate: "",
    type: ""
  })

  const options = ["Housing", "Transportation", "Food", "Health", "Entertainment", "Lifestyle", " Financial Obligations", "Miscellaneous"];
  const types = ["Credit", "Debit"];
  
    useEffect( () => {
      const fetchreminders = async () => {
      await axios
      .get("http://localhost:8000/user/reminders", {withCredentials: true})
      .then( (res) => {
        setReminder(res.data);
        console.log("Reminders Fetched successfully !!");
      })
      .catch( (error) => {
          console.error("Error in fetching Reminders ", error);
      })

      }
      fetchreminders();
  }, [])


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setformdata((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);

    try {
       await axios.post("http://localhost:8000/user/reminders", formdata, {withCredentials: true});
       console.log("Reminder added successfully!!!");
       setformdata({
            amount: "",
            title: "",
            type: "",
            category: "",
            reminderDate: ""
       })
        const newdata = await axios.get("http://localhost:8000/user/reminders", {withCredentials: true});
        setReminder(newdata.data);    
    } catch (error) {
        console.log("Error in adding reminder!! ", error);
    }
  }
  
  return (
    <div>
        <div className='flex flex-col px-3 space-y-4 border-2 border-white py-5 my-2 rounded-md mx-2'>
        <h2 className='text-4xl font-extrabold'>Add Reminder</h2>
        <form >
          <div className='flex justify-between items-center'>
            
              <div className='flex flex-col justify-center space-y-3 w-[70%] '>
                <input type="number" name='amount' onChange={handleChange} value={formdata.amount} placeholder='Enter Amount' className='border-2 border-white w-[30%] p-2 rounded-md' min={1}/>
                <input type="text" name='title' onChange={handleChange} value={formdata.title} placeholder='Enter Title' className='border-2 boder-white p-2 rounded-md w-[40%]'/>
                <div className="flex border-2 border-white space-x-2 p-2 rounded-md">
                      {options.map((option, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="category"
                            value={option}
                            checked={formdata.category === option}
                            onChange={handleChange}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                </div>              
              </div>

              <div className='flex flex-col p-4 space-y-5 justify-end items-center mr-2 w-[30%] '>
                <input type="date" name='reminderDate' onChange={handleChange} value={formdata.reminderDate} className='border-2 border-white rounded-md p-2'/>
                <div className="flex justify-center border-2 border-white space-x-2 p-2 w-[60%] rounded-md">
                      {types.map((check, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                        <input
                          type="radio"
                          name="type"
                          value={check}
                          checked={formdata.type === check}
                          onChange={handleChange}
                        />             
                          <span>{check}</span>
                        </label>
                      ))}
                </div>              
                <button onClick={handleSubmit} className='border-2 border-white bg-amber-200' type="submit">ADD</button>
              </div>

          </div>
        </form>
        </div>

        <div className='border-2 border-white rounded-md p-2 m-2'>
          <h1 className='font-extrabold m-2'>Reminders</h1>
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
