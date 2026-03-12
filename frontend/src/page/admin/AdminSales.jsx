import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'

import React, { useEffect, useState } from 'react'
import {AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const AdminSales = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    salesByDate: [],
    
  })
  const fetchStats = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken")
      const res = await axios.get(`http://localhost:8000/api/v1/payment/sales`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.data.success) {
        setStats(res.data)
        
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchStats()
  },[])
  console.log("Sale data: ", stats.totalOrders, stats.sales)
        console.log("Sale data: ", stats.totalOrders)
  return (
    <div className='pl-[350px] bg-gray-100 py-20 pr-20 mx-auto px-4'>
      <div className="p-6 grid gap-6 lg:grid-cols-4">
        <Card className="bg-pink-500 text-white shadow">
          <CardHeader >
            <CardTitle>ToTal Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{stats.totalUsers}</CardContent>
        </Card>

        <Card className="bg-pink-500 text-white shadow">
          <CardHeader >
            <CardTitle>ToTal Products</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{stats.totalProducts}</CardContent>
        </Card>

        <Card className="bg-pink-500 text-white shadow">
          <CardHeader >
            <CardTitle>ToTal Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{stats.totalOrders}</CardContent>
        </Card>

        <Card className="bg-pink-500 text-white shadow">
          <CardHeader >
            <CardTitle>ToTal Sales</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{stats.totalSales} ₫</CardContent>
        </Card>


        {/* sale Chart */}
        <Card className="lg:col-span-4" >
          <CardHeader>
            <CardTitle>Sales (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent style={{height:300}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data = {stats?.sales}>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Area/>
                <Area type="monotone" dataKey="amount" stroke="#F47286" fill="#F472B6" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminSales