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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <div>
          <Navbar/>
          <Landing/>
          <Footer/>
        </div>
    )
  },
  {
    path: "/home",
    element: (
      <div>
        <Navbar/>
        <Home/>
        <Footer/>
      </div>
    )
  },
  {
    path: "/Statistics",
    element: (
      <div>
        <Navbar/>
        <Statistics/>
        <Footer/>
      </div>
    )
  },
  {
    path: "/history",
    element: (
      <div>
        <Navbar/>
        <History/>
        <Footer/>
      </div>
    )
  },
  {
    path: "/cashy",
    element: (
      <div>
        <Navbar/>
        <Cashy/>
        <Footer/>
      </div>
    )
  },
  {
    path: "/reminders",
    element: (
      <div>
        <Navbar/>
        <Reminders/>
        <Footer/>
      </div>
    )

  },
  {
    path: "/calculator",
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
    <RouterProvider router = {router}/>
  )
}

export default App


