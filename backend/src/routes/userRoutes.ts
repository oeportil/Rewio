import { Router } from "express";
import userController from "../controllers/userController";
import { authMiddleware } from "../middlewares";

const route = Router();
route.post('/login', userController.login);
route.post('/save', userController.saveUser);
route.use(authMiddleware)
route.get('/me', userController.getMe)
route.patch('/me', userController.updateMe)
route.put('/password-me', userController.changePassword)

export default route;