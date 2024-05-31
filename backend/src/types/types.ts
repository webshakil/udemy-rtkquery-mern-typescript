import {Request,NextFunction, Response } from "express";

export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response<any, Record<string, any>>>;

  export type SearchRequestQuery = {
    search?: string;
    price?: string;
    category?: string;
    sort?: string;
    page?: string;
  };
  export interface BaseQuery{
    name?:{
      $regex:string;
      $options:string;
    };
    price?:{$lte:number};
    category?: string
  }