import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/auth';
import { myOrders, newOrder } from '../controllers/order';
const router = express.Router()

router.post('/new', newOrder);
router.get("/my", myOrders)
//router.get("/all", requireSignIn, isAdmin, allOrders)
//router.get("/:id", requireSignIn, isAdmin, singleOrder)
//router.get("/:id", requireSignIn, isAdmin, processOrder)
//router.get("/:id", requireSignIn, isAdmin, deleteOrder)

export default router;