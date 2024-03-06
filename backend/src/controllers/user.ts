import { Request,NextFunction, Response } from "express";
import ErrorHandler from "../utils/utility-class";
import { User } from "../models/user";
import bcrypt from 'bcryptjs'

const saltRounds = 10; // Adjust this based on your security needs
const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};
export const register = async (req:Request, res:Response, next:NextFunction)=>{
    console.log("req.body===>", req.body)
    try{
        const {name, email, phone, password} =req.body;
        if(!name ||!email || !phone){
            return next(new ErrorHandler("Please add all fileds", 400))
        }
        if(!password || password.length <6){
            return res.status(400).json({error:"Password must be 6 character log"})
        }
      const existingUser = await User.findOne({email});
      if(existingUser){
        res.status(400).json({error:"Email is taken"})
      }
      const hashedPassword = await hashPassword(password);
      const user = await new User({
        name,
        email,
        phone,
        password:hashedPassword
      }).save();

      res.json({
        message:"User created Successfully",
        user:{
            name: user.name,
            email:user.email,
            role: user.role , 

        }
      }) 

    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})

    }

}