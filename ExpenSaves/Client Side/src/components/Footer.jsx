import React from 'react'
import { Wallet } from 'lucide-react'

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#030303] pt-16 pb-8 px-6 text-sm text-gray-400 mt-auto w-full">
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
  )
}

export default Footer
