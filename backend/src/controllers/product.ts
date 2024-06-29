import { NextFunction, Request, Response } from "express";
import { TryCatach } from "../middleware/error";
import ErrorHandler from "../utils/utility-class";
import { rm } from "fs";
import { Product } from "../models/product";
import { BaseQuery, SearchRequestQuery } from "../types/types";
//import { BaseQuery } from "../types/types";

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
    console.log("updatedFileds===>", updatedFileds)
    await product.save();
    return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        updatedFileds
    })
})

export const deleteProduct = TryCatach(async(req, res, next)=>{
    const product = await Product.findById(req.params.id);
    if(!product) return next(new ErrorHandler("Product not found", 404))
        rm(product.photo!,()=>{
            console.log("Product photo deleted")
        })
        await product.deleteOne();
        return res.status(200).json({
            success: true,
            message:"Product deleted successfully!"
        })
})

export const getAllProductsWithFilter = TryCatach(
    async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
      const { search, sort, category, price } = req.query;
      const page = Number(req.query.page) || 1;
      const limit = Number(process.env.PRODUCT_PER_PAGE) || 4;
      //pagination
      const skip = (page - 1) * limit;
  
      const baseQuery: BaseQuery = {};
  
      if (search)
        baseQuery.name = {
          $regex: search,
          $options: "i",
        };
  
      if (price)
        baseQuery.price = {
          $lte: Number(price),
        };
  
      if (category) baseQuery.category = category;
  
      const productsPromise = Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip);
  
      const [products, filteredOnlyProduct] = await Promise.all([
        productsPromise,
        Product.find(baseQuery),
      ]);
  
      const totalPage = Math.ceil(filteredOnlyProduct.length / limit);
  
      return res.status(200).json({
        success: true,
        products,
        totalPage,
      });
    }
  );
  
