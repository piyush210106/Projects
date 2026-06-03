import { Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar2() {

  const handleLogin = () => {
    window.location.href = "https://projects-zeud.onrender.com/auth/google";
  };

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-6 w-full max-w-7xl mx-auto border-b border-white/5 bg-white/[0.02] backdrop-blur-md mb-8 rounded-b-3xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <h2 className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          ExpenSaves
        </h2>
      </div>

      <div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 rounded-full bg-white text-purple-900 font-bold text-sm shadow-xl hover:shadow-2xl transition-all"
          onClick={handleLogin}
        >
          Login With Google
        </motion.button>
      </div>
    </nav>
  )
}
