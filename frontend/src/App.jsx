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
import Cart from './page/Cart'
import Dashboard from './page/Dashboard'
import AdminSales from './admin/AdminSales'
import AdminProduct from './admin/AdminProduct'
import AddProduct from './admin/AddProduct'
import AdminOrder from './admin/AdminOrder'
import ShowUserOrder from './admin/ShowUserOrder'
import AdminUsers from './admin/AdminUsers'
import UserInfo from './admin/UserInfo'
import ProtectedRoute from './components/ProtectedRoute'
import SingleProduct from './page/SingleProduct'

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
    element: <ProtectedRoute><Navbar/><Profile/></ProtectedRoute>
    
  },
  {
    path:'/products',
    element: <><Navbar/><Products/></> 
  },
  {
    path:'/products/:id',
    element: <><Navbar/><SingleProduct/></>
  },
  {
    path:'/cart',
    element: <ProtectedRoute><Navbar/><Cart/></ProtectedRoute>
  },
  {
    path:'/dashboard',
    element: <ProtectedRoute><Dashboard/></ProtectedRoute>,
    children: [
      {
        path:"sales",
        element: <AdminSales/>

      },
      {
        path:"add-product",
        element: <AddProduct/>

      },
      {
        path:"products",
        element: <AdminProduct/>

      },
      {
        path:"orders",
        element: <AdminOrder/>

      },
      {
        path:"users/orders/:userId",
        element: <ShowUserOrder/>

      },
      {
        path:"users",
        element: <AdminUsers/>

      },
      {
        path:"users/:id",
        element: <UserInfo/>

      }
    ]
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