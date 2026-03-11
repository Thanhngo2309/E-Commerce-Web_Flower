import express from "express"
import { checkPaymentVnpay, createPaymentUrl, getMyOrder } from "../controllers/vnpayController.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"

const router = express.Router()

router.post("/create-payment",isAuthenticated,createPaymentUrl)
router.get("/check-payment-vnpay",checkPaymentVnpay)
router.get("/myorder",isAuthenticated,getMyOrder)
// router.get("/vnpay-return",vnpayReturn)

export default router