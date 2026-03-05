import FilterSidebar from '@/components/FilterSidebar'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import ProductCard from '@/components/ProductCard'
import axios, { all } from 'axios'
import { toast } from 'sonner'
import { setProducts } from '@/redux/productSlice'




const Products = () => {
    const { products } = useSelector((state) => state.product)
    const [allProducts, setAllProducts] = useState([])
    const [priceRange, setPriceRange] = useState([0, 1000000])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('All')
    const [brand, setBrand] = useState('All')
    const [sortOrder, setSortOrder] = useState('')
    const dispatch = useDispatch()
    const getAllProducts = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/product/getallproducts')
            if (res.data.success) {
                setAllProducts(res.data.products)
                dispatch(setProducts(res.data.products))
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || 'Failed to fetch products')

        }
    }

    useEffect(() => {
  if (allProducts.length === 0) return

  let filtered = [...allProducts]

  if (search.trim()) {
    filtered = filtered.filter(p =>
      p.productName.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (category !== 'All') {
    filtered = filtered.filter(p => p.category === category)
  }

  if (brand !== 'All') {
    filtered = filtered.filter(p => p.brand === brand)
  }

  filtered = filtered.filter(p =>
    p.productPrice >= priceRange[0] &&
    p.productPrice <= priceRange[1]
  )

  if (sortOrder === 'lowtohigh') {
    filtered.sort((a, b) => a.productPrice - b.productPrice)
  } else if (sortOrder === 'hightolow') {
    filtered.sort((a, b) => b.productPrice - a.productPrice)
  }

  dispatch(setProducts(filtered))   // UPDATE REDUX SAU FILTER
}, [allProducts, search, category, brand, priceRange, sortOrder])

    useEffect(() => {
        getAllProducts()
    }, [])


    return (
        <div className='pt-30 pb-10'>
            <div className='max-w-7xl mx-auto flex gap-7'>
                {/* sidebar */}
                <FilterSidebar
                    allProducts={allProducts}
                    priceRange={priceRange}
                    setSearch={setSearch}
                    setCategory={setCategory}
                    setBrand={setBrand}
                    search={search}
                    category={category}
                    brand={brand}
                    setPriceRange={setPriceRange}
                />
                {/* Main product section */}
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-end mb-4'>
                        <Select onValueChange={(value) => setSortOrder(value)}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Sort by price" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Sort By</SelectLabel>
                                    <SelectItem value="lowtohigh">Price: Low to High</SelectItem>
                                    <SelectItem value="hightolow">Price: High to Low</SelectItem>

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* product grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7'>
                        {/* map through products and render ProductCard */}
                        {
                            products.map((product) => {
                                return <ProductCard key={product._id} product={product} />
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Products