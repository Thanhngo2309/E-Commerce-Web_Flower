import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { addAddress, deleteAddress, setCart, setSelectAddress } from '@/redux/productSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
const AddressForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  })
  const { cart, addresses, selectedAddress } = useSelector((store => store.product))
  const [showForm, setShowForm] = useState(addresses?.length > 0 ? false : true)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePayment = async () => {
    if (loading) return
    try {
      setLoading(true)
      if (selectedAddress === null) {
        alert("Please select address")
        setLoading(false)
        return
      }
      const accessToken = localStorage.getItem("accessToken")
      if (!accessToken) {
        alert("Please login first")
        setLoading(false)
        return
      }
      const res = await axios.post(
        "http://localhost:8000/api/v1/payment/create-payment",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      const paymentUrl = res.data?.paymentUrl
      if (paymentUrl) {
        window.location.href = paymentUrl
        
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const handleSave = () => {
    dispatch(addAddress(formData))
    setShowForm(false)
  }

  const subtotal = cart.totalPrice
  const shipping = subtotal > 500000 ? 0 : 30000
  const tax = parseFloat((subtotal * 0.05).toFixed(2))
  const total = subtotal + shipping + tax
  return (
    <div className='max-w-7xl mx-auto grid place-items-center p-10'>
      <div className="grid grid-cols-2 items-start gap-20 mt-10 max-w-7xl mx-auto">
        <div className="space-y-4 p-6 bg-white">
          {
            showForm ? (
              <>
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName"
                    name="fullName"
                    required placeholder="Thanh Ngo"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone"
                    name="phone"
                    required placeholder="+84 878802652"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email"
                    name="email"
                    required placeholder="thanh@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address"
                    name="address"
                    required placeholder="Ha Noi"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city"
                      name="city"
                      required placeholder="Ha Noi"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state"
                      name="state"
                      required placeholder="Ha Noi"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">Zip Code</Label>
                    <Input id="zip"
                      name="zip"
                      required placeholder="70010"
                      value={formData.zip}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country"
                      name="country"
                      required placeholder="Ha Noi"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <Button onClick={handleSave} className="w-full">Save & Continue</Button>
              </>) : (

              <div className='space-y-4'>
                <h2 className='text-lg font-semibold'>Saved Addresses</h2>
                {
                  addresses.map((addr, index) => {
                    return <div
                      onClick={() => dispatch(setSelectAddress(index))}
                      key={index}
                      className={`border p-4 rounded-md cursor-pointer relative ${selectedAddress === index ? "border-pink-600 bg-pink-50" : "border-gray-300"}`}>
                      <p className='font-medium' > {addr.fullName}</p>
                      <p> {addr.fullName}</p>
                      <p> {addr.phone}</p>
                      <p> {addr.email}</p>
                      <p> {addr.address},{addr.city},{addr.state},{addr.zip},{addr.country}</p>
                      <button
                        onClick={(e) => dispatch(deleteAddress(index))}
                        className='absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm'>
                        delete
                      </button>
                    </div>
                  })
                }
                <Button variant='outline' className="w-full" onClick={() => setShowForm(true)}>+Add New Address</Button>
                <Button
                  className="w-full bg-pink-600"
                  disabled={selectedAddress === null || loading}
                  onClick={handlePayment}
                >
                  {loading ? "Processing..." : "Proceed To Checkout"}
                </Button>
              </div>
            )
          }
        </div>

        {/* Right side order sumary */}
        <div>
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className='flex justify-between'>
                <span>Subtotal ({cart?.items?.length}) items</span>
                <span>{subtotal.toLocaleString("en-Us")} ₫</span>
              </div>

              <div className='flex justify-between'>
                <span>Shipping </span>
                <span>{shipping.toLocaleString("en-Us")} ₫</span>
              </div>

              <div className='flex justify-between'>
                <span>Tax</span>
                <span>{tax.toLocaleString("en-Us")} ₫</span>
              </div>
              <Separator />
              <div className='flex justify-between font-bold text-lg'>
                <span>ToTal</span>
                <span>{total.toLocaleString("en-Us")} ₫</span>
              </div>
              <div className='text-sm text-muted-foreground pt-4'>
                <p>* Free shipping on orders over 500,000 ₫</p>
                <p>* 30-day return policy</p>
                <p>* 24/7 customer support</p>

              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AddressForm