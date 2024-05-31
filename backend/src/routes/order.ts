import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/auth';
const router = express.Router()

//router.post('/new', newOrders);
//router.get("/all", requireSignIn, isAdmin, allOrders)
//router.get("/:id", requireSignIn, isAdmin, singleOrder)
//router.get("/:id", requireSignIn, isAdmin, processOrder)
//router.get("/:id", requireSignIn, isAdmin, deleteOrder)

export default router;