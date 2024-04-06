import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import ErrorHandler from '../utils/utility-class';
import { User } from '../models/user';
interface AuthenticatedRequest extends Request{
    user?: any;
}

export const requireSignIn=(req:AuthenticatedRequest, res:Response, next:NextFunction)=>{
    try{
        const decoded = jwt.verify(req.headers.authorization as string, process.env.JWT_SECRET as string);
        //console.log("decoded==>", decoded)
        req.user= decoded;//logged in user
        //console.log("Loggedin user===>", req.user)
        next();
    }catch(err){
        return next(new ErrorHandler("Authenticaiton failed", 401))
    }
}

export const isAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.user?._id);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        if (user.role !== "admin") {
            return next(new ErrorHandler("Authentication failed, Need admin access", 401));
        }

        next();
    } catch (err) {
        console.log(err);
        return next(new ErrorHandler("Something went wrong", 500));
    }
}
