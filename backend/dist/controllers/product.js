"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.getSingleProduct = exports.getAllProducts = exports.getAllCategories = exports.getLatestProducts = exports.newProduct = void 0;
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
exports.getLatestProducts = (0, error_1.TryCatach)(async (req, res, next) => {
    const products = await product_1.Product.find({}).sort({ createdAt: -1 }).limit(5);
    return res.status(200).json({
        success: true,
        products
    });
});
exports.getAllCategories = (0, error_1.TryCatach)(async (req, res, next) => {
    const categories = await product_1.Product.distinct("category");
    return res.status(200).json({
        success: true,
        categories
    });
});
exports.getAllProducts = (0, error_1.TryCatach)(async (req, res, next) => {
    const products = await product_1.Product.find({});
    return res.status(200).json({
        success: true,
        products
    });
});
exports.getSingleProduct = (0, error_1.TryCatach)(async (req, res, next) => {
    const id = req.params.id;
    const product = await product_1.Product.findById(id);
    if (!product)
        return next(new utility_class_1.default("Product Not Found", 404));
    return res.status(200).json({
        success: true,
        product
    });
});
exports.updateProduct = (0, error_1.TryCatach)(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    const product = await product_1.Product.findById(id);
    if (!product)
        return next(new utility_class_1.default("Product not found", 404));
    const updatedFileds = {};
    if (photo) {
        (0, fs_1.rm)(product.photo, () => {
            console.log("Old photo deleted");
        });
        product.photo = photo.path;
        updatedFileds.photo = product.photo;
    }
    if (name) {
        product.name = name;
        updatedFileds.name = product.name;
    }
    if (price) {
        product.price = price;
        updatedFileds.price = product.price;
    }
    if (stock) {
        product.stock = stock;
        updatedFileds.stock = product.stock;
    }
    if (category) {
        product.category = category;
        updatedFileds.category = product.category;
    }
    await product.save();
    return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        updatedFileds
    });
});
