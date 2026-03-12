import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard'

const MyOrder = () => {
    
    const [userOrder, setUserOrder] = useState(null)
    const getUserOrders = async () =>{
        const accessToken = localStorage.getItem("accessToken")
        const res = await axios.get(`http://localhost:8000/api/v1/payment/myorder`,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })
        if(res.data.success){
            setUserOrder(res.data.orders)
        }
    }

    useEffect(()=>{
        getUserOrders()
    },[])

  return (
    <>
        <OrderCard userOrder={userOrder}/>
    </>
  )
   
}

export default MyOrder