import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Calculator() {

let [input, setInput] = useState("");

const handleclick = (value) => {
    setInput((prev) => prev+value)
} 

const handleClear = () => {
  setInput("");
}

const handleCalculate = () => {
  try {
      setInput(eval(input).toString());
  } catch (error) {
      setInput("Error");
  }
}

const handleback = () => {
    setInput(input.slice(0, -1));
}


  let [currencies, setCurrencies] = useState({});
  let [amount, setAmount] = useState();
  let [from, setFrom] = useState();
  let [to, setTo] = useState();
  let [ans, setAns] = useState();

  useEffect( () => {
    const getCurrencies = async () => {
      try {
        const res = await fetch("https://api.frankfurter.app/currencies");
        const data = await res.json();
        setCurrencies(data);
      } catch (error) {
        console.log("Error in fetching Currencies !!", error);
      }
    }
    getCurrencies();
  }, [])

  const handleConvert = async () => {
        try {
          const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
          const data = await res.json();
          setAns(data.rates[to]);
        } catch (error) {
          console.error("Error in converting!! ", error);
        }
            
  }

  return (
    <div className='flex border-2 p-8 space-x-4 m-2 rounded-md '>

      <div className='border-2 border-white rounded-md w-[30%] flex flex-col space-y-4 p-3'>
        <h1 className='font-extrabold'>Calculator</h1>
        <input type="text" className='border-2 border-white rounded-md p-2 ' value={input || 0} readOnly/>
        <div className='flex space-x-2'>
          <button onClick={handleClear} className='bg-orange-500'>C</button>
          <button onClick={handleback}>{"<"}</button>
        </div>

        <div className='flex space-x-2'>
          <button onClick={() => handleclick("7")}>7</button>
          <button onClick={() => handleclick("8")}>8</button>
          <button onClick={() => handleclick("9")}>9</button>
          <button onClick={() => handleclick("/")}>/</button>
        </div>
        <div className='flex space-x-2'>
          <button onClick={() => handleclick("4")}>4</button>
          <button onClick={() => handleclick("5")}>5</button>
          <button onClick={() => handleclick("6")}>6</button>
          <button onClick={() => handleclick("*")}>*</button>
        </div>
        <div className='flex space-x-2 '>
          <button onClick={() => handleclick("1")}>1</button>
          <button onClick={() => handleclick("2")}>2</button>
          <button onClick={() => handleclick("3")}>3</button>
          <button onClick={() => handleclick("-")}>-</button>
        </div>
        <div className='flex space-x-2'>
          <button onClick={() => handleclick("0")}>0</button>
          <button onClick={() => handleclick(".")}>.</button>
          <button onClick={handleCalculate}>=</button>
          <button onClick={() => handleclick("+")}>+</button>
        </div>

      </div>

      <div className='border-2 border-white rounded-md flex flex-col p-3 w-[70%] space-y-3'>
          <h1 className='font-extrabold'>Currency Convertor</h1>
          <div className='flex p-2 space-x-2'>
            <select
                className="flex-1 p-2 border rounded-md bg-blue-800"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              >
                {currencies && Object.keys(currencies).map((code) => (
                  <option key={code} value={code}>
                    {code} - {currencies[code]}
                  </option>
                ))}
           </select>  

          <select
                defaultValue={to}
                name='To'
                className="flex-1 p-2 border rounded-md bg-blue-800"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              >
                {currencies && Object.keys(currencies).map((code) => (
                  <option key={code} value={code}>
                    {code} - {currencies[code]}
                  </option>
                ))}
           </select>              
            
          </div>

          <div className='flex p-2 space-x-2'>
                <input type="number" 
                       placeholder='Enter Value' 
                       className='border-2 border-white rounded-md p-2'
                       onChange={(e) => setAmount(e.target.value)}/>
                <button onClick={handleConvert}>Convert</button>
                <input type="number" 
                       className='border-2 border-white rounded-md p-2'
                       value={ans || 0}
                       readOnly/>

          </div>
      </div>

    </div>
  )
}

export default Calculator
