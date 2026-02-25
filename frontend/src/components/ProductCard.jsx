import React from 'react'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'

const ProductCard = ({product}) => {
    const {productImg, productPrice, productName} = product
    console.log(productImg);
  return (
   <div className='shadow-lg rounded-lg overflow-hidden h-max'>
        <div className='w-full h-full aspect-square overflow-hidden'>
            <img src={productImg[0]?.url} alt="" className='w-full h-full transition-transform duration-300 hover:scale-105' />

        </div>
        <div className='px-2 space-y-1'>
            <h1 className='font-semibold h-12 line-clamp-2'>{productName}</h1>
            <p className='text-sm text-gray-500'>₹{productPrice}</p>
            <Button className='bg-pink-600 mb-3 w-full'><ShoppingCart className='mr-2'/> Add to Cart</Button>
        </div>
   </div>
  )
}

export default ProductCard