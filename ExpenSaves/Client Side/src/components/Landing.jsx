import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, PlusCircle, CalendarClock, MessageSquareText, 
  History, ArrowRight, Wallet, TrendingUp, CheckCircle2,
  Send, Zap, Shield 
} from 'lucide-react';

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const glowVariants = {
  hover: {
    boxShadow: "0 0 20px 2px rgba(168, 85, 247, 0.4)",
    borderColor: "rgba(168, 85, 247, 0.6)",
    transition: { duration: 0.3 }
  }
};

export default function Landing() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: 'Hi! I noticed your dining expenses are up 20% this month. Want me to set a budget alert?' }
  ]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleLogin = () => {
    window.location.href = "https://projects-zeud.onrender.com/auth/google";
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatHistory([...chatHistory, { role: 'user', text: chatMessage }]);
    setChatMessage('');
    
    // Simulate AI typing delay
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'ai', text: 'Got it. I\'ll automatically classify your next transactions and update your spending limits.' }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200 font-sans">
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            ExpenSaves
          </span>
        </div>
        <button onClick={handleLogin} className="px-5 py-2.5 text-sm font-medium rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
          Sign In
        </button>
      </nav>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-16 pb-32 flex flex-col items-center">
        
        {/* HERO SECTION */}
        <motion.section 
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center max-w-4xl mx-auto mt-12 mb-32"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Meet your new AI financial assistant</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Track smarter, save faster with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 pb-2">
              intelligent insights.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            ExpenSaves automates your expense tracking, sets smart reminders, 
            and gives you real-time AI-driven financial advice to build lasting wealth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button 
              onClick={handleLogin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all"
            >
              Get Started for Free <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 font-semibold backdrop-blur-md transition-colors"
            >
              See how it works
            </motion.button>
          </div>
        </motion.section>

        {/* FEATURES SECTION (Proximity & Similarity Laws) */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="w-full mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to master your money</h2>
            <p className="text-gray-400">Designed with simplicity in mind. Powered by advanced AI.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<PlusCircle className="w-6 h-6 text-emerald-400" />}
              title="Add Transactions"
              desc="Log income and expenses in seconds. Auto-categorization included."
            />
            <FeatureCard 
              icon={<CalendarClock className="w-6 h-6 text-blue-400" />}
              title="Smart Reminders"
              desc="Never miss a bill. Syncs directly with your Google Calendar automatically."
            />
            <FeatureCard 
              icon={<MessageSquareText className="w-6 h-6 text-purple-400" />}
              title="Cashy AI Chatbot"
              desc="Ask questions, get budget suggestions, and financial queries answered instantly."
            />
            <FeatureCard 
              icon={<History className="w-6 h-6 text-pink-400" />}
              title="Transaction History"
              desc="Clean table views with deep filtering and clear visualizations of trends."
            />
          </div>
        </motion.section>

        {/* AI HIGHLIGHT SECTION */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="w-full mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              <span>Cashy AI Intelligence</span>
            </div>
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Your personal CFO, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                available 24/7.
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Stop wondering where your money went. Cashy analyzes your spending habits, spots trends, and offers proactive advice to help you hit your saving goals faster.
            </p>
            <ul className="space-y-4">
              {['Predictive budget alerts', 'Personalized saving strategies', 'Instantly answer finance questions'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Chat Mockup */}
          <motion.div 
            whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(168,85,247,0.15)" }}
            transition={{ duration: 0.3 }}
            className="p-6 rounded-3xl bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 pointer-events-none" />
            <div className="relative z-10 flex flex-col h-[400px]">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center p-0.5 shadow-lg shadow-purple-500/20">
                  <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Cashy AI</h3>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                <AnimatePresence>
                  {chatHistory.map((msg, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                        ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-tr-sm shadow-md' 
                        : 'bg-white/5 text-gray-200 rounded-tl-sm border border-white/5 shadow-inner'
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <form onSubmit={handleChatSubmit} className="mt-4 relative">
                <input 
                  type="text" 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask about your spending..." 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-5 pr-12 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-500"
                />
                <button 
                  type="submit"
                  disabled={!chatMessage.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            </div>
          </motion.div>
        </motion.section>

        {/* DASHBOARD PREVIEW SKELETON (Doherty Threshold & Hick's Law) */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="w-full mb-32 flex flex-col items-center"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete financial clarity</h2>
            <p className="text-gray-400">See your money in high definition. Fast, fluid, and focused.</p>
          </div>

          <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-md overflow-hidden shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Top Bar Spec */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.01]">
              <div className="h-5 w-32 bg-white/10 rounded-md animate-pulse" />
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-white/10 rounded-full animate-pulse" />
                <div className="h-8 w-24 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full animate-pulse" />
              </div>
            </div>
            
            {/* Content Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Chart Area */}
              <div className="md:col-span-2 space-y-6">
                <div className="h-64 rounded-xl bg-gradient-to-t from-white/[0.03] to-transparent border border-white/5 p-6 flex flex-col justify-end relative">
                  <div className="absolute top-6 left-6 h-4 w-24 bg-white/10 rounded animate-pulse" />
                  <div className="flex items-end justify-between w-full h-40 gap-2">
                    {[40, 70, 45, 90, 65, 80, 55, 60, 30].map((h, i) => (
                      <div key={i} className="w-full bg-gradient-to-t from-purple-500/30 to-purple-500/10 rounded-t-sm transition-all hover:opacity-80" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                {/* Transaction list skeleton */}
                <div className="space-y-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.03] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-3 w-28 bg-white/10 rounded animate-pulse" />
                          <div className="h-2 w-16 bg-white/5 rounded animate-pulse" />
                        </div>
                      </div>
                      <div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right Sidebar widgets */}
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="h-3 w-20 bg-white/10 rounded mb-4 animate-pulse" />
                  <div className="h-8 w-32 bg-white/20 rounded mb-3 animate-pulse" />
                  <div className="h-2 w-24 bg-emerald-500/20 rounded animate-pulse" />
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 relative overflow-hidden group/card relative">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/20 blur-2xl rounded-full group-hover/card:bg-purple-500/30 transition-colors duration-500" />
                  <div className="h-5 w-8 bg-purple-400/30 rounded-full mb-4" />
                  <div className="h-4 w-3/4 bg-white/20 rounded mb-3" />
                  <div className="h-3 w-full bg-white/10 rounded mb-2" />
                  <div className="h-3 w-2/3 bg-white/10 rounded" />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA SECTION (Goal-Gradient Effect & Fitts's Law) */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="w-full max-w-4xl relative rounded-3xl overflow-hidden mb-12 shadow-[0_0_50px_rgba(168,85,247,0.15)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-90" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-30" />
          
          <div className="relative z-10 py-20 px-8 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to take control?
            </h2>
            <p className="text-purple-100/90 mb-10 text-lg max-w-xl">
              Join thousands of users who are saving more and stressing less. Set up your account in under 2 minutes.
            </p>
            <motion.button 
              onClick={handleLogin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-full bg-white text-purple-900 font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-3"
            >
              Start Tracking Now <Zap className="w-5 h-5 text-purple-600" />
            </motion.button>
            <p className="mt-6 text-sm text-purple-200/80 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" /> No credit card required. Free 14-day premium trial.
            </p>
          </div>
        </motion.section>

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 bg-[#030303] pt-16 pb-8 px-6 text-sm text-gray-400">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Wallet className="w-5 h-5 text-purple-500" />
              <span className="font-bold text-white text-lg">ExpenSaves</span>
            </div>
            <p className="mb-6 text-gray-500 leading-relaxed">Intelligent expense tracking for the modern spender.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
          <p>© {new Date().getFullYear()} ExpenSaves. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
      
      {/* Global styles for custom scrollbar embedded */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.01); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}} />
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div 
      variants={glowVariants}
      whileHover="hover"
      className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col items-start text-left relative overflow-hidden group transition-colors hover:bg-white/[0.04]"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110" />
      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 relative z-10 border border-white/5 group-hover:bg-white/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 relative z-10">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed relative z-10">{desc}</p>
    </motion.div>
  );
}
