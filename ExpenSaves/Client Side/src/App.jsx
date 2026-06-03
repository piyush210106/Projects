import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import History from "./components/History"
import Calculator from "./components/Calculator"
import Cashy from "./components/Cashy"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Landing from "./components/Landing"
import Navbar from "./components/Navbar"
import Reminders from "./components/Reminders"
import Statistics from "./components/Statistics"
import Navbar2 from './components/Navbar2'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <div>
          <Landing/>
        </div>
    )
  },
  {
    path: "/user/home",
    element: (
      <div>
        <Navbar/>
        <Home/>
        <Footer/>
      </div>
    )
  },
  {
    path: "/user/Statistics",
    element: (
      <div>
        <Navbar/>
        <Statistics/>
        <Footer/>
      </div>
    )
  },
  {
    path: "/user/history",
    element: (
      <div>
        <Navbar/>
        <History/>
        <Footer/>
      </div>
    )
  },
  {
    path: "/user/cashy",
    element: (
      <div>
        <Navbar/>
        <Cashy/>
        <Footer/>
      </div>
    )
  },
  {
    path: "/user/reminders",
    element: (
      <div>
        <Navbar/>
        <Reminders/>
        <Footer/>
      </div>
    )

  },
  {
    path: "/user/calculator",
    element: (
      <div>
        <Navbar/>
        <Calculator/>
        <Footer/>
      </div>
    )

  }
])


function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans overflow-x-hidden relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App


