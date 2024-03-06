import mongoose from "mongoose"

export interface IUser extends Document{
    name: string,
    email:string,
    password:string,
    photo:string,
    role:"user" |"admin",
    address: string,
    createdAt: Date,
    updatedAt: Date,
    isBanned: boolean

}

const schema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Name is required"]
    },
    email:{
        type: String,
        required:[true, "Email is required"],
        unique: true
    },
    phone:{
        type:String,
        required:[true, "Phone is required"]
    },
    address:{
        type:String,
        trim: true
    },
    photo:{
        type: String
    },
    role:{
        type: String,
        enum:["user","admin"],
        default:"user"
    },
    isBanned:{
        type:Boolean,
        default:false
    }
},{timestamps: true})

export const User = mongoose.model<IUser>("User", schema)