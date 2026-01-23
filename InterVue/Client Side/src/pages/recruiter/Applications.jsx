import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApplicationCard from '../../components/ApplicationCard.jsx';
import {useGetApplicationsQuery} from "../../store/RecruiterApi.js";
import { 
  FiUser, FiBriefcase, FiCpu, FiArrowRight, 
  FiSearch, FiFilter, FiMoreHorizontal, FiCheckCircle,
  FiXCircle, FiClock, FiStar, FiDownload
} from 'react-icons/fi';


const Applications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {applications, isLoading} = useGetApplicationsQuery();


  // const filteredApps = applications.filter(app => 
  //   (filterStatus === "All" || app.status === filterStatus) &&
  //   app.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 p-6 md:p-12">
      {/* Background Decor */}
      <div className="fixed top-0 right-0 w-125 h-125 bg-purple-600/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION (Aesthetic-Usability) */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-black tracking-tighter mb-2">Manage <span className="text-purple-500">Applications</span></h1>
            <p className="text-zinc-500 text-sm font-medium">Review AI-ranked candidates for your active job postings.</p>
          </motion.div>

          {/* SEARCH & FILTERS (Hick's Law - Grouped controls) */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search candidates..."
                className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm focus:border-purple-500 outline-none transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {/* {isLoading ? (
               <div className="space-y-4">
                 {[1,2,3].map(i => <LoadingSkeleton key={i} />)}
               </div>
            ) : (
              filteredApps.map((app) => (
                <ApplicationCard />
              ))
            )} */}
            <ApplicationCard/>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// CHILD COMPONENT: Individual Row (Law of Similarity)
const ApplicationRow = ({ app }) => {
  const statusColors = {
    "Shortlisted": "bg-green-500/10 text-green-500 border-green-500/20",
    "Under Review": "bg-purple-500/10 text-purple-500 border-purple-500/20",
    "Rejected": "bg-red-500/10 text-red-500 border-red-500/20"
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ borderColor: 'rgba(168,85,247,0.4)' }}
      className="bg-zinc-950 border border-white/5 rounded-3xl p-4 lg:px-8 lg:py-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 group transition-all"
    >
      {/* Identity */}
      <div className="col-span-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:text-purple-500 transition-colors border border-white/5 shadow-inner">
          <FiUser size={20} />
        </div>
        <div>
          <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">{app.name}</h4>
          <p className="text-zinc-500 text-xs font-medium flex items-center gap-1.5 pt-0.5">
            <FiBriefcase size={12}/> {app.role}
          </p>
        </div>
      </div>

      {/* AI Metric (Aesthetic-Usability) */}
      <div className="col-span-2 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-1">
          <FiCpu className="text-purple-500 text-xs animate-pulse" />
          <span className="text-[10px] text-zinc-600 font-black uppercase">Neural Score</span>
        </div>
        <div className="text-xl font-black tracking-tighter">{app.score}%</div>
      </div>

      {/* Status Badge (Law of Similarity) */}
      <div className="col-span-2 flex justify-center">
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusColors[app.status]}`}>
          {app.status}
        </span>
      </div>

      {/* Timestamp */}
      <div className="col-span-2 flex items-center justify-center gap-2 text-zinc-500 text-sm font-medium">
        <FiClock size={14} /> {app.date}
      </div>

      {/* Actions (Fitts's Law - Clear clickable area) */}
      <div className="col-span-2 flex justify-end items-center gap-3">
        <button className="p-3 bg-zinc-900 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all shadow-lg border border-white/5">
          <FiDownload size={18} />
        </button>
        <button className="px-6 py-3 bg-purple-600 rounded-xl text-white font-black text-xs uppercase tracking-widest hover:bg-purple-500 active:scale-95 transition-all flex items-center gap-2 group/btn">
          View <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

// Loading Shimmer (Doherty Threshold)
const LoadingSkeleton = () => (
  <div className="h-24 w-full bg-zinc-900/50 rounded-3xl animate-pulse border border-white/5" />
);

export default Applications;