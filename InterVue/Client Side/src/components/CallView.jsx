import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMic, 
  FiMicOff, 
  FiVideo, 
  FiVideoOff, 
  FiPhoneMissed, 
  FiMaximize, 
  FiMessageSquare, 
  FiCpu, 
  FiSettings,
  FiUser
} from 'react-icons/fi';


const CallView = ({ role = 'recruiter' }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [aiAnalysis, setAiAnalysis] = useState("Analyzing sentiment...");

  // Call Timer Logic
  useEffect(() => {
    const timer = setInterval(() => setCallDuration(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Roles: 'candidate' sees Recruiter as Large, 'recruiter' sees Candidate as Large
  const remoteUserLabel = role === 'candidate' ? 'Senior Recruiter' : 'Candidate #402';
  const localUserLabel = role === 'candidate' ? 'You (Candidate)' : 'You (Recruiter)';

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center p-4 overflow-hidden font-sans">
      
      {/* HEADER: Call Info (Aesthetic Usability) */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 bg-zinc-900/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10"
        >
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <span className="font-mono text-white font-bold">{formatTime(callDuration)}</span>
          <div className="h-4 w-px bg-white/20" />
          <span className="text-zinc-400 text-sm font-bold uppercase tracking-widest">{remoteUserLabel}</span>
        </motion.div>

        {/* AI Insight Overlay (Doherty Threshold: Real-time feedback) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-3 bg-purple-600/10 border border-purple-500/30 px-5 py-3 rounded-2xl"
        >
          <FiCpu className="text-purple-500 animate-spin-slow" />
          <span className="text-purple-400 text-xs font-black uppercase tracking-tighter">AI: {aiAnalysis}</span>
        </motion.div>
      </div>

      {/* VIDEO GRID (Jakob's Law: Main stream + PIP) */}
      <div className="relative w-full h-full max-w-7xl max-h-[800px] flex items-center justify-center rounded-[3rem] overflow-hidden bg-zinc-900 border border-white/5">
        
        {/* Remote Stream (Large) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-zinc-800">
           <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-500 animate-pulse">
                <FiUser size={48} />
              </div>
              <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs">Connecting Stream...</p>
           </div>
           {/* Mock Overlay for Remote Video */}
           <div className="absolute bottom-10 left-10 hidden md:block">
              <p className="text-white font-black text-2xl drop-shadow-lg uppercase tracking-tighter">{remoteUserLabel}</p>
           </div>
        </div>

        {/* Local Stream (PIP - Picture in Picture) */}
        <motion.div 
          drag
          dragConstraints={{ left: -400, right: 400, top: -200, bottom: 200 }}
          className="absolute top-10 right-10 w-40 h-56 md:w-64 md:h-80 bg-zinc-950 rounded-3xl border-2 border-purple-500/50 shadow-2xl overflow-hidden z-10 cursor-move"
        >
          {isCamOff ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900">
              <FiVideoOff className="text-zinc-700 mb-2" size={32} />
              <span className="text-[10px] text-zinc-600 font-bold uppercase">Camera Off</span>
            </div>
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
              <FiUser className="text-zinc-600" size={40} />
            </div>
          )}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg">
            <span className="text-[10px] text-white font-bold">{localUserLabel}</span>
            {isMuted && <FiMicOff className="text-red-500" size={10} />}
          </div>
        </motion.div>
      </div>

      {/* CONTROLS: Center Dock (Fitts's Law: Large clickable targets) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-30">
        <div className="flex items-center gap-4 bg-zinc-900/90 backdrop-blur-2xl p-4 rounded-[2.5rem] border border-white/10 shadow-3xl">
          
          {/* Mute Button */}
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              isMuted ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {isMuted ? <FiMicOff size={24} /> : <FiMic size={24} />}
          </button>

          {/* Video Toggle */}
          <button 
            onClick={() => setIsCamOff(!isCamOff)}
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              isCamOff ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {isCamOff ? <FiVideoOff size={24} /> : <FiVideo size={24} />}
          </button>

          {/* End Call (Fitts's Law: Distinctive and critical action) */}
          <button 
            className="w-20 h-14 md:w-28 md:h-16 rounded-[2rem] bg-red-600 text-white flex items-center justify-center transition-all duration-300 hover:bg-red-500 hover:scale-105 shadow-[0_0_30px_rgba(220,38,38,0.4)]"
          >
            <FiPhoneMissed size={28} />
          </button>

          <div className="h-10 w-px bg-white/10 mx-2" />

          {/* Additional Features (Hick's Law: Secondary actions separated) */}
          <button className="w-12 h-12 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-800 transition-colors">
            <FiMessageSquare size={20} />
          </button>
          <button className="w-12 h-12 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-800 transition-colors">
            <FiSettings size={20} />
          </button>
        </div>
      </div>

      {/* RIGHT SIDEBAR: Chat/Settings (Miller's Law: Chunked into sidebar) */}
      <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col gap-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-purple-500 transition-colors cursor-pointer">
            <FiMaximize size={20} />
          </div>
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-purple-500 transition-colors cursor-pointer">
            <FiMessageSquare size={20} />
          </div>
      </div>
    </div>
  );
};

export default CallView;