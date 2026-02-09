import { Router } from "express";
import userController from "../controllers/userController";
import { authMiddleware } from "../middlewares";

const route = Router();
route.post('/login', userController.login);
route.use(authMiddleware)
route.post('/save', userController.saveUser);
route.get('/me', userController.getMe)
route.patch('/me', userController.updateMe)
route.put('/password-me', userController.changePassword)

export default route;