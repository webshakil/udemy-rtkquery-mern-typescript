import express from 'express'
import { getAllusers, login, register } from '../controllers/user';
const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login)
routes.get("/all", getAllusers)

export default routes