import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/auth';
const router = express.Router();

//router.post("/new", requireSignIn, isAdmin, singleUpload, newProduct) ;
//router.get("/all")
//router.get("latest", getLatestProducts)
//router.get("/categories", getAllCategories)
//router.get("/all-products", getAllProducts)

export default router;