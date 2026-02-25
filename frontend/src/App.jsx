import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './page/Home'
import Login from './page/Login'
import Signup from './page/signUp'
import Verify from './page/Verify'
import VerifyEmail from './page/VerifyEmail'
import Profile from './page/profile'
import Products from './page/Products'

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
    
  },
  {
    path:'/profile/:userId',
    element: <><Navbar/><Profile/></>
    
  },
  {
    path:'/products',
    element: <><Navbar/><Products/></>
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