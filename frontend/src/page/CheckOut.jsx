
import { Button } from "@/components/ui/button"
import axios from "axios"
import React from "react"

const CheckOut = () => {

  const handleVNPay = async () => {
    try {

      const accessToken = localStorage.getItem("accessToken")

      if (!accessToken) {
        alert("Please login first")
        return
      }

      const res = await axios.post(
        "http://localhost:8000/api/v1/payment/create-payment",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      )

      // backend có thể trả string hoặc object
      const paymentUrl = res.data?.paymentUrl || res.data

      if (paymentUrl) {
        window.location.href = paymentUrl
      } else {
        console.error("Invalid VNPay response:", res.data)
      }

    } catch (error) {
      console.error("VNPay error:", error.response?.data || error.message)
    }
  }

  return (
    <Button onClick={handleVNPay}>
      Pay With VNPay
    </Button>
  )
}

export default CheckOut

