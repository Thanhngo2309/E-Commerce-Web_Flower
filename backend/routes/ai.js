import express from "express";
import { Product } from "../models/productModel.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {


    const message = req.body?.message || "";

    console.log("User hỏi:", message);

    const products = await Product.find().limit(5);

    let reply = "Shop có các loại hoa:\n";

    products.forEach(p => {
      reply += `${p.productName} - ${p.productPrice}đ\n`;
    });

    res.json({ reply });

  } catch (error) {
    console.log("AI error:", error);
    res.status(500).json({ message: "AI error" });
  }
});

export default router;
