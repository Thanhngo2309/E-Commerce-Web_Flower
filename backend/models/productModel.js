import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId, 
            ref:"User"
        },
        productName:{
            type:String,
            required:true
        },
        productDesc:{
            type:String,
            required:true
        },
        productImg:[
            {
                url:{
                    type:String,
                    
                },
                public_id:{
                    type:String,
                    required:true
                }
            }
        ],
        productPrice:{
            type:Number,
            
        },
        category:{
            type:String,
            required:true
        },
        brand:{
            type:String,
            required:true
        },
    },
    {timestamps:true}
)

export const Product = mongoose.model("Product", productSchema)