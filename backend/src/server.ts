import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoUri from './config/connectDB';
import mongoose from 'mongoose';
import morgan from 'morgan'
import userRoutes from './routes/user'
import productRoutes from './routes/product'
import orderRoutes from './routes/order'
import paymentRoutes from './routes/payment'
import bodyParser from 'body-parser';
import Stripe from 'stripe';
import cors from 'cors'
dotenv.config();
const app = express();
const stripeKey = process.env.STRIPE_KEY || ""
const mongoConnectUri = mongoUri();
mongoose.connect(mongoConnectUri)
  .then(() => {
    console.log("Mongodb Connection established");
  })
  .catch(error => {
    console.error("Error connecting to MongoDB", error);
  });
export const stripe = new Stripe(stripeKey);
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/server-health",(req, res)=>{
  res.status(200).json({
    success:"Ok",
    message:"Server health is fine"
  })
})
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/order", orderRoutes)
app.use("/api/v1/payment", paymentRoutes)
app.use("/uploads", express.static("uploads"))

const port = process.env.PORT || 7000;
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})