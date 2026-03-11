import { dateFormat, ignoreLogger, ProductCode, VNPay, VnpLocale } from "vnpay"
import { vnpConfig } from "../config/vnpayCongig.js"
import { Cart } from "../models/cartModel.js"
import {Order} from "../models/orderModel.js"
export const createPaymentUrl = async (req, res) => {
  try {

    const userId = req.id

    const cart = await Cart.findOne({ userId }).populate("items.productId")

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      })
    }

    const subtotal = cart.totalPrice
    const shipping = subtotal > 500000 ? 0 : 30000
    const tax = subtotal * 0.05
    const total = subtotal + shipping + tax

    const txnRef = `${userId}_${Date.now()}`

    const existingOrder = await Order.findOne({ txnRef })

    if(!existingOrder){

    const products = cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
    }))

    const newOrder = new Order({
        user:userId,
        products,
        amount:subtotal,
        shipping,
        tax,
        status:"Pending",
        txnRef
    })

    await newOrder.save()
}

    const vnpay = new VNPay({
      tmnCode: vnpConfig.vnp_TmnCode,
      secureSecret: vnpConfig.vnp_HashSecret,
      vnpayHost: vnpConfig.vnp_Url,
      testMode: true,
      hashAlgorithm: "SHA512",
      loggerFn: ignoreLogger
    })

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const paymentUrl = await vnpay.buildPaymentUrl({
      vnp_Amount: total ,
      vnp_IpAddr: "127.0.0.1",
      vnp_TxnRef: txnRef,
      vnp_OrderInfo: `Order ${txnRef}`,
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: "http://localhost:8000/api/v1/payment/check-payment-vnpay",
      vnp_Locale: VnpLocale.VN,
      vnp_CreateDate: dateFormat(new Date()),
      vnp_ExpireDate: dateFormat(tomorrow)
    })

    return res.status(200).json({
      success: true,
      paymentUrl
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const checkPaymentVnpay = async (req, res) => {
  try {

    const vnpParams = req.query
    const responseCode = vnpParams.vnp_ResponseCode
    const txnRef = vnpParams.vnp_TxnRef

    

   const order = await Order.findOne({ txnRef })

    if (!order) {
      return res.redirect(
        "http://localhost:3000/payment-result?status=failed"
      )
    }

    if (responseCode === "00") {

      order.status = "Paid"
      await order.save()

      const cart = await Cart.findOne({ userId: order.user })

      if (cart) {
        cart.items = []
        cart.totalPrice = 0
        await cart.save()
      }

      return res.redirect(
        "http://localhost:3000/payment-result?status=success"
      )
    }

    order.status = "Failed"
    await order.save()

    return res.redirect(
      "http://localhost:3000/payment-result?status=failed"
    )

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getMyOrder = async (req,res)=>{
  try {
    const userId = req.id
    const orders = await Order.find({user:userId})
    .populate({path:"products.productId",select:"productName productPrice productImg"})
    .populate("user","firstName lastName email") 

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    })
  } catch (error) {
    console.error("error fetching user orders:", error)
    res.status(500).json({
      message: error.message
    })
  }
}