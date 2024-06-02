import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    code:{
        type:String,
        required:[true, "Please Enter the coupon code"],
        unique: true,
    },
    amount:{
        type: Number,
        required:[true,"Please enter the Discount Amoutn"]
    }
})

export const Coupon = mongoose.model("Coupon", schema)