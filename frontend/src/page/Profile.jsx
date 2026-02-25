import React, { use } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import userLogo from "../assets/userLogo.png" 
import { toast } from 'sonner'
import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/userSlice'
const Profile = () => {
  const {user} = useSelector((state)=>state.user)
  const params = useParams()
  const userId = params.userId
  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    phoneNo: user?.phoneNo,
    address: user?.address,
    city: user?.city,
    zipCode: user?.zipCode,
    profilePic: user?.profilePic,
    role: user?.role
    })

    const [file, setFile] = useState(null)
    const dispatch = useDispatch()
    const handleChange = (e)=>{
        setUpdateUser({...updateUser, [e.target.name]:e.target.value})
    }
    const handleFileChange = (e)=>{
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setUpdateUser({...updateUser, profilePic: URL.createObjectURL(selectedFile)})
    }

    const handleSubmit = async(e)=>{
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
        if(file){
          formData.append('file', file) // image 
        }
        const res = await axios.put(`http://localhost:8000/api/v1/user/update/${userId}`, formData, {
          headers:{
            Authorization:`Bearer ${accessToken}`,
            
          }
        })
        
        if(res.data.success){
        toast.success(res.data.message)
        dispatch(setUser(res.data.user))
      }
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || "Failed to update profile")
      }
      console.log(updateUser, file)
    }
  return (
    <div className='pt-30 min-h-screen bg-gray-100'>
    <Tabs defaultValue="profile" className="max-w-7x1 mx-auto items-center mt-10">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <div>
            <div className='flex flex-col justify-center items-center bg-gray-100'>
                <h1 className="text-2xl font-bold mb-7">Update Profile</h1>
                <div className='w-full flex gap-10 justify-between items-start px-7 max-w-2x1'>
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
                                <Input type="text" name='firstName' placeholder='First Name' value= {updateUser.firstName} onChange={handleChange} className='w-full border border-gray-300 px-3 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500' />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium">Last Name</Label>
                                <Input type="text" name='lastName' placeholder='Last Name' value= {updateUser.lastName} onChange={handleChange} className='w-full border border-gray-300 px-3 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500' />
                            </div>
                        </div>
                        <div>
                            <Label className="block text-sm font-medium">Email</Label>
                            <Input type="email" name='email' disabled value={updateUser.email} onChange={handleChange} className='w-full border border-gray-300 px-3 py-2 mt-2 cursor-not-allowed rounded-lg ' />
                        </div>
                            
                        <div>
                            <Label className="block text-sm font-medium">Phone Number</Label>
                            <Input type="text" name='phoneNo' placeholder='Enter your contact No' value={updateUser.phoneNo} onChange={handleChange} className='w-full border border-gray-300 mt-2 px-3 py-2  rounded-lg ' />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium">Address</Label>
                            <Input type="text" name='address' placeholder='Enter your address' value={updateUser.address} onChange={handleChange} className='w-full border border-gray-300 mt-2 px-3 py-2  rounded-lg ' />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium">City</Label>
                            <Input type="text" name='city' placeholder='Enter your city' value={updateUser.city} onChange={handleChange} className='w-full border border-gray-300 mt-2 px-3 py-2  rounded-lg ' />
                        </div> 
                        <div>
                            <Label className="block text-sm font-medium">Zip Code</Label>
                            <Input type="text" name='zipCode' placeholder='Enter your zip code' value={updateUser.zipCode} onChange={handleChange} className='w-full border border-gray-300 mt-2 px-3 py-2  rounded-lg ' />
                        </div>
                       <Button type="submit" className="w-full bg-pink-600 text-white font-semibold py-2 mt-4 hover:bg-pink-700">Update Profile</Button>
                    </form>
                </div>
            </div>
        </div>
      </TabsContent>
      <TabsContent value="orders">
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              Track performance and user engagement metrics. Monitor trends and
              identify growth opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Page views are up 25% compared to last month.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>
              Generate and download your detailed reports. Export data in
              multiple formats for analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            You have 5 reports ready and available to export.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Manage your account preferences and options. Customize your
              experience to fit your needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Configure notifications, security, and themes.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}

export default Profile