import React from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'

const FilterSidebar = ({search, setSearch, category, setCategory, brand, setBrand, priceRange, setPriceRange, allProducts}) => {
  const Categories = allProducts.map((p) => p.category) 
  const uniqueCategory = ["All", ...new Set(Categories)]

  const Brands = allProducts.map((p) => p.brand)
  const uniqueBrands = ["All", ...new Set(Brands)]
  console.log(Categories);
  console.log(Brands)

  const handleCategoryClick = (val) => {
    setCategory(val)
  }

  const handleBrandClick = (val) => {
    setBrand(val)
  }

  const handleMinChange = (e) => {
    const value = Number(e.target.value)
    if(value < priceRange[1]){
      setPriceRange([value, priceRange[1]])
    }
  }

  const handleMaxChange = (e) => {
    const value = Number(e.target.value)
    if(value > priceRange[0]){
      setPriceRange([priceRange[0], value])
    }
  }

  const resetFilters = () => {
    setSearch('')
    setCategory('All')
    setBrand('All')
    setPriceRange([0, 1000000])
  }

  return (
    <div className='bg-gray-100 mt-10 p-4 rounded-md h-max hiddem md:block w-64'>
      {/* search */}
      <Input 
      type="text" 
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder='Search products...' className='bg-white p-2 rounded-md border-gray-400 border-2 w-full' />

      {/* category filter */}
      <h1 className='mt-5 font-semibold text-x1'>Category</h1>
      <div className='flex flex-col gap-2 mt-3'>
        {
          uniqueCategory.map((item, index) => (
            <div key={index} className='flex items-center gap-2'>
              <input type="radio" checked={category === item} onChange={() => handleCategoryClick(item)}/>
              <label htmlfor={item}>{item}</label>
            </div>
          ))
        }
      </div>

      {/* brands filter */}
      <h1 className='mt-5 font-semibold text-x1'>Brands</h1>
      <select value={brand} onChange={(e) => handleBrandClick(e.target.value)} className='bg-white p-2 rounded-md border-gray-400 border-2 w-full mt-3'>
        {
          uniqueBrands.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
          })
            
        }
      </select>

      {/* price filter */}
      <h1 className='mt-5 font-semibold text-x1 mb-3'>Price Range</h1>
      <div className='flex flex-col gap-2'>
        <label htmlFor="">
          Price Range: ₫{priceRange[0]} - ₫{priceRange[1]}
        </label>
        <div className='flex gap-2 items-center'>
          <input type="number" min="0" max="5000" className='w-20 p-1 border border-gray-300 rounded' value={priceRange[0]} onChange={handleMinChange} />
          <input type="number" min="0" max="999999" className='w-20 p-1 border border-gray-300 rounded' value={priceRange[1]} onChange={handleMaxChange} />
        </div>
        <input type="range" min="0" max="5000" step = '100' className='w-full mt-2' value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} />
        <input type="range" min="0" max="999999" step = '100' className='w-full mt-2' value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} />
      </div>

      {/* Reset button */}
      <Button className='bg-pink-600 text-white cursor-pointer mt-5 w-full' onClick={resetFilters}>Reset Filters</Button>
    </div>
  )
}

export default FilterSidebar