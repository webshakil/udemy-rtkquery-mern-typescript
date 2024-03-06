import express from 'express'
import { register } from '../controllers/user';
const routes = express.Router();

routes.post("/register", register);

export default routes