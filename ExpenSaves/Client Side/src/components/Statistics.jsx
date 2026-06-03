import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, PieChart, LineChart, TrendingUp } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

function Statistics() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col space-y-8 w-full max-w-7xl mx-auto px-6 min-h-[70vh] pb-12"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center gap-3">
          <BarChart3 className="w-10 h-10 text-pink-500" />
          Analytics & Statistics
        </h1>
        <p className="text-gray-400">Deep dive into your spending habits and financial growth.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Placeholder for Spending over time */}
        <motion.div variants={itemVariants} className="border border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-3xl p-6 md:p-8 flex flex-col h-96 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-3xl rounded-full pointer-events-none transition-all group-hover:bg-pink-500/20" />
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <LineChart className="w-6 h-6 text-pink-400" /> Spending Over Time
          </h2>
          <div className="flex-1 flex items-center justify-center border border-white/5 bg-white/5 rounded-2xl border-dashed">
            <p className="text-gray-500 text-sm italic">Chart integration coming soon...</p>
          </div>
        </motion.div>

        {/* Placeholder for Category Breakdown */}
        <motion.div variants={itemVariants} className="border border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-3xl p-6 md:p-8 flex flex-col h-96 relative overflow-hidden group">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 blur-3xl rounded-full pointer-events-none transition-all group-hover:bg-orange-500/20" />
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <PieChart className="w-6 h-6 text-orange-400" /> Top Categories
          </h2>
          <div className="flex-1 flex items-center justify-center border border-white/5 bg-white/5 rounded-2xl border-dashed">
            <p className="text-gray-500 text-sm italic">Breakdown visualization coming soon...</p>
          </div>
        </motion.div>

        {/* Stats Highlights */}
        <motion.div variants={itemVariants} className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
           {[1, 2, 3].map((i) => (
             <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col items-center justify-center text-center">
                <TrendingUp className="w-8 h-8 text-gray-600 mb-4" />
                <div className="h-4 w-24 bg-white/10 rounded animate-pulse mb-2" />
                <div className="h-8 w-32 bg-white/5 rounded animate-pulse" />
             </div>
           ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Statistics
