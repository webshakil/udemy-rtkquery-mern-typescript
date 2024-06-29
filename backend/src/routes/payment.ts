import express from "express";
import { isAdmin, requireSignIn } from "../middleware/auth";
import { allCoupons, applyDiscount, deleteCopons, newCoupon,createPaymentIntent } from "../controllers/payment";



const router = express.Router();
router.post("/create", createPaymentIntent)
router.post("/coupon/new", requireSignIn,isAdmin, newCoupon);
router.get("/discount", applyDiscount);
router.get("/coupon/all", requireSignIn,isAdmin, allCoupons);
router.delete("/coupon/:id", requireSignIn,isAdmin, deleteCopons);

export default router;





