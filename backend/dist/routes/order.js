"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../controllers/order");
const router = express_1.default.Router();
router.post('/new', order_1.newOrder);
//router.get("/all", requireSignIn, isAdmin, allOrders)
//router.get("/:id", requireSignIn, isAdmin, singleOrder)
//router.get("/:id", requireSignIn, isAdmin, processOrder)
//router.get("/:id", requireSignIn, isAdmin, deleteOrder)
exports.default = router;
