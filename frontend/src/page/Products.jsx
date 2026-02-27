import FilterSidebar from '@/components/FilterSidebar'
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
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
    const {products} = useSelector((state) => state.product)
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
            if(res.data.success){
                setAllProducts(res.data.products)
                dispatch(setProducts(res.data.products))
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || 'Failed to fetch products')
            
        }
    }

    useEffect(() => {
        if(allProducts.length === 0){
            return;
        }
        let filtered = [...allProducts]

        // filter by search
        if(search.trim() !== ''){
            filtered = filtered.filter((product) => product.productName.toLowerCase().includes(search.toLowerCase()))
        }

        if(category !== 'All'){
            filtered = filtered.filter((product) => product.category === category)  
        }
        if(brand !== 'All'){
            filtered = filtered.filter((product) => product.brand === brand)  
        }
        if(priceRange){
            filtered = filtered.filter((product) => product.productPrice >= priceRange[0] && product.productPrice <= priceRange[1])
        }
        if(sortOrder === 'lowtohigh'){
            filtered.sort((a, b) => a.productPrice - b.productPrice)
        }
        else if(sortOrder === 'hightolow'){
            filtered.sort((a, b) => b.productPrice - a.productPrice)
        }
        else if(sortOrder === 'atoz'){
            filtered.sort((a, b) => a.productName.localeCompare(b.productName))
        }
        else if(sortOrder === 'ztoa'){
            filtered.sort((a, b) => b.productName.localeCompare(a.productName))
        }
        dispatch(setProducts(filtered))
            
        
    }, [search, category, brand, priceRange, sortOrder])

    useEffect(() => {
        getAllProducts()
    }, [])

    
    return (
        <div className='pt-30 pb-10'>
            <div className='max-w-7xl mx-auto flex gap-7'>
                {/* sidebar */}
                <FilterSidebar 
                allProducts = {allProducts} 
                priceRange = {priceRange} 
                setSearch = {setSearch}
                setCategory = {setCategory}
                setBrand = {setBrand}
                search = {search}
                category = {category}
                brand = {brand}
                setPriceRange = {setPriceRange}
                />
                {/* Main product section */}
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-end mb-4'>
                        <Select>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Sort by price" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Sort By</SelectLabel>
                                    <SelectItem value="lowtohigh">Price: Low to High</SelectItem>
                                    <SelectItem value="hightolow">Price: High to Low</SelectItem>
                                    <SelectItem value="atoz">Name: A to Z</SelectItem>
                                    <SelectItem value="ztoa">Name: Z to A</SelectItem>
                                    <SelectItem value="newestfirst">Newest First</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* product grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7'>
                        {/* map through products and render ProductCard */}
                        {
                            products.map((product) => {
                                return <ProductCard key={product._id} product={product}/>
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Products