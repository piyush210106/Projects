import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppliedJobs from './CandidatePages/AppliedJobs.jsx';
import ExJobs from './CandidatePages/ExJobs.jsx';
import InJobs from './CandidatePages/InJobs.jsx';
import Meetings from './CandidatePages/Meetings.jsx';
import SelectedJobs from './CandidatePages/SelectedJobs.jsx';
import NavCan from './CandidatePages/NavCan.jsx';
import AddJobs from './RecruiterPages/AddJobs.jsx';
import AppliedCandidates from './RecruiterPages/AppliedCandidates.jsx';
import Chatbot from './RecruiterPages/Chatbot.jsx';
import Resume from './RecruiterPages/Resume.jsx';
import NavRec from './RecruiterPages/NavRec.jsx';
import Footer from './Components/Footer.jsx';
import Landing from './Components/Landing.jsx';
import Navbar from './Components/Navbar.jsx';
import Login from './Components/Login.jsx';
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
    path: "/login",
    element: (
      <div>
          <Login/>
          <Footer/>
        </div>
    )
  },
  {
    path: "/candidate/exjobs",
    element: (
        <div>
          <NavCan/>
          <ExJobs/>
          <Footer/>
        </div>
    )
  },
  {
    path: "/candidate/injobs",
    element: (
        <div>
          <NavCan/>
          <InJobs/>
          <Footer/>
        </div>
    )
  }, 
  {
    path: "/candidate/appliedjobs",
    element: (
        <div>
          <NavCan/>
          <AppliedJobs/>
          <Footer/>
        </div>
    )
  },
  {
    path: "/candidate/meetings",
    element: (
        <div>
          <NavCan/>
          <Meetings/>
          <Footer/>
        </div>
    )
  },
  {
    path: "/candidate/selectedjobs",
    element: (
        <div>
          <NavCan/>
          <SelectedJobs/>
          <Footer/>
        </div>
    )
  },
  {
    path: "/recruiter/addjobs",
    element: (
        <div>
          <NavRec/>
          <AddJobs/>
          <Footer/>
        </div>
    )
  },
  {
    path: "/recruiter/appliedcans",
    element: (
        <div>
          <NavRec/>
          <AppliedCandidates/>
          <Footer/>
        </div>
    )
  },
  {
    path: "/recruiter/chatbot",
    element: (
        <div>
          <NavRec/>
          <Chatbot/>
          <Footer/>
        </div>
    )
  },
  {
    path: "/recruiter/resume",
    element: (
        <div>
          <NavRec/>
          <Resume/>
          <Footer/>
        </div>
    )
  }
]);

function App() {

  return (
      <RouterProvider router = {router}/>
  )
}

export default App
