import React from 'react'
import { ArrowUpRight, ArrowDownRight, Tag } from 'lucide-react'

function Card({title, amount, type, category, date, id}) {
  const isCredit = type === "Credit";
  
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all cursor-default w-full">
      <div className="flex items-center gap-4">
        {/* Icon container */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center border shadow-sm ${
          isCredit 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
            : 'bg-pink-500/10 border-pink-500/20 text-pink-400'
        }`}>
          {isCredit ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
        </div>
        
        {/* Title and Category */}
        <div className="flex flex-col">
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400 mt-0.5">
            <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-xs">
              <Tag className="w-3 h-3" /> {category}
            </span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
      
      {/* Amount and Type */}
      <div className="flex flex-col items-end">
        <h3 className={`text-xl font-bold ${isCredit ? 'text-emerald-400' : 'text-pink-400'}`}>
          {isCredit ? '+' : '-'}₹{amount}
        </h3>
        <span className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">
          {type}
        </span>
      </div>
    </div>
  )
}

export default Card
