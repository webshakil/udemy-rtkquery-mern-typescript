import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class";
import { ControllerType } from "../types/types";
export declare const errorMiddleware: (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export declare const TryCatach: (func: ControllerType) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
