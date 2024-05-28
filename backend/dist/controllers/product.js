"use strict";
// import { NextFunction,Request,Response } from "express";
// import { TryCatach } from "../middleware/error";
// import ErrorHandler from "../utils/utility-class";
// import { rm } from "fs";
// import { Product } from "../models/product";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newProduct = void 0;
const error_1 = require("../middleware/error");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const fs_1 = require("fs");
const product_1 = require("../models/product");
exports.newProduct = (0, error_1.TryCatach)(async (req, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo) {
        return next(new utility_class_1.default("Please add photo", 400));
    }
    if (!name || !price || !stock || !category) {
        (0, fs_1.rm)(photo.path, () => {
            console.log("Deleted");
        });
        return next(new utility_class_1.default("Please provide all required fields: name, price, stock, category", 400));
    }
    await product_1.Product.create({
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
});
