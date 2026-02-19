import { Router } from "express";
import userController from "../controllers/userController";
import { AdminMiddleware, authMiddleware, idempotencyMiddleware } from "../middlewares";

const route = Router();
route.post('/login', idempotencyMiddleware, userController.login);
route.post('/save', idempotencyMiddleware, userController.saveUser);
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