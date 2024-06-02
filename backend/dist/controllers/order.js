"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.getSingleOrder = exports.allOrders = exports.myOrders = exports.newOrder = void 0;
const error_1 = require("../middleware/error");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const order_1 = require("../models/order");
const features_1 = require("../utils/features");
exports.newOrder = (0, error_1.TryCatach)(async (req, res, next) => {
    const { shippingInfo, orderItems, user, subtotal, tax, shippingCharges, discount, total } = req.body;
    if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total) {
        return next(new utility_class_1.default("Please Enter All Fields", 400));
    }
    const order = await order_1.Order.create({
        shippingInfo,
        orderItems,
        user,
        subtotal,
        tax,
        shippingCharges,
        discount,
        total
    });
    await (0, features_1.reduceStock)(orderItems);
    return res.status(201).json({
        success: true,
        message: "Order Placed Successfully"
    });
});
exports.myOrders = (0, error_1.TryCatach)(async (req, res, next) => {
    const { id: user } = req.query;
    const orders = await order_1.Order.find({ user });
    return res.status(200).json({
        success: true,
        orders,
    });
});
exports.allOrders = (0, error_1.TryCatach)(async (req, res, next) => {
    const orders = await order_1.Order.find().populate("user", "name");
    //const orders = await Order.find()
    return res.status(200).json({
        success: true,
        orders,
    });
});
exports.getSingleOrder = (0, error_1.TryCatach)(async (req, res, next) => {
    const { id } = req.params;
    const order = await order_1.Order.findById(id).populate("user", "name");
    return res.status(200).json({
        success: true,
        order,
    });
});
exports.deleteOrder = (0, error_1.TryCatach)(async (req, res, next) => {
    const { id } = req.params;
    const order = await order_1.Order.findById(id);
    if (!order)
        return next(new utility_class_1.default("Order Not Found", 404));
    await order.deleteOne();
    return res.status(200).json({
        success: true,
        message: "Order Deelted Successfully"
    });
});
