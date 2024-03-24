"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.requireSignIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const user_1 = require("../models/user");
const requireSignIn = (req, res, next) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(req.headers.authorization, process.env.JWT_SECRET);
        console.log("decoded==>", decoded);
        req.user = decoded; //logged in user
        console.log("Loggedin user===>", req.user);
        next();
    }
    catch (err) {
        return next(new utility_class_1.default("Authenticaiton failed", 401));
    }
};
exports.requireSignIn = requireSignIn;
const isAdmin = async (req, res, next) => {
    try {
        const user = await user_1.User.findById(req.user?._id);
        if (user && user.role != "admin") {
            return next(new utility_class_1.default("Authentication failed, Need admin access", 401));
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.isAdmin = isAdmin;
