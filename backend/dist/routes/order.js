"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const order_1 = require("../controllers/order");
const router = express_1.default.Router();
router.post('/new', order_1.newOrder);
router.get("/my", order_1.myOrders);
router.get("/all", auth_1.requireSignIn, auth_1.isAdmin, order_1.allOrders);
router.get("/:id", auth_1.requireSignIn, auth_1.isAdmin, order_1.getSingleOrder);
//router.get("/:id", requireSignIn, isAdmin, processOrder)
router.delete("/:id", auth_1.requireSignIn, auth_1.isAdmin, order_1.deleteOrder);
exports.default = router;
