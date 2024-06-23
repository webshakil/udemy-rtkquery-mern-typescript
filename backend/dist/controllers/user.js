"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.singleUser = exports.getAllusers = exports.login = exports.register = void 0;
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../middleware/error");
const saltRounds = 10; // Adjust this based on your security needs
const hashPassword = async (password) => {
    return bcryptjs_1.default.hash(password, saltRounds);
};
const register = async (req, res, next) => {
    console.log("req.body===>", req.body);
    try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone) {
            return next(new utility_class_1.default("Please add all fileds", 400));
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ error: "Password must be 6 character log" });
        }
        const existingUser = await user_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: "Email is taken" });
        }
        const hashedPassword = await hashPassword(password);
        const user = await new user_1.User({
            name,
            email,
            phone,
            password: hashedPassword
        }).save();
        res.json({
            message: "User created Successfully",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.register = register;
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
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }
        const user = await user_1.User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(user.password);
        if (!user.password) {
            return res.status(400).json({ error: 'User password is undefined' });
        }
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Wrong password' });
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.login = login;
exports.getAllusers = (0, error_1.TryCatach)(async (req, res) => {
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
    const users = await user_1.User.find(filter, option).limit(limit).skip((page - 1) * 5);
    const count = await user_1.User.find(filter).countDocuments();
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
            nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null
        }
    });
});
exports.singleUser = (0, error_1.TryCatach)(async (req, res, next) => {
    const id = req.params.id;
    const user = await user_1.User.findById(id);
    if (!user)
        return next(new utility_class_1.default("Invalid id", 400));
    return res.status(200).json({
        success: true,
        user,
    });
});
exports.deleteUser = (0, error_1.TryCatach)(async (req, res, next) => {
    const id = req.params.id;
    const user = await user_1.User.findById(id);
    if (!user)
        return next(new utility_class_1.default("Invalid id", 400));
    await user.deleteOne();
    return res.status(200).json({
        success: true,
        message: "User deleted successfull"
    });
});
exports.updateUser = (0, error_1.TryCatach)(async (req, res) => {
    const userId = req.params.id;
    const { isBanned, role } = req.body;
    try {
        const user = await user_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (isBanned != undefined) {
            user.isBanned = isBanned;
        }
        if (role) {
            user.role = role;
        }
        await user_1.User.findOneAndUpdate({ _id: userId }, user);
        const updateUser = await user_1.User.findById(userId);
        if (!updateUser) {
            return res.status(500).json({ error: "Failed to fetch updated user data" });
        }
        res.json({ user: updateUser });
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});
