import React from 'react'
import { useState, useEffect } from 'react'
import Card from "./Card"
import axios from 'axios'
import { toast } from "react-toastify";

function Home() {

  let [transactions, setTransactions] = useState([])
  let [income, setIncome] = useState();
  let [expense, setExpense] = useState();
  let [filtered, setFiltered] = useState([]);
  let [formdata, setformdata] = useState({
    amount: "",
    title: "",
    category: "",
    date: "",
    type: ""
  })

  const options = ["Housing", "Transportation", "Food", "Health", "Entertainment", "Lifestyle", " Financial Obligations", "Miscellaneous"];
  const types = ["Credit", "Debit"];

  useEffect( () => {
      const fetchdata = async () => {
      await axios
      .get("https://projects-zeud.onrender.com/user/home", {withCredentials: true})
      .then( (res) => {
        setTransactions(res.data);
      })
      .catch( (error) => {
          console.error("Error in fetching transactions ", error);
      })

      }
      fetchdata();
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
       const res = await axios.post("https://projects-zeud.onrender.com/user/home", formdata, {withCredentials: true});
       toast.success("Transaction Added Successfully");
       setformdata({
            amount: "",
            title: "",
            type: "",
            category: "",
            date: ""
       })
        const newdata = await axios.get("https://projects-zeud.onrender.com/user/home", {withCredentials:true});
        setTransactions(newdata.data);    
    } catch (error) {
        console.log("Error in adding transaction!! ", error);
        toast.error("Error in adding transaction!!");
    }
  }

  useEffect( () => {
      let expense = 0;
      let income = 0;
      filtered.forEach( entry => {
        const temp = Number(entry.amount);
        if(entry.type == "Credit") income += temp;
        else expense += temp;
      })
        setExpense(expense);
        setIncome(income);
  }, [filtered])


useEffect(() => {
  const today = new Date().toISOString().split("T")[0]; 

  const filtered = transactions.filter(entry => {
    const entryDate = new Date(entry.date).toISOString().split("T")[0]; 
    return entryDate === today;
  });

  setFiltered(filtered); 
}, [transactions]);

  return (
    <div className='flex flex-col spcae-y-6  overflow-x-hidden w-[99%]'>
      
        <div className='flex flex-col px-3 space-y-4 border-2 border-white py-5 my-2 rounded-md mx-2'>
        <h2 className='text-2xl font-extrabold'>Add Transaction</h2>
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
                <input type="date" name='date' onChange={handleChange} value={formdata.date} className='border-2 border-white rounded-md p-2'/>
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

        <div className='flex flex-col p-4 space-y-4 border-2 border-white rounded-md m-2'>
          <h2 className='text-3xl font-extrabold'>Today's Overview: {income-expense}</h2>
          <h2 className='text-xl font-bold'>Today's Expenses: {expense}</h2>
          <h2 className='text-xl font-bold'>Today's Revenue: {income}</h2>
        </div>

        <div className='flex flex-col p-4 space-y-2 items-center border-2 border-white rounded-md m-2 '>
          <h2 className='text-3xl font-extrabold'>Today's Transactions:</h2>
          <div className='flex flex-col space-y-2 '></div>
          <>
          {filtered.map((entry, id) => (
            <div key={id} className='w-[95%]'>
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

export default Home
