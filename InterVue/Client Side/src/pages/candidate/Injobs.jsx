import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JobCard from "../../components/JobCard.jsx";
import { NavLink } from 'react-router-dom';
import { 
  FiSearch, 
  FiMapPin, 
  FiBriefcase, 
  FiClock, 
  FiChevronRight, 
  FiX, 
  FiCheckCircle 
} from 'react-icons/fi';

const JOBS_DATA = [
  {
    id: 1,
    title: "Lead AI Engineer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-time",
    salary: "$160k - $210k",
    description: "Help us refine the LLM kernels that power InterVue's real-time sentiment analysis.",
    requirements: ["5+ years Python/PyTorch", "Experience with OpenAI API", "Vector DB knowledge"]
  },
  {
    id: 2,
    title: "Senior Product Designer",
    department: "Design",
    location: "London, UK",
    type: "Full-time",
    salary: "£80k - £110k",
    description: "Own the end-to-end candidate experience. We value aesthetic usability and futuristic UI.",
    requirements: ["Figma Mastery", "Prototyping", "UX Research"]
  },
  {
    id: 3,
    title: "Backend Architect",
    department: "Engineering",
    location: "Remote",
    type: "Contract",
    salary: "$100 - $150 / hr",
    description: "Scale our real-time WebSocket architecture to handle 100k+ concurrent interviews.",
    requirements: ["Node.js/Go", "Redis", "Distributed Systems"]
  },
  {
    id: 4,
    title: "Growth Marketer",
    department: "Marketing",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90k - $130k",
    description: "Drive InterVue's adoption among Fortune 500 recruiters.",
    requirements: ["SEO/SEM", "B2B SaaS Experience", "Data Analytics"]
  }
];

export default function InJobs() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredJobs = JOBS_DATA.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#a855f7] selection:text-white py-12">
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Build the future of <span className="text-[#a855f7]">Intelligence.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            InterVue helps hiring pioneers to bridge the gap between human potential and AI-driven recruitment.
          </p>

          <div className="relative max-w-xl mx-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
            <input 
              type="text"
              placeholder="Search roles (e.g. Engineer, Designer)..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.section>

        <div className="grid gap-4">
          {loading ? (
            [1, 2, 3].map(n => (
              <div key={n} className="h-32 w-full bg-white/5 animate-pulse rounded-2xl border border-white/5" />
            ))
          ) : (
            <AnimatePresence mode='popLayout'>
              {filteredJobs.map((job, index) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  index={index} 
                  onClick={() => setSelectedJob(job)} 
                />
              ))}
            </AnimatePresence>
          )}
        </div>

        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No positions found. Try a different search term.
          </div>
        )}
      </main>

    </div>
  );
}

