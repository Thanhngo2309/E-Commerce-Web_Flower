import React, { use, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Link,useNavigate } from 'react-router-dom'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'



const Signup = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [loading,setLoading ] = useState(false)
    const [formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
    })
    const navigate = useNavigate()
    const handleChange = (e)=>{
        const {name,value} = e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const submidHandler = async(e)=>{
        e.preventDefault()
        console.log(formData)
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/user/register`,formData,{
                headers:{
                    "Content-Type": "application/json"
                }
            })
            if(res.data.success){
                navigate('/verify')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally{
           setLoading(true)
        }
    }
  return (
    <div className="min-h-screen w-full relative">
  {/* Cotton Candy Sky Gradient - Opposite Direction */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: `linear-gradient(225deg, #FFB3D9 0%, #FFD1DC 20%, #FFF0F5 40%, #E6F3FF 60%, #D1E7FF 80%, #C7E9F1 100%)`,
    }}
  />
  {/* Your Content/Components */}
    <div className='flex justify-center items-center min-h-screen relative'>
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Enter given details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        
          <div className="flex flex-col gap-3">

            {/* FirstName and LastName */}
            <div className="grid grid-cols-2 gap-4">
                <div className='grid gap-2'>
                    <Label htmlFor="FirstName">First Name</Label>
                    <Input 
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="thanh"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    />
                </div>
                <div className='grid gap-2'>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Ngo"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    />
                </div>
            </div>

            {/* Email */}
            <div className='grid gap-2'>
                
                <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                />
                
              
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
                <div className='relative'>
                <Input id="password" name="password" placeholder="Create a password" type={showPassword ? 'text': "password"} required value={formData.password}
                    onChange={handleChange}/>
                {
                    showPassword ? <EyeOff onClick={()=>setShowPassword(false)} className='w-5 h-5 text-gray-700 absolute right-5 bottom-2' /> : 
                    <Eye onClick={()=>setShowPassword(true)} className='w-5 h-5 text-gray-700 absolute right-5 bottom-2'/>
                }
            </div>
              
            
            </div>
          </div>
      
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={submidHandler} type="submit" className="w-full cursor-pointer bg-pink-400 hover:bg-pink-300">
        
        {loading ? <><Loader2 className='h-4 w-4 animate-spin mr-2'/>Please wait</> : 'Signup'}
        
        </Button>
        <p className='text-gray-700 text-sm'>Already have an account? 
            <Link to={'/login'} className='hover:underline cursor-pointer text-pink-800'>Login</Link>
        </p>
        
      </CardFooter>
    </Card>

    </div>
</div>
  )
}

export default Signup