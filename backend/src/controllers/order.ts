import { Request } from "express";
import { TryCatach } from "../middleware/error";
import { NewOrderRequestBody } from "../types/types";
import ErrorHandler from "../utils/utility-class";
import { Order } from "../models/order";
import { reduceStock } from "../utils/features";

export const newOrder = TryCatach(
    async(req:Request<{},{},NewOrderRequestBody>, res, next)=>{
        const {
            shippingInfo,
            orderItems,
            user,
            subtotal,
            tax,
            shippingCharges,
            discount,
            total
        }= req.body
        if(!shippingInfo || !orderItems || !user ||!subtotal ||!tax || !total ){
            return next(new ErrorHandler("Please Enter All Fields", 400))
        }
        const order = await  Order.create({
            shippingInfo,
            orderItems,
            user,
            subtotal,
            tax,
            shippingCharges,
            discount,
            total   
        });

        await reduceStock(orderItems)
        return res.status(201).json({
            success: true,
            message:"Order Placed Successfully"
        })
    }
   
)

export const myOrder = TryCatach(async(req, res, next)=>{
    const{id: user} = req.query;
    const orders = await Order.find({user});
    return res.status(200).json({
        success:true,
        orders,
    })
})

export const allOrders = TryCatach(async(req, res, next)=>{
    const orders = await Order.find().populate("user", "name");
    return res.status(200).json({
        success: true,
        orders,
    })
})
export const getSingleOrder = TryCatach(async(req, res, next)=>{
    const {id} =req.params;
    const order = await Order.findById(id).populate("user", "name");
    return res.status(200).json({
        success: true,
        order,
    })
})

