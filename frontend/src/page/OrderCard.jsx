import { Button } from '@/components/ui/button'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const OrderCard = ({ userOrder }) => {
    const navigate = useNavigate()
    const handlePayment = async (orderId) => {
        
        try {

            const accessToken = localStorage.getItem("accessToken")

            const { data } = await axios.post(
                `http://localhost:8000/api/v1/payment/pay-order/${orderId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )

            if (data.success) {
                window.location.href = data.paymentUrl   // redirect VNPay
            }

        } catch (error) {
            console.log("Payment error:", error)
        }
    }
    return (
        <div className='pr-20 flex flex-col gap-3'>
            <div className='w-full p-6'>
                <div className="flex items-center gap-4 mb-6">
                    <Button onClick={() => navigate(-1)}><ArrowLeft /></Button>
                    <h1 className='text-2xl font-bold'>Orders</h1>
                </div>
                {
                    userOrder?.length === 0 ? (
                        <p className='text-gray-800 space-y-6 text-2xl'>No Orders found for this user</p>
                    ) : (
                        <div className='space-y-6 w-full'>
                            {
                                userOrder?.map((order) => (
                                    <div key={order._id} className='shadow-lg rounded-2xl; p-5 border border-gray-200'>
                                        {/* order header */}
                                        <div className='flex justify-between items-center mb-4'>
                                            <h2 className='text-lg font-semibold'>
                                                Order ID:{" "}
                                                <span className='text-gray-800'>{order._id}</span>
                                            </h2>
                                            <p className='text-sm text-gray-500'>
                                                Amount:{" "}
                                                <span className='font-bold'>
                                                    {order.amount + order.tax + order.shipping} {order.currency}
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
                                            <div className="flex gap-3 items-center">
                                                <span className={`${order.status === "Paid" ? "bg-green-500" : order.status === "Failed" ? "bg-red-500" : "bg-orange-300"} text-white px-2 py-1 rounded-lg`}>
                                                    {order.status}
                                                </span>

                                                {order.status === "Pending" && (
                                                    <Button
                                                        onClick={() => handlePayment(order._id)}
                                                        className="bg-black text-white hover:bg-gray-800"
                                                    >
                                                        Pay Now
                                                    </Button>
                                                )}
                                            </div>

                                        </div>

                                        {/* products */}
                                        <div>
                                            <h3 className='font-medium mb-2'>
                                                Products:
                                            </h3>
                                            <ul className='space-y-2'>
                                                {
                                                    order.products?.map((product, index) => (
                                                        <li key={index} className='flex justify-between items-center bg-gray-50 p-3 rounded-lg'>
                                                            <img onClick={() => navigate(`/products/${product?.productId?._id}`)} className='w-16 cursor-pointer' src={product.productId?.productImg?.[0].url} alt="" />
                                                            <span className='w-[300px] line-clamp-2'>{product.productId?.productName}</span>
                                                            <span>{product?.productId?._id}</span>
                                                            <span className='font-medium'>
                                                                {product.productId?.productPrice} ₫ x {product.quantity}
                                                            </span>

                                                        </li>
                                                    ))
                                                }
                                            </ul>
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

export default OrderCard