import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const VerifyEmail = () => {
    const {token} = useParams()
    const [status, setStatus] = useState("Verifying....")
    const navigate = useNavigate()
    const verifyEmail = async()=>{
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/user/verify`,{},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(res.data.success){
                setStatus('✅ Email Verified Successfully')
                setTimeout(() => {
                    navigate('/login')
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            setStatus("❌ verication failed. Please try again")
            toast.error(error.response.data.message)
        }
    }
    useEffect(()=>{
        verifyEmail()
    }, [token])
  return (
    <div className='relative w-full h-[760px] bg-pink-100 overflow-hidden'>
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-white p-6 rounded-2x1 shadow-md text-center w-[90%] max-w-md'>
                <h2 className='text-x1 font-semibold text-gray-800'>{status}</h2>
            </div>
        </div>
    </div>
  )
}

export default VerifyEmail