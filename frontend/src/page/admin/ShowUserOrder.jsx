import React, { useEffect, useState } from 'react'
import OrderCard from '../OrderCard'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ShowUserOrder = () => {
  const [userOrder, setUserOrder] = useState(null)
  const params = useParams()
  const getUserOrder = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken")
      const res = await axios.get(`http://localhost:8000/api/v1/payment/user-order/${params.userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.data.success) {
        setUserOrder(res.data.orders)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getUserOrder()
  }, [])
  return (
    <div className='pl-[350px] py-20'>
      <OrderCard userOrder={userOrder} />
    </div>
  )
}

export default ShowUserOrder