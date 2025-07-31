import React, { useEffect, useState } from 'react'
import axios from 'axios';

function History() {

  let [transactions, setTransactions] = useState([]);
  let [search, setSearch] = useState("");
  let [searchdate, setSearchDate] = useState();

  useEffect( () => {
    const fetch = async () => {
      try {
          const res = await axios.get("http://localhost:8000/history");
          setTransactions(res.data);
          console.log("transactions fetched Successfully!!");
      } catch (error) {
        console.error("Error in fetching!!", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  }
  
  const handleChangeDate = (e) => {
    setSearchDate(e.target.value);
  }

  const filtered = transactions.filter( entry =>  !search ||entry.title.toLowerCase().includes(search.toLowerCase()))
                               .filter(entry => !searchdate || entry.date === searchdate);
  return (
    <div className='flex flex-col space-y-5 p-2 justify-between'>
      <h1 className='font-extrabold'>History</h1>
      <div className='flex border-2 border-white rounded-md p-4 m-2 space-x-4'>
        <input type="text" value ={search} onChange={handleChange} placeholder='Search here by Title' className='border-2 rounded-md border-white p-2 w-[40%]'/>
        <input type="date" value={searchdate} onChange={handleChangeDate} className='border-2 boder-white rounded-md p-2'/>
      </div>


      <div className='border-2 border-white rounded-md p-3 m-2'>
          <>
          {filtered.map((entry, id) => (
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

export default History
