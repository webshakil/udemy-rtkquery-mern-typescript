"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10; // Adjust this based on your security needs
const hashPassword = async (password) => {
    return bcryptjs_1.default.hash(password, saltRounds);
};
const register = async (req, res, next) => {
    console.log("req.body===>", req.body);
    try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone) {
            return next(new utility_class_1.default("Please add all fileds", 400));
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ error: "Password must be 6 character log" });
        }
        const existingUser = await user_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: "Email is taken" });
        }
        const hashedPassword = await hashPassword(password);
        const user = await new user_1.User({
            name,
            email,
            phone,
            password: hashedPassword
        }).save();
        res.json({
            message: "User created Successfully",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.register = register;
