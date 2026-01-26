import React from 'react'
import { Button } from './components/ui/button'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './page/Home'
import Login from './page/Login'
import Signup from './page/signUp'
import Verify from './page/Verify'
import VerifyEmail from './page/VerifyEmail'

const router = createBrowserRouter([
  {
    path:'/',
    element: <><Navbar/><Home/></>
  },
  {
    path:'/signup',
    element: <><Signup/></>
  },
  {
    path:'/login',
    element: <><Login/></>
  },
  {
    path:'/verify',
    element: <><Verify/></>
    
  },
  {
    path:'/verify/:token',
    element: <><VerifyEmail/></>
    
  }
])

const App = () => {
  return (
   <>
    <RouterProvider router = {router} />
   </>
  )
}

export default App