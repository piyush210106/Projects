import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import ViewPaste from './components/ViewPaste'
import Pastes from './components/Pastes'
import Navbar from './components/Navbar'

function App() {
   
  const router = createBrowserRouter([
    {
      path:"/",
      element:
      <div className='flex flex-col justify-center items-center space-y-4'>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path:"/pastes",
      element:
      <div className='flex flex-col justify-center items-center space-y-4'>
      <Navbar/>
      <Pastes/>
    </div>

    },
    {
      path:"/pastes/:id",
      element:      
      <div className='flex flex-col justify-center items-center space-y-4'  >
      <Navbar/>
      <ViewPaste/>
    </div>

    },
  ]);
  return (
    <>
    
    <RouterProvider router={router}/>
    </>
  )
}

export default App
