import { NextFunction,Request,Response } from "express";
import { TryCatach } from "../middleware/error";
import ErrorHandler from "../utils/utility-class";
import { rm } from "fs";
import { Product } from "../models/product";

export const newProduct = TryCatach(
    async (req:Request, res:Response, next:NextFunction)=>{
        const {name, price, stock, category}= req.body;
        const photo =req.file;
        if(!photo){
            return next(new ErrorHandler("Please add photo", 400))
        }
        if(!name || !price || !stock || !category){
                rm(photo.path,()=>{
                    console.log("Deleted")
                })
        }
        await Product.create({
                name,
                price,
                stock,
                category: category.toLowerCase(),
                photo:photo.path
        })
        return res.status(201).json({
            success: true,
            message: "Product created successfully"
        })
    }
)