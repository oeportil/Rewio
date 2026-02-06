import { Router } from "express";
import userController from "../controllers/userController";
import { authMiddleware } from "../middlewares";

const route = Router();
route.post('/login', userController.login);
route.post('/save', authMiddleware, userController.saveUser);

export default route;