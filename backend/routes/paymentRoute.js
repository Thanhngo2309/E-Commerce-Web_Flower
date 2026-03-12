import express from "express"
import { checkPaymentVnpay, createPaymentFromOrder, createPaymentUrl, getAllOrdersAdmin, getMyOrder, getSalesData, getUserOrder } from "../controllers/vnpayController.js"
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js"

const router = express.Router()

router.post("/create-payment",isAuthenticated,createPaymentUrl)
router.get("/check-payment-vnpay",checkPaymentVnpay)
router.get("/myorder",isAuthenticated,getMyOrder)
router.get("/all",isAuthenticated,isAdmin,getAllOrdersAdmin)
router.get("/user-order/:userId",isAuthenticated,isAdmin,getUserOrder)
router.post("/pay-order/:orderId", isAuthenticated, createPaymentFromOrder)
router.get("/sales", isAuthenticated, isAdmin,getSalesData)

// router.get("/vnpay-return",vnpayReturn)

export default router