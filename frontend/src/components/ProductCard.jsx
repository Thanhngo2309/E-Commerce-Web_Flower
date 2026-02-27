import React from 'react'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'
import { setCart } from '@/redux/productSlice'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const ProductCard = ({product}) => {
    const {productImg, productPrice, productName} = product

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accesToken = localStorage.getItem('accessToken')
    const addToCart = async (productId) => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/cart/add', {productId},{
                headers:{
                    Authorization: `Bearer ${accesToken}`
                }
            })
            if(res.data.success){
                toast.success("Product added to cart")
                dispatch(setCart(res.data.cart))
            }

        } catch (error) {
            toast.error(error.response.data.message || 'Failed to add to cart')
            if(error.response.status === 401){
                navigate('/login')
            }
            console.log(error);
        }
    }
  return (
   <div className='shadow-lg rounded-lg overflow-hidden h-max'>
        <div className='w-full h-full aspect-square overflow-hidden'>
            <img onClick={()=> navigate(`/products/${product._id}`)} src={productImg[0]?.url} alt="" className='w-full h-full transition-transform duration-300 hover:scale-105' />

        </div>
        <div className='px-2 space-y-1'>
            <h1 className='font-semibold h-12 line-clamp-2'>{productName}</h1>
            <p className='text-sm text-gray-500'>{productPrice} ₫</p>
            <Button onClick={() => addToCart(product._id)} className='bg-pink-600 mb-3 w-full'><ShoppingCart className='mr-2'/> Add to Cart</Button>
        </div>
   </div>
  )
}

export default ProductCard