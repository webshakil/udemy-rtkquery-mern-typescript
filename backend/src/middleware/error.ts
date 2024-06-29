import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class";
import { ControllerType } from "../types/types";

export const errorMiddleware=(err:ErrorHandler, req:Request, res:Response, next:NextFunction)=>{
    err.message ||="Internal server error";
    err.statusCode||=500;

    if(err.name==="CastError")err.message ="Invalid ID";
    return res.status(err.statusCode).json({
        success:false,
        message: err.message
    })
}

export const TryCatach=(func:ControllerType)=>(req:Request, res:Response, next:NextFunction)=>{
    return Promise.resolve(func(req, res, next)).catch(next);
}