import { Request, NextFunction, Response } from "express";
export declare const register: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
