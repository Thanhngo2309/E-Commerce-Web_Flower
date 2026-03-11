import { Button } from '@/components/ui/button'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyOrder = () => {
    const navigate = useNavigate()
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
    <div className='pr-20 flex flex-col gap-3'>
        <div className='w-full p-6'>
            <div className="flex items-center gap-4 mb-6">
                <Button onClick={()=>navigate(-1)}><ArrowLeft/></Button>
                <h1 className='text-2xl font-bold'>Orders</h1>
            </div>
            {
                userOrder?.length === 0 ? (
                    <p className='text-gray-800 space-y-6 text-2xl'>No Orders found for this user</p>
                ) : (
                    <div className='space-y-6 w-full'>
                        {
                            userOrder?.map((order)=>(
                                <div key={order._id} className='shadow-lg rounded-2x; p-5 border border-gray-200'> 
                                {/* order header */}
                                    <div className='flex justify-between items-center mb-4'>
                                        <h2 className='text-lg font-semibold'>
                                            Order ID:{" "}
                                            <span className='text-gray-800'>{order._id}</span>
                                        </h2>
                                        <p className='text-sm text-gray-500'>
                                            Amount:{" "}
                                            <span className='font-bold'>
                                                {order.amount} {order.currency} 
                                            </span>
                                        </p>
                                    </div>

                                    {/* user info */}
                                    <div className="flex justify-between items-center">
                                        <div className='mb-4'>
                                            <p>
                                                <span>User:</span>{" "}
                                                {order.user?.firstName || "Unknown"} {order.user?.lastName}
                                            </p>
                                            <p className='text-sm text-gray-500'>
                                                Email : {order.user?.email || "N/A"}
                                            </p>
                                        </div>
                                        <span className={`${order.status === "Paid" ? "bg-green-500" : order.status === "Failed" ? "bg-red-500" :"bg-orange-300"} text-white px-2 py-1 rounded-lg`}>
                                            {order.status}
                                            </span>

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default MyOrder