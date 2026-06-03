import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from "./Card"
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'
import { CalendarClock, IndianRupee } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

function Reminders() {
  const [reminder, setReminder] = useState([]);
  const [formdata, setformdata] = useState({
    amount: "",
    title: "",
    category: "",
    reminderDate: "",
    type: ""
  });

  const options = ["Housing", "Transportation", "Food", "Health", "Entertainment", "Lifestyle", "Financial Obligations", "Miscellaneous"];
  const types = ["Credit", "Debit"];
  
  useEffect(() => {
    const fetchreminders = async () => {
      try {
        const res = await axios.get("https://projects-zeud.onrender.com/user/reminders", {withCredentials: true});
        setReminder(res.data);
      } catch (error) {
        console.error("Error in fetching Reminders ", error);
      }
    }
    fetchreminders();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formdata.amount || !formdata.title || !formdata.category || !formdata.reminderDate || !formdata.type) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      await axios.post("https://projects-zeud.onrender.com/user/reminders", formdata, {withCredentials: true});
      toast.success("Reminder Added Successfully");
      setformdata({ amount: "", title: "", type: "", category: "", reminderDate: "" });
      
      const newdata = await axios.get("https://projects-zeud.onrender.com/user/reminders", {withCredentials: true});
      setReminder(newdata.data);    
    } catch (error) {
       console.log("Error in adding reminder!! ", error);
       toast.error("Error adding reminder");
    }
  }
  
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col space-y-8 w-full max-w-7xl mx-auto px-6 min-h-[70vh] pb-12"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center gap-3">
          <CalendarClock className="w-10 h-10 text-blue-400" />
          Smart Reminders
        </h1>
        <p className="text-gray-400">Never miss a payment. Schedule reminders synced to your flow.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ADD REMINDER FORM */}
        <motion.div variants={itemVariants} className="lg:col-span-1 border border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col h-fit">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
          
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            New Reminder
          </h2>
          
          <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2 block">Amount</label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="number" name='amount' onChange={handleChange} value={formdata.amount} placeholder='0.00' min={1}
                  className='w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors' />
              </div>
            </div>

            <div>
               <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2 block">Title / Note</label>
               <input type="text" name='title' onChange={handleChange} value={formdata.title} placeholder='e.g., Internet Bill' 
                  className='w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors' />
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2 block">Reminder Date</label>
              <input type="date" name='reminderDate' onChange={handleChange} value={formdata.reminderDate} 
                 className='w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert' />
            </div>

            <div>
               <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2 block">Type</label>
               <div className="flex gap-4">
                  {types.map((check, index) => (
                    <label key={index} className={`flex-1 flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${formdata.type === check ? (check === 'Credit' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-pink-500/10 border-pink-500/50 text-pink-400') : 'bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30'}`}>
                      <input type="radio" name="type" value={check} checked={formdata.type === check} onChange={handleChange} className="hidden" />             
                      <span className="font-medium text-sm">{check}</span>
                    </label>
                  ))}
               </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2 block">Category</label>
              <select name="category" value={formdata.category} onChange={handleChange}
                className='w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none'>
                 <option value="" disabled>Select a category</option>
                 {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
              </select>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg mt-4' 
              type="submit"
            >
              Set Reminder
            </motion.button>
          </form>
        </motion.div>

        {/* REMINDERS LIST */}
        <motion.div variants={itemVariants} className="lg:col-span-2 border border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-3xl p-6 md:p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-2xl font-bold">Upcoming Reminders</h2>
             <span className="text-sm font-medium px-3 py-1 bg-white/5 rounded-full border border-white/10 text-gray-400">
               {reminder.length} active
             </span>
          </div>
          
          {reminder.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 min-h-[300px]">
               <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                 <CalendarClock className="w-8 h-8 opacity-50" />
               </div>
               <p>No reminders scheduled.</p>
               <p className="text-sm">Add one to get notified before it's due.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {reminder.map((entry, id) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: id * 0.05 }}
                  key={id} 
                >
                  <Card
                    amount={entry.amount}
                    title={entry.title}
                    type={entry.type}
                    category={entry.category}
                    date={entry.reminderDate} /* Use reminderDate here instead of default date */
                    id={entry._id}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Reminders
