"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCopons = exports.allCoupons = exports.applyDiscount = exports.newCoupon = exports.createPaymentIntent = void 0;
const error_1 = require("../middleware/error");
const coupon_1 = require("../models/coupon");
const server_1 = require("../server");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
exports.createPaymentIntent = (0, error_1.TryCatach)(async (req, res, next) => {
    const { amount } = req.body;
    if (!amount)
        return next(new utility_class_1.default("Please enter amount", 400));
    const paymentIntent = await server_1.stripe.paymentIntents.create({
        amount: Number(amount) * 100,
        currency: "usd"
    });
    return res.status(201).json({
        success: true,
        clientSecret: paymentIntent.client_secret
    });
});
exports.newCoupon = (0, error_1.TryCatach)(async (req, res, next) => {
    const { coupon, amount } = req.body;
    if (!coupon || !amount)
        return next(new utility_class_1.default("Please enter coupon and amoutn", 400));
    await coupon_1.Coupon.create({ code: coupon, amount });
    return res.status(201).json({
        success: true,
        message: `Coupon ${coupon} created successfully`
    });
});
exports.applyDiscount = (0, error_1.TryCatach)(async (req, res, next) => {
    const { coupon } = req.query;
    const discount = await coupon_1.Coupon.findOne({ code: coupon });
    if (!discount)
        return next(new utility_class_1.default("Invalid coupon code", 400));
    return res.status(200).json({
        success: true,
        discount: discount.amount
    });
});
exports.allCoupons = (0, error_1.TryCatach)(async (req, res, next) => {
    const coupons = await coupon_1.Coupon.find({});
    return res.status(200).json({
        success: true,
        coupons
    });
});
exports.deleteCopons = (0, error_1.TryCatach)(async (req, res, next) => {
    const { id } = req.params;
    const coupon = await coupon_1.Coupon.findByIdAndDelete(id);
    if (!coupon)
        return next(new utility_class_1.default("Invalid coupon id", 400));
    return res.status(200).json({
        success: true,
        message: ` Coupon ${coupon.code} Deleted Successfully`
    });
});
