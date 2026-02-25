import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
import {Product} from "../models/productModel.js";
export const addProduct = async (req, res) => {
    try {
        const { productName, productDesc, productPrice, category, brand } = req.body;
        const userId = req.id

        if(!productName || !productDesc || !productPrice || !category || !brand){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }

        let productImg = []
        if(req.files && req.files.length > 0){
            for(let file of req.files){
                const fileUri = getDataUri(file)
                const result = await cloudinary.uploader.upload(fileUri,{
                    folder:"mern_products"
                }) 
                productImg.push({
                    url:result.secure_url,
                    public_id:result.public_id
                })
        }
    }
// Create a new product
    const newProduct = new Product({
        userId,
        productName,
        productDesc,
        productPrice,
        category,
        brand,
        productImg
    })
    await newProduct.save()
    res.status(201).json({
        success:true,
        message:"Product added successfully",
        product:newProduct
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const getAllProducts = async(_,res)=>{
    try {
        const products = await Product.find()
        if(!products){
            return res.status(404).json({
                success:false,
                message:"No products found"
            })
        }
        return res.status(200).json({
            success:true,
            products
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const deleteProduct = async(req,res)=>{
    try {
        const {productId} = req.params
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }

        if(product.productImg && product.productImg.length > 0){
            for(let img of product.productImg){
                const result = await cloudinary.uploader.destroy(img.public_id)
            }
        }
        
        //delete product from mongodb
        await Product.findByIdAndDelete(productId)
        return res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const updateProduct = async(req,res)=>{
    try {
        const {productId} = req.params
        const {productName, productDesc, productPrice, category, brand, existingImages} = req.body

        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }

        let updatedImages = []

        //keep selected old images
        if(existingImages){
            const keepIds = JSON.parse(existingImages)
            updatedImages = product.productImg.filter(img => keepIds.includes(img.public_id))
        

        //delete only removed images
            const removedImages = product.productImg.filter(
                (img) => !keepIds.includes(img.public_id)
            ) 
            for(let img of removedImages){
                await cloudinary.uploader.destroy(img.public_id)
            }
        } else {
           updatedImages = product.productImg 
        }

        //upload new images
        if(req.files && req.files.length > 0){
            for(let file of req.files){
                const fileUri = getDataUri(file)
                const result = await cloudinary.uploader.upload(fileUri,{
                    folder:"mern_products"
                }) 
                updatedImages.push({
                    url:result.secure_url,
                    public_id:result.public_id
                })
            }
        }
        //update product details

        product.productName = productName || product.productName
        product.productDesc = productDesc || product.productDesc
        product.productPrice = productPrice || product.productPrice
        product.category = category || product.category
        product.brand = brand || product.brand
        product.productImg = updatedImages

        const updatedProduct = await product.save()

        return res.status(200).json({
            success:true,
            message:"Product updated successfully",
            updatedProduct
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}