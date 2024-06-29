"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryCatach = exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    err.message || (err.message = "Internal server error");
    err.statusCode || (err.statusCode = 500);
    if (err.name === "CastError")
        err.message = "Invalid ID";
    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
exports.errorMiddleware = errorMiddleware;
const TryCatach = (func) => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};
exports.TryCatach = TryCatach;
