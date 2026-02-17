import { Router } from "express";
import userController from "../controllers/userController";
import { AdminMiddleware, authMiddleware } from "../middlewares";

const route = Router();
route.post('/login', userController.login);
route.post('/save', userController.saveUser);
route.use(authMiddleware)
route.get('/', userController.getAll);
route.get('/doctors', userController.getAllDoctors);
route.get('/owners', AdminMiddleware, userController.getAllClinicOwners);
route.get('/me', userController.getMe)
route.patch('/me', userController.updateMe)
route.put('/password-me', userController.changePassword)
route.delete('/:id', userController.deleteUser)
route.delete('/', userController.deleteUser)

export default route;