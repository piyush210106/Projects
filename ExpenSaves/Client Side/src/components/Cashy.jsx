import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send } from 'lucide-react';

function Cashy() {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState([{ role: "Bot", text: "Hi, I am your AI financial assistant! How can I help you today?" }]);
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef(null);

  const handleChange = (e) => setPrompt(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = { role: "User", text: prompt };
    setHistory((prev) => [...prev, userMessage]);
    setPrompt("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        "https://projects-zeud.onrender.com/user/cashy",
        { prompt },
        { withCredentials: true }
      );

      const botMessage = {
        role: "Bot",
        text: res?.data?.answer ?? "No response from server",
      };

      setHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setHistory((prev) => [
        ...prev,
        { role: "Bot", text: "Something went wrong while generating response" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isLoading]);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-6 py-6 min-h-[75vh]">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex-1 p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl shadow-2xl relative flex flex-col overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 pointer-events-none" />
        
        {/* Header */}
        <div className="relative z-10 flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center p-0.5 shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Cashy AI</h3>
            <p className="text-xs text-emerald-400 flex items-center gap-1.5 uppercase tracking-widest font-semibold mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Online
            </p>
          </div>
        </div>

        {/* Chat History */}
        <div className="relative z-10 flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar min-h-[400px]">
          <AnimatePresence>
            {history.map((message, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`flex ${message.role === 'User' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed prose prose-invert prose-p:my-0 ${
                  message.role === 'User' 
                  ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-tr-sm shadow-md' 
                  : 'bg-white/5 text-gray-200 rounded-tl-sm border border-white/5 shadow-inner'
                }`}>
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white/5 text-gray-400 rounded-2xl rounded-tl-sm border border-white/5 p-4 flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                   <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                   <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
            <div ref={chatBottomRef} />
          </AnimatePresence>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative z-10 mt-6 pt-4">
          <input 
            type="text" 
            value={prompt}
            onChange={handleChange}
            placeholder="Ask about your finances, budgets, or trends..." 
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-full py-4 pl-6 pr-14 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors shadow-inner"
          />
          <button 
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 mt-2 p-2.5 rounded-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 transition-colors shadow-lg"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Cashy;
