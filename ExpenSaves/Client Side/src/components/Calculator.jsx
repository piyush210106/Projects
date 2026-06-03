import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator as CalcIcon, DollarSign, ArrowRightLeft } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

function Calculator() {
  const [input, setInput] = useState("");
  const [currencies, setCurrencies] = useState({});
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [ans, setAns] = useState("");

  const handleclick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      // eslint-disable-next-line
      setInput(eval(input).toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const handleback = () => {
    setInput(input.slice(0, -1));
  };

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const res = await fetch("https://api.frankfurter.app/currencies");
        const data = await res.json();
        setCurrencies(data);
      } catch (error) {
        console.log("Error in fetching Currencies !!", error);
      }
    };
    getCurrencies();
  }, []);

  const handleConvert = async () => {
    if (!amount || !from || !to) return;
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
      const data = await res.json();
      setAns(data.rates[to]);
    } catch (error) {
      console.error("Error in converting!! ", error);
    }
  };

  // Button styles for the calculator grid
  const calcBtnStyle = "p-4 md:p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] text-white font-semibold text-xl transition-all shadow-sm active:scale-95 flex items-center justify-center";
  const calcActionStyle = "p-4 md:p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 text-purple-400 font-semibold text-xl transition-all shadow-sm active:scale-95 flex items-center justify-center";
  
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col space-y-8 w-full max-w-6xl mx-auto px-6 min-h-[70vh] pb-12"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center gap-3">
          <CalcIcon className="w-10 h-10 text-emerald-400" />
          Financial Tools
        </h1>
        <p className="text-gray-400">Quickly calculate numbers and convert currencies</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* CALCULATOR APP */}
        <motion.div variants={itemVariants} className="md:col-span-5 lg:col-span-4 border border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col h-fit">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
          
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            Calculator
          </h2>
          
          <div className="relative z-10 w-full mb-6">
             <input 
               type="text" 
               className='w-full bg-[#050505] border border-white/10 rounded-2xl py-5 px-4 text-right text-3xl font-mono text-white focus:outline-none shadow-inner tracking-widest' 
               value={input || "0"} 
               readOnly
             />
          </div>

          <div className="relative z-10 grid grid-cols-4 gap-3">
            <button onClick={handleClear} className={`${calcActionStyle} text-red-400 bg-red-500/10 border-red-500/20 hover:bg-red-500/20`}>C</button>
            <button onClick={handleback} className={calcActionStyle}>←</button>
            <button onClick={() => handleclick("/")} className={calcActionStyle}>/</button>
            <button onClick={() => handleclick("*")} className={calcActionStyle}>×</button>
            
            <button onClick={() => handleclick("7")} className={calcBtnStyle}>7</button>
            <button onClick={() => handleclick("8")} className={calcBtnStyle}>8</button>
            <button onClick={() => handleclick("9")} className={calcBtnStyle}>9</button>
            <button onClick={() => handleclick("-")} className={calcActionStyle}>-</button>
            
            <button onClick={() => handleclick("4")} className={calcBtnStyle}>4</button>
            <button onClick={() => handleclick("5")} className={calcBtnStyle}>5</button>
            <button onClick={() => handleclick("6")} className={calcBtnStyle}>6</button>
            <button onClick={() => handleclick("+")} className={calcActionStyle}>+</button>
            
            <button onClick={() => handleclick("1")} className={calcBtnStyle}>1</button>
            <button onClick={() => handleclick("2")} className={calcBtnStyle}>2</button>
            <button onClick={() => handleclick("3")} className={calcBtnStyle}>3</button>
            <button onClick={handleCalculate} className={`${calcActionStyle} row-span-2 bg-gradient-to-b from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 border-none`}>=</button>
            
            <button onClick={() => handleclick("0")} className={`${calcBtnStyle} col-span-2`}>0</button>
            <button onClick={() => handleclick(".")} className={calcBtnStyle}>.</button>
          </div>
        </motion.div>

        {/* CURRENCY CONVERTER */}
        <motion.div variants={itemVariants} className="md:col-span-7 lg:col-span-8 border border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
             <h2 className="text-2xl font-bold flex items-center gap-2">Currency Converter</h2>
             <DollarSign className="w-6 h-6 text-blue-400" />
          </div>

          <div className="relative z-10 flex flex-col space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <div className="flex-1 w-full flex flex-col space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold">From Source</label>
                <select
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                >
                  {currencies && Object.keys(currencies).map((code) => (
                    <option key={code} value={code}>
                      {code} - {currencies[code]}
                    </option>
                  ))}
               </select>  
              </div>

              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0 mt-6 hidden md:flex">
                <ArrowRightLeft className="w-5 h-5 text-gray-400" />
              </div>

              <div className="flex-1 w-full flex flex-col space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold">To Target</label>
                <select
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
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
            </div>

            <div className="flex flex-col md:flex-row items-end gap-4">
              <div className="flex-1 w-full space-y-2">
                 <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Amount</label>
                 <input type="number" 
                     placeholder='Enter amount to convert' 
                     className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-lg text-white focus:outline-none focus:border-blue-500/50 transition-colors shadow-inner"
                     value={amount}
                     onChange={(e) => setAmount(e.target.value)}/>
              </div>

              <div className="flex-1 w-full space-y-2">
                 <label className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">Result</label>
                 <input type="text" 
                     className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl py-4 px-4 text-emerald-400 text-lg font-bold focus:outline-none focus:border-emerald-500/50 transition-colors shadow-inner"
                     value={ans ? `${ans}` : '0.00'}
                     readOnly/>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConvert}
              className="w-full md:w-auto self-end px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Convert Now
            </motion.button>
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}

export default Calculator
