import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import userLogo from "../../assets/userLogo.png"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { setUser } from '@/redux/userSlice'

const UserInfo = () => {
  const navigate = useNavigate()
  const [updateUser, setUpdateUser] = useState(null)
  const [file, setFile] = useState(null)
  const { user } = useSelector(store => store.user)
  const dispatch = useDispatch()

  const params = useParams()
  const userId = params.id
  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })
  }
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    setUpdateUser({ ...updateUser, profilePic: URL.createObjectURL(selectedFile) })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const accessToken = localStorage.getItem('accessToken')
    try {
      // use formData for text and file 
      const formData = new FormData()
      formData.append('firstName', updateUser.firstName)
      formData.append('lastName', updateUser.lastName)
      formData.append('phoneNo', updateUser.phoneNo)
      formData.append('address', updateUser.address)
      formData.append('city', updateUser.city)
      formData.append('zipCode', updateUser.zipCode)
      formData.append('role', updateUser.role)
      if (file) {
        formData.append('file', file) // image 
      }
      const res = await axios.put(`http://localhost:8000/api/v1/user/update/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,

        }
      })
      if (userId === user._id) {
        dispatch(setUser(res.data.user)) 
      }
      if (res.data.success) {
        toast.success(res.data.message)
        navigate(-1)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message || "Failed to update profile")
    }
    console.log(updateUser, file)
  }
  const getUserDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/get-user/${userId}`)
      if (res.data.success) {
        setUpdateUser(res.data.user)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getUserDetails()
  }, [])
  return (
    <div className='pt-5 min-h-screen bg-gray-100'>
      <div className='max-w-7xl mx-auto'>
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
          <div className="flex pt-20 justify-between gap-10">
            <Button onClick={() => navigate(-1)}><ArrowLeft /></Button>
            <h1 className='font-bold mb-7 text-2xl'>Update Profile</h1>
          </div>
          <div className='w-full flex gap-10 justify-between items-start px-7 max-w-2xl'>
            {/* profile picture section */}
            <div className='flex flex-col items-center'>
              <img src={updateUser?.profilePic || userLogo} alt="profile" className='w-32 h-32 rounded-full object-cover border-4 border-pink-800' />
              <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">Change Picture
                <input type="file" accept='image/*' className='hidden' onChange={handleFileChange} />
              </Label>
            </div>
            {/* profile form section */}
            <form className='space-y-4 shadow-lg p-7 bg-white rounded-lg ' onSubmit={handleSubmit}>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className="block text-sm font-medium">First Name</Label>
                  <Input type="text" name='firstName' placeholder='First Name' value={updateUser?.firstName} onChange={handleChange} className='w-full border border-gray-300 px-3 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500' />
                </div>
                <div>
                  <Label className="block text-sm font-medium">Last Name</Label>
                  <Input type="text" name='lastName' placeholder='Last Name' value={updateUser?.lastName} onChange={handleChange} className='w-full border border-gray-300 px-3 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500' />
                </div>
              </div>

              <div>
                <Label className="block text-sm font-medium">Email</Label>
                <Input type="email" name='email' disabled value={updateUser?.email} onChange={handleChange} className='w-full border border-gray-300 px-3 py-2 mt-2 cursor-not-allowed rounded-lg ' />
              </div>

              <div>
                <Label className="block text-sm font-medium">Phone Number</Label>
                <Input type="text" name='phoneNo' placeholder='Enter your contact No' value={updateUser?.phoneNo} onChange={handleChange} className='w-full border border-gray-300 mt-2 px-3 py-2  rounded-lg ' />
              </div>
              <div>
                <Label className="block text-sm font-medium">Address</Label>
                <Input type="text" name='address' placeholder='Enter your address' value={updateUser?.address} onChange={handleChange} className='w-full border border-gray-300 mt-2 px-3 py-2  rounded-lg ' />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium">City</Label>
                  <Input type="text" name='city' placeholder='Enter your city' value={updateUser?.city} onChange={handleChange} className='w-full border border-gray-300 mt-2 px-3 py-2  rounded-lg ' />
                </div>
                <div>
                  <Label className="block text-sm font-medium">Zip Code</Label>
                  <Input type="text" name='zipCode' placeholder='Enter your zip code' value={updateUser?.zipCode} onChange={handleChange} className='w-full border border-gray-300 mt-2 px-3 py-2  rounded-lg ' />
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Label className="block text-sm font-medium">Role :</Label>
                <RadioGroup value={updateUser?.role}
                  className='flex items-center'
                  onValueChange={(value) => setUpdateUser({ ...updateUser, role: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user">User</Label>
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button type="submit" className="w-full bg-pink-600 text-white font-semibold py-2 mt-4 hover:bg-pink-700">Update Profile</Button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UserInfo