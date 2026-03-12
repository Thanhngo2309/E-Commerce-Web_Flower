import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Edit, Eye, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import userLogo from "../../assets/userLogo.png"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [searchTearm, setSearchTearm] = useState("")
  const navigate = useNavigate()
  const filteredUsers = users.filter(user=>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTearm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTearm.toLowerCase())
  )
  const getAllUsers = async () => {
    const accessToken = localStorage.getItem("accessToken")
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/all-user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.data.success) {
        setUsers(res.data.users)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllUsers()
  }, [])
  return (
    <div className='pl-[350px] py-30 pr-20 mx-auto px-4'>
      <h1 className='font-bold text-2xl'>User Management</h1>
      <p>View and manage registered users</p>
      <div className='flex relative w-[300px] mt-6'>
        <Search  className='absolute left-2 top-1 text-gray-600 w-5' />
        <Input value={searchTearm} onChange={(e)=> setSearchTearm(e.target.value)} className="pl-10" placeholder="Search User" />
      </div>
      <div className="grid grid-cols-3 gap-7 mt-6">
        {
          filteredUsers.map((user, index) => {
            return <div key={index} className='bg-pink-100 p-5 rounded-lg'>
              <div className='flex iters-center gap-2'>
                <img src={user?.profilePic || userLogo} alt="" className='rounded-full w-16 aspect-square object-cover border border-pink-600' />
                <div>
                  <h1 className='font-semibold'>{user?.firstName} {user?.lastName}</h1>
                  <h3 className="">{user?.email}</h3>
                </div>
              </div>
              <div className='flex gap-3 mt-3'>
                <Button onClick={()=>navigate(`/dashboard/users/${user?._id}`)} variant='outline'><Edit/>Edit</Button>
                <Button onClick={()=>navigate(`/dashboard/users/orders/${user?._id}`)}><Eye/>Show Order</Button>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default AdminUsers