"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    code: {
        type: String,
        required: [true, "Please Enter the coupon code"],
        unique: true,
    },
    amount: {
        type: Number,
        required: [true, "Please enter the Discount Amoutn"]
    }
});
exports.Coupon = mongoose_1.default.model("Coupon", schema);
