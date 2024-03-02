import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoUri from './config/connectDB';
import mongoose from 'mongoose';
import morgan from 'morgan'


dotenv.config();
const app = express();

const mongoConnectUri = mongoUri();
mongoose.connect(mongoConnectUri)
  .then(() => {
    console.log("Mongodb Connection established");
  })
  .catch(error => {
    console.error("Error connecting to MongoDB", error);
  });
app.use("/server-health",(req, res)=>{
  res.status(200).json({
    success:"Ok",
    message:"Server health is fine"
  })
})
app.use(morgan("dev"));
app.use(express.json());




const port = process.env.PORT || 9000;
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})