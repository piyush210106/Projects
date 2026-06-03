import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from "./Card"
import { motion } from 'framer-motion'
import { Search, Calendar, History as HistoryIcon } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

function History() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [searchdate, setSearchDate] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
          const res = await axios.get("https://projects-zeud.onrender.com/user/history", {withCredentials: true});
          setTransactions(res.data);
      } catch (error) {
        console.error("Error in fetching!!", error);
      }
    }
    fetch();
  }, []);

  const handleChange = (e) => setSearch(e.target.value);
  const handleChangeDate = (e) => setSearchDate(e.target.value);

  const filtered = transactions
    .filter(entry => !search || entry.title.toLowerCase().includes(search.toLowerCase()))
    .filter(entry => !searchdate || entry.date === searchdate);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col w-full max-w-5xl mx-auto px-6 min-h-[70vh] pb-12"
    >
      <motion.div variants={itemVariants} className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 flex items-center justify-center gap-3">
          <HistoryIcon className="w-10 h-10 text-purple-500" />
          Transaction History
        </h1>
        <p className="text-gray-400">Review all your past income and expenses</p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 mb-8 bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />
        
        {/* Search Bar */}
        <div className="flex-1 relative z-10">
          <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2 block">Search by Title</label>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={search} 
              onChange={handleChange} 
              placeholder='Try "Groceries" or "Salary"...' 
              className='w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors'
            />
          </div>
        </div>
        
        {/* Date Filter */}
        <div className="w-full md:w-64 relative z-10">
          <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2 block">Filter by Date</label>
          <div className="relative">
            <input 
              type="date" 
              value={searchdate} 
              onChange={handleChangeDate} 
              className='w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert'
            />
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <motion.div variants={itemVariants} className="flex flex-col gap-3">
        {filtered.length === 0 ? (
           <div className="border border-white/5 bg-white/[0.01] rounded-3xl p-16 text-center text-gray-500 flex flex-col items-center mt-4">
              <Calendar className="w-12 h-12 mb-4 opacity-30" />
              <p className="text-lg">No transactions found.</p>
              <p className="text-sm">Try adjusting your search criteria or dates.</p>
           </div>
        ) : (
          filtered.map((entry, id) => (
            <motion.div 
              key={id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: id * 0.05 }}
              className="w-full"
            >
              <Card
                amount={entry.amount}
                title={entry.title}
                type={entry.type}
                category={entry.category}
                date={entry.date}
                id={entry._id}
              />
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  )
}

export default History
