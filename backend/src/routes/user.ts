import express from 'express'
import { getAllusers, login, register } from '../controllers/user';
import { isAdmin, requireSignIn } from '../middleware/auth';
const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login)
routes.get("/all", getAllusers)
//routes.get("/all", requireSignIn, isAdmin, getAllusers)

export default routes