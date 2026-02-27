import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setCart } from '@/redux/productSlice'
import { toast } from 'sonner'
import axios from 'axios'


const ProductDesc = ({product}) => {
    const accesToken = localStorage.getItem('accessToken')
    const dispatch = useDispatch()
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
    <div className='flex flex-col gap-4'>
        <h1 className='font-bold text-4xl text-gray-800'>{product.productName}</h1>
        <p className='text-gray-800'>{product.category} | {product.brand}</p>
        <h2 className='text-pink-500 font-bold text-2xl'>{product.productPrice} ₫</h2>
        <p className='line-clamp-12 text-muted-foreground'>{product.productDesc}</p>
        <div className='flex gap-2 items-center w-[300px]'>
            <p>Quantily: </p>
            <Input type='number' className="w-14" defaultValue={1} />
        </div>
        <Button onClick={()=>addToCart(product._id)} className='bg-pink-600 w-max'>Add to Cart </Button>
    </div>
  )
}

export default ProductDesc