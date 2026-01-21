import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, 
  FiBriefcase, 
  FiFileText, 
  FiArrowRight, 
  FiCpu, 
  FiLinkedin, 
  FiExternalLink,
  FiStar
} from 'react-icons/fi';

/**
 * InterVue - Recruiter: Candidate Application Row Card
 * Layout: Horizontal (80% Width Optimized)
 * UX Laws: Miller's Law (Data Chunking), Aesthetic-Usability, Fitts's Law.
 */

const ApplicationCard = ({ applicant, onClick }) => {
  // Standardized Mock Data based on your platform needs
  const data = applicant || {
    name: "Alex Rivera",
    email: "alex.rivera@dev.io",
    jobTitle: "Senior AI Engineer",
    appliedDate: "Oct 24, 2025",
    experience: "8+ Years",
    aiScore: 94,
    status: "Shortlisted",
    skills: ["PyTorch", "React", "LLMs", "Node.js"]
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.005, borderColor: '#a855f7' }}
      onClick={onClick}
      className="w-full lg:w-[80%] mx-auto bg-zinc-950 border border-white/5 rounded-3xl p-5 md:p-6 cursor-pointer transition-all duration-300 shadow-xl group relative overflow-hidden mb-4"
    >
      {/* Aesthetic Usability: Ambient Score Glow */}
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-purple-600/5 to-transparent pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* SECTION 1: CANDIDATE IDENTITY (Law of Proximity) */}
        <div className="flex items-center gap-5 flex-1 min-w-0">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-purple-400 transition-colors shadow-inner overflow-hidden">
            {/* Initial placeholder or Profile Icon */}
            <span className="text-xl font-black">{data.name.charAt(0)}</span>
          </div>
          
          <div className="truncate">
            <h3 className="text-xl font-black text-white group-hover:text-purple-400 transition-colors tracking-tight truncate">
              {data.name}
            </h3>
            <div className="flex items-center gap-3 mt-1 text-zinc-500 text-sm font-medium">
              <span className="flex items-center gap-1.5"><FiLinkedin size={14}/> Profile</span>
              <span className="text-zinc-800">|</span>
              <span className="truncate">{data.email}</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: JOB CONTEXT (Miller's Law - Chunking) */}
        <div className="flex items-center gap-8 lg:gap-12 border-t lg:border-t-0 lg:border-l border-white/5 pt-4 lg:pt-0 lg:pl-10">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Target Role</span>
            <span className="text-zinc-300 font-bold flex items-center gap-2 text-sm">
              <FiBriefcase className="text-purple-500" size={14} /> {data.jobTitle}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Experience</span>
            <span className="text-zinc-300 font-bold text-sm">{data.experience}</span>
          </div>
        </div>

        {/* SECTION 3: AI SCORING (Doherty Threshold - Instant Visual Cue) */}
        <div className="flex items-center gap-6 border-t lg:border-t-0 lg:border-l border-white/5 pt-4 lg:pt-0 lg:pl-10">
          <div className="flex flex-col items-center">
             <div className="flex items-center gap-2 mb-1">
                <FiCpu className="text-purple-500 animate-pulse" size={14} />
                <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Match Score</span>
             </div>
             <div className="relative flex items-center justify-center">
                <span className="text-2xl font-black text-white">{data.aiScore}%</span>
                {/* Visual progress ring could go here */}
             </div>
          </div>

          <div className="hidden sm:flex flex-col gap-1.5">
             <div className="flex gap-1">
                {[1,2,3].map(i => <FiStar key={i} size={10} className="fill-purple-500 text-purple-500" />)}
             </div>
             <span className="px-3 py-1 bg-purple-600/10 text-purple-400 text-[10px] font-black uppercase rounded-lg border border-purple-500/20">
                {data.status}
             </span>
          </div>
        </div>

        {/* SECTION 4: ACTION (Fitts's Law - Large Target) */}
        <div className="lg:ml-4 flex items-center">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 group-hover:bg-purple-600 flex items-center justify-center text-zinc-600 group-hover:text-white transition-all duration-300 shadow-lg group-hover:shadow-purple-500/40">
            <FiArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      {/* FOOTER: Skills Preview (Law of Similarity) */}
      <div className="hidden md:flex flex-wrap gap-2 mt-4 ml-[76px]">
        {data.skills.map((skill, i) => (
          <span key={i} className="text-[10px] font-bold text-zinc-500 border border-zinc-900 px-2 py-0.5 rounded uppercase hover:border-purple-500/30 transition-colors">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// Application Feed Container
const ApplicationFeed = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-20 px-6">
      <div className="w-full lg:w-[80%] mb-10 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter">
            Incoming <span className="text-purple-500">Applications</span>
          </h2>
          <p className="text-zinc-500 text-sm font-medium">Real-time candidate pipeline analyzed by InterVue AI</p>
        </div>
        <div className="flex gap-4">
           {/* Hick's Law: Collapsed filters */}
           <button className="px-4 py-2 bg-zinc-900 border border-white/5 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-all uppercase tracking-widest">
             Filter By Score
           </button>
        </div>
      </div>

      {/* Render List */}
      <CandidateApplicationCard />
      <CandidateApplicationCard 
        applicant={{
          name: "Jordan Vance",
          email: "j.vance@neural.com",
          jobTitle: "Senior AI Engineer",
          appliedDate: "Oct 25, 2025",
          experience: "5 Years",
          aiScore: 82,
          status: "Under Review",
          skills: ["TensorFlow", "Golang", "AWS", "Docker"]
        }}
      />
      <CandidateApplicationCard 
        applicant={{
          name: "Sophia Lin",
          email: "slin@mit.edu",
          jobTitle: "Product Designer",
          appliedDate: "Oct 26, 2025",
          experience: "3 Years",
          aiScore: 91,
          status: "Shortlisted",
          skills: ["Figma", "Design Systems", "Framer", "UI/UX"]
        }}
      />
    </div>
  );
};

export default ApplicationCard;