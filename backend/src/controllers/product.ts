import { NextFunction, Request, Response } from "express";
import { TryCatach } from "../middleware/error";
import ErrorHandler from "../utils/utility-class";
import { rm } from "fs";
import { Product } from "../models/product";

export const newProduct = TryCatach(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, price, stock, category } = req.body;
        const photo = req.file;

        if (!photo) {
            return next(new ErrorHandler("Please add photo", 400));
        }

        if (!name || !price || !stock || !category) {
            rm(photo.path, () => {
                console.log("Deleted");
            });
            return next(new ErrorHandler("Please provide all required fields: name, price, stock, category", 400));
        }

        await Product.create({
            name,
            price,
            stock,
            category: category.toLowerCase(),
            photo: photo.path
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully!!"
        });
    }
);

export const getLatestProducts = TryCatach(async(req, res, next)=>{
    const products = await Product.find({}).sort({createdAt:-1}).limit(5);
    return res.status(200).json({
        success:true,
        products
    })
})

export const getAllCategories = TryCatach(async(req, res, next)=>{
    const categories = await Product.distinct("category");
    return res.status(200).json({
        success: true,
        categories
    })
})

export const getAllProducts =TryCatach(async(req, res, next)=>{
    const products = await Product.find({});
    return res.status(200).json({
        success:true,
        products
    })
})

export const getSingleProduct =TryCatach(async(req, res, next)=>{
    const id = req.params.id;
    const product = await Product.findById(id);
    if(!product) return next(new ErrorHandler("Product Not Found", 404));
    return res.status(200).json({
        success: true,
        product
    })
})

export const updateProduct= TryCatach(async(req, res, next)=>{
    const {id } = req.params;
    const {name, price, stock, category} =req.body;
    const photo = req.file
    const product = await Product.findById(id);
    if(!product) return next(new ErrorHandler("Product not found", 404))
    const updatedFileds: Record<string, any>={}
    if (photo ){
        rm(product.photo!,()=>{
            console.log("Old photo deleted")
        })
        product.photo =photo.path
        updatedFileds.photo = product.photo
    }
    if(name){
        product.name = name;
        updatedFileds.name = product.name
    }
    if(price){
        product.price = price;
        updatedFileds.price = product.price
    }
    if(stock){
        product.stock = stock;
        updatedFileds.stock = product.stock
    }
    if(category){
        product.category = category;
        updatedFileds.category = product.category
    }
    await product.save();
    return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        updatedFileds
    })
})

