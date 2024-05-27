"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
//import path from "path";
const storage = multer_1.default.diskStorage({
    destination(req, file, callback) {
        callback(null, "uploads");
    },
    filename(req, file, callback) {
        const id = (0, uuid_1.v4)();
        const extName = file.originalname.split(".").pop();
        callback(null, `${id}.${extName}`);
    },
});
// File type validation
const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
//const allowedFileTypes = ["image/png" ];
const fileFilter = (req, file, callback) => {
    if (allowedFileTypes.includes(file.mimetype)) {
        callback(null, true);
    }
    else {
        callback(new Error("File type is not allowed"), false);
    }
};
// File size validation (in bytes)
const maxFileSize = 5 * 1024 * 1024; // 5MB
//const maxFileSize = 10; // 5MB
const limits = {
    fileSize: maxFileSize,
};
const singleUpload = (0, multer_1.default)({ storage, fileFilter, limits }).single("photo");
exports.default = singleUpload;
