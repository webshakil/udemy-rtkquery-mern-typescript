"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const payment_1 = require("../controllers/payment");
const router = express_1.default.Router();
// router.post("/create", createPaymentIntent)
router.post("/coupon/new", auth_1.requireSignIn, auth_1.isAdmin, payment_1.newCoupon);
router.get("/discount", payment_1.applyDiscount);
router.get("/coupon/all", auth_1.requireSignIn, auth_1.isAdmin, payment_1.allCoupons);
router.delete("/coupon/:id", auth_1.requireSignIn, auth_1.isAdmin, payment_1.deleteCopons);
exports.default = router;
