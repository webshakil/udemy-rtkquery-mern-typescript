import express from 'express'
import { isAdmin, requireSignIn,  } from '../middleware/auth';
import { getAllusers, login, register,singleUser,deleteUser, updateUser } from '../controllers/user';
const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login)
routes.get("/all", requireSignIn, isAdmin, getAllusers)
routes.get("/:id", requireSignIn, isAdmin, singleUser)
routes.delete("/:id", requireSignIn, isAdmin, deleteUser)
routes.put("/:id", requireSignIn, isAdmin, updateUser)

export default routes