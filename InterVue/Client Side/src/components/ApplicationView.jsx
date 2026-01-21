import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, FiBriefcase, FiDownload, FiCheckCircle, FiXCircle, 
  FiCpu, FiLinkedin, FiMail, FiMapPin, FiChevronLeft, 
  FiStar, FiTrendingUp, FiMessageCircle, FiZap 
} from 'react-icons/fi';

/**
 * InterVue - Recruiter: Candidate Application Details Page
 * UX Principles: Miller's Law (Data Chunking), Aesthetic-Usability (AI Glow), 
 * Fitts's Law (Clear CTA Targets), Law of Proximity (Grouped Analysis).
 */

const ApplicationView = () => {
  // Mock Data following the requested Mongoose Schema & Profile details
  const applicantData = {
    name: "Alex Rivera",
    email: "alex.rivera@neural-dev.io",
    phone: "+1 (555) 012-3456",
    location: "Austin, TX",
    experience: "8+ Years",
    education: "M.S. in Computer Science, Stanford",
    resumeUrl: "#",
    linkedin: "linkedin.com/in/arivera",
    jobDetails: {
      title: "Senior AI Engineer",
      department: "Core Intelligence",
      company: "InterVue AI",
      postedOn: "Jan 12, 2026"
    },
    aiScore: {
      score: 92,
      analysis: "Candidate shows exceptional mastery in neural architecture and real-time data streaming. Strong cultural fit for high-velocity engineering teams.",
      matchedSkills: ["PyTorch", "React", "WebRTC", "Node.js", "Docker", "CUDA"],
      missingSkills: ["Go (Golang)", "Kubernetes Operator Patterns"],
      recommendations: "Proceed to Technical Interview. Focus on distributed systems scalability and Go-lang familiarity during the session.",
      overallFit: "Excellent"
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 pb-20">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-900/10 blur-[100px] rounded-full" />
      </div>

      {/* Navigation Header (Jakob's Law) */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group font-bold uppercase text-xs tracking-widest">
            <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Applicants
          </button>
          <div className="flex gap-4">
             <button className="px-6 py-2 rounded-xl bg-zinc-900 border border-white/5 hover:border-purple-500/50 transition-all text-xs font-bold uppercase tracking-widest">Reject</button>
             <button className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20 transition-all text-xs font-bold uppercase tracking-widest">Schedule Interview</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: Candidate & Job Profile (Miller's Law - Chunking Identity) */}
          <div className="lg:col-span-4 space-y-8">
            <motion.section {...fadeInUp} className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6 opacity-10"><FiUser size={80}/></div>
              <div className="w-20 h-20 bg-purple-600 rounded-3xl mb-6 flex items-center justify-center text-3xl font-black shadow-2xl">
                {applicantData.name.charAt(0)}
              </div>
              <h1 className="text-3xl font-black mb-1">{applicantData.name}</h1>
              <p className="text-purple-400 font-bold text-sm mb-6">{applicantData.experience} Experience</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-zinc-400 text-sm">
                  <FiMail className="text-purple-500" /> {applicantData.email}
                </div>
                <div className="flex items-center gap-3 text-zinc-400 text-sm">
                  <FiMapPin className="text-purple-500" /> {applicantData.location}
                </div>
                <div className="flex items-center gap-3 text-zinc-400 text-sm">
                  <FiLinkedin className="text-purple-500" /> {applicantData.linkedin}
                </div>
              </div>

              <a 
                href={applicantData.resumeUrl}
                className="mt-8 w-full flex items-center justify-center gap-2 py-4 bg-zinc-900 hover:bg-zinc-800 rounded-2xl text-sm font-bold transition-all border border-white/5 group"
              >
                <FiDownload className="group-hover:translate-y-0.5 transition-transform" /> Download Resume PDF
              </a>
            </motion.section>

            <motion.section {...fadeInUp} transition={{delay: 0.1}} className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-600 mb-6">Application For</h3>
              <div className="p-4 bg-black rounded-2xl border border-white/5">
                <h4 className="font-bold text-lg mb-1">{applicantData.jobDetails.title}</h4>
                <p className="text-zinc-500 text-xs font-medium mb-3">{applicantData.jobDetails.department}</p>
                <span className="text-[10px] bg-zinc-900 px-2 py-1 rounded text-zinc-400 font-bold uppercase tracking-widest">Posted {applicantData.jobDetails.postedOn}</span>
              </div>
            </motion.section>
          </div>

          {/* RIGHT: AI ANALYSIS (Aesthetic-Usability & Goal-Gradient) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* AI Score Header */}
            <motion.section {...fadeInUp} className="bg-zinc-950 border border-purple-500/20 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-purple-600/10 to-transparent pointer-events-none" />
               
               <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                 <div className="flex items-center gap-8">
                    <div className="relative">
                       <svg className="w-32 h-32 transform -rotate-90">
                          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-900" />
                          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                            strokeDasharray={364.4}
                            strokeDashoffset={364.4 - (364.4 * applicantData.aiScore.score) / 100}
                            className="text-purple-500 transition-all duration-1000" />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-black">{applicantData.aiScore.score}%</span>
                          <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Neural Score</span>
                       </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FiCpu className="text-purple-500 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-widest text-purple-400">Analysis Complete</span>
                      </div>
                      <h2 className="text-4xl font-black uppercase tracking-tighter italic">
                        {applicantData.aiScore.overallFit} Fit
                      </h2>
                    </div>
                 </div>
                 <div className="flex gap-2">
                    {[1,2,3,4,5].map(i => (
                      <FiStar key={i} className={i <= 4 ? "text-purple-500 fill-purple-500" : "text-zinc-800"} />
                    ))}
                 </div>
               </div>
            </motion.section>

            {/* Detailed AI Insight */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.section {...fadeInUp} className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                 <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">
                      <FiTrendingUp className="text-purple-500" /> Analysis
                    </h3>
                    <p className="text-zinc-300 leading-relaxed text-sm italic">"{applicantData.aiScore.analysis}"</p>
                 </div>
                 <div className="h-px bg-white/5" />
                 <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">
                      <FiZap className="text-purple-500" /> Recommendation
                    </h3>
                    <p className="text-zinc-300 text-sm leading-relaxed">{applicantData.aiScore.recommendations}</p>
                 </div>
              </motion.section>

              {/* Skills Mapping (Law of Similarity) */}
              <motion.section {...fadeInUp} className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-8">
                 <div className="mb-8">
                    <h3 className="text-xs font-black uppercase tracking-widest text-green-500 mb-4 flex items-center gap-2">
                      <FiCheckCircle /> Matched Competencies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {applicantData.aiScore.matchedSkills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold rounded-lg uppercase">
                          {skill}
                        </span>
                      ))}
                    </div>
                 </div>
                 <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-red-500 mb-4 flex items-center gap-2">
                      <FiXCircle /> Skills Gaps
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {applicantData.aiScore.missingSkills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold rounded-lg uppercase">
                          {skill}
                        </span>
                      ))}
                    </div>
                 </div>
              </motion.section>
            </div>

            {/* Quick Action Dock (Fitts's Law) */}
            <motion.div 
              {...fadeInUp}
              className="p-4 bg-zinc-900/50 border border-white/5 rounded-3xl flex items-center justify-between"
            >
              <div className="flex items-center gap-4 px-4">
                 <FiMessageCircle className="text-purple-500" />
                 <span className="text-sm text-zinc-400 font-medium">Add internal note for the hiring team...</span>
              </div>
              <button className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs font-bold transition-all">Save Note</button>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationView;