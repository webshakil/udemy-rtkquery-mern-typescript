import { Request,NextFunction, Response } from "express";
import ErrorHandler from "../utils/utility-class";
import { User } from "../models/user";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { TryCatach } from "../middleware/error";


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

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     if (!email) {
//       return res.status(400).json({ error: 'Email is required' });
//     }

//     if (!password) {
//       return res.status(400).json({ error: 'Password is required' });
//     }

//     const user = await User.findOne({ email });
//     console.log(user)
    

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const match = await bcrypt.compare(password, user.password);

//     if (!match) {
//       return res.status(401).json({ error: 'Wrong password' });
//     }

//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

//     res.status(200).json({
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//       token
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(user.password);

    if (!user.password) {
      return res.status(400).json({ error: 'User password is undefined' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};





export const getAllusers = TryCatach(async (req: Request, res: Response) => {
  const search = req.query.search || "";
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 5);
  const searchRegExp = new RegExp('.*' + search + '.*', "i");

  const filter = {
      $or: [
          { name: { $regex: searchRegExp } },
          { email: { $regex: searchRegExp } },
          { phone: { $regex: searchRegExp } }
      ]
  };
  const option = { password: 0 };

  const users = await User.find(filter, option).limit(limit).skip((page-1)*5);
  const count = await User.find(filter).countDocuments();

  if (!users) {
      return res.status(404).json({ error: "No user found with the search term" });
  }

  return res.status(200).json({
      message: "success",
      users,
      pagination: {
          totalUser: count,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null // Corrected pagination calculation
      }
  });
});


export const singleUser =TryCatach(async(req, res, next)=>{
  const id = req.params.id;
  const user = await User.findById(id);
  if(!user) return next(new ErrorHandler("Invalid id", 400));
  return res.status(200).json({
    success: true,
    user,
  })
})

export const deleteUser = TryCatach(async(req, res, next)=>{
  const id = req.params.id;
  const user = await User.findById(id);
  if(!user) return next(new ErrorHandler("Invalid id", 400));
  await user.deleteOne();
  return res.status(200).json({
    success: true,
    message: "User deleted successfull"
  })
})

