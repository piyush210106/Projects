import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from "./pages/Landing.jsx";
import SignUpCan from './pages/candidate/SignUpCan.jsx';
import SignUpRec from './pages/recruiter/SignUpRec.jsx';
import InJobs from "./pages/candidate/Injobs.jsx";

const router = createBrowserRouter([
  {
    path:"/",
    element: (
      <Landing/>
    )
  },
  {
    path: "/candidate/signUp",
    element: (
      <SignUpCan/>
    )
  },
  {
    path: "/recruiter/signUp",
    element: (
      <SignUpRec/>
    )
  },
  {
    path: "/candidate/injobs",
    element: (
      <InJobs/>
    )
  },
  {},
  {}
])

function App() {

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
