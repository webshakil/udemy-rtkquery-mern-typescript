"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const routes = express_1.default.Router();
routes.post("/register", user_1.register);
routes.post("/login", user_1.login);
routes.get("/all", user_1.getAllusers);
//routes.get("/all", requireSignIn, isAdmin, getAllusers)
exports.default = routes;
