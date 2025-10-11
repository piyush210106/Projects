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
          <Navbar2/>
          <Landing/>
          <Footer/>
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
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router = {router}/>
    </>
  )
}

export default App


