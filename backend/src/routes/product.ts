import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/auth';
import singleUpload from '../middleware/multer';
import { newProduct, getLatestProducts,getAllCategories,getAllProducts,getSingleProduct,updateProduct } from '../controllers/product';
const router = express.Router();

 router.post("/new", requireSignIn, isAdmin, singleUpload, newProduct) ;
//router.get("/all")
//router.get("latest", getLatestProducts)
router.get("/latest",getLatestProducts)
router.get("/categories", getAllCategories)
router.get("/all-products", getAllProducts)
router.get("/:id", getSingleProduct)
router.put("/:id", requireSignIn, isAdmin,singleUpload, updateProduct)

export default router;