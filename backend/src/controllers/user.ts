import { Request,NextFunction, Response } from "express";
import ErrorHandler from "../utils/utility-class";

export const register =(req:Request, res:Response, next:NextFunction)=>{
    try{
        const {name, email, phone, password} =req.body;
        if(!name ||!email || !phone){
            return next(new ErrorHandler("Please add all fileds", 400))
        }
        if(!password || password.length <6){
            return res.status(400).json({error:"Password must be 6 character log"})
        }
        const existingUser = await User.findOne({email})

    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})

    }

}